import React, { useState, useEffect, useLayoutEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

// Global Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/variables.css";
import "./styles/global.css";

// Components
import Register from "./pages/register";
import Login from "./pages/login";
import AuthGuard from "./components/authGuard";
import NotificationToast from "./components/toast";
import ChatScreen from "./pages/chatScreen";
import Modal from "./components/modal";
import chatsDB from "./data/chats.json";
import usersDB from "./data/contacts.json";

export default function App() {
  // APP GLOBAL STATES
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(usersDB);
  const [notification, setNotification] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState(chatsDB);

  useLayoutEffect(() => {
    if (window.localStorage.getItem("user") !== "undefined") {
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(
        "user",
        JSON.stringify({ ...user, contacts: [] })
      );
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Modal user={user} setUser={setUser} setNotification={setNotification} />
      <NotificationToast
        data={notification}
        setNotification={setNotification}
      />
      <Routes>
        <Route
          index
          path="/"
          element={
            <AuthGuard setNotification={setNotification} setUser={setUser} user={user} users={users}>
              <ChatScreen
                chats={chats}
                setChats={setChats}
                user={user}
                users={users}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
              />
            </AuthGuard>
          }
        />
        <Route
          path="/register"
          element={
            <Register setUsers={setUsers} users={users} setNotification={setNotification} />
          }
        />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} users={users} setNotification={setNotification} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
