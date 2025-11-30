// Cashu Arcade - Wallet Implementation
// Based on cashu.me patterns with proper mint verification

import { Wallet, Mint, getEncodedToken } from '@cashu/cashu-ts';
import { decode } from 'cbor-web';
import {
  generateMnemonic,
  mnemonicToSeedHex,
  normalizeMnemonic,
  validateMnemonic,
} from './mnemonic';

// Wallet state
let wallet = null;
let mint = null;

// Storage keys
const STORAGE_KEYS = {
  WALLET_SEED: 'cashu_wallet_seed',
  WALLET_MINT: 'cashu_wallet_mint',
  WALLET_MNEMONIC: 'cashu_wallet_mnemonic',
  RECEIVED_TOKENS: 'cashu_received_tokens',
};

const TRANSACTION_STORAGE_KEY = 'cashu_transactions';

// Transaction helpers
const readTransactions = () => {
  try {
    const raw = localStorage.getItem(TRANSACTION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

const writeTransactions = (transactions) => {
  try {
    localStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.warn('Failed to persist transactions:', error);
  }
};

const recordTransaction = (type, payload = {}) => {
  const transaction = {
    id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type,
    amount: payload.amount || 0,
    mint: payload.mint || null,
    token: payload.token || null,
    note: payload.note || null,
    timestamp: new Date().toISOString(),
  };

  const transactions = readTransactions();
  transactions.unshift(transaction);
  if (transactions.length > 100) {
    transactions.pop();
  }
  writeTransactions(transactions);
  return transaction;
};

export const getTransactions = () => readTransactions();

// Create a new wallet
export const createWallet = async (mintUrl) => {
  try {
    const mnemonic = generateMnemonic();
    const normalizedMnemonic = normalizeMnemonic(mnemonic);
    const seed = mnemonicToSeedHex(normalizedMnemonic);

    mint = new Mint(mintUrl);
    wallet = new Wallet(mint, { seed });
    
    // Initialize the wallet by loading mint info (required for KeyChain initialization)
    try {
      if (wallet.loadMint && typeof wallet.loadMint === 'function') {
        await wallet.loadMint();
        console.log('Mint info loaded for new wallet');
      }
    } catch (e) {
      console.warn('Could not load mint info:', e.message);
    }
    
    // Ensure wallet.proofs is initialized as an array
    if (!wallet.proofs || !Array.isArray(wallet.proofs)) {
      wallet.proofs = [];
    }

    localStorage.setItem(STORAGE_KEYS.WALLET_SEED, seed);
    localStorage.setItem(STORAGE_KEYS.WALLET_MINT, mintUrl);
    localStorage.setItem(STORAGE_KEYS.WALLET_MNEMONIC, normalizedMnemonic);

    console.log('Wallet created successfully');
    return {
      success: true,
      mnemonic: normalizedMnemonic,
    };
  } catch (error) {
    console.error('Failed to create wallet:', error);
    throw error;
  }
};

// Import wallet from mnemonic
export const importWalletFromMnemonic = async (mnemonic, mintUrl) => {
  try {
    const normalizedMnemonic = normalizeMnemonic(mnemonic);
    if (!validateMnemonic(normalizedMnemonic)) {
      throw new Error('Invalid recovery phrase. Please enter 12 valid words.');
    }

    const seed = mnemonicToSeedHex(normalizedMnemonic);

    mint = new Mint(mintUrl);
    wallet = new Wallet(mint, { seed });
    
    // Initialize the wallet by loading mint info (required for KeyChain initialization)
    try {
      if (wallet.loadMint && typeof wallet.loadMint === 'function') {
        await wallet.loadMint();
        console.log('Mint info loaded for imported wallet');
      }
    } catch (e) {
      console.warn('Could not load mint info:', e.message);
    }
    
    // Ensure wallet.proofs is initialized as an array
    if (!wallet.proofs || !Array.isArray(wallet.proofs)) {
      wallet.proofs = [];
    }

    localStorage.setItem(STORAGE_KEYS.WALLET_SEED, seed);
    localStorage.setItem(STORAGE_KEYS.WALLET_MINT, mintUrl);
    localStorage.setItem(STORAGE_KEYS.WALLET_MNEMONIC, normalizedMnemonic);

    console.log('Wallet imported successfully');
    return { success: true };
  } catch (error) {
    console.error('Failed to import wallet:', error);
    throw error;
  }
};

// Initialize wallet from storage
export const initWallet = async (mintUrl) => {
  try {
    let storedSeed = localStorage.getItem(STORAGE_KEYS.WALLET_SEED);
    const storedMnemonic = localStorage.getItem(STORAGE_KEYS.WALLET_MNEMONIC);
    const storedMint = localStorage.getItem(STORAGE_KEYS.WALLET_MINT);

    if (!storedSeed && storedMnemonic) {
      storedSeed = mnemonicToSeedHex(storedMnemonic);
      localStorage.setItem(STORAGE_KEYS.WALLET_SEED, storedSeed);
    }

    if (!storedSeed) {
      throw new Error('No wallet found. Please create or import a wallet first.');
    }

    const finalMintUrl = mintUrl || storedMint;
    if (!finalMintUrl) {
      throw new Error('Mint URL not found');
    }

    mint = new Mint(finalMintUrl);
    wallet = new Wallet(mint, { seed: storedSeed });
    
    // Initialize the wallet by loading mint info (required for KeyChain initialization)
    try {
      if (wallet.loadMint && typeof wallet.loadMint === 'function') {
        await wallet.loadMint();
        console.log('Mint info loaded, wallet initialized');
      }
    } catch (e) {
      console.warn('Could not load mint info (wallet may still work):', e.message);
    }
    
    // Check if Wallet has internal storage methods
    // The library might automatically load proofs, or have a loadProofs method
    let walletProofs = [];
    try {
      // Try different ways to access proofs from the wallet
      if (wallet.proofs && Array.isArray(wallet.proofs)) {
        walletProofs = wallet.proofs;
        console.log(`Wallet has ${walletProofs.length} proofs in wallet.proofs`);
      } else if (wallet.getProofs && typeof wallet.getProofs === 'function') {
        walletProofs = await wallet.getProofs();
        console.log(`Wallet.getProofs() returned ${walletProofs.length} proofs`);
      } else if (wallet.loadProofs && typeof wallet.loadProofs === 'function') {
        await wallet.loadProofs();
        walletProofs = wallet.proofs || [];
        console.log(`Wallet.loadProofs() loaded ${walletProofs.length} proofs`);
      }
      
      // Check if wallet has a storage property
      if (wallet.storage) {
        console.log('Wallet has storage property:', Object.keys(wallet.storage || {}));
      }
    } catch (e) {
      console.warn('Could not access wallet proofs:', e.message);
    }
    
    // Ensure wallet.proofs is initialized as an array
    if (!wallet.proofs || !Array.isArray(wallet.proofs)) {
      wallet.proofs = walletProofs.length > 0 ? walletProofs : [];
    } else if (walletProofs.length > 0 && wallet.proofs.length === 0) {
      // If wallet.proofs is empty but we found proofs, use them
      wallet.proofs = walletProofs;
    }

    // Load proofs from storage if available
    // Check all localStorage keys for potential proof storage
    // Skip keys we know are not JSON (mnemonic, seed, mint URL)
    const skipKeys = new Set([
      STORAGE_KEYS.WALLET_MNEMONIC,
      STORAGE_KEYS.WALLET_SEED,
      STORAGE_KEYS.WALLET_MINT,
      STORAGE_KEYS.RECEIVED_TOKENS,
      TRANSACTION_STORAGE_KEY,
    ]);
    
    const allKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && !skipKeys.has(key) && (key.includes('proof') || key.includes('cashu') || key.includes('wallet'))) {
        allKeys.push(key);
      }
    }
    
    console.log('Checking localStorage keys for proofs:', allKeys);
    
    // Debug: List ALL localStorage keys to see what cashu.me might be using
    console.log('All localStorage keys:', Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i)));
    
    // Debug: Check multiple possible cashu.me storage keys
    const possibleCashuKeys = [
      'cashu_proofs',
      'cashu-wallet-proofs',
      'wallet-proofs',
      `proofs-${finalMintUrl}`,
      `proofs-${finalMintUrl.replace(/[^a-zA-Z0-9]/g, '_')}`,
    ];
    
    for (const key of possibleCashuKeys) {
      const raw = localStorage.getItem(key);
      if (raw) {
        console.log(`Found key: ${key}, length: ${raw.length}, starts with: ${raw.substring(0, 50)}`);
        try {
          const parsed = JSON.parse(raw);
          console.log(`  Parsed type: ${typeof parsed}, isArray: ${Array.isArray(parsed)}`);
          if (Array.isArray(parsed)) {
            console.log(`  Array length: ${parsed.length}`);
            if (parsed.length > 0) {
              console.log(`  First item:`, parsed[0]);
            }
          } else if (typeof parsed === 'object') {
            console.log(`  Object keys:`, Object.keys(parsed));
          }
        } catch (e) {
          console.log(`  Not valid JSON: ${e.message}`);
        }
      }
    }
    
    // Also check specific possible keys
    // cashu.me might use different key formats
    const possibleProofKeys = [
      'cashu_proofs',
      `cashu_proofs_${finalMintUrl}`,
      `cashu_proofs_${finalMintUrl.replace(/[^a-zA-Z0-9]/g, '_')}`,
      'wallet_proofs',
      `wallet_proofs_${storedSeed?.slice(0, 16)}`,
      ...allKeys,
    ];

    let loadedProofs = false;
    for (const key of possibleProofKeys) {
      // Skip keys we know are not JSON
      if (skipKeys.has(key)) {
        continue;
      }
      
      try {
        const storedProofs = localStorage.getItem(key);
        if (storedProofs) {
          // Quick check: if it doesn't start with [ or {, it's probably not JSON
          const trimmed = storedProofs.trim();
          if (!trimmed.startsWith('[') && !trimmed.startsWith('{')) {
            continue;
          }
          
          const parsed = JSON.parse(storedProofs);
          let proofs = [];
          
          // Handle different storage formats
          if (Array.isArray(parsed)) {
            proofs = parsed;
          } else if (parsed.proofs && Array.isArray(parsed.proofs)) {
            proofs = parsed.proofs;
          } else if (parsed.data && Array.isArray(parsed.data)) {
            proofs = parsed.data;
          } else if (typeof parsed === 'object') {
            // Check if it's an object with proof arrays as values
            for (const value of Object.values(parsed)) {
              if (Array.isArray(value) && value.length > 0 && value[0] && value[0].secret) {
                proofs.push(...value);
              }
            }
          }
          
          if (proofs.length > 0 && proofs[0] && proofs[0].secret) {
            // Ensure wallet.proofs is initialized
            if (!wallet.proofs || !Array.isArray(wallet.proofs)) {
              wallet.proofs = [];
            }
            
            // Merge proofs, avoiding duplicates
            const existingSecrets = new Set(wallet.proofs.map(p => p.secret));
            const newProofs = proofs.filter(p => p && p.secret && !existingSecrets.has(p.secret));
            if (newProofs.length > 0) {
              wallet.proofs.push(...newProofs);
              loadedProofs = true;
              console.log(`Loaded ${newProofs.length} proofs from ${key} (total: ${wallet.proofs.length})`);
            }
          }
        }
      } catch (e) {
        // Only log if it's not a skip key
        if (!skipKeys.has(key)) {
          // Silently skip - this key doesn't contain JSON proofs
        }
      }
    }

    // Also check if wallet has proofs property and try to load from it
    if (!loadedProofs) {
      // Try to get proofs directly from wallet if it has a getter
      try {
        if (wallet.proofs && Array.isArray(wallet.proofs)) {
          console.log(`Wallet has ${wallet.proofs.length} proofs in memory`);
        } else if (wallet.getProofs) {
          const currentProofs = await wallet.getProofs();
          if (currentProofs && currentProofs.length > 0) {
            console.log(`Wallet has ${currentProofs.length} proofs`);
          }
        }
      } catch (e) {
        console.warn('Could not get proofs from wallet:', e.message);
      }
    }

    console.log(`Wallet initialized with mint: ${finalMintUrl}`);
    
    // Try to load proofs from IndexedDB (cashu.me might use this)
    try {
      if ('indexedDB' in window) {
        const dbName = 'cashu-wallet';
        const request = indexedDB.open(dbName);
        
        request.onsuccess = async (event) => {
          const db = event.target.result;
          try {
            // Check for common object store names
            const storeNames = ['proofs', 'wallet', 'cashu', 'tokens'];
            for (const storeName of storeNames) {
              if (db.objectStoreNames.contains(storeName)) {
                const transaction = db.transaction([storeName], 'readonly');
                const store = transaction.objectStore(storeName);
                const getAllRequest = store.getAll();
                
                getAllRequest.onsuccess = (e) => {
                  const data = e.target.result;
                  if (data && data.length > 0) {
                    console.log(`Found ${data.length} items in IndexedDB store: ${storeName}`);
                    // Try to extract proofs from the data
                    for (const item of data) {
                      if (item.proofs && Array.isArray(item.proofs)) {
                        if (!wallet.proofs || !Array.isArray(wallet.proofs)) {
                          wallet.proofs = [];
                        }
                        wallet.proofs.push(...item.proofs);
                      } else if (Array.isArray(item) && item[0] && item[0].secret) {
                        if (!wallet.proofs || !Array.isArray(wallet.proofs)) {
                          wallet.proofs = [];
                        }
                        wallet.proofs.push(...item);
                      }
                    }
                  }
                };
              }
            }
          } catch (e) {
            console.warn('IndexedDB access error:', e.message);
          }
        };
        
        request.onerror = () => {
          // IndexedDB not available or different structure
        };
      }
    } catch (e) {
      console.warn('Could not check IndexedDB:', e.message);
    }
    
    // Sync proofs after initialization
    try {
      await syncProofs();
    } catch (e) {
      console.warn('Could not sync proofs on initialization:', e.message);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to initialize wallet:', error);
    throw error;
  }
};

