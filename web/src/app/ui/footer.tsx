import { Box, Typography, Divider } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "black", color: "white", py: 4 }}
    >
      <Box
        sx={{
          maxWidth: "lg",
          mx: "auto",
          px: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand Section */}
        <Box
          sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 0 } }}
        >
          <Link href="/" passHref>
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <Image
                src="/img/logo.svg"
                alt="Flowbite Logo"
                width={40}
                height={40}
              />
              <Typography variant="h6" sx={{ ml: 1 }}>
                VeriDoc
              </Typography>
            </Box>
          </Link>
        </Box>

        {/* Link Group */}
        <Box sx={{ display: "flex", gap: 4 }}>
          <Link href="/about" passHref>
            <Typography color="inherit" sx={{ textDecoration: "none" }}>
              About
            </Typography>
          </Link>
          <Link href="/privacy" passHref>
            <Typography color="inherit" sx={{ textDecoration: "none" }}>
              Privacy Policy
            </Typography>
          </Link>
          <Link href="/licensing" passHref>
            <Typography color="inherit" sx={{ textDecoration: "none" }}>
              Licensing
            </Typography>
          </Link>
          <Link href="#" passHref>
            <Typography color="inherit" sx={{ textDecoration: "none" }}>
              Contact
            </Typography>
          </Link>
        </Box>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 3, backgroundColor: "gray" }} />

      {/* Copyright Section */}
      <Typography variant="body2" color="gray" align="center">
        © {currentYear} VeriDoc™
      </Typography>
    </Box>
  );
}
