import React, { useState, useEffect } from "react";
import styles from "./.module.css";
import defaultAvatar from "../../assets/images/avatars/default.png";

export default function Contact({
  contact,
  setCurrentChat,
  currentChat,
  lastMessage,
}) {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const importImage = (contact) => {
      import(`../../assets/images/avatars/${contact?.avatar}`).then((image) =>
        setAvatar(image.default)
      );
    };
    importImage(contact);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li
      className={`px-4 ${styles.contact} ${
        currentChat?.contact?.username === contact.username && styles.active
      }`}
      onClick={() => {
        setCurrentChat({ contact });
      }}
    >
      <div className="d-flex align-items-center">
        <div className="me-2">
          <div className={` ${styles.contact_avatar}`}>
            <img src={avatar || defaultAvatar} alt="contact_avatar" />
          </div>
        </div>
        <div className="d-flex flex-column">
          <p className={`m-0 ${styles.contact_name}`}>{contact?.displayName}</p>
          {lastMessage && (
            <span className={styles.last_message}>Me: {lastMessage}</span>
          )}
        </div>
      </div>
    </li>
  );
}