// Get balance - calculate from proofs
export const getBalance = async () => {
  try {
    if (!wallet) {
      return 0;
    }
    
    // Get proofs from wallet
    let proofs = [];
    try {
      // Try different ways to get proofs
      if (wallet.proofs && Array.isArray(wallet.proofs)) {
        proofs = wallet.proofs;
      } else if (wallet.getProofs && typeof wallet.getProofs === 'function') {
        proofs = await wallet.getProofs();
      } else if (wallet.getProofs && typeof wallet.getProofs === 'object' && wallet.getProofs.then) {
        proofs = await wallet.getProofs;
      } else {
        // Try to access proofs property directly
        proofs = wallet.proofs || [];
      }
    } catch (e) {
      console.warn('Could not get proofs from wallet:', e.message);
      proofs = [];
    }
    
    // Also check localStorage for proofs
    if (proofs.length === 0) {
      try {
        const mintUrl = localStorage.getItem(STORAGE_KEYS.WALLET_MINT);
        const storageKeys = [
          'cashu_proofs', // cashu.me uses this key
          `cashu_proofs_${mintUrl}`,
          `cashu_proofs_${mintUrl?.replace(/[^a-zA-Z0-9]/g, '_')}`,
          'wallet_proofs',
        ];
        
        for (const key of storageKeys) {
          const stored = localStorage.getItem(key);
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              let foundProofs = [];
              
              if (Array.isArray(parsed)) {
                foundProofs = parsed;
              } else if (parsed.proofs && Array.isArray(parsed.proofs)) {
                foundProofs = parsed.proofs;
              } else if (parsed.data && Array.isArray(parsed.data)) {
                foundProofs = parsed.data;
              } else if (typeof parsed === 'object') {
                // Check if it's an object with proof arrays as values
                for (const value of Object.values(parsed)) {
                  if (Array.isArray(value) && value.length > 0 && value[0] && value[0].secret) {
                    foundProofs.push(...value);
                  }
                }
              }
              
              if (foundProofs.length > 0 && foundProofs[0] && foundProofs[0].secret) {
                proofs = foundProofs;
                // Also update wallet.proofs if it's empty
                if (!wallet.proofs || wallet.proofs.length === 0) {
                  wallet.proofs = [...proofs];
                }
                console.log(`Loaded ${proofs.length} proofs from ${key} for balance calculation`);
                break;
              }
            } catch (e) {
              console.warn(`Could not parse ${key}:`, e.message);
            }
          }
        }
      } catch (e) {
        console.warn('Could not load proofs from localStorage:', e.message);
      }
    }
    
    // Calculate balance from proofs
    const balance = proofs.reduce((sum, proof) => {
      return sum + (proof.amount || 0);
    }, 0);
    
    console.log(`Wallet has ${proofs.length} proofs, balance: ${balance} sats`);
    return balance;
  } catch (error) {
    console.error('Failed to get balance:', error);
    return 0;
  }
};

