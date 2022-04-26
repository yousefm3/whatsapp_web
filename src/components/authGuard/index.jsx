import React from "react";
import Login from "../../pages/login";

export default function AuthGuard({ user, children, setNotification }) {
  return user?.credentials?.username ? (
    children
  ) : (
    <Login user={user} setNotification={setNotification} />
  );
}
