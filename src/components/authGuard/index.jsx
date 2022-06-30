import React from "react";
import Login from "../../pages/login";

export default function AuthGuard({ user, children, setNotification, users, setUser }) {
  return user?.credentials?.username ? (
    children
  ) : (
    <Login user={user} setUser={setUser} users={users} setNotification={setNotification} />
  );
}