// Sync proofs from wallet storage - aggressively load from all possible locations
export const syncProofs = async () => {
  try {
    if (!wallet) {
      throw new Error('Wallet not initialized');
    }
    
    // Ensure wallet.proofs is initialized
    if (!wallet.proofs || !Array.isArray(wallet.proofs)) {
      wallet.proofs = [];
    }
    
    // Try to get proofs from wallet first
    let proofs = wallet.proofs.length > 0 ? [...wallet.proofs] : [];
    
    // Aggressively search localStorage for proofs (cashu.me format)
    const mintUrl = localStorage.getItem(STORAGE_KEYS.WALLET_MINT);
    const storageKeys = [
      'cashu_proofs', // cashu.me primary key
      `cashu_proofs_${mintUrl}`,
      `cashu_proofs_${mintUrl?.replace(/[^a-zA-Z0-9]/g, '_')}`,
      'wallet_proofs',
    ];
    
    // Also check all keys that might contain proofs
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('proof') || key.includes('cashu'))) {
        if (!storageKeys.includes(key)) {
          storageKeys.push(key);
        }
      }
    }
    
    for (const key of storageKeys) {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          let foundProofs = [];
          
          if (Array.isArray(parsed)) {
            foundProofs = parsed;
          } else if (parsed.proofs && Array.isArray(parsed.proofs)) {
            foundProofs = parsed.proofs;
          } else if (parsed.data && Array.isArray(parsed.data)) {
            foundProofs = parsed.data;
          } else if (typeof parsed === 'object') {
            // Check if it's an object with proof arrays as values
            for (const value of Object.values(parsed)) {
              if (Array.isArray(value) && value.length > 0 && value[0] && value[0].secret) {
                foundProofs.push(...value);
              }
            }
          }
          
          if (foundProofs.length > 0 && foundProofs[0] && foundProofs[0].secret) {
            // Merge with existing proofs, avoiding duplicates
            const existingSecrets = new Set(proofs.map(p => p.secret));
            const newProofs = foundProofs.filter(p => p && p.secret && !existingSecrets.has(p.secret));
            if (newProofs.length > 0) {
              proofs.push(...newProofs);
              console.log(`Found ${newProofs.length} proofs in ${key}`);
            }
          }
        }
      } catch (e) {
        // Continue checking other keys
      }
    }
    
    // Update wallet.proofs with all found proofs
    if (proofs.length > 0) {
      wallet.proofs = proofs;
      
      // Save proofs to localStorage for backup (using cashu.me format)
      localStorage.setItem('cashu_proofs', JSON.stringify(proofs));
      if (mintUrl) {
        localStorage.setItem(`cashu_proofs_${mintUrl}`, JSON.stringify(proofs));
      }
      
      console.log(`Synced ${proofs.length} proofs to wallet (total balance: ${proofs.reduce((sum, p) => sum + (p.amount || 0), 0)} sats)`);
      return proofs.length;
    }
    
    console.log('No proofs found in storage');
    return 0;
  } catch (error) {
    console.error('Failed to sync proofs:', error);
    return 0;
  }
};

