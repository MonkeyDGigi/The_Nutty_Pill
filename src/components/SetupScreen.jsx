import { useState } from 'react';
import { createWallet, importWalletFromMnemonic } from '../utils/wallet';

const SetupScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState('profile'); // 'profile' or 'wallet'
  const [profileData, setProfileData] = useState({
    username: '',
    mintUrl: 'https://8333.space:3338', // Default Cashu mint
    privacy: 'public'
  });
  const [walletData, setWalletData] = useState({
    action: 'create', // 'create' or 'import'
    mnemonicInput: '',
    createdMnemonic: null
  });
  const [creatingWallet, setCreatingWallet] = useState(false);
  const [readyToFinish, setReadyToFinish] = useState(false);

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWalletInputChange = (e) => {
    const { name, value } = e.target;
    setWalletData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'action' ? { mnemonicInput: '', createdMnemonic: null } : {})
    }));
    if (name === 'action') {
      setReadyToFinish(false);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!profileData.username.trim()) {
      alert('Please enter a username');
      return;
    }

    if (!profileData.mintUrl.trim()) {
      alert('Please enter a mint URL');
      return;
    }

    // Validate mint URL format
    try {
      new URL(profileData.mintUrl);
    } catch {
      alert('Please enter a valid mint URL');
      return;
    }

    // Move to wallet setup
    setCurrentStep('wallet');
  };

  const handleWalletSubmit = async (e) => {
    e.preventDefault();

    if (walletData.action === 'import' && !walletData.mnemonicInput.trim()) {
      alert('Please enter your 12-word recovery phrase');
      return;
    }

    setCreatingWallet(true);
    try {
      let walletResult;

      if (walletData.action === 'create') {
        walletResult = await createWallet(profileData.mintUrl);
        setWalletData(prev => ({ ...prev, createdMnemonic: walletResult.mnemonic }));
        setReadyToFinish(true);
        alert('Wallet created! Write down your 12-word recovery phrase below before continuing.');
      } else {
        await importWalletFromMnemonic(walletData.mnemonicInput.trim(), profileData.mintUrl);
        alert('Wallet imported successfully!');
        onComplete(profileData);
        return;
      }
    } catch (error) {
      alert('Failed to set up wallet: ' + error.message);
    } finally {
      setCreatingWallet(false);
    }
  };

  const handleBackToProfile = () => {
    setCurrentStep('profile');
    setReadyToFinish(false);
  };

  return (
    <div className="setup-screen">
      <h2 className="setup-title retro-title">WELCOME TO CASHU ARCADE</h2>

      {currentStep === 'profile' && (
        <>
          <p className="text-center mb-3">Let's set up your profile to get started!</p>

          <form onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                value={profileData.username}
                onChange={handleProfileInputChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mintUrl" className="form-label">Cashu Mint URL</label>
              <input
                type="url"
                id="mintUrl"
                name="mintUrl"
                className="form-input"
                value={profileData.mintUrl}
                onChange={handleProfileInputChange}
                placeholder="https://your-mint.com"
                required
              />
              <small className="text-muted mt-1" style={{display: 'block', color: 'var(--text-muted)'}}>
                URL of your preferred Cashu mint
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="privacy" className="form-label">Privacy Mode</label>
              <select
                id="privacy"
                name="privacy"
                className="form-select"
                value={profileData.privacy}
                onChange={handleProfileInputChange}
              >
                <option value="public">Public - Others can see you and send challenges</option>
                <option value="private">Private - Only friends can interact with you</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
              Continue to Wallet Setup
            </button>
          </form>
        </>
      )}

      {currentStep === 'wallet' && (
        <>
          <p className="text-center mb-3">Now let's set up your Cashu wallet!</p>

          <form onSubmit={handleWalletSubmit}>
            <div className="form-group">
              <label className="form-label">Wallet Setup</label>
              <div className="mb-2">
                <label className="flex align-center gap-2">
                  <input
                    type="radio"
                    name="action"
                    value="create"
                    checked={walletData.action === 'create'}
                    onChange={handleWalletInputChange}
                  />
                  Create New Wallet (Recommended)
                </label>
              </div>
              <div>
                <label className="flex align-center gap-2">
                  <input
                    type="radio"
                    name="action"
                    value="import"
                    checked={walletData.action === 'import'}
                    onChange={handleWalletInputChange}
                  />
                  Import Existing Wallet
                </label>
              </div>
            </div>

            {walletData.action === 'import' && (
              <div className="form-group">
                <label htmlFor="seed" className="form-label">Recovery Phrase (12 words)</label>
                <textarea
                  id="seed"
                  name="mnemonicInput"
                  className="form-input"
                  value={walletData.mnemonicInput}
                  onChange={handleWalletInputChange}
                  placeholder="twelve word phrase..."
                  rows="3"
                  style={{fontFamily: 'monospace'}}
                  required
                />
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleBackToProfile}
                style={{flex: 1}}
              >
                Back
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={creatingWallet}
                style={{flex: 2}}
              >
                {creatingWallet ? 'Creating Wallet...' :
                 walletData.action === 'create' ? 'Create Wallet & Start' : 'Import Wallet & Start'}
              </button>
            </div>
          </form>

          {walletData.createdMnemonic && (
            <div className="card mt-3" style={{backgroundColor: 'var(--bg-tertiary)'}}>
              <h4>🎉 Wallet Created Successfully!</h4>
              <p className="text-muted mb-2">
                <strong>IMPORTANT:</strong> Save your 12-word recovery phrase. Anyone with these words can access your wallet.
              </p>
              <code style={{wordBreak: 'break-word', fontSize: '0.95rem', backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: '0.5rem', display: 'block'}}>
                {walletData.createdMnemonic}
              </code>
              <p className="text-muted mt-2" style={{fontSize: '0.85rem'}}>
                Write these words down in order. Do not take screenshots or store them online.
              </p>
              <button
                className="btn btn-secondary mt-2"
                onClick={() => {
                  navigator.clipboard.writeText(walletData.createdMnemonic);
                  alert('Recovery phrase copied to clipboard! Store it securely.');
                }}
              >
                Copy Recovery Phrase
              </button>
            </div>
          )}

          {readyToFinish && walletData.createdMnemonic && (
            <button
              className="btn btn-primary mt-3"
              style={{width: '100%'}}
              onClick={() => onComplete(profileData)}
            >
              I've Saved My Recovery Phrase
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SetupScreen;
