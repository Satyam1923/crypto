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
        background:
          'url("/path-to-your-background-image.jpg") no-repeat center center fixed',
        backgroundSize: "cover",
      }}
    >
      <Card
        sx={{
          width: 400,
          minWidth: 320,
          bgcolor: "rgba(0 0 0 / 0.5)",
          backdropFilter: "blur(5px)",
          borderRadius: "12px",
          padding: 2,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            color="white"
          >
            Login
          </Typography>

          {user ? (
            <>
              <Typography variant="h6" align="center" color="white">
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
            <Typography
              variant="body1"
              align="center"
              gutterBottom
              color="white"
            >
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
                InputLabelProps={{
                  style: { color: "white" }, // Set the label color to white
                }}
                InputProps={{
                  style: { color: "white" }, // Set the input text color to white
                }}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white", // Set the border color to white
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "white", // Change border color on hover
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "white", // Change border color when focused
                    },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{
                  style: { color: "white" }, // Set the label color to white
                }}
                InputProps={{
                  style: { color: "white" }, // Set the input text color to white
                }}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white", // Set the border color to white
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "white", // Change border color on hover
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "white", // Change border color when focused
                    },
                }}
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
            <Typography variant="body2" color="white" align="center">
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