// Receive token with proper mint verification
export const receiveToken = async (tokenString) => {
  try {
    if (!wallet || !mint) {
      throw new Error('Wallet not initialized');
    }

    const cleanToken = tokenString.trim();

    // Check if already received
    const receivedTokens = localStorage.getItem(STORAGE_KEYS.RECEIVED_TOKENS);
    if (receivedTokens) {
      const tokenSet = new Set(JSON.parse(receivedTokens));
      if (tokenSet.has(cleanToken)) {
        throw new Error('This token has already been received.');
      }
    }

    // Decode token to get proofs
    let tokenData;
    try {
      // First, try using the library's decode function if available (handles both cashuA and cashuB)
      // Check if getDecodedToken is available from the library
      try {
        const cashuModule = await import('@cashu/cashu-ts');
        if (cashuModule.getDecodedToken && typeof cashuModule.getDecodedToken === 'function') {
          try {
            tokenData = cashuModule.getDecodedToken(cleanToken);
            console.log('Decoded token using library function');
          } catch (e) {
            console.warn('Library decode failed, trying manual decode:', e.message);
          }
        }
      } catch (e) {
        // getDecodedToken might not be available, continue with manual decode
      }
      
      // If library decode didn't work, try manual decoding
      if (!tokenData) {
        // Try to decode as cashuA format (base64 JSON)
        if (cleanToken.startsWith('cashuA')) {
          const base64Data = cleanToken.replace(/^cashuA/, '');
          const normalizedBase64 = base64Data.replace(/-/g, '+').replace(/_/g, '/');
          const padded = normalizedBase64 + '='.repeat((4 - normalizedBase64.length % 4) % 4);
          const jsonStr = atob(padded);
          tokenData = JSON.parse(jsonStr);
        } 
        // Try to decode as cashuB format (CBOR-encoded, base64url)
        // For cashuB, we'll let the library handle it directly since manual CBOR decoding is complex
        else if (cleanToken.startsWith('cashuB')) {
          // cashuB tokens are CBOR-encoded and should be handled by the library
          // Set tokenData to null to signal we should use wallet.receive() directly
          console.log('cashuB token detected, will use library methods for decoding');
          tokenData = null;
        } 
        // Try direct JSON
        else if (cleanToken.startsWith('{')) {
          tokenData = JSON.parse(cleanToken);
        } 
        // Try if it's base64 without prefix
        else {
          try {
            const normalizedBase64 = cleanToken.replace(/-/g, '+').replace(/_/g, '/');
            const padded = normalizedBase64 + '='.repeat((4 - normalizedBase64.length % 4) % 4);
            const jsonStr = atob(padded);
            tokenData = JSON.parse(jsonStr);
          } catch (e2) {
            throw new Error('Invalid token format');
          }
        }
      }
    } catch (e) {
      // If manual decode failed and it's a cashuB token, try wallet.receive() directly
      if (cleanToken.startsWith('cashuB')) {
        console.log('Manual decode failed for cashuB, will use wallet.receive() directly');
        tokenData = null; // Signal to use wallet.receive() directly
      } else {
        throw new Error('Invalid token format. Token must start with "cashuA", "cashuB", or be valid JSON.');
      }
    }

    // If tokenData is null, it's a cashuB token - use wallet.receive() directly
    // The library should handle CBOR decoding internally
    if (!tokenData) {
      console.log('Using wallet.receive() for cashuB token');
      
      if (!wallet.receive || typeof wallet.receive !== 'function') {
        throw new Error('Wallet.receive() method not available. Cannot process cashuB token.');
      }
      
      try {
        // The library's receive() method should handle CBOR decoding
        const result = await wallet.receive(cleanToken);
        
        if (!result || !result.token) {
          throw new Error('Failed to receive token from wallet');
        }
        
        // Extract proofs from result
        const newProofs = [];
        for (const entry of result.token.token || []) {
          if (entry.proofs && Array.isArray(entry.proofs)) {
            newProofs.push(...entry.proofs);
          }
        }
        
        if (newProofs.length === 0) {
          throw new Error('No proofs received from wallet');
        }
        
        // Add new proofs to wallet
        if (wallet.proofs && Array.isArray(wallet.proofs)) {
          const existingSecrets = new Set(wallet.proofs.map(p => p.secret));
          const uniqueProofs = newProofs.filter(p => p && p.secret && !existingSecrets.has(p.secret));
          wallet.proofs.push(...uniqueProofs);
        } else {
          wallet.proofs = newProofs;
        }
        
        // Save proofs to localStorage
        const mintUrl = localStorage.getItem(STORAGE_KEYS.WALLET_MINT);
        const storageKey = `cashu_proofs_${mintUrl || 'default'}`;
        localStorage.setItem('cashu_proofs', JSON.stringify(wallet.proofs));
        localStorage.setItem(storageKey, JSON.stringify(wallet.proofs));
        
        // Mark as received
        const tokenSet = receivedTokens ? new Set(JSON.parse(receivedTokens)) : new Set();
        tokenSet.add(cleanToken);
        localStorage.setItem(STORAGE_KEYS.RECEIVED_TOKENS, JSON.stringify(Array.from(tokenSet)));
        
        const receivedAmount = newProofs.reduce((sum, p) => sum + (p.amount || 0), 0);
        
        recordTransaction('receive', {
          amount: receivedAmount,
          token: cleanToken,
          mint: mint.mintUrl,
        });
        
        return {
          success: true,
          amount: receivedAmount,
        };
      } catch (e) {
        console.error('wallet.receive() failed for cashuB token:', e);
        // The library might have issues with CBOR decoding
        // Provide a helpful error message
        throw new Error(`Failed to receive cashuB token. The library may not fully support cashuB format. Error: ${e.message}`);
      }
    }

    // For manually decoded tokens (cashuA or JSON), continue with normal flow
    // Handle different possible structures from CBOR decoding
    if (!tokenData) {
      throw new Error('Invalid token: token data is null');
    }
    
    // Check if token structure exists in various formats
    let tokenArray = null;
    
    // Handle Map structure from CBOR (keys: ["mint","proofs","unit"])
    if (tokenData instanceof Map) {
      console.log('Token is a Map, converting to object');
      const mapObj = {};
      for (const [key, value] of tokenData.entries()) {
        mapObj[key] = value;
      }
      tokenData = mapObj;
    }
    
    // Handle different possible structures
    if (tokenData.token && Array.isArray(tokenData.token)) {
      tokenArray = tokenData.token;
    } else if (tokenData.proofs && Array.isArray(tokenData.proofs)) {
      // Direct proofs array (cashuB format might have this)
      tokenArray = [{ proofs: tokenData.proofs, mint: tokenData.mint || tokenData.m }];
    } else if (Array.isArray(tokenData) && tokenData.length > 0) {
      // Might be an array directly
      tokenArray = tokenData;
    } else if (tokenData[1] && tokenData[1].token) {
      // CBOR array format [version, data]
      tokenArray = tokenData[1].token;
    } else if (typeof tokenData === 'object') {
      // Try to extract from object structure
      // Check if it has a 'proofs' key directly
      if (tokenData.proofs) {
        tokenArray = [{ proofs: Array.isArray(tokenData.proofs) ? tokenData.proofs : [tokenData.proofs], mint: tokenData.mint || tokenData.m }];
      } else {
        // Try to find any array that might contain proofs
        for (const key of Object.keys(tokenData)) {
          if (Array.isArray(tokenData[key]) && tokenData[key].length > 0) {
            const firstItem = tokenData[key][0];
            if (firstItem && (firstItem.secret || firstItem.proofs)) {
              tokenArray = [{ proofs: tokenData[key], mint: tokenData.mint || tokenData.m }];
              break;
            }
          }
        }
      }
    }
    
    if (!tokenArray || !Array.isArray(tokenArray) || tokenArray.length === 0) {
      console.error('Token data structure:', tokenData);
      console.error('Token data type:', typeof tokenData);
      console.error('Token data keys:', tokenData ? (tokenData instanceof Map ? Array.from(tokenData.keys()) : Object.keys(tokenData)) : 'null');
      throw new Error('Invalid token: no token data found. Token structure: ' + JSON.stringify(tokenData instanceof Map ? Array.from(tokenData.entries()) : Object.keys(tokenData || {})));
    }
    
    // Normalize to expected format
    if (!tokenData.token) {
      tokenData = { token: tokenArray };
    }

    // Extract all proofs from token
    const allProofs = [];
    for (const entry of tokenData.token) {
      if (entry.proofs && Array.isArray(entry.proofs)) {
        allProofs.push(...entry.proofs);
      }
    }

    if (allProofs.length === 0) {
      throw new Error('Invalid token: no proofs found');
    }

    // CRITICAL: Verify proofs with mint before accepting
    // Check if proofs are already spent
    try {
      // Extract secrets from proofs for checking
      const secrets = allProofs.map(p => p.secret).filter(s => s);
      
      if (secrets.length > 0 && mint.check) {
        // New API uses check() instead of checkSpent()
        const checkResult = await mint.check(secrets);
        
        // Check result format might be different - handle both old and new formats
        if (checkResult) {
          let spentCount = 0;
          if (Array.isArray(checkResult)) {
            // New format: array of booleans or objects
            spentCount = checkResult.filter(r => r === true || (r && r.spent === true)).length;
          } else if (checkResult.spent && Array.isArray(checkResult.spent)) {
            // Old format: { spent: [...] }
            spentCount = checkResult.spent.length;
          } else if (typeof checkResult === 'object') {
            // Check if any values indicate spent
            for (const key of Object.keys(checkResult)) {
              if (checkResult[key] === true || (checkResult[key] && checkResult[key].spent === true)) {
                spentCount++;
              }
            }
          }
          
          if (spentCount > 0) {
            throw new Error(`Token has already been spent. ${spentCount} of ${allProofs.length} proofs are marked as spent by the mint.`);
          }
        }
      }
    } catch (e) {
      if (e.message && e.message.includes('already been spent')) {
        throw e;
      }
      console.warn('Could not verify proofs with mint (continuing anyway):', e.message);
    }

    // Use wallet.receive() to receive tokens - this handles everything internally
    // The library handles token decoding, proof validation, and mint interaction
    let newProofs = [];
    
    if (!wallet.receive || typeof wallet.receive !== 'function') {
      throw new Error('Wallet.receive() method not available');
    }
    
    // Track proofs and balance before receive to see what was added
    let proofsBefore = [];
    let balanceBefore = 0;
    try {
      if (wallet.proofs && Array.isArray(wallet.proofs)) {
        proofsBefore = [...wallet.proofs];
        balanceBefore = proofsBefore.reduce((sum, p) => sum + (p.amount || 0), 0);
      }
    } catch (e) {
      // Ignore
    }
    
    try {
      // wallet.receive() should handle both cashuA and cashuB tokens
      console.log('Calling wallet.receive() with token (length:', cleanToken.length, 'starts with:', cleanToken.substring(0, 10), ')');
      const result = await wallet.receive(cleanToken);
      
      console.log('wallet.receive() succeeded!');
      console.log('wallet.receive() result:', result);
      console.log('wallet.receive() result type:', typeof result);
      console.log('wallet.receive() result keys:', result ? Object.keys(result) : 'null');
      
      // Check if proofs are stored in wallet after receive
      let walletProofsAfterReceive = [];
      try {
        // Try multiple ways to get proofs from wallet
        if (wallet.proofs && Array.isArray(wallet.proofs)) {
          walletProofsAfterReceive = wallet.proofs;
          console.log(`Wallet has ${walletProofsAfterReceive.length} proofs in wallet.proofs`);
        }
        
        // Check if wallet has other properties that might contain proofs
        const walletKeys = Object.keys(wallet);
        console.log('Wallet object keys:', walletKeys.filter(k => !k.startsWith('_')));
        
        // Check for common proof storage locations
        for (const key of ['_proofs', 'proofs', 'tokens', '_tokens', 'state']) {
          if (wallet[key] && Array.isArray(wallet[key])) {
            console.log(`Found array in wallet.${key} with ${wallet[key].length} items`);
            if (wallet[key].length > 0 && wallet[key][0] && wallet[key][0].secret) {
              walletProofsAfterReceive = wallet[key];
              console.log(`Using proofs from wallet.${key}`);
            }
          }
        }
      } catch (e) {
        console.warn('Could not check wallet.proofs:', e.message);
      }
      
      // Extract proofs from result - the structure might vary
      if (result) {
        if (result.token && result.token.token) {
          // Standard format: { token: { token: [...] } }
          for (const entry of result.token.token) {
            if (entry.proofs && Array.isArray(entry.proofs)) {
              newProofs.push(...entry.proofs);
            }
          }
        } else if (result.proofs && Array.isArray(result.proofs)) {
          // Direct proofs array
          newProofs = result.proofs;
        } else if (result.token && Array.isArray(result.token)) {
          // Token is an array directly
          for (const entry of result.token) {
            if (entry.proofs && Array.isArray(entry.proofs)) {
              newProofs.push(...entry.proofs);
            }
          }
        } else if (result.token && typeof result.token === 'object') {
          // Token might be an object with proofs
          if (result.token.proofs && Array.isArray(result.token.proofs)) {
            newProofs = result.token.proofs;
          }
        }
      }
      
      // If no proofs in result, check if they're in wallet.proofs
      if (newProofs.length === 0 && walletProofsAfterReceive.length > 0) {
        // Get the proofs that were added (compare before/after)
        const beforeSecrets = new Set(proofsBefore.map(p => p.secret));
        const addedProofs = walletProofsAfterReceive.filter(p => p.secret && !beforeSecrets.has(p.secret));
        
        if (addedProofs.length > 0) {
          newProofs = addedProofs;
          console.log(`Found ${addedProofs.length} new proofs in wallet.proofs`);
        } else {
          // Check balance difference
          const balanceAfter = walletProofsAfterReceive.reduce((sum, p) => sum + (p.amount || 0), 0);
          const balanceDiff = balanceAfter - balanceBefore;
          
          if (balanceDiff > 0) {
            // Balance increased, so proofs were added even if we can't identify them
            // Use all wallet proofs as the new proofs
            newProofs = walletProofsAfterReceive;
            console.log(`Balance increased by ${balanceDiff} sats, using all wallet proofs`);
          } else {
            // All proofs were already there, but receive succeeded
            newProofs = walletProofsAfterReceive;
            console.log('Using all wallet proofs (receive succeeded but no new proofs detected)');
          }
        }
      }
      
      // If still no proofs, check if result is empty/undefined but receive succeeded
      if (newProofs.length === 0) {
        // Check if wallet.proofs has any proofs at all
        if (walletProofsAfterReceive.length > 0) {
          // Use all proofs as new proofs (receive succeeded, so something was added)
          newProofs = walletProofsAfterReceive;
          console.log('No proofs in result, but wallet has proofs - using all wallet proofs');
        } else {
          console.error('No proofs found anywhere. Result structure:', JSON.stringify(result, null, 2));
          console.error('Wallet proofs after receive:', walletProofsAfterReceive.length);
          throw new Error('No proofs received from wallet.receive(). The token may have already been spent or is invalid.');
        }
      }
    } catch (e) {
      console.error('wallet.receive() failed:', e);
      console.error('Error details:', {
        message: e.message,
        name: e.name,
        stack: e.stack,
        cause: e.cause,
      });
      
      // Check if it's a 400 error from the mint
      if (e.message && (e.message.includes('400') || e.message.includes('Bad Request'))) {
        throw new Error(`Mint rejected the token. This could mean: 1) The token has already been spent, 2) The token format is invalid, or 3) The proofs are not valid. Original error: ${e.message}`);
      }
      
      throw new Error(`Failed to receive token: ${e.message}`);
    }
    
    // Add new proofs to wallet
    if (wallet.proofs && Array.isArray(wallet.proofs)) {
      // Avoid duplicates
      const existingSecrets = new Set(wallet.proofs.map(p => p.secret));
      const uniqueProofs = newProofs.filter(p => p.secret && !existingSecrets.has(p.secret));
      wallet.proofs.push(...uniqueProofs);
    } else {
      // Store proofs in wallet object
      if (!wallet.proofs) {
        wallet.proofs = [];
      }
      wallet.proofs.push(...newProofs);
    }
    
    // Save proofs to localStorage
    const mintUrl = localStorage.getItem(STORAGE_KEYS.WALLET_MINT);
    const storageKey = `cashu_proofs_${mintUrl || 'default'}`;
    localStorage.setItem(storageKey, JSON.stringify(wallet.proofs || newProofs));

    // Mark as received
    const tokenSet = receivedTokens ? new Set(JSON.parse(receivedTokens)) : new Set();
    tokenSet.add(cleanToken);
    localStorage.setItem(STORAGE_KEYS.RECEIVED_TOKENS, JSON.stringify(Array.from(tokenSet)));

    // Calculate received amount from the new proofs
    const receivedAmount = newProofs.reduce((sum, p) => sum + (p.amount || 0), 0);

    recordTransaction('receive', {
      amount: receivedAmount,
      token: cleanToken,
      mint: mint.mintUrl,
    });

    return {
      success: true,
      amount: receivedAmount,
    };
  } catch (error) {
    console.error('Failed to receive token:', error);
    throw error;
  }
};

