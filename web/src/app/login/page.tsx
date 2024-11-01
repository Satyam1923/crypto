// app/login/page.tsx
"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  logout,
} from "../../redux/slices/authSlice";
import { AppDispatch, RootState } from "../../redux/store";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = () => dispatch(loginWithGoogle());
  const handleEmailLogin = () => dispatch(loginWithEmail({ email, password }));
  const handleEmailRegister = () =>
    dispatch(registerWithEmail({ email, password }));
  const handleLogout = () => dispatch(logout());

  return (
    <div>
      <h1>Login</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Please log in</p>
      )}
      {!user && (
        <>
          <button onClick={handleGoogleLogin}>Login with Google</button>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleEmailLogin}>Login with Email</button>
          <button onClick={handleEmailRegister}>Register with Email</button>
        </>
      )}
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
