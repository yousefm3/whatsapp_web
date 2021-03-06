import React from "react";
import styles from "./.module.css";
import Contact from "../contact";
export default function ContactsList({
  contacts,
  setCurrentChat,
  currentChat,
  chats,
}) {
  const getLastMessage = (conact) => {
    const chat = chats.find(
      (chat) => chat?.contact?.username === conact?.username
    );
    const lastMessage = chat?.messages[chat.messages.length - 1].content;
    return lastMessage;
  };

  return (
    <ul className={styles.contacts_list}>
      {contacts.map((contact, i) => (
        <Contact
          contact={contact}
          key={i}
          setCurrentChat={setCurrentChat}
          currentChat={currentChat}
          lastMessage={getLastMessage(contact)}
        />
      ))}
    </ul>
  );
}
