<template>
  <div style="max-width: 800px; margin: 0 auto">
    <!-- ADMIN DASHBOARD SECTION -->
    <div v-if="authenticated" class="section-divider q-my-md">
      <div class="divider-line"></div>
      <div class="divider-text">Admin Dashboard</div>
      <div class="divider-line"></div>
    </div>

    <!-- Balance Info -->
    <div v-if="authenticated" class="q-py-sm q-px-xs text-left" on-left>
      <q-list padding>
        <q-item>
          <q-item-section>
            <q-item-label overline class="text-weight-bold">Wallet Balance</q-item-label>
            <div class="text-body1 q-mt-sm q-mb-sm">
              <strong>Total:</strong> {{ totalWalletBalance }} sats
              <div class="text-caption">(Locked + Unlocked)</div>
            </div>
            <div class="text-body2 q-mt-md q-pa-sm" style="background: rgba(157, 78, 221, 0.1); border-radius: 4px;">
              <strong>Available:</strong> {{ totalUnlockedSats }} sats
              <div class="text-caption">Can be spent/sent</div>
            </div>
            <div class="text-body2 q-mt-sm q-pa-sm" style="background: rgba(255, 152, 0, 0.1); border-radius: 4px;">
              <strong>Locked:</strong> {{ totalLockedSats }} sats
              <div class="text-caption">Must be earned by completing lessons (100% score required)</div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Total Reward Pool Management -->
    <div v-if="authenticated" class="q-py-sm q-px-xs text-left" on-left>
      <q-list padding>
        <q-item>
          <q-item-section>
            <q-item-label overline class="text-weight-bold">Set Total Reward Pool</q-item-label>
            <q-item-label caption>
              Set the total amount of sats to be distributed across all lessons. 
              Rewards increase with lesson difficulty and lesson number - advanced lessons and later lessons earn more.
            </q-item-label>
            <div class="row items-center q-gutter-md q-mt-md">
              <q-input
                v-model.number="totalRewardPool"
                type="number"
                label="Total Reward Pool (sats)"
                :min="0"
                :max="totalWalletBalance"
                class="col"
                @update:model-value="updateTotalRewardPool"
              />
              <div class="col-auto">
                <q-btn
                  @click="updateTotalRewardPool(totalRewardPool)"
                  :disable="totalRewardPool < 0 || totalRewardPool > totalWalletBalance"
                  color="primary"
                >
                  Set Pool
                </q-btn>
              </div>
            </div>
            <div v-if="rewardPerLesson > 0" class="q-mt-md q-pa-sm" style="background: rgba(157, 78, 221, 0.1); border-radius: 4px;">
              <div class="text-body2">
                <strong>Average reward per lesson:</strong> {{ rewardPerLesson }} sats
              </div>
              <div class="text-caption">
                Rewards increase with lesson difficulty and lesson number. Advanced lessons and later lessons earn more.
              </div>
              <div class="text-caption q-mt-xs">
                <strong>Example:</strong> Beginner lesson 1 ≈ {{ getExampleReward('beginner', 1) }} sats, 
                Advanced lesson 12 ≈ {{ getExampleReward('advanced', 12) }} sats
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Progress Overview -->
    <div v-if="authenticated" class="q-py-sm q-px-xs text-left" on-left>
      <q-list padding>
        <q-item>
          <q-item-section>
            <q-item-label overline class="text-weight-bold">Learning Progress</q-item-label>
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-12 col-md-3">
                <div class="text-body2">📜 Bitcoin History</div>
                <div class="text-caption">
                  {{ historyProgress.completed }} / {{ historyProgress.total }} lessons
                </div>
                <q-linear-progress
                  :value="historyProgress.percentage"
                  color="primary"
                  class="q-mt-sm"
                />
              </div>
              
              <div class="col-12 col-md-3">
                <div class="text-body2">🔐 Self-Custody</div>
                <div class="text-caption">
                  {{ selfCustodyProgress.completed }} / {{ selfCustodyProgress.total }} lessons
                </div>
                <q-linear-progress
                  :value="selfCustodyProgress.percentage"
                  color="primary"
                  class="q-mt-sm"
                />
              </div>
              
              <div class="col-12 col-md-3">
                <div class="text-body2">🔗 Protocols</div>
                <div class="text-caption">
                  {{ protocolsProgress.completed }} / {{ protocolsProgress.total }} lessons
                </div>
                <q-linear-progress
                  :value="protocolsProgress.percentage"
                  color="primary"
                  class="q-mt-sm"
                />
              </div>
              
              <div class="col-12 col-md-3">
                <div class="text-body2">📈 Economics</div>
                <div class="text-caption">
                  {{ economicsProgress.completed }} / {{ economicsProgress.total }} lessons
                </div>
                <q-linear-progress
                  :value="economicsProgress.percentage"
                  color="primary"
                  class="q-mt-sm"
                />
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- BACKUP & RESTORE SECTION -->
    <div class="section-divider q-my-md">
      <div class="divider-line"></div>
      <div class="divider-text">
        {{ $t("Settings.sections.backup_restore") }}
      </div>
      <div class="divider-line"></div>
    </div>

    <div class="q-py-sm q-px-xs text-left" on-left>
      <q-list padding>
        <q-item>
          <q-item-section>
            <q-item-label overline class="text-weight-bold">{{
              $t("Settings.backup_restore.backup_seed.title")
            }}</q-item-label>
            <q-item-label caption
              >{{ $t("Settings.backup_restore.backup_seed.description") }}
            </q-item-label>
            <div class="row q-pt-md">
              <div class="col-12">
                <q-input
                  outlined
                  readonly
                  v-model="hiddenMnemonic"
                  :label="
                    $t('Settings.backup_restore.backup_seed.seed_phrase_label')
                  "
                  class="seed-phrase"
                  autogrow
                >
                  <template v-slot:append>
                    <q-btn
                      flat
                      dense
                      icon="visibility"
                      color="primary"
                      class="cursor-pointer q-mt-md"
                      @click="requestMnemonicAccess"
                    ></q-btn>
                    <q-btn
                      v-if="mnemonicAccessGranted"
                      flat
                      dense
                      icon="content_copy"
                      color="primary"
                      class="cursor-pointer q-mt-md"
                      @click="copyText(mnemonic)"
                    ></q-btn>
                  </template>
                </q-input>
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- restore -->
    <div class="q-py-sm q-px-xs text-left" on-left>
      <q-list padding>
        <q-item>
          <q-item-section>
            <q-item-label overline class="text-weight-bold">{{
              $t("Settings.backup_restore.restore_ecash.title")
            }}</q-item-label>
            <q-item-label caption>
              {{ $t("Settings.backup_restore.restore_ecash.description") }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-btn
            class="q-ml-sm q-px-md"
            color="primary"
            size="sm"
            rounded
            outline
            to="/restore"
            >{{ $t("Settings.backup_restore.restore_ecash.button") }}</q-btn
          >
        </q-item>
      </q-list>
    </div>

    <!-- LIGHTNING ADDRESS SECTION -->
    <div class="section-divider q-my-md">
      <div class="divider-line"></div>
      <div class="divider-text">
        {{ $t("Settings.sections.lightning_address") }}
      </div>
      <div class="divider-line"></div>
    </div>
    <!-- nostr -->
    <div class="q-py-sm q-px-xs text-left" on-left>
      <q-list padding>
        <q-item>
          <q-item-section>
            <q-item-label overline class="text-weight-bold">{{
              $t("Settings.lightning_address.title")
            }}</q-item-label>
            <q-item-label caption>{{
              $t("Settings.lightning_address.description")
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-px-md">
          <q-item-section class="q-mx-none q-pl-none">
            <!-- toggle to turn Lightning address on and off in new row -->
            <div class="row q-pt-md">
              <q-toggle v-model="npcEnabled" color="primary" />
              <q-item-section>
                <q-item-label title>{{
                  $t("Settings.lightning_address.enable.toggle")
                }}</q-item-label>
                <q-item-label caption>
                  {{ $t("Settings.lightning_address.enable.description") }}
                </q-item-label>
              </q-item-section>
            </div>
          </q-item-section>
        </q-item>
        <q-item v-if="npcEnabled">
          <div class="row">
            <div class="col-12">
              <q-input outlined v-model="npcAddress" dense rounded readonly>
                <template v-slot:append>
                  <q-spinner size="sm" v-if="npcLoading" />
                  <q-icon
                    name="content_copy"
                    @click="copyText(npcAddress)"
                    size="xs"
                    color="grey"
                    class="q-mr-sm cursor-pointer"
                  >
                    <q-tooltip>{{
                      $t("Settings.lightning_address.address.copy_tooltip")
                    }}</q-tooltip>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="row q-pt-md">
              <q-toggle v-model="automaticClaim" color="primary" />
              <q-item-section>
                <q-item-label title>{{
                  $t("Settings.lightning_address.automatic_claim.toggle")
                }}</q-item-label>
                <q-item-label caption
                  >{{
                    $t("Settings.lightning_address.automatic_claim.description")
                  }}
                </q-item-label>
              </q-item-section>
            </div>
          </div>
        </q-item>

        <!-- NOSTR KEYS SECTION -->
        <div class="section-divider q-my-md">
          <div class="divider-line"></div>
          <div class="divider-text">
            {{ $t("Settings.sections.nostr.title") }}
          </div>
          <div class="divider-line"></div>
        </div>

        <q-item>
          <q-item-section>
            <q-item-label overline>{{
              $t("Settings.nostr_keys.title")
            }}</q-item-label>
            <q-item-label caption>{{
              $t("Settings.nostr_keys.description")
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <!-- initWalletSeedPrivateKeySigner -->
        <q-item
          :active="signerType === 'SEED'"
          active-class="text-weight-bold text-primary"
          clickable
        >
          <q-item-section avatar>
            <q-icon
              :color="signerType === 'SEED' ? 'primary' : 'grey'"
              :name="
                signerType === 'SEED'
                  ? 'check_circle'
                  : 'radio_button_unchecked'
              "
              @click="handleSeedClick"
              class="cursor-pointer"
            />
          </q-item-section>
          <q-item-section
            lines="1"
            class="cursor-pointer"
            style="word-break: break-word"
          >
            <q-item-label title>{{
              $t("Settings.nostr_keys.wallet_seed.title")
            }}</q-item-label>
            <q-item-label caption
              >{{ $t("Settings.nostr_keys.wallet_seed.description") }}
            </q-item-label>
            <q-item-label
              caption
              v-if="signerType === 'SEED' && seedSignerPrivateKeyNsec"
            >
              <q-badge
                class="cursor-pointer q-mt-xs"
                @click="copyText(seedSignerPrivateKeyNsec)"
                outline
                color="grey"
              >
                <q-icon
                  name="content_copy"
                  size="0.8em"
                  color="grey"
                  class="q-mr-xs"
                ></q-icon
                >{{ $t("Settings.nostr_keys.wallet_seed.copy_nsec") }}
              </q-badge>
            </q-item-label>
          </q-item-section>
        </q-item>
        <!-- Nip46Signer -->
        <q-item
          :active="signerType === 'NIP46'"
          active-class="text-weight-bold text-primary"
          clickable
          v-if="false"
        >
          <q-item-section avatar>
            <q-icon
              :color="signerType === 'NIP46' ? 'primary' : 'grey'"
              :name="
                signerType === 'NIP46'
                  ? 'check_circle'
                  : 'radio_button_unchecked'
              "
              @click="handleBunkerClick"
              class="cursor-pointer"
            />
          </q-item-section>
          <q-item-section
            lines="1"
            class="cursor-pointer"
            style="word-break: break-word"
          >
            <q-item-label title>{{
              $t("Settings.nostr_keys.nsec_bunker.title")
            }}</q-item-label>
            <q-item-label caption
              >{{ $t("Settings.nostr_keys.nsec_bunker.description") }}
            </q-item-label>
          </q-item-section>
          <q-item-section side v-if="signerType === 'NIP46'">
            <q-icon
              name="delete_outline"
              @click="handleResetNip46Signer"
              class="cursor-pointer"
              ><q-tooltip>{{
                $t("Settings.nostr_keys.nsec_bunker.delete_tooltip")
              }}</q-tooltip>
            </q-icon>
          </q-item-section>
        </q-item>
        <q-item
          :active="signerType === 'PRIVATEKEY'"
          active-class="text-weight-bold text-primary"
          clickable
        >
          <q-item-section avatar>
            <q-icon
              :color="signerType === 'PRIVATEKEY' ? 'primary' : 'grey'"
              :name="
                signerType === 'PRIVATEKEY'
                  ? 'check_circle'
                  : 'radio_button_unchecked'
              "
              @click="handleNsecClick"
              class="cursor-pointer"
            />
          </q-item-section>
          <q-item-section
            lines="1"
            class="cursor-pointer"
            style="word-break: break-word"
          >
            <q-item-label title>{{
              $t("Settings.nostr_keys.use_nsec.title")
            }}</q-item-label>
            <q-item-label caption
              >{{ $t("Settings.nostr_keys.use_nsec.description") }}
            </q-item-label>
          </q-item-section>
          <q-item-section side v-if="signerType === 'PRIVATEKEY'">
            <q-icon
              name="delete_outline"
              @click="handleResetPrivateKeySigner"
              class="cursor-pointer"
              ><q-tooltip>{{
                $t("Settings.nostr_keys.use_nsec.delete_tooltip")
              }}</q-tooltip></q-icon
            >
          </q-item-section>
        </q-item>
        <!-- Nip07Signer -->
        <q-item
          :active="signerType === 'NIP07'"
          active-class="text-weight-bold text-primary"
          clickable
          v-if="nip07SignerAvailable"
        >
          <q-item-section avatar>
            <q-icon
              :color="signerType === 'NIP07' ? 'primary' : 'grey'"
              :name="
                signerType === 'NIP07'
                  ? 'check_circle'
                  : 'radio_button_unchecked'
              "
              @click="handleExtensionClick"
              class="cursor-pointer"
            />
          </q-item-section>
          <q-item-section
            lines="1"
            class="cursor-pointer"
            style="word-break: break-word"
          >
            <q-item-label title>{{
              $t("Settings.nostr_keys.signing_extension.title")
            }}</q-item-label>
            <q-item-label caption v-if="nip07SignerAvailable"
              >{{ $t("Settings.nostr_keys.signing_extension.description") }}
            </q-item-label>
            <q-item-label caption v-else
              >{{ $t("Settings.nostr_keys.signing_extension.not_found") }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-expansion-item
        dense
        dense-toggle
        class="text-left"
        :label="$t('Settings.sections.nostr.relays.expand_label')"
      >
        <q-item>
          <q-item-section>
            <q-item-label overline>{{
              $t("Settings.sections.nostr.relays.add.title")
            }}</q-item-label>
            <q-item-label caption
              >{{ $t("Settings.sections.nostr.relays.add.description") }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              outlined
              rounded
              dense
              v-model="newRelay"
              :label="$t('Settings.sections.nostr.relays.list.title')"
              append
            >
              <template v-slot:append>
                <q-btn
                  flat
                  dense
                  icon="add"
                  color="primary"
                  @click="addRelay"
                ></q-btn>
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label overline>{{
              $t("Settings.sections.nostr.relays.list.title")
            }}</q-item-label>
            <q-item-label caption
              >{{ $t("Settings.sections.nostr.relays.list.description") }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-for="relay in relays" :key="relay" clickable>
          <q-item-section class="q-mx-none q-pl-none" style="max-width: 1.2em">
            <q-icon
              name="content_copy"
              @click="copyText(relay)"
              size="xs"
              color="grey"
              class="q-mr-sm cursor-pointer"
              ><q-tooltip>{{
                $t("Settings.sections.nostr.relays.list.copy_tooltip")
              }}</q-tooltip></q-icon
            >
          </q-item-section>
          <q-item-section class="q-mx-none q-pl-none" style="max-width: 1.5em">
            <q-icon
              name="delete_outline"
              @click="removeRelay(relay)"
              size="1.3em"
              color="grey"
              class="q-mr-sm cursor-pointer"
              ><q-tooltip>{{
                $t("Settings.sections.nostr.relays.list.remove_tooltip")
              }}</q-tooltip></q-icon
            >
          </q-item-section>
          <q-item-section style="max-width: 10rem" class="cursor-pointer">
            <q-item-label caption>{{ relay }} </q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>
      <!-- Web of trust actions -->
      <q-item>
        <q-item-section>
          <q-item-label overline>
            {{ $t("Settings.web_of_trust.title") }}
          </q-item-label>
          <q-item-label caption>
            {{
              $t("Settings.web_of_trust.known_pubkeys", { wotCount: wotCount })
            }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <div class="row justify-end">
            <q-btn flat dense :loading="wotLoading" @click="crawlWebOfTrust(2)">
              {{
                hasCrawlCheckpoint && !wotLoading
                  ? $t("Settings.web_of_trust.continue_crawl")
                  : signerType === "SEED"
                  ? $t("Settings.web_of_trust.crawl_odell")
                  : $t("Settings.web_of_trust.crawl_wot")
              }}
            </q-btn>
            <q-btn
              v-if="wotLoading"
              flat
              dense
              class="q-ml-sm"
              color="negative"
              @click="cancelCrawl"
            >
              {{ $t("Settings.web_of_trust.pause") }}
            </q-btn>
            <q-btn
              v-if="!wotLoading"
              flat
              dense
              class="q-ml-sm"
              :disable="wotLoading"
              @click="resetWebOfTrust"
            >
              {{ $t("Settings.web_of_trust.reset") }}
            </q-btn>
          </div>
        </q-item-section>
      </q-item>
      <q-item v-if="wotLoading || crawlTotal > 0">
        <q-item-section>
          <q-linear-progress
            rounded
            size="10px"
            color="primary"
            :value="crawlTotal > 0 ? crawlProcessed / crawlTotal : 0"
          />
          <div class="text-caption q-mt-xs">
            {{
              $t("Settings.web_of_trust.progress", {
                crawlProcessed: crawlProcessed,
                crawlTotal: crawlTotal,
              })
            }}
          </div>
        </q-item-section>
      </q-item>
    </div>

    <!-- PAYMENT REQUESTS SECTION -->
    <div class="section-divider q-my-md">
      <div class="divider-line"></div>
      <div class="divider-text">
        {{ $t("Settings.sections.payment_requests") }}
      </div>
      <div class="divider-line"></div>
    </div>

    <!-- payment requests -->
    <div class="q-py-sm q-px-xs text-left" on-left>
      <q-item class="q-pt-lg">
        <q-item-section>
          <q-item-label overline class="text-weight-bold">{{
            $t("Settings.payment_requests.title")
          }}</q-item-label>
          <q-item-label caption>{{
            $t("Settings.payment_requests.description")
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-toggle
          v-model="enablePaymentRequest"
          :label="$t('Settings.payment_requests.enable_toggle')"
          color="primary"
        />
      </q-item>
    </div>
    <div v-if="enablePaymentRequest" class="q-pb-sm q-px-xs text-left" on-left>
      <q-item>
        <q-toggle
          v-model="receivePaymentRequestsAutomatically"
          color="primary"
        />
        <q-item-section>
          <q-item-label title>{{
            $t("Settings.payment_requests.claim_automatically.toggle")
          }}</q-item-label>
          <q-item-label caption
            >{{
              $t("Settings.payment_requests.claim_automatically.description")
            }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <!-- NOSTR WALLET CONNECT SECTION -->
    <div class="section-divider q-my-md">
      <div class="divider-line"></div>
      <div class="divider-text">
        {{ $t("Settings.sections.nostr_wallet_connect") }}
      </div>
      <div class="divider-line"></div>
    </div>

    <!-- ln address -->
    <div class="q-py-sm q-px-xs text-left" on-left>
      <q-list padding>
        <!-- NWC -->

        <q-item class="q-pt-lg">
          <q-item-section>
            <q-item-label overline class="text-weight-bold">{{
              $t("Settings.nostr_wallet_connect.title")
            }}</q-item-label>
            <q-item-label caption>{{
              $t("Settings.nostr_wallet_connect.description")
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <!-- use a q-toggle to turn nwc on and off -->
        <q-item>
          <q-toggle
            v-model="enableNwc"
            :label="$t('Settings.nostr_wallet_connect.enable_toggle')"
            color="primary"
          />
        </q-item>
        <!-- <q-item>
          <q-btn
            v-if="false"
            class="q-ml-sm q-px-md"
            color="primary"
            rounded
            outline
            @click="listenToNWCCommands()"
            >Link wallet</q-btn
          >
        </q-item> -->
        <q-item v-if="enableNwc">
          <q-item-section>
            <!-- <q-item-label overline>Connections</q-item-label> -->
            <q-item-label caption
              >{{ $t("Settings.nostr_wallet_connect.payments_note") }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <div v-if="enableNwc">
          <q-item
            v-for="connection in connections"
            :key="getConnectionString(connection)"
          >
            <q-item-section
              class="q-mx-none q-pl-none"
              style="max-width: 1.5em"
            >
              <q-icon
                name="content_copy"
                @click="copyText(getConnectionString(connection))"
                size="xs"
                color="grey"
                class="q-mr-sm cursor-pointer"
                ><q-tooltip>{{
                  $t("Settings.nostr_wallet_connect.connection.copy_tooltip")
                }}</q-tooltip></q-icon
              >
            </q-item-section>
            <q-item-section
              class="q-mx-none q-pl-none"
              style="max-width: 1.5em"
            >
              <q-icon
                name="qr_code"
                @click="showNWCEntry(connection)"
                size="1.3em"
                color="grey"
                class="q-mr-sm cursor-pointer"
              >
                <q-tooltip>{{
                  $t("Settings.nostr_wallet_connect.connection.qr_tooltip")
                }}</q-tooltip>
              </q-icon>
            </q-item-section>
            <q-item-section style="max-width: 10rem">
              <!-- <q-item-label
                caption
                clickable
                style="word-break: break-word"
                @click="showNWCEntry(connection.connectionString)"
                >********************</q-item-label
              > -->
              <!-- input for allowanceleft -->
              <q-input
                type="number"
                outlined
                rounded
                dense
                v-model="connection.allowanceLeft"
                :label="
                  $t('Settings.nostr_wallet_connect.connection.allowance_label')
                "
              >
              </q-input>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </div>

    <!-- HARDWARE FEATURES SECTION -->
    <div v-if="ndefSupported" class="section-divider q-my-md">
      <div class="divider-line"></div>
      <div class="divider-text">
        {{ $t("Settings.sections.hardware_features") }}
      </div>
      <div class="divider-line"></div>
    </div>

    <div class="q-py-sm q-px-xs text-left" on-left>
      <q-list padding>
        <!-- Web NFC -->
        <div v-if="ndefSupported" class="q-px-xs text-left" on-left>
          <q-list padding>
            <q-item>
              <q-item-section>
                <q-item-label overline class="text-weight-bold">{{
                  $t("Settings.hardware_features.webnfc.title")
                }}</q-item-label>
                <q-item-label caption>
                  {{ $t("Settings.hardware_features.webnfc.description") }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable @click="nfcEncoding = 'text'">
              <q-item-section avatar>
                <q-icon
                  :color="nfcEncoding === 'text' ? 'primary' : 'grey'"
                  :name="
                    nfcEncoding === 'text'
                      ? 'check_circle'
                      : 'radio_button_unchecked'
                  "
                  class="cursor-pointer"
                />
              </q-item-section>
              <q-item-section
                lines="1"
                class="cursor-pointer"
                style="word-break: break-word"
              >
                <q-item-label title>{{
                  $t("Settings.hardware_features.webnfc.text.title")
                }}</q-item-label>
                <q-item-label caption>
                  {{ $t("Settings.hardware_features.webnfc.text.description") }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable @click="nfcEncoding = 'weburl'">
              <q-item-section avatar>
                <q-icon
                  :color="nfcEncoding === 'weburl' ? 'primary' : 'grey'"
                  :name="
                    nfcEncoding === 'weburl'
                      ? 'check_circle'
                      : 'radio_button_unchecked'
                  "
                  class="cursor-pointer"
                />
              </q-item-section>
              <q-item-section
                lines="1"
                class="cursor-pointer"
                style="word-break: break-word"
              >
                <q-item-label title>{{
                  $t("Settings.hardware_features.webnfc.weburl.title")
                }}</q-item-label>
                <q-item-label caption>
                  {{
                    $t("Settings.hardware_features.webnfc.weburl.description")
                  }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable @click="nfcEncoding = 'binary'">
              <q-item-section avatar>
                <q-icon
                  :color="nfcEncoding === 'binary' ? 'primary' : 'grey'"
                  :name="
                    nfcEncoding === 'binary'
                      ? 'check_circle'
                      : 'radio_button_unchecked'
                  "
                  class="cursor-pointer"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label title>{{
                  $t("Settings.hardware_features.webnfc.binary.title")
                }}</q-item-label>
                <q-item-label caption>
                  {{
                    $t("Settings.hardware_features.webnfc.binary.description")
                  }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-toggle
                v-model="showNfcButtonInDrawer"
                :label="
                  $t('Settings.hardware_features.webnfc.quick_access.toggle')
                "
                color="primary"
              /> </q-item
            ><q-item class="q-pt-none">
              <q-item-label caption
                >{{
                  $t(
                    "Settings.hardware_features.webnfc.quick_access.description"
                  )
                }}
              </q-item-label>
            </q-item>
          </q-list>
        </div>

        <!-- P2PK SECTION -->
        <div class="section-divider q-my-md">
          <div class="divider-line"></div>
          <div class="divider-text">
            {{ $t("Settings.sections.p2pk_features") }}
          </div>
          <div class="divider-line"></div>
        </div>

        <!-- P2PK -->
        <div class="q-py-sm q-px-xs text-left" on-left>
          <q-list padding>
            <q-item>
              <q-item-section>
                <q-item-label overline class="text-weight-bold">{{
                  $t("Settings.p2pk_features.title")
                }}</q-item-label>
                <q-item-label caption>{{
                  $t("Settings.p2pk_features.description")
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item style="display: inline-block">
              <q-btn
                class="q-ml-sm q-px-md"
                color="primary"
                size="sm"
                rounded
                outline
                @click="generateKeypair"
                >{{ $t("Settings.p2pk_features.generate_button") }}</q-btn
              >
            </q-item>
            <q-item style="display: inline-block">
              <q-btn
                class="q-ml-sm q-px-md"
                color="primary"
                size="sm"
                rounded
                outline
                @click="importNsec"
                >{{ $t("Settings.p2pk_features.import_button") }}</q-btn
              >
            </q-item>
            <q-item>
              <q-toggle
                v-model="showP2PkButtonInDrawer"
                :label="$t('Settings.p2pk_features.quick_access.toggle')"
                color="primary"
              /> </q-item
            ><q-item class="q-pt-none">
              <q-item-label caption
                >{{ $t("Settings.p2pk_features.quick_access.description") }}
              </q-item-label>
            </q-item>
          </q-list>
          <q-item v-if="p2pkKeys.length">
            <q-expansion-item
              dense
              dense-toggle
              v-if="p2pkKeys.length"
              class="text-left"
              :label="
                $t('Settings.p2pk_features.keys_expansion.label', {
                  count: p2pkKeys.length,
                })
              "
            >
              <q-item v-for="key in p2pkKeys" :key="key.privakey">
                <q-item-section
                  class="q-mx-none q-pl-none"
                  style="max-width: 1.05em"
                >
                  <q-icon
                    name="content_copy"
                    @click="copyText(key.publicKey)"
                    size="1.2em"
                    color="grey"
                    class="q-mr-xs cursor-pointer"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label
                    caption
                    clickable
                    style="word-break: break-word; font-size: 0.65rem"
                    class="q-mx-sm"
                    @click="showP2PKKeyEntry(key.publicKey)"
                    >{{ key.publicKey }}</q-item-label
                  >
                </q-item-section>
                <q-item-section side>
                  <q-badge
                    v-if="key.used"
                    :label="
                      $t('Settings.p2pk_features.keys_expansion.used_badge')
                    "
                    color="primary"
                    class="q-mr-sm"
                  />
                </q-item-section>
                <q-item-section
                  class="q-mx-none q-pl-none"
                  style="max-width: 1.05em"
                >
                  <q-icon
                    name="qr_code"
                    @click="showP2PKKeyEntry(key.publicKey)"
                    size="1em"
                    color="grey"
                    class="q-mr-xs cursor-pointer"
                  />
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-item>
        </div>

        <!-- PRIVACY SECTION -->
        <div class="section-divider q-my-md">
          <div class="divider-line"></div>
          <div class="divider-text">{{ $t("Settings.sections.privacy") }}</div>
          <div class="divider-line"></div>
        </div>

        <q-item>
          <q-item-section>
            <q-item-label overline class="text-weight-bold q-pt-sm">{{
              $t("Settings.privacy.title")
            }}</q-item-label>
            <q-item-label caption>
              {{ $t("Settings.privacy.description") }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <div>
          <!-- nostr mint backup settings -->
          <q-item>
            <q-toggle
              v-model="nostrMintBackupEnabled"
              :label="$t('Settings.experimental.nostr_mint_backup.toggle')"
              color="primary"
              @update:model-value="onNostrMintBackupToggle"
            >
            </q-toggle>
          </q-item>
          <q-item class="q-pt-none">
            <q-item-label caption>
              {{ $t("Settings.experimental.nostr_mint_backup.description") }}
            </q-item-label>
          </q-item>

          <!-- periodically check incoming invoices -->
          <q-item>
            <q-toggle
              v-model="checkIncomingInvoices"
              :label="$t('Settings.privacy.check_incoming.toggle')"
              color="primary"
            >
            </q-toggle>
          </q-item>
          <q-item class="q-pt-none">
            <q-item-label caption
              >{{ $t("Settings.privacy.check_incoming.description") }}
            </q-item-label>
          </q-item>
          <!-- check pending invoices on startup -->
          <q-item>
            <q-toggle
              v-model="checkInvoicesOnStartup"
              :label="$t('Settings.privacy.check_startup.toggle')"
              color="primary"
            >
            </q-toggle>
          </q-item>
          <q-item class="q-pt-none">
            <q-item-label caption
              >{{ $t("Settings.privacy.check_startup.description") }}
            </q-item-label>
          </q-item>
          <!-- periodically check incoming invoices -->
          <q-item>
            <q-toggle
              v-model="periodicallyCheckIncomingInvoices"
              :label="$t('Settings.privacy.check_all.toggle')"
              color="primary"
            >
            </q-toggle>
          </q-item>
          <q-item class="q-pt-none">
            <q-item-label caption
              >{{ $t("Settings.privacy.check_all.description") }}
            </q-item-label>
          </q-item>

          <!-- check outgoing token state setting -->
          <q-item>
            <q-toggle
              v-model="checkSentTokens"
              :label="$t('Settings.privacy.check_sent.toggle')"
              color="primary"
            /> </q-item
          ><q-item class="q-pt-none">
            <q-item-label caption
              >{{ $t("Settings.privacy.check_sent.description") }}
            </q-item-label>
          </q-item>
          <!-- websockets -->
          <q-item v-if="checkIncomingInvoices || checkSentTokens">
            <q-toggle
              v-if="checkIncomingInvoices || checkSentTokens"
              v-model="useWebsockets"
              :label="$t('Settings.privacy.websockets.toggle')"
              color="primary"
            >
            </q-toggle> </q-item
          ><q-item
            class="q-pt-none"
            v-if="checkIncomingInvoices || checkSentTokens"
          >
            <q-item-label caption
              >{{ $t("Settings.privacy.websockets.description") }}
            </q-item-label>
          </q-item>
          <!-- price check setting -->
          <q-item>
            <q-toggle
              v-model="getBitcoinPrice"
              :label="$t('Settings.privacy.bitcoin_price.toggle')"
              color="primary"
            /> </q-item
          ><q-item class="q-pt-none">
            <q-item-label caption
              >{{ $t("Settings.privacy.bitcoin_price.description") }}
            </q-item-label>
          </q-item>
          <!-- currency selection -->
          <q-item v-if="getBitcoinPrice">
            <q-item-section>
              <q-item-label overline class="text-weight-bold">{{
                $t("Settings.privacy.bitcoin_price.currency.title")
              }}</q-item-label>
              <q-item-label caption>{{
                $t("Settings.privacy.bitcoin_price.currency.description")
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="getBitcoinPrice">
            <q-item-section>
              <q-select
                v-model="bitcoinPriceCurrency"
                :options="currencyOptions"
                rounded
                outlined
                dense
                emit-value
                map-options
                @update:model-value="onCurrencyChange"
              />
            </q-item-section>
          </q-item>
        </div>

        <div class="section-divider q-my-md">
          <div class="divider-line"></div>
          <div class="divider-text">
            {{ $t("Settings.sections.experimental") }}
          </div>
          <div class="divider-line"></div>
        </div>
        <!-- enable receive swaps -->
        <q-item>
          <q-item-section>
            <q-item-label overline class="text-weight-bold">{{
              $t("Settings.experimental.title")
            }}</q-item-label>
            <q-item-label caption>
              {{ $t("Settings.experimental.description") }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-toggle
            v-model="enableReceiveSwaps"
            :label="$t('Settings.experimental.receive_swaps.toggle')"
            color="primary"
          >
            <q-badge
              color="primary"
              :label="$t('Settings.experimental.receive_swaps.badge')"
              class="q-mx-sm"
            ></q-badge>
          </q-toggle>
        </q-item>
        <q-item class="q-pt-none">
          <q-item-label caption
            >{{ $t("Settings.experimental.receive_swaps.description") }}
          </q-item-label>
        </q-item>
        <q-item>
          <q-toggle
            v-model="autoPasteEcashReceive"
            :label="$t('Settings.experimental.auto_paste.toggle')"
            color="primary"
          /> </q-item
        ><q-item class="q-pt-none">
          <q-item-label caption
            >{{ $t("Settings.experimental.auto_paste.description") }}
          </q-item-label>
        </q-item>

        <!-- auditor settings -->
        <q-item>
          <q-toggle
            v-model="auditorEnabled"
            :label="$t('Settings.experimental.auditor.toggle')"
            color="primary"
          >
            <q-badge
              color="primary"
              :label="$t('Settings.experimental.auditor.badge')"
              class="q-mx-sm"
            ></q-badge>
          </q-toggle>
        </q-item>
        <div v-if="auditorEnabled">
          <q-item class="q-pt-none">
            <q-item-label caption
              >{{ $t("Settings.experimental.auditor.description") }}
            </q-item-label>
          </q-item>
          <div class="row q-mx-md">
            <div class="col-12">
              <q-input
                v-model="auditorUrl"
                :label="$t('Settings.experimental.auditor.url_label')"
                color="primary"
                outlined
                dense
                rounded
                :disable="!auditorEnabled"
              >
                <template v-slot:append>
                  <q-btn
                    dense
                    flat
                    icon="content_copy"
                    @click="copyText(auditorUrl)"
                    size="sm"
                    color="grey"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-mx-md q-mt-md">
            <div class="col-12">
              <q-input
                v-model="auditorApiUrl"
                :label="$t('Settings.experimental.auditor.api_url_label')"
                color="primary"
                outlined
                dense
                rounded
                :disable="!auditorEnabled"
              >
                <template v-slot:append>
                  <q-btn
                    dense
                    flat
                    icon="content_copy"
                    @click="copyText(auditorApiUrl)"
                    size="sm"
                    color="grey"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </div>
        <!-- npcv2 settings -->
        <div class="row q-mx-md q-mt-md">
          <div class="col-12">
            <div class="row q-pt-md">
              <q-toggle
                v-model="npcV2Enabled"
                :label="$t('Settings.npub_cash.use_npubx')"
                color="primary"
              >
                <q-badge
                  color="primary"
                  :label="$t('Settings.experimental.receive_swaps.badge')"
                  class="q-mx-sm"
                ></q-badge>
              </q-toggle>
            </div>
          </div>
        </div>
        <div v-if="npcV2Enabled">
          <div class="row q-mx-md q-mt-md">
            <div class="col-12">
              <q-input outlined v-model="npcV2Address" dense rounded readonly>
                <template v-slot:append>
                  <q-icon
                    name="content_copy"
                    @click="copyText(npcV2Address)"
                    size="xs"
                    color="grey"
                    class="q-mr-sm cursor-pointer"
                  >
                    <q-tooltip>{{
                      $t("Settings.npub_cash.copy_lightning_address")
                    }}</q-tooltip>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-mx-md">
            <div class="col-12 q-pt-md">
              <q-item-label caption>{{
                $t("Settings.npub_cash.v2_mint")
              }}</q-item-label>
              <q-input
                outlined
                v-model="npcV2Mint"
                dense
                rounded
                readonly
                class="q-pt-sm"
              >
              </q-input>
              <div class="q-pt-sm">
                <ChooseMint
                  v-model="npcV2Mint"
                  :title="
                    $t('Settings.lightning_address.npc_v2.choose_mint_title')
                  "
                  :placeholder="
                    $t(
                      'Settings.lightning_address.npc_v2.choose_mint_placeholder'
                    )
                  "
                  :show-balances="false"
                  :dense="true"
                  :rounded="true"
                  :require-active-mint="false"
                />
              </div>
            </div>
            <div class="row q-pt-md">
              <q-toggle v-model="npcV2ClaimAutomatically" color="primary" />
              <q-item-section>
                <q-item-label title>{{
                  $t("Settings.lightning_address.automatic_claim.toggle")
                }}</q-item-label>
                <q-item-label caption
                  >{{
                    $t("Settings.lightning_address.automatic_claim.description")
                  }}
                </q-item-label>
              </q-item-section>
            </div>
          </div>
        </div>

        <!-- multinut settings -->
        <div class="row q-mx-md q-mt-md">
          <div class="col-12">
            <div class="row q-pt-md">
              <q-toggle
                v-model="multinutEnabled"
                :label="$t('Settings.multinut.use_multinut')"
                color="primary"
              >
                <q-badge
                  color="primary"
                  :label="$t('Settings.experimental.receive_swaps.badge')"
                  class="q-mx-sm"
                ></q-badge>
                <q-item-label caption>
                  {{ $t("Settings.experimental.multinut.description") }}
                </q-item-label>
              </q-toggle>
            </div>
          </div>
        </div>

        <div class="section-divider q-my-md">
          <div class="divider-line"></div>
          <div class="divider-text">
            {{ $t("Settings.sections.appearance") }}
          </div>
          <div class="divider-line"></div>
        </div>

        <!-- use numeric keyboard -->
        <div class="q-py-sm q-px-xs text-left" on-left>
          <q-list padding>
            <q-item>
              <q-item-section>
                <q-item-label overline class="text-weight-bold">{{
                  $t("Settings.appearance.keyboard.title")
                }}</q-item-label>
                <q-item-label caption>{{
                  $t("Settings.appearance.keyboard.description")
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-toggle
                v-model="useNumericKeyboard"
                :label="$t('Settings.appearance.keyboard.toggle')"
                color="primary"
              /> </q-item
            ><q-item class="q-pt-none">
              <q-item-label caption
                >{{ $t("Settings.appearance.keyboard.toggle_description") }}
              </q-item-label>
            </q-item>
          </q-list>
        </div>

        <!-- bip177 -->
        <div class="q-py-sm q-px-xs text-left" on-left>
          <q-list padding>
            <q-item>
              <q-item-section>
                <q-item-label overline class="text-weight-bold">{{
                  $t("Settings.appearance.bip177.title")
                }}</q-item-label>
                <q-item-label caption>{{
                  $t("Settings.appearance.bip177.description")
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-toggle
                v-model="bip177BitcoinSymbol"
                :label="$t('Settings.appearance.bip177.toggle')"
                color="primary"
              />
            </q-item>
          </q-list>
        </div>

        <!-- language picker: hidden for till i18n integration is finished -->
        <!-- LANGUAGE SECTION -->
        <!-- MINT MANAGEMENT SECTION -->
        <div class="section-divider q-my-md">
          <div class="divider-line"></div>
          <div class="divider-text">{{ $t("WalletPage.tabs.mints.label") }}</div>
          <div class="divider-line"></div>
        </div>

        <MintSettings />

        <div class="section-divider q-my-md">
          <div class="divider-line"></div>
          <div class="divider-text">{{ $t("Settings.language.title") }}</div>
          <div class="divider-line"></div>
        </div>

        <div class="q-py-sm q-px-xs text-left" on-left>
          <q-list padding>
            <q-item>
              <q-item-section>
                <q-item-label overline class="text-weight-bold">{{
                  $t("Settings.language.title")
                }}</q-item-label>
                <q-item-label caption>{{
                  $t("Settings.language.description")
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-select
                  v-model="selectedLanguage"
                  :options="languageOptions"
                  rounded
                  outlined
                  dense
                  emit-value
                  map-options
                  @update:model-value="changeLanguage"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- developer settings -->

        <q-expansion-item
          class="q-pt-lg"
          dense
          dense-toggle
          icon="code"
          :label="$t('Settings.advanced.title')"
        >
          <div>
            <q-item class="q-pt-lg">
              <q-item-section>
                <q-item-label overline>{{
                  $t("Settings.advanced.developer.title")
                }}</q-item-label>
                <q-item-label caption>{{
                  $t("Settings.advanced.developer.description")
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <div>
              <!-- check proofs spendable setting -->
              <q-item>
                <q-item-section>
                  <div class="row q-pt-md">
                    <div class="col-12" v-if="!confirmMnemonic">
                      <q-btn
                        flat
                        dense
                        @click="confirmMnemonic = !confirmMnemonic"
                        >{{
                          $t("Settings.advanced.developer.new_seed.button")
                        }}</q-btn
                      >
                      <row>
                        <q-item-label class="q-px-sm" caption
                          >{{
                            $t(
                              "Settings.advanced.developer.new_seed.description"
                            )
                          }}
                        </q-item-label>
                      </row>
                    </div>
                    <div class="col-12" v-if="confirmMnemonic">
                      <span
                        >{{
                          $t(
                            "Settings.advanced.developer.new_seed.confirm_question"
                          )
                        }}
                      </span>
                      <q-btn
                        flat
                        dense
                        class="q-ml-sm"
                        color="warning"
                        @click="confirmMnemonic = false"
                        >{{
                          $t("Settings.advanced.developer.new_seed.cancel")
                        }}</q-btn
                      >
                      <q-btn
                        flat
                        dense
                        class="q-ml-sm"
                        color="secondary"
                        @click="
                          confirmMnemonic = false;
                          generateNewMnemonic();
                        "
                        >{{
                          $t("Settings.advanced.developer.new_seed.confirm")
                        }}</q-btn
                      >
                    </div>
                  </div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <row>
                    <q-btn
                      dense
                      flat
                      outline
                      click
                      @click="checkActiveProofsSpendable"
                      >{{
                        $t("Settings.advanced.developer.remove_spent.button")
                      }}</q-btn
                    ></row
                  ><row>
                    <q-item-label class="q-px-sm" caption
                      >{{
                        $t(
                          "Settings.advanced.developer.remove_spent.description"
                        )
                      }}
                    </q-item-label>
                  </row>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <row>
                    <q-btn dense flat outline click @click="toggleTerminal">
                      {{
                        $t("Settings.advanced.developer.debug_console.button")
                      }}
                    </q-btn></row
                  ><row>
                    <q-item-label class="q-px-sm" caption
                      >{{
                        $t(
                          "Settings.advanced.developer.debug_console.description"
                        )
                      }}
                    </q-item-label>
                  </row>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <row>
                    <q-btn dense flat outline click @click="exportActiveProofs">
                      {{
                        $t("Settings.advanced.developer.export_proofs.button")
                      }}
                    </q-btn></row
                  ><row>
                    <q-item-label class="q-px-sm" caption
                      >{{
                        $t(
                          "Settings.advanced.developer.export_proofs.description"
                        )
                      }}
                    </q-item-label>
                  </row>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <row>
                    <!-- add a caption, not a button here -->
                    <q-item-label class="q-pb-sm">{{
                      $t("Settings.advanced.developer.keyset_counters.title")
                    }}</q-item-label></row
                  >
                  <row>
                    <q-item-label class="q-px-sm" caption
                      >{{
                        $t(
                          "Settings.advanced.developer.keyset_counters.description"
                        )
                      }}
                    </q-item-label>
                  </row>
                  <row class="q-pa-sm">
                    <row
                      class="q-px-sm"
                      v-for="(mintCounter, mintUrl) in keysetCountersByMint"
                      :key="mintUrl"
                    >
                      <q-item-label class="q-px-xs" caption>
                        {{ shortUrl(mintUrl) }}
                      </q-item-label>
                      <q-btn
                        dense
                        v-for="(counter, id) in mintCounter"
                        :key="id"
                        flat
                        click
                        @click="increaseKeysetCounter(counter.id, 1)"
                        >{{ counter.id }} -
                        {{
                          $t(
                            "Settings.advanced.developer.keyset_counters.counter",
                            { count: counter.counter }
                          )
                        }}
                      </q-btn>
                    </row>
                  </row>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <row>
                    <q-btn
                      dense
                      flat
                      outline
                      click
                      @click="unsetAllReservedProofs"
                    >
                      {{
                        $t("Settings.advanced.developer.unset_reserved.button")
                      }}
                    </q-btn></row
                  ><row>
                    <q-item-label class="q-px-sm" caption
                      >{{
                        $t(
                          "Settings.advanced.developer.unset_reserved.description"
                        )
                      }}
                    </q-item-label>
                  </row>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <row>
                    <q-btn dense flat outline click @click="showOnboarding">
                      {{
                        $t("Settings.advanced.developer.show_onboarding.button")
                      }}
                    </q-btn></row
                  ><row>
                    <q-item-label class="q-px-sm" caption
                      >{{
                        $t(
                          "Settings.advanced.developer.show_onboarding.description"
                        )
                      }}
                    </q-item-label>
                  </row>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <row>
                    <q-btn
                      v-if="!confirmNuke"
                      dense
                      flat
                      outline
                      click
                      @click="confirmNuke = !confirmNuke"
                    >
                      {{
                        $t("Settings.advanced.developer.reset_wallet.button")
                      }}
                    </q-btn></row
                  ><row v-if="!confirmNuke">
                    <q-item-label class="q-px-sm" caption
                      >{{
                        $t(
                          "Settings.advanced.developer.reset_wallet.description"
                        )
                      }}
                    </q-item-label>
                  </row>
                  <row v-if="confirmNuke">
                    <span>{{
                      $t(
                        "Settings.advanced.developer.reset_wallet.confirm_question"
                      )
                    }}</span>
                    <q-btn
                      flat
                      dense
                      class="q-ml-sm"
                      color="primary"
                      @click="confirmNuke = false"
                      >{{
                        $t("Settings.advanced.developer.reset_wallet.cancel")
                      }}</q-btn
                    >
                    <q-btn
                      flat
                      dense
                      class="q-ml-sm"
                      color="warning"
                      @click="
                        confirmNuke = false;
                        nukeWallet();
                      "
                      >{{
                        $t("Settings.advanced.developer.reset_wallet.confirm")
                      }}</q-btn
                    >
                  </row>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <row>
                    <q-btn
                      v-if="!confirmImport"
                      dense
                      flat
                      outline
                      click
                      @click="confirmImport = !confirmImport"
                    >
                      {{
                        $t("Settings.advanced.developer.import_wallet.button")
                      }}
                    </q-btn>
                  </row>
                  <row v-if="!confirmImport">
                    <q-item-label class="q-px-sm" caption
                      >{{
                        $t(
                          "Settings.advanced.developer.import_wallet.description"
                        )
                      }}
                    </q-item-label>
                  </row>
                  <row v-if="confirmImport">
                    <span>{{
                      $t(
                        "Settings.advanced.developer.import_wallet.confirm_question"
                      )
                    }}</span>
                    <q-btn
                      flat
                      dense
                      class="q-ml-sm"
                      color="primary"
                      @click="confirmImport = false"
                      >{{
                        $t("Settings.advanced.developer.import_wallet.cancel")
                      }}</q-btn
                    >
                    <q-btn
                      flat
                      dense
                      class="q-ml-sm"
                      color="warning"
                      @click="
                        confirmImport = false;
                        browseBackupFile();
                      "
                      >{{
                        $t("Settings.advanced.developer.import_wallet.confirm")
                      }}</q-btn
                    >
                  </row>
                  <input
                    type="file"
                    ref="fileUpload"
                    accept=".json"
                    style="display: none"
                    @change="onChangeFileUpload"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <row>
                    <q-btn dense flat outline click @click="exportWalletState">
                      {{
                        $t("Settings.advanced.developer.export_wallet.button")
                      }}
                    </q-btn></row
                  ><row>
                    <q-item-label class="q-px-sm" caption
                      >{{
                        $t(
                          "Settings.advanced.developer.export_wallet.description"
                        )
                      }}
                    </q-item-label>
                  </row>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-expansion-item>
      </q-list>
    </div>
  </div>

  <!-- P2PK DIALOG -->
  <P2PKDialog v-model="showP2PKDialog" />

  <!-- NWC DIALOG -->
  <NWCDialog v-model="showNWCDialog" />

  <!-- Password Dialog for Recovery Phrase -->
  <q-dialog v-model="showPasswordDialog">
    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">Enter Password</div>
        <div class="text-caption q-mt-sm">
          Enter your password to view the recovery phrase
        </div>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="passwordInput"
          type="password"
          label="Password"
          outlined
          dense
          @keyup.enter="verifyPassword"
          :error="passwordError !== ''"
          :error-message="passwordError"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn flat label="Cancel" @click="cancelPassword" />
        <q-btn flat label="Submit" color="primary" @click="verifyPassword" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import P2PKDialog from "./P2PKDialog.vue";
import NWCDialog from "./NWCDialog.vue";
import ChooseMint from "./ChooseMint.vue";
import MintSettings from "./MintSettings.vue";

import { getShortUrl } from "src/js/wallet-helpers";
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMintsStore, MintClass } from "src/stores/mints";
import { useWalletStore } from "src/stores/wallet";
import { map } from "underscore";
import { useSettingsStore } from "src/stores/settings";
import { useNostrStore } from "src/stores/nostr";
import { useNPCStore } from "src/stores/npubcash";
import { useP2PKStore } from "src/stores/p2pk";
import { useNWCStore } from "src/stores/nwc";
import { useUiStore } from "../stores/ui";
import { useWorkersStore } from "src/stores/workers";
import { useProofsStore } from "src/stores/proofs";
import { usePRStore } from "../stores/payment-request";
import { useRestoreStore } from "src/stores/restore";
import { useDexieStore } from "../stores/dexie";
import { useReceiveTokensStore } from "../stores/receiveTokensStore";
import { useWelcomeStore } from "src/stores/welcome";
import { useStorageStore } from "src/stores/storage";
import { useNPCV2Store } from "src/stores/npcv2";
import { useNostrMintBackupStore } from "src/stores/nostrMintBackup";
import { usePriceStore } from "src/stores/price";
import { useI18n } from "vue-i18n";
import { useNostrUserStore } from "src/stores/nostrUser";
import { useEducationStore } from "src/stores/education";

export default defineComponent({
  name: "SettingsView",
  mixins: [windowMixin],
  components: {
    P2PKDialog,
    NWCDialog,
    ChooseMint,
    MintSettings,
  },
  props: {
    authenticated: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      totalRewardPool: 0,
      selectedLanguage: navigator.language || "en-US",
      languageOptions: [
        { label: "English", value: "en-US" },
        { label: "Español", value: "es-ES" },
        { label: "Italiano", value: "it-IT" },
        { label: "Deutsch", value: "de-DE" },
        { label: "Français", value: "fr-FR" },
        { label: "Svenska", value: "sv-SE" },
        { label: "Ελληνικά", value: "el-GR" },
        { label: "Türkçe", value: "tr-TR" },
        { label: "ไทย", value: "th-TH" },
        { label: "العربية", value: "ar-SA" },
        { label: "中文", value: "zh-CN" },
        { label: "日本語", value: "ja-JP" },
      ],
      currencyOptions: [
        { label: "US Dollar (USD)", value: "USD" },
        { label: "Euro (EUR)", value: "EUR" },

        { label: "Australian Dollar (AUD)", value: "AUD" },
        { label: "Brazilian Real (BRL)", value: "BRL" },
        { label: "Canadian Dollar (CAD)", value: "CAD" },
        { label: "Swiss Franc (CHF)", value: "CHF" },
        { label: "Chinese Yuan (CNY)", value: "CNY" },
        { label: "Czech Koruna (CZK)", value: "CZK" },
        { label: "Danish Krone (DKK)", value: "DKK" },
        { label: "British Pound (GBP)", value: "GBP" },
        { label: "Hong Kong Dollar (HKD)", value: "HKD" },
        { label: "Hungarian Forint (HUF)", value: "HUF" },
        { label: "Israeli Shekel (ILS)", value: "ILS" },
        { label: "Indian Rupee (INR)", value: "INR" },
        { label: "Japanese Yen (JPY)", value: "JPY" },
        { label: "South Korean Won (KRW)", value: "KRW" },
        { label: "Mexican Peso (MXN)", value: "MXN" },
        { label: "New Zealand Dollar (NZD)", value: "NZD" },
        { label: "Norwegian Krone (NOK)", value: "NOK" },
        { label: "Polish Zloty (PLN)", value: "PLN" },
        { label: "Russian Ruble (RUB)", value: "RUB" },
        { label: "Swedish Krona (SEK)", value: "SEK" },
        { label: "Singapore Dollar (SGD)", value: "SGD" },
        { label: "Thai Baht (THB)", value: "THB" },
        { label: "Turkish Lira (TRY)", value: "TRY" },
        { label: "South African Rand (ZAR)", value: "ZAR" },
      ],
      discoveringMints: false,
      hideMnemonic: true,
      confirmMnemonic: false,
      confirmNuke: false,
      confirmImport: false,
      nip46Token: "",
      nip07SignerAvailable: false,
      newRelay: "",
      mnemonicAccessGranted: false,
      showPasswordDialog: false,
      passwordInput: "",
      passwordError: "",
    };
  },
  computed: {
    ...mapWritableState(useSettingsStore, [
      "getBitcoinPrice",
      "bitcoinPriceCurrency",
      "checkSentTokens",
      "useWebsockets",
      "nfcEncoding",
      "useNumericKeyboard",
      "periodicallyCheckIncomingInvoices",
      "checkIncomingInvoices",
      "checkInvoicesOnStartup",
      "enableReceiveSwaps",
      "showNfcButtonInDrawer",
      "autoPasteEcashReceive",
      "auditorEnabled",
      "auditorUrl",
      "auditorApiUrl",
      "bip177BitcoinSymbol",
      "multinutEnabled",
      "nostrMintBackupEnabled",
    ]),
    ...mapState(useP2PKStore, ["p2pkKeys"]),
    ...mapWritableState(useP2PKStore, [
      "showP2PKDialog",
      "showP2PkButtonInDrawer",
    ]),
    ...mapWritableState(useNWCStore, [
      "nwcEnabled",
      "connections",
      "showNWCDialog",
      "showNWCData",
    ]),
    ...mapWritableState(useNostrStore, ["relays"]),
    ...mapState(useMintsStore, ["activeMintUrl", "mints", "activeProofs"]),
    // Admin Dashboard computed properties
    totalWalletBalance() {
      try {
        const educationStore = useEducationStore();
        return educationStore?.totalWalletBalance || 0;
      } catch {
        return 0;
      }
    },
    totalLockedSats() {
      try {
        const educationStore = useEducationStore();
        return educationStore?.totalLockedSats || 0;
      } catch {
        return 0;
      }
    },
    totalUnlockedSats() {
      try {
        const educationStore = useEducationStore();
        return educationStore?.totalUnlockedSats || 0;
      } catch {
        return 0;
      }
    },
    rewardPerLesson() {
      try {
        const educationStore = useEducationStore();
        return educationStore?.rewardPerLesson || 0;
      } catch {
        return 0;
      }
    },
    historyProgress() {
      try {
        const educationStore = useEducationStore();
        if (!educationStore) {
          return { total: 0, completed: 0, percentage: 0 };
        }
        const lessons = educationStore.getLessonsBySubject("history");
        const completed = lessons.filter((l) => l.completed).length;
        return {
          total: lessons.length,
          completed,
          percentage: lessons.length > 0 ? completed / lessons.length : 0,
        };
      } catch {
        return { total: 0, completed: 0, percentage: 0 };
      }
    },
    selfCustodyProgress() {
      try {
        const educationStore = useEducationStore();
        if (!educationStore) {
          return { total: 0, completed: 0, percentage: 0 };
        }
        const lessons = educationStore.getLessonsBySubject("self-custody");
        const completed = lessons.filter((l) => l.completed).length;
        return {
          total: lessons.length,
          completed,
          percentage: lessons.length > 0 ? completed / lessons.length : 0,
        };
      } catch {
        return { total: 0, completed: 0, percentage: 0 };
      }
    },
    protocolsProgress() {
      try {
        const educationStore = useEducationStore();
        if (!educationStore) {
          return { total: 0, completed: 0, percentage: 0 };
        }
        const lessons = educationStore.getLessonsBySubject("protocols");
        const completed = lessons.filter((l) => l.completed).length;
        return {
          total: lessons.length,
          completed,
          percentage: lessons.length > 0 ? completed / lessons.length : 0,
        };
      } catch {
        return { total: 0, completed: 0, percentage: 0 };
      }
    },
    economicsProgress() {
      try {
        const educationStore = useEducationStore();
        if (!educationStore) {
          return { total: 0, completed: 0, percentage: 0 };
        }
        const lessons = educationStore.getLessonsBySubject("economics");
        const completed = lessons.filter((l) => l.completed).length;
        return {
          total: lessons.length,
          completed,
          percentage: lessons.length > 0 ? completed / lessons.length : 0,
        };
      } catch {
        return { total: 0, completed: 0, percentage: 0 };
      }
    },
    ...mapState(useNPCStore, ["npcLoading"]),
    ...mapState(useNostrStore, [
      "pubkey",
      "signerType",
      "seedSignerPrivateKeyNsec",
    ]),
    ...mapState(useNostrUserStore, [
      "wotCount",
      "wotLoading",
      "crawlProcessed",
      "crawlTotal",
      "hasCrawlCheckpoint",
    ]),
    ...mapState(useWalletStore, ["mnemonic"]),
    ...mapState(useUiStore, ["ndefSupported"]),
    ...mapWritableState(useNPCV2Store, [
      "npcV2Loading",
      "npcV2Enabled",
      "npcV2Address",
      "npcV2Mint",
      "npcV2ClaimAutomatically",
    ]),
    ...mapWritableState(useNPCStore, [
      "npcAddress",
      "npcEnabled",
      "automaticClaim",
    ]),
    ...mapWritableState(useWalletStore, ["keysetCounters"]),
    ...mapWritableState(useMintsStore, [
      "addMintData",
      "showAddMintDialog",
      "showRemoveMintDialog",
    ]),
    ...mapWritableState(usePRStore, [
      "enablePaymentRequest",
      "receivePaymentRequestsAutomatically",
    ]),

    keysetCountersByMint() {
      const mints = this.mints;
      const keysetCountersByMint = {}; // {mintUrl: [keysetCounter: {id: string, count: number}, ...]}
      for (let mint of mints) {
        const mintIds = mint.keysets.map((keyset) => keyset.id);
        const keysetCounterThisMint = this.keysetCounters.filter((entry) =>
          mintIds.includes(entry.id)
        );
        keysetCountersByMint[mint.url] = keysetCounterThisMint;
      }
      return keysetCountersByMint;
    },
    hiddenMnemonic() {
      // Always hide unless password is verified AND visibility is toggled on
      if (!this.mnemonicAccessGranted || this.hideMnemonic) {
        if (this.mnemonic) {
          return this.mnemonic
            .split(" ")
            .map((w) => "*".repeat(6))
            .join(" ");
        }
        return "";
      } else {
        return this.mnemonic || "";
      }
    },
    enableNwc: {
      get() {
        return this.nwcEnabled;
      },
      set(value) {
        this.nwcEnabled = value;
      },
    },
  },
  watch: {
    authenticated: {
      immediate: false,
      handler(newVal) {
        if (newVal) {
          this.mnemonicAccessGranted = true;
          this.hideMnemonic = true; // Still hide by default, user can toggle
          // Initialize reward pool when authenticated
          try {
            const educationStore = useEducationStore();
            if (educationStore && typeof educationStore.totalRewardPool === 'number') {
              this.totalRewardPool = educationStore.totalRewardPool;
            } else {
              this.totalRewardPool = 0;
            }
          } catch (error) {
            console.warn("Could not initialize reward pool:", error);
            this.totalRewardPool = 0;
          }
        }
      },
    },
    pubkey: {
      immediate: true,
      handler(newPk) {
        const nostrUser = useNostrUserStore();
        if (newPk) {
          nostrUser.setPubkey(newPk);
          nostrUser.updateUserProfile(true);
        }
      },
    },
    enableNwc: function () {
      if (this.enableNwc) {
        this.listenToNWCCommands();
      } else {
        this.unsubscribeNWC();
      }
    },
    npcEnabled: async function () {
      if (this.npcEnabled) {
        await this.initSigner();
        await this.generateNPCConnection();
      } else {
        this.npcAddress = "";
      }
    },
    npcV2Enabled: async function () {
      if (this.npcV2Enabled) {
        await this.initSigner();
        await this.generateNPCV2Connection();
      } else {
        this.npcV2Address = "";
      }
    },
    npcV2Mint: async function (newMintUrl, oldMintUrl) {
      if (this.npcV2Enabled && newMintUrl && newMintUrl !== oldMintUrl) {
        await this.changeMintUrl(newMintUrl);
      }
    },
  },
  methods: {
    ...mapActions(useNostrStore, [
      "init",
      "initNip07Signer",
      "initNip46Signer",
      "initPrivateKeySigner",
      "initWalletSeedPrivateKeySigner",
      "checkNip07Signer",
      "resetPrivateKeySigner",
      "resetNip46Signer",
      "initSigner",
    ]),
    ...mapActions(useNWCStore, [
      "generateNWCConnection",
      "listenToNWCCommands",
      "unsubscribeNWC",
      "getConnectionString",
    ]),
    ...mapActions(useP2PKStore, [
      "importNsec",
      "generateKeypair",
      "showKeyDetails",
    ]),
    ...mapActions(useMintsStore, [
      "addMint",
      "removeMint",
      "activateMintUrl",
      "updateMint",
    ]),
    ...mapActions(useWalletStore, [
      "newMnemonic",
      "decodeRequest",
      "checkProofsSpendable",
      "increaseKeysetCounter",
    ]),
    ...mapActions(useProofsStore, ["serializeProofs"]),
    ...mapActions(useNPCStore, ["generateNPCConnection"]),
    ...mapActions(useNPCV2Store, ["generateNPCV2Connection", "changeMintUrl"]),
    ...mapActions(useRestoreStore, ["restoreMint"]),
    ...mapActions(useDexieStore, ["deleteAllTables"]),
    ...mapActions(useStorageStore, ["restoreFromBackup", "exportWalletState"]),
    ...mapActions(usePriceStore, [
      "fetchBitcoinPrice",
      "updateBitcoinPriceForCurrentCurrency",
    ]),
    ...mapActions(useNostrUserStore, [
      "setPubkey",
      "updateUserProfile",
      "crawlWebOfTrust",
      "cancelCrawl",
      "resetWebOfTrust",
    ]),
    generateNewMnemonic: async function () {
      this.newMnemonic();
      await this.initSigner();
      await this.generateNPCConnection();
    },
    shortUrl: function (url) {
      return getShortUrl(url);
    },
    requestMnemonicAccess: function () {
      const educationStore = useEducationStore();
      
      // Check if password is set
      if (!educationStore.parentPasswordHash) {
        this.notifyError("Admin password not set. Please set a password in Admin Dashboard first.");
        return;
      }
      
      // Show password dialog
      this.showPasswordDialog = true;
      this.passwordInput = "";
      this.passwordError = "";
    },
    
    verifyPassword: async function () {
      const educationStore = useEducationStore();
      
      if (!this.passwordInput) {
        this.passwordError = "Password is required";
        return;
      }
      
      const isValid = await educationStore.verifyPassword(this.passwordInput);
      
      if (isValid) {
        this.mnemonicAccessGranted = true;
        this.hideMnemonic = false;
        this.showPasswordDialog = false;
        this.passwordInput = "";
        this.passwordError = "";
      } else {
        this.passwordError = "Incorrect password";
        this.passwordInput = "";
      }
    },
    
    cancelPassword: function () {
      this.showPasswordDialog = false;
      this.passwordInput = "";
      this.passwordError = "";
    },
    
    toggleMnemonicVisibility: function () {
      // Only allow toggling if access was granted
      if (this.mnemonicAccessGranted) {
        this.hideMnemonic = !this.hideMnemonic;
      } else {
        this.requestMnemonicAccess();
      }
    },
    toggleTerminal: function () {
      useUiStore().toggleDebugConsole();
    },
    unsetAllReservedProofs: async function () {
      // mark all this.proofs as reserved=false
      const proofsStore = useProofsStore();
      await proofsStore.setReserved(await proofsStore.getProofs(), false);
      this.notifySuccess("All reserved proofs unset");
    },
    checkActiveProofsSpendable: async function () {
      // iterate over this.activeProofs in batches of 50 and check if they are spendable
      let wallet = useWalletStore().mintWallet(
        this.activeMintUrl,
        this.activeUnit
      );
      let proofs = this.activeProofs.flat();
      console.log("Checking proofs", proofs);
      let allSpentProofs = [];
      let batch_size = 50;
      for (let i = 0; i < proofs.length; i += batch_size) {
        console.log("Checking proofs", i, i + batch_size);
        let batch = proofs.slice(i, i + batch_size);
        let spent = await this.checkProofsSpendable(batch, wallet, true);
        allSpentProofs.push(spent);
      }
      let spentProofs = allSpentProofs.flat();
      if (spentProofs.length > 0) {
        console.log("Spent proofs", spentProofs);
        this.notifySuccess("Removed " + spentProofs.length + " spent proofs");
      } else {
        this.notifySuccess("No spent proofs found");
      }
    },
    showP2PKKeyEntry: async function (pubKey) {
      this.showKeyDetails(pubKey);
      this.showP2PKDialog = true;
    },
    showNWCEntry: async function (connection) {
      this.showNWCData = {
        connection,
        connectionString: this.getConnectionString(connection),
      };
      this.showNWCDialog = true;
    },
    exportActiveProofs: async function () {
      // export active proofs
      const token = await this.serializeProofs(this.activeProofs);
      this.copyText(token);
    },
    handleSeedClick: async function () {
      await this.initWalletSeedPrivateKeySigner();
      await this.generateNPCConnection();
      await this.generateNPCV2Connection();
      const nostr = useNostrStore();
      const nostrUser = useNostrUserStore();
      nostrUser.setPubkey(nostr.pubkey);
      await nostrUser.updateUserProfile(true);
    },
    handleExtensionClick: async function () {
      await this.initNip07Signer();
      await this.generateNPCConnection();
      await this.generateNPCV2Connection();
      const nostr = useNostrStore();
      const nostrUser = useNostrUserStore();
      nostrUser.setPubkey(nostr.pubkey);
      await nostrUser.updateUserProfile(true);
    },
    handleBunkerClick: async function () {
      await this.initNip46Signer();
      await this.generateNPCConnection();
      await this.generateNPCV2Connection();
      const nostr = useNostrStore();
      const nostrUser = useNostrUserStore();
      nostrUser.setPubkey(nostr.pubkey);
      await nostrUser.updateUserProfile(true);
    },
    handleNsecClick: async function () {
      await this.initPrivateKeySigner();
      await this.generateNPCConnection();
      await this.generateNPCV2Connection();
      const nostr = useNostrStore();
      const nostrUser = useNostrUserStore();
      nostrUser.setPubkey(nostr.pubkey);
      await nostrUser.updateUserProfile(true);
    },
    handleResetPrivateKeySigner: async function () {
      await this.resetPrivateKeySigner();
      await this.generateNPCConnection();
      await this.generateNPCV2Connection();
    },
    handleResetNip46Signer: async function () {
      await this.resetNip46Signer();
      await this.generateNPCConnection();
      await this.generateNPCV2Connection();
    },
    showOnboarding: function () {
      const welcomeStore = useWelcomeStore();
      welcomeStore.resetWelcome();
      this.$router.push("/welcome");
    },
    nukeWallet: async function () {
      // create a backup just in case
      await this.exportWalletState();
      // clear dexie tables
      this.deleteAllTables();
      // clear nostr user databases
      useNostrUserStore().clearAllDatabases();
      // clear mint reviews database
      try {
        const { useMintRecommendationsStore } = await import(
          "src/stores/mintRecommendations"
        );
        await useMintRecommendationsStore().clearAllDatabases();
      } catch {}
      localStorage.clear();
      window.location.href = "/";
    },
    browseBackupFile: function () {
      this.$refs.fileUpload.click();
    },
    onChangeFileUpload: function () {
      const file = this.$refs.fileUpload.files[0];
      if (file) {
        this.readBackupFile(file);
      }
    },
    readBackupFile: function (file) {
      const reader = new FileReader();
      reader.onload = (f) => {
        try {
          const content = f.target.result;
          const backup = JSON.parse(content);
          this.restoreFromBackup(backup);
        } catch (error) {
          console.error("Error reading backup file:", error);
          this.notifyError("Invalid backup file format");
        }
      };
      reader.onerror = () => {
        this.notifyError("Error reading file");
      };
      reader.readAsText(file);
    },
    addRelay: function () {
      if (this.newRelay) {
        this.newRelay = this.newRelay.trim();
        // if relay is already in relays, don't add it, send notification
        if (this.relays.includes(this.newRelay)) {
          this.notifyWarning("Relay already added");
        } else {
          this.relays.push(this.newRelay);
          this.newRelay = "";
        }
      }
    },
    removeRelay: function (relay) {
      this.relays = this.relays.filter((r) => r !== relay);
    },
    onNostrMintBackupToggle: async function (enabled) {
      const nostrMintBackupStore = useNostrMintBackupStore();

      if (enabled) {
        try {
          await nostrMintBackupStore.enableBackup();
          this.notifySuccess(
            this.$t(
              "Settings.experimental.nostr_mint_backup.notifications.enabled"
            )
          );
        } catch (error) {
          console.error("Failed to enable Nostr mint backup:", error);
          this.notifyError(
            this.$t(
              "Settings.experimental.nostr_mint_backup.notifications.failed"
            )
          );
          // Revert the toggle
          this.nostrMintBackupEnabled = false;
        }
      } else {
        nostrMintBackupStore.disableBackup();
        this.notifySuccess(
          this.$t(
            "Settings.experimental.nostr_mint_backup.notifications.disabled"
          )
        );
      }
    },
    changeLanguage(locale) {
      // Set the i18n locale
      this.$i18n.locale = locale;

      // Store the selected language in localStorage
      localStorage.setItem("cashu.language", locale);

      // // Reload the page to apply the language change
      // setTimeout(() => {
      //   window.location.reload();
      // }, 300);
    },
    // Admin Dashboard methods
    updateTotalRewardPool(amount) {
      const educationStore = useEducationStore();
      if (!educationStore) return;
      if (amount !== null && amount >= 0 && amount <= this.totalWalletBalance) {
        educationStore.setTotalRewardPool(amount);
        this.totalRewardPool = amount;
      }
    },
    getRewardForLesson(lessonId) {
      const educationStore = useEducationStore();
      if (!educationStore) return 0;
      return educationStore.getRewardForLesson(lessonId);
    },
    getExampleReward(difficulty, lessonNum) {
      const educationStore = useEducationStore();
      if (!educationStore) return 0;
      const allLessons = educationStore.lessons.filter(lesson => 
        ["history", "self-custody", "protocols", "economics"].includes(lesson.subject)
      );
      const exampleLesson = allLessons.find((l) => {
        const match = l.id.match(/-(\d+)$/);
        const num = match ? parseInt(match[1], 10) : 0;
        return l.difficulty === difficulty && Math.abs(num - lessonNum) <= 2;
      });
      if (exampleLesson) {
        return this.getRewardForLesson(exampleLesson.id);
      }
      // Fallback calculation
      const difficultyWeight = difficulty === "beginner" ? 1 : difficulty === "intermediate" ? 2 : 3;
      const weight = (lessonNum * 1.5) + (difficultyWeight * 2);
      return Math.floor((weight / 100) * this.totalRewardPool * 0.1);
    },
    onCurrencyChange: async function (currency) {
      // Fetch fresh rates if they're stale, since we get all currencies at once
      const priceStore = usePriceStore();
      if (
        Date.now() - priceStore.bitcoinPriceLastUpdated >
        priceStore.bitcoinPriceMinRefreshInterval
      ) {
        await this.fetchBitcoinPrice();
      } else {
        // Update the main bitcoinPrice to reflect the new currency selection
        this.updateBitcoinPriceForCurrentCurrency();
      }
      },
  },
});
</script>
<style>
/* Section Divider */
.section-divider {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: #48484a;
}

.divider-text {
  padding: 0 10px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}
</style>
