import { useState, useEffect } from 'react';
import { getBalance, receiveToken, sendToken, initWallet, hasWallet, getWalletInfo, getTransactions, syncProofs } from '../utils/wallet';

const WalletPage = ({ user }) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [walletExists, setWalletExists] = useState(false);
  const [receiveTokenInput, setReceiveTokenInput] = useState('');
  const [receiving, setReceiving] = useState(false);
  
  const [sendAmount, setSendAmount] = useState('');
  const [sendTokenOutput, setSendTokenOutput] = useState('');
  const [generatingToken, setGeneratingToken] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // Initialize wallet and load balance on mount
  useEffect(() => {
    const initializeWallet = async () => {
      try {
        setWalletExists(hasWallet());

        if (hasWallet()) {
          await initWallet(user.mintUrl);
          const currentBalance = await getBalance();
          setBalance(currentBalance);
          setTransactions(getTransactions());
        }
      } catch (error) {
        console.error('Failed to initialize wallet:', error);
        setWalletExists(false);
      } finally {
        setLoading(false);
      }
    };

    initializeWallet();
  }, [user.mintUrl]);

  // Refresh balance and sync proofs
  const handleRefresh = async () => {
    try {
      if (hasWallet()) {
        await syncProofs();
        const currentBalance = await getBalance();
        setBalance(currentBalance);
        setTransactions(getTransactions());
      }
    } catch (error) {
      console.error('Failed to refresh:', error);
      alert('Failed to refresh balance: ' + error.message);
    }
  };


  // Handle receive sats from token
  const handleReceive = async () => {
    if (!receiveTokenInput.trim()) {
      alert('Please paste a Cashu token');
      return;
    }

    setReceiving(true);
    try {
      const token = receiveTokenInput.trim();
      
      // Process the Cashu token to receive sats
      const result = await receiveToken(token);
      
      if (result.success) {
        // Update balance after receiving
        const newBalance = await getBalance();
        setBalance(newBalance);
        
        setTransactions(getTransactions());

        // Clear input
        setReceiveTokenInput('');
        
        alert(`Successfully received ${result.amount} sats!`);
      } else {
        throw new Error('Token processing failed');
      }
    } catch (error) {
      alert('Failed to receive sats: ' + error.message);
      console.error('Receive error:', error);
    } finally {
      setReceiving(false);
    }
  };

  // Handle generate send token
  const handleGenerateSendToken = async () => {
    const amount = parseInt(sendAmount);
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (amount > balance) {
      alert('Insufficient balance');
      return;
    }

    setGeneratingToken(true);
    try {
      // Generate a Cashu token for sending
      const result = await sendToken(amount);
      setSendTokenOutput(result.token);
      
      // Update balance after sending (deduct the amount)
      const newBalance = await getBalance();
      setBalance(newBalance);
      setTransactions(getTransactions());
      
      alert('Cashu token generated! Copy it to send to another wallet.');
    } catch (error) {
      alert('Failed to generate token: ' + error.message);
      console.error(error);
    } finally {
      setGeneratingToken(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="page-title">WALLET</h1>
        <p>Loading wallet...</p>
      </div>
    );
  }

  if (!walletExists) {
    return (
      <div>
        <h1 className="page-title">WALLET</h1>
        <div className="card">
          <h3 className="card-title">No Wallet Found</h3>
          <p className="mb-3">
            You need to create or import a wallet before you can send and receive sats.
          </p>
          <p className="text-muted mb-3">
            Go to the Profile page to set up your wallet.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.hash = '#/profile'}
          >
            Go to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">WALLET</h1>

      {/* Balance Display */}
      <div className="balance-display">
        <div className="balance-amount">{balance.toLocaleString()}</div>
        <div className="balance-label">sats</div>
        <button
          className="btn btn-secondary mt-2"
          onClick={handleRefresh}
          style={{ marginTop: '1rem' }}
        >
          🔄 Refresh Balance
        </button>
      </div>

      {/* Mint Info */}
      <div className="card mb-3">
        <h3 className="card-title">MINT INFO</h3>
        <p><strong>Mint URL:</strong> {user.mintUrl}</p>
      </div>

      {/* Receive Section */}
      <div className="card mb-3">
        <h3 className="card-title">RECEIVE SATS</h3>
        <p className="mb-3" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Paste a Cashu token to receive sats from another wallet.
        </p>
        
        <div className="form-group">
          <label className="form-label">Cashu Token</label>
          <textarea
            className="form-textarea"
            value={receiveTokenInput}
            onChange={(e) => setReceiveTokenInput(e.target.value)}
            placeholder="Paste Cashu token here (cashuA or cashuB format)"
            rows="4"
          />
        </div>
        
        <button
          className="btn btn-primary"
          onClick={handleReceive}
          disabled={!receiveTokenInput.trim() || receiving}
          style={{width: '100%'}}
        >
          {receiving ? 'Receiving...' : 'Receive Sats'}
        </button>
      </div>

      {/* Send Section */}
      <div className="card">
        <h3 className="card-title">SEND SATS</h3>
        <p className="mb-3" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Generate a Cashu token for the amount you want to send. Share the token with the recipient.
        </p>
        
        <div className="form-group">
          <label className="form-label">Amount (sats)</label>
          <input
            type="number"
            className="form-input"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
            placeholder="Enter amount to send"
            min="1"
            max={balance}
          />
        </div>
        
        <button
          className="btn btn-primary"
          onClick={handleGenerateSendToken}
          disabled={!sendAmount || generatingToken}
          style={{width: '100%', marginBottom: '1rem'}}
        >
          {generatingToken ? 'Generating Token...' : 'Generate Cashu Token'}
        </button>
        
        {sendTokenOutput && (
          <div className="card mt-3">
            <p className="mb-2"><strong>Cashu Token Generated:</strong></p>
            <textarea
              readOnly
              className="form-textarea"
              value={sendTokenOutput}
              style={{ minHeight: '100px', marginBottom: '1rem' }}
            />
            <div className="flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigator.clipboard.writeText(sendTokenOutput);
                  alert('Token copied to clipboard! Share it with the recipient.');
                }}
                style={{flex: 1}}
              >
                📋 Copy Token
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSendTokenOutput('');
                  setSendAmount('');
                }}
              >
                Clear
              </button>
            </div>
            <p className="mt-2" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Share this token with the recipient. They can paste it in their wallet's receive section.
            </p>
          </div>
        )}
      </div>

      {/* Transaction History */}
      <div className="card mt-3">
        <h3 className="card-title">TRANSACTION HISTORY</h3>
        {transactions.length === 0 ? (
          <p className="text-muted">No transactions yet. Receive or send some sats to see them here.</p>
        ) : (
          <ul className="list">
            {transactions.map((tx) => (
              <li key={tx.id} className="list-item">
                <div className="list-item-content">
                  <strong>
                    {tx.type === 'receive' ? 'Received' : 'Sent'} {tx.amount} sats
                  </strong>
                  <div className="text-muted">
                    {new Date(tx.timestamp).toLocaleString()}
                  </div>
                  {tx.mint && (
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                      Mint: {tx.mint}
                    </div>
                  )}
                </div>
                {tx.token && (
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      navigator.clipboard.writeText(tx.token);
                      alert('Token copied to clipboard!');
                    }}
                  >
                    Copy Token
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
