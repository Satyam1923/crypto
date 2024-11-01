"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  logout,
} from "../../redux/slices/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, status, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Redirect to home page if the user is logged in
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleGoogleLogin = () => dispatch(loginWithGoogle());
  const handleEmailLogin = () => dispatch(loginWithEmail({ email, password }));
  const handleEmailRegister = () =>
    dispatch(registerWithEmail({ email, password }));
  const handleLogout = () => dispatch(logout());

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <Card sx={{ width: 400, backgroundColor: "gray" }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Login
          </Typography>

          {user ? (
            <>
              <Typography variant="h6" align="center">
                Welcome, {user.email}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Typography variant="body1" align="center" gutterBottom>
              Please log in
            </Typography>
          )}

          {!user && (
            <>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleEmailLogin}
                sx={{ mt: 2 }}
              >
                Login with Email
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleEmailRegister}
                sx={{ mt: 2 }}
              >
                Register with Email
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                sx={{ mt: 2 }}
              >
                Login with Google
              </Button>
            </>
          )}

          {status === "loading" && (
            <Typography variant="body2" color="textSecondary" align="center">
              Loading...
            </Typography>
          )}
          {error && (
            <Typography variant="body2" color="error" align="center">
              Error: {error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
