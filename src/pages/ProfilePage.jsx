import { useState, useEffect } from 'react';
import { createWallet, importWalletFromMnemonic, getWalletInfo, getMnemonic, resetWallet } from '../utils/wallet';

const ProfilePage = ({ user, onUserUpdate }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    mintUrl: user.mintUrl,
    privacy: user.privacy
  });
  const [saving, setSaving] = useState(false);

  // Wallet management state
  const [walletInfo, setWalletInfo] = useState(null);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [importMnemonic, setImportMnemonic] = useState('');
  const [creatingWallet, setCreatingWallet] = useState(false);
  const [importingWallet, setImportingWallet] = useState(false);
  const [recentMnemonic, setRecentMnemonic] = useState('');

  // Load wallet info on mount
  useEffect(() => {
    const info = getWalletInfo();
    setWalletInfo(info);
  }, []);

  // Handle wallet creation
  const handleCreateWallet = async () => {
    if (!formData.mintUrl) {
      alert('Please set a mint URL first');
      return;
    }

    setCreatingWallet(true);
    try {
      const result = await createWallet(formData.mintUrl);
      setWalletInfo(getWalletInfo());
      setRecentMnemonic(result.mnemonic);
      alert('Wallet created! Make sure to save your 12-word recovery phrase securely.');
      setShowMnemonic(true);
    } catch (error) {
      alert('Failed to create wallet: ' + error.message);
    } finally {
      setCreatingWallet(false);
    }
  };

  // Handle wallet import
  const handleImportWallet = async () => {
    if (!importMnemonic.trim()) {
      alert('Please enter your recovery phrase');
      return;
    }

    if (!formData.mintUrl) {
      alert('Please set a mint URL first');
      return;
    }

    setImportingWallet(true);
    try {
      await importWalletFromMnemonic(importMnemonic.trim(), formData.mintUrl);
      setWalletInfo(getWalletInfo());
      setImportMnemonic('');
      setRecentMnemonic('');
      alert('Wallet imported successfully!');
    } catch (error) {
      alert('Failed to import wallet: ' + error.message);
    } finally {
      setImportingWallet(false);
    }
  };

  // Handle wallet reset (dangerous operation)
  const handleResetWallet = () => {
    if (confirm('WARNING: This will permanently delete your wallet and all funds. Make sure you have backed up your recovery phrase. Continue?')) {
      resetWallet();
      setWalletInfo(getWalletInfo());
      setShowMnemonic(false);
      setRecentMnemonic('');
      alert('Wallet reset. You can now create a new wallet or import an existing one.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.username.trim()) {
      alert('Please enter a username');
      return;
    }

    if (!formData.mintUrl.trim()) {
      alert('Please enter a mint URL');
      return;
    }

    // Validate mint URL format
    try {
      new URL(formData.mintUrl);
    } catch {
      alert('Please enter a valid mint URL');
      return;
    }

    setSaving(true);

    // Save to localStorage
    localStorage.setItem('username', formData.username.trim());
    localStorage.setItem('mintUrl', formData.mintUrl.trim());
    localStorage.setItem('privacy', formData.privacy);

    // Update parent state
    onUserUpdate({
      username: formData.username.trim(),
      mintUrl: formData.mintUrl.trim(),
      privacy: formData.privacy
    });

    setSaving(false);
    alert('Profile updated successfully!');
  };

  return (
    <div>
      <h1 className="page-title">⚙️ Profile Settings</h1>

      <div className="card">
        <h3 className="card-title">Edit Your Profile</h3>

        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mintUrl" className="form-label">Cashu Mint URL</label>
          <input
            type="url"
            id="mintUrl"
            name="mintUrl"
            className="form-input"
            value={formData.mintUrl}
            onChange={handleInputChange}
            placeholder="https://your-mint.com"
          />
          <small className="text-muted mt-1" style={{display: 'block', color: 'var(--text-muted)'}}>
            Changing mint URL requires wallet reinitialization
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="privacy" className="form-label">Privacy Mode</label>
          <select
            id="privacy"
            name="privacy"
            className="form-select"
            value={formData.privacy}
            onChange={handleInputChange}
          >
            <option value="public">Public - Others can see you and send challenges</option>
            <option value="private">Private - Only friends can interact with you</option>
          </select>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving}
          style={{width: '100%'}}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Wallet Management */}
      <div className="card mt-3">
        <h3 className="card-title">💰 Wallet Management</h3>

        {/* Wallet Status */}
        <div className="mb-3">
          <strong>Status:</strong>{' '}
          {walletInfo?.hasWallet ? (
            <span style={{color: 'var(--success)'}}>Wallet Connected</span>
          ) : (
            <span style={{color: 'var(--error)'}}>No Wallet</span>
          )}
          {walletInfo?.mintUrl && (
            <div className="mt-1">
              <strong>Mint:</strong> {walletInfo.mintUrl}
            </div>
          )}
        </div>

        {/* Create New Wallet */}
        {!walletInfo?.hasWallet && (
          <div className="mb-3">
            <h4>Create New Wallet</h4>
            <p className="text-muted mb-2">
              Generate a new wallet with a randomly created seed phrase.
            </p>
            <button
              className="btn btn-primary"
              onClick={handleCreateWallet}
              disabled={creatingWallet || !formData.mintUrl}
            >
              {creatingWallet ? 'Creating...' : 'Create New Wallet'}
            </button>
          </div>
        )}

        {/* Import Wallet */}
        {!walletInfo?.hasWallet && (
          <div className="mb-3">
            <h4>Import Existing Wallet</h4>
            <div className="form-group">
              <label className="form-label">Recovery Phrase (12 words)</label>
              <textarea
                className="form-input"
                value={importMnemonic}
                onChange={(e) => setImportMnemonic(e.target.value)}
                placeholder="twelve word phrase..."
                rows="3"
                style={{fontFamily: 'monospace'}}
              />
            </div>
            <button
              className="btn btn-secondary"
              onClick={handleImportWallet}
              disabled={importingWallet || !importMnemonic.trim() || !formData.mintUrl}
            >
              {importingWallet ? 'Importing...' : 'Import Wallet'}
            </button>
          </div>
        )}

        {/* Show Mnemonic */}
        {walletInfo?.hasWallet && (
          <div className="mb-3">
            <h4>Wallet Recovery Phrase</h4>
            <p className="text-muted mb-2">
              ⚠️ <strong>WARNING:</strong> Your recovery phrase gives full access to your wallet.
              Never share it with anyone and store it securely. This demo stores it in localStorage
              (not secure for production use). Consider creating a new wallet if this is a production deployment.
            </p>
            <button
              className="btn btn-secondary mb-2"
              onClick={() => setShowMnemonic(!showMnemonic)}
              disabled={!walletInfo.mnemonicAvailable && !recentMnemonic}
            >
              {showMnemonic ? 'Hide' : 'Show'} Recovery Phrase
            </button>
            {!walletInfo?.mnemonicAvailable && !recentMnemonic && (
              <p className="text-muted" style={{fontSize: '0.85rem'}}>
                Recovery phrase unavailable for this wallet. Please create or import a new wallet to generate one.
              </p>
            )}
            {(showMnemonic && (walletInfo?.mnemonicAvailable || recentMnemonic || getMnemonic())) && (
              <div className="card" style={{backgroundColor: 'var(--bg-tertiary)'}}>
                <code style={{wordBreak: 'break-word', fontSize: '0.95rem'}}>
                  {recentMnemonic || getMnemonic()}
                </code>
                <button
                  className="btn btn-secondary mt-2"
                  onClick={() => {
                    navigator.clipboard.writeText(recentMnemonic || getMnemonic() || '');
                    alert('Recovery phrase copied to clipboard!');
                  }}
                  style={{fontSize: '0.8rem'}}
                >
                  Copy to Clipboard
                </button>
              </div>
            )}
          </div>
        )}

        {/* Reset Wallet */}
        {walletInfo?.hasWallet && (
          <div className="mb-3">
            <h4>Danger Zone</h4>
            <p className="text-muted mb-2">
              Reset your wallet. This will delete all stored wallet data.
            </p>
            <button
              className="btn btn-danger"
              onClick={handleResetWallet}
            >
              Reset Wallet
            </button>
          </div>
        )}
      </div>

      <div className="card mt-3">
        <h3 className="card-title">Privacy Information</h3>
        <div className="mb-2">
          <strong>Public Mode:</strong> Your profile is visible to all players. Anyone can add you as a friend and send challenges.
        </div>
        <div>
          <strong>Private Mode:</strong> Your profile is hidden from the global player list. Only your friends can see you and interact with you.
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
