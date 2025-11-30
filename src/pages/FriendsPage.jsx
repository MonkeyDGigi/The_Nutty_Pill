import { useState, useEffect } from 'react';

const FriendsPage = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const [newFriendUsername, setNewFriendUsername] = useState('');
  const [mockPlayers] = useState([
    { username: 'SatoshiFan', status: 'online' },
    { username: 'LightningLord', status: 'online' },
    { username: 'CryptoQueen', status: 'away' },
    { username: 'BlockMaster', status: 'online' },
    { username: 'SatStacker', status: 'offline' }
  ]);

  // Load friends from localStorage on mount
  useEffect(() => {
    const savedFriends = localStorage.getItem('friends');
    if (savedFriends) {
      setFriends(JSON.parse(savedFriends));
    }
  }, []);

  // Save friends to localStorage whenever friends change
  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends));
  }, [friends]);

  // Add friend
  const handleAddFriend = () => {
    if (!newFriendUsername.trim()) {
      alert('Please enter a username');
      return;
    }

    if (friends.some(friend => friend.username === newFriendUsername.trim())) {
      alert('This user is already your friend');
      return;
    }

    if (newFriendUsername.trim() === user.username) {
      alert('You cannot add yourself as a friend');
      return;
    }

    const newFriend = {
      username: newFriendUsername.trim(),
      addedAt: new Date().toISOString()
    };

    setFriends(prev => [...prev, newFriend]);
    setNewFriendUsername('');
  };

  // Remove friend
  const handleRemoveFriend = (username) => {
    setFriends(prev => prev.filter(friend => friend.username !== username));
  };

  // Challenge friend (placeholder)
  const handleChallenge = (username) => {
    alert(`Challenge sent to ${username}! (This is a placeholder)`);
  };

  // Get visible players based on privacy setting
  const getVisiblePlayers = () => {
    if (user.privacy === 'private') {
      // Only show friends
      return friends.map(friend => ({ ...friend, isFriend: true }));
    } else {
      // Show all mock players + friends (with friend status)
      const friendUsernames = new Set(friends.map(f => f.username));
      return mockPlayers.map(player => ({
        ...player,
        isFriend: friendUsernames.has(player.username)
      }));
    }
  };

  const visiblePlayers = getVisiblePlayers();

  return (
    <div>
      <h1 className="page-title">👥 Friends</h1>

      {/* User Info */}
      <div className="card mb-3">
        <h3 className="card-title">Your Profile</h3>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Privacy:</strong> {user.privacy === 'public' ? 'Public' : 'Private'}</p>
        {user.privacy === 'private' && (
          <p className="text-muted">Only your friends can see you and send challenges.</p>
        )}
      </div>

      {/* Add Friend */}
      <div className="card mb-3">
        <h3 className="card-title">Add Friend</h3>
        <div className="flex gap-2">
          <input
            type="text"
            className="form-input"
            value={newFriendUsername}
            onChange={(e) => setNewFriendUsername(e.target.value)}
            placeholder="Enter username"
            style={{flex: 1}}
          />
          <button
            className="btn btn-primary"
            onClick={handleAddFriend}
          >
            Add Friend
          </button>
        </div>
      </div>

      {/* Friends List */}
      <div className="card mb-3">
        <h3 className="card-title">Your Friends ({friends.length})</h3>
        {friends.length === 0 ? (
          <p className="text-muted">No friends added yet. Add some friends above!</p>
        ) : (
          <ul className="list">
            {friends.map(friend => (
              <li key={friend.username} className="list-item">
                <div className="list-item-content">
                  <strong>{friend.username}</strong>
                  <div className="text-muted">Added {new Date(friend.addedAt).toLocaleDateString()}</div>
                </div>
                <div className="flex gap-1">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleChallenge(friend.username)}
                  >
                    Challenge
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFriend(friend.username)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Players List */}
      <div className="card">
        <h3 className="card-title">
          {user.privacy === 'public' ? 'All Players' : 'Your Friends'}
        </h3>
        {user.privacy === 'private' && (
          <p className="text-muted mb-2">
            You're in private mode. Only your friends can interact with you.
          </p>
        )}
        <ul className="list">
          {visiblePlayers.map(player => (
            <li key={player.username} className="list-item">
              <div className="list-item-content">
                <strong>{player.username}</strong>
                <div className="text-muted">
                  Status: {player.status}
                  {player.isFriend && <span className="ml-1">(Friend)</span>}
                </div>
              </div>
              <div className="flex gap-1">
                {player.isFriend ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleChallenge(player.username)}
                  >
                    Challenge
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => setNewFriendUsername(player.username)}
                  >
                    Add Friend
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendsPage;


