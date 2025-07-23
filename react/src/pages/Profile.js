import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../api/profile';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data.user);
        setFirstName(data.user.firstName || '');
        setLastName(data.user.lastName || '');
        setBio(data.user.bio || '');
        setAvatar(data.user.avatar || '');
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить профиль');
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedData = { firstName, lastName, bio, avatar };
      const data = await updateProfile(updatedData);
      setUser(data.user);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError('Не удалось обновить профиль');
    }
  };

  if (!user) {
    return <div className="profile-loading">Загрузка...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar-container">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="profile-avatar" />
            ) : (
              <div className="profile-avatar-placeholder">{firstName.charAt(0)}{lastName.charAt(0)}</div>
            )}
          </div>
        </div>
        <div className="profile-info">
          <h1>{user.firstName} {user.lastName}</h1>
          {isEditing ? (
            <div className="profile-edit-form">
              {error && <div className="profile-error">{error}</div>}
              <div className="profile-field">
                <label>Имя:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="profile-field">
                <label>Фамилия:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="profile-field">
                <label>О себе:</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="profile-field">
                <label>Ссылка на аватар:</label>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </div>
              <button onClick={handleSave} className="profile-save-button">Сохранить</button>
            </div>
          ) : (
            <>
              <p>{user.bio || 'Расскажите о себе'}</p>
              <button onClick={handleEdit} className="profile-edit-button">Редактировать профиль</button>
            </>
          )}
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-block">
            <h3>Друзья</h3>
            <p>У вас пока нет друзей</p>
          </div>
        </div>
        <div className="profile-main">
          <div className="profile-block">
            <h3>Записи</h3>
            <p>У вас пока нет записей</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
