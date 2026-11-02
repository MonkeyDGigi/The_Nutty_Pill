import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { nextTick } from "vue";
import { autoLockSats } from "src/stores/educationLock";
import { nip19 } from "nostr-tools";
import { useEducationStore } from "src/stores/education";
import { useProofsStore } from "src/stores/proofs";

describe("autoLockSats", () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it("locks received sats before the proofs store has refreshed", async () => {
    await autoLockSats(500, "Received via ecash token");

    const store = useEducationStore();
    expect(store.lockedSats).toHaveLength(1);
    expect(store.lockedSats[0].amount).toBe(500);
    expect(store.lockedSats[0].unlockedAt).toBeUndefined();
  });

  it("ignores empty amounts", async () => {
    await autoLockSats(0, "nothing");

    expect(useEducationStore().lockedSats).toHaveLength(0);
  });

  it("does not fail the wallet operation when locking fails", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(useEducationStore(), "lockSats").mockImplementation(() => {
      throw new Error("no");
    });

    await expect(autoLockSats(500, "Received")).resolves.toBeUndefined();

    expect(error).toHaveBeenCalled();
  });
});

describe("spending unlocked sats", () => {
  const earn = (amount: number) => {
    const store = useEducationStore();
    store.lockedSats.push({
      id: `earned-${amount}`,
      amount,
      lockedAt: 1,
      unlockedAt: 2,
    });
    return store;
  };
  const setBalance = (amount: number) => {
    useProofsStore().proofs = [{ amount, reserved: false } as any];
  };

  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
    setBalance(1000);
  });

  it("refuses more than the unlocked amount", () => {
    const store = earn(100);

    expect(() => store.holdSpend("q1", 101, "sat")).toThrow(
      "Not enough unlocked sats"
    );
    expect(store.totalUnlockedSats).toBe(100);
  });

  it("refuses everything when nothing is unlocked", () => {
    expect(() => useEducationStore().holdSpend("q1", 1, "sat")).toThrow();
  });

  it("refuses units other than sats", () => {
    const store = earn(100);

    expect(() => store.holdSpend("q1", 1, "usd")).toThrow();
    expect(store.spendableBalance("usd")).toBe(0);
  });

  it("counts a payment in flight, so two can't spend the same sats", () => {
    const store = earn(100);

    store.holdSpend("q1", 60, "sat");

    expect(store.totalUnlockedSats).toBe(40);
    expect(() => store.holdSpend("q2", 60, "sat")).toThrow();
  });

  it("refuses to hold the same payment twice", () => {
    const store = earn(100);

    store.holdSpend("q1", 10, "sat");

    expect(() => store.holdSpend("q1", 10, "sat")).toThrow("in progress");
  });

  it("charges what the payment really cost", () => {
    const store = earn(100);

    store.holdSpend("q1", 60, "sat");
    setBalance(948);
    store.settleSpend("q1", 52);

    expect(store.totalUnlockedSats).toBe(48);
    expect(store.totalLockedSats).toBe(900);
  });

  it("charges a payment once when it is finalized twice", () => {
    const store = earn(100);

    store.holdSpend("q1", 60, "sat");
    store.settleSpend("q1", 60);
    store.settleSpend("q1", 60);

    expect(store.totalUnlockedSats).toBe(40);
  });

  it("gives the sats back when a payment fails", () => {
    const store = earn(100);

    store.holdSpend("q1", 60, "sat");
    store.releaseSpend("q1");

    expect(store.totalUnlockedSats).toBe(100);
  });

  it("gives the sats back when an own token is reclaimed", () => {
    const store = earn(100);

    store.holdSpend("s1", 60, "sat");
    store.settleSpend("s1", 60);
    store.refundSpend(59);

    expect(store.totalUnlockedSats).toBe(99);
  });

  it("never reports more unlocked than the wallet holds", () => {
    const store = earn(500);
    setBalance(200);

    expect(store.totalUnlockedSats).toBe(200);
  });

  it("keeps hold data across a reload", async () => {
    earn(100).holdSpend("q1", 60, "sat");
    await nextTick();

    setActivePinia(createPinia());

    expect(useEducationStore().spendHolds).toEqual({ q1: 60 });
  });
});

describe("education storage migration", () => {
  const unlockedEntries = () =>
    useEducationStore()
      .lockedSats.filter((s) => s.unlockedAt)
      .reduce((sum, s) => sum + s.amount, 0);

  const pubkey = "ab".repeat(32);
  const npub = nip19.npubEncode(pubkey);
  const unlocked = JSON.stringify([
    { id: "a", amount: 100, lockedAt: 1, unlockedAt: 2, lessonId: "history-1" },
  ]);

  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it("keeps data stored before the pubkey existed", () => {
    localStorage.setItem("cashu.ndk.pubkey", pubkey);
    localStorage.setItem("cashu.education.lockedSats", unlocked);
    localStorage.setItem(`cashu.education.lockedSats.${npub}`, "[]");

    expect(unlockedEntries()).toBe(100);
  });

  it("prefers the pubkey copy the app was last using", () => {
    localStorage.setItem("cashu.ndk.pubkey", pubkey);
    localStorage.setItem("cashu.education.lockedSats", "[]");
    localStorage.setItem(`cashu.education.lockedSats.${npub}`, unlocked);

    expect(unlockedEntries()).toBe(100);
    expect(localStorage.getItem(`cashu.education.lockedSats.${npub}`)).toBe(
      unlocked
    );
  });

  it("keeps data after the Nostr key changes", () => {
    localStorage.setItem("cashu.education.lockedSats", unlocked);
    useEducationStore();

    localStorage.setItem("cashu.ndk.pubkey", pubkey);
    setActivePinia(createPinia());

    expect(unlockedEntries()).toBe(100);
  });
});