// Send token with proper mint verification
export const sendToken = async (amount) => {
  try {
    if (!wallet || !mint) {
      throw new Error('Wallet not initialized');
    }

    const balance = await getBalance();
    if (amount > balance) {
      throw new Error(`Insufficient balance. Available: ${balance} sats`);
    }

    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    // Get current proofs from wallet
    let currentProofs = [];
    if (wallet.proofs && Array.isArray(wallet.proofs)) {
      currentProofs = wallet.proofs;
    } else {
      // Try to load from localStorage
      const mintUrl = localStorage.getItem(STORAGE_KEYS.WALLET_MINT);
      const storageKey = `cashu_proofs_${mintUrl || 'default'}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          currentProofs = JSON.parse(stored);
        } catch (e) {
          console.warn('Could not parse stored proofs:', e.message);
        }
      }
    }
    
    if (currentProofs.length === 0) {
      throw new Error('No proofs available in wallet');
    }
    
    // Select proofs that sum to at least the amount needed
    // Sort by amount descending to use larger denominations first
    const sortedProofs = [...currentProofs].sort((a, b) => (b.amount || 0) - (a.amount || 0));
    const selectedProofs = [];
    let selectedAmount = 0;
    
    for (const proof of sortedProofs) {
      selectedProofs.push(proof);
      selectedAmount += proof.amount || 0;
      if (selectedAmount >= amount) {
        break;
      }
    }
    
    if (selectedAmount < amount) {
      throw new Error(`Insufficient proofs. Need ${amount} sats, have ${selectedAmount} sats in selected proofs.`);
    }
    
    // Use mint.split() to melt selected proofs and get new ones
    // split(proofs, amount) returns {fst: proofsToSend, snd: changeProofs}
    let splitResult;
    try {
      // Try wallet.send() first if it exists
      if (wallet.send && typeof wallet.send === 'function') {
        const result = await wallet.send(amount);
        if (result && result.send && Array.isArray(result.send) && result.send.length > 0) {
          splitResult = { fst: result.send, snd: result.change || [] };
        }
      }
    } catch (e) {
      console.warn('wallet.send() failed, using manual split:', e.message);
    }
    
    // If wallet.send() didn't work, use mint.swap() directly (new API uses swap instead of split)
    if (!splitResult) {
      // swap() might have a different signature - try with amount parameter
      try {
        splitResult = await mint.swap(selectedProofs, amount);
      } catch (e) {
        // If swap doesn't take amount, try without it and handle change manually
        console.warn('swap with amount failed, trying without:', e.message);
        const swapResult = await mint.swap(selectedProofs);
        if (swapResult && swapResult.fst && swapResult.snd) {
          // Calculate amounts and split accordingly
          const totalAmount = selectedProofs.reduce((sum, p) => sum + (p.amount || 0), 0);
          const changeAmount = totalAmount - amount;
          
          // Use fst for send amount, snd for change
          // But we need to ensure amounts match - this might need adjustment
          splitResult = swapResult;
        } else {
          throw new Error('Failed to swap proofs with mint');
        }
      }
    }
    
    if (!splitResult || !splitResult.fst || !Array.isArray(splitResult.fst) || splitResult.fst.length === 0) {
      throw new Error('Failed to split proofs with mint');
    }
    
    const proofsToSend = splitResult.fst;
    const changeProofs = splitResult.snd || [];
    
    // Remove selected proofs from wallet and add change back
    const selectedSecrets = new Set(selectedProofs.map(p => p.secret));
    if (wallet.proofs && Array.isArray(wallet.proofs)) {
      wallet.proofs = wallet.proofs.filter(p => !selectedSecrets.has(p.secret));
      wallet.proofs.push(...changeProofs);
    } else {
      wallet.proofs = currentProofs.filter(p => !selectedSecrets.has(p.secret));
      wallet.proofs.push(...changeProofs);
    }
    
    // Save updated proofs to localStorage
    const mintUrl = localStorage.getItem(STORAGE_KEYS.WALLET_MINT);
    const storageKey = `cashu_proofs_${mintUrl || 'default'}`;
    localStorage.setItem(storageKey, JSON.stringify(wallet.proofs));

    // Create token with the proofs to send
    const tokenData = {
      token: [{
        mint: mint.mintUrl,
        proofs: proofsToSend,
      }],
    };

    let token;
    try {
      token = getEncodedToken(tokenData);
    } catch (e) {
      const jsonStr = JSON.stringify(tokenData);
      const base64 = btoa(jsonStr);
      token = `cashuA${base64}`;
    }

    // Calculate actual amount sent
    const actualAmount = proofsToSend.reduce((sum, p) => sum + (p.amount || 0), 0);

    recordTransaction('send', {
      amount: actualAmount,
      token,
      mint: mint.mintUrl,
    });

    return {
      success: true,
      token,
      amount: actualAmount,
    };
  } catch (error) {
    console.error('Failed to send token:', error);
    throw error;
  }
};

// Get wallet info
export const getWalletInfo = () => {
  const seed = localStorage.getItem(STORAGE_KEYS.WALLET_SEED);
  const mintUrl = localStorage.getItem(STORAGE_KEYS.WALLET_MINT);
  const mnemonic = localStorage.getItem(STORAGE_KEYS.WALLET_MNEMONIC);

  return {
    hasWallet: !!seed,
    seed,
    mintUrl,
    mnemonicAvailable: !!mnemonic,
  };
};

// Get mnemonic
export const getMnemonic = () => {
  return localStorage.getItem(STORAGE_KEYS.WALLET_MNEMONIC);
};

// Check if wallet exists
export const hasWallet = () => {
  return !!localStorage.getItem(STORAGE_KEYS.WALLET_SEED);
};

// Import proofs manually (for syncing from other wallets)
export const importProofs = async (proofsArray) => {
  try {
    if (!wallet || !mint) {
      throw new Error('Wallet not initialized');
    }
    
    if (!Array.isArray(proofsArray) || proofsArray.length === 0) {
      throw new Error('Invalid proofs: must be a non-empty array');
    }
    
    // Validate proofs have required fields
    const validProofs = proofsArray.filter(p => p && p.secret && p.amount && p.id);
    if (validProofs.length === 0) {
      throw new Error('No valid proofs found in array');
    }
    
    // Ensure wallet.proofs is initialized
    if (!wallet.proofs || !Array.isArray(wallet.proofs)) {
      wallet.proofs = [];
    }
    
    // Merge proofs, avoiding duplicates
    const existingSecrets = new Set(wallet.proofs.map(p => p.secret));
    const newProofs = validProofs.filter(p => !existingSecrets.has(p.secret));
    
    if (newProofs.length === 0) {
      throw new Error('All proofs are already in wallet');
    }
    
    wallet.proofs.push(...newProofs);
    
    // Save to localStorage
    const mintUrl = localStorage.getItem(STORAGE_KEYS.WALLET_MINT);
    const storageKey = `cashu_proofs_${mintUrl || 'default'}`;
    localStorage.setItem('cashu_proofs', JSON.stringify(wallet.proofs));
    localStorage.setItem(storageKey, JSON.stringify(wallet.proofs));
    
    const totalAmount = newProofs.reduce((sum, p) => sum + (p.amount || 0), 0);
    console.log(`Imported ${newProofs.length} proofs (${totalAmount} sats)`);
    
    return {
      success: true,
      count: newProofs.length,
      amount: totalAmount,
    };
  } catch (error) {
    console.error('Failed to import proofs:', error);
    throw error;
  }
};

// Export proofs (for syncing to other wallets)
export const exportProofs = () => {
  try {
    if (!wallet) {
      throw new Error('Wallet not initialized');
    }
    
    const proofs = wallet.proofs || [];
    
    if (proofs.length === 0) {
      throw new Error('No proofs to export');
    }
    
    // Return proofs as JSON string for easy copying
    return {
      success: true,
      proofs: proofs,
      json: JSON.stringify(proofs, null, 2),
      count: proofs.length,
      totalAmount: proofs.reduce((sum, p) => sum + (p.amount || 0), 0),
    };
  } catch (error) {
    console.error('Failed to export proofs:', error);
    throw error;
  }
};

// Reset wallet
export const resetWallet = () => {
  localStorage.removeItem(STORAGE_KEYS.WALLET_SEED);
  localStorage.removeItem(STORAGE_KEYS.WALLET_MINT);
  localStorage.removeItem(STORAGE_KEYS.WALLET_MNEMONIC);
  localStorage.removeItem(STORAGE_KEYS.RECEIVED_TOKENS);
  localStorage.removeItem('cashu_proofs');
  localStorage.removeItem(TRANSACTION_STORAGE_KEY);
  wallet = null;
  mint = null;
  console.log('Wallet reset');
};
