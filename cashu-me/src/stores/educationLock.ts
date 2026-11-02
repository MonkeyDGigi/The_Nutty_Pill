async function educationStore() {
  const { useEducationStore } = await import("src/stores/education");
  return useEducationStore();
}

export async function autoLockSats(
  amount: number,
  note: string
): Promise<void> {
  if (amount <= 0) return;
  try {
    (await educationStore()).lockSats(amount, note, false);
  } catch (e) {
    console.error("[Wallet] Could not auto-lock sats:", e);
  }
}

// Throws when the sats are not unlocked, which must stop the payment.
export async function holdSpend(
  id: string,
  amount: number,
  unit: string
): Promise<void> {
  (await educationStore()).holdSpend(id, amount, unit);
}

export async function settleSpend(id: string, amount: number): Promise<void> {
  try {
    (await educationStore()).settleSpend(id, amount);
  } catch (e) {
    console.error("[Wallet] Could not record spent sats:", e);
  }
}

export async function releaseSpend(id: string): Promise<void> {
  try {
    (await educationStore()).releaseSpend(id);
  } catch (e) {
    console.error("[Wallet] Could not release held sats:", e);
  }
}

export async function refundSpend(amount: number, unit: string): Promise<void> {
  if (unit !== "sat") return;
  try {
    (await educationStore()).refundSpend(amount);
  } catch (e) {
    console.error("[Wallet] Could not refund spent sats:", e);
  }
}

// Melts that move sats between the wallet's own mints, or forward an incoming
// token to one of them, are not spending.
const internalMelts = new Set<string>();

export function markInternalMelt(quote: string) {
  internalMelts.add(quote);
}

export function isInternalMelt(quote: string): boolean {
  return internalMelts.has(quote);
}
