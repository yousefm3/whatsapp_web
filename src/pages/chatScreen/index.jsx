import React from "react";
import styles from "./.module.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import defaultAvatar from "../../assets/images/avatars/default.png";
import ChatSplashScreen from "../../components/chatSplashScreen";
import ContactsList from "../../components/contactsList";
import Chat from "../../components/chat";

export default function ChatScreen({
  chats,
  setChats,
  user,
  currentChat,
  setCurrentChat,
}) {
  return (
    <main className={styles.chat_screen}>
      <div className="container-fluid">
        <div className="row">
          <div className={`col-3 p-0 ${styles.left_sidebar_wrapper}`}>
            <aside className={styles.left_sidebar}>
              <div className={`${styles.top} p-4`}>
                <div className={styles.user_info_wrapper}>
                  <div className={`me-2 ${styles.user_avatar}`}>
                    <img
                      src={
                        user?.avatar
                          ? URL.createObjectURL(user?.avatar)
                          : defaultAvatar
                      }
                      alt="user_avatar"
                    />
                  </div>
                  <div className={`ms-2 ${styles.user_name}`}>
                    <p className="mb-0">{user?.displayname}</p>
                    <span>Active</span>
                  </div>
                </div>
                <div className={styles.add_contact_btn_wrapper}>
                  <button
                    className={styles.add_contact_btn}
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#Modal"
                  >
                    <AiOutlineUserAdd />
                  </button>
                </div>
              </div>
              {!user?.contacts?.length ? (
                <div className={`pt-4`}>
                  <p className="text-center py-2">No contacts added yet!</p>
                </div>
              ) : (
                <>
                  <div className={`px-4 pt-4 pb-3`}>
                    <span className={styles.contacts_list_label}>conacts</span>
                  </div>
                  <ContactsList
                    chats={chats}
                    currentChat={currentChat}
                    setCurrentChat={setCurrentChat}
                    contacts={user?.contacts}
                  />
                </>
              )}
            </aside>
          </div>
          <div className={`col-9 p-0 ${styles.chat_area_wrapper}`}>
            {!currentChat && <ChatSplashScreen />}
            {currentChat && (
              <Chat
                chats={chats}
                setChats={setChats}
                user={user}
                currentChat={currentChat}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
