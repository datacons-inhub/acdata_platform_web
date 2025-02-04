// src/modules/cpanel/components/UserInfo.tsx
import React from 'react';
import styles from './UserInfo.module.css';

interface UserInfoProps {
  username: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ username }) => {
  return (
    <div className={styles.userInfo}>
      <span className={styles.userName}>{username}</span>
      <img src="/src/assets/images/user-avatar.png" alt="User Avatar" className={styles.avatar}/>
    </div>
  );
};

export default UserInfo;
