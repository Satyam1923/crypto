import { Box, Typography, Divider } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "black",
        color: "white",
        py: 4,
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: "lg",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        {/* Brand Section */}
        <Box
          sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 0 } }}
        >
          <Link href="/" passHref>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
              }}
            >
              <Image
                src="/img/logo.svg"
                alt="Flowbite Logo"
                width={40}
                height={40}
              />
              <Typography
                variant="h6"
                sx={{ ml: 1, fontWeight: "bold", color: "white" }}
              >
                VeriDoc
              </Typography>
            </Box>
          </Link>
        </Box>

        {/* Link Group */}
        <Box sx={{ display: "flex", gap: 3 }}>
          {[
            { label: "About", href: "/" },
            { label: "Privacy Policy", href: "/" },
            { label: "Licensing", href: "/" },
            { label: "Contact", href: "#" },
          ].map((link) => (
            <Link href={link.href} passHref key={link.label}>
              <Typography
                variant="body2"
                color="inherit"
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  "&:hover": { color: "gray.400" },
                }}
              >
                {link.label}
              </Typography>
            </Link>
          ))}
        </Box>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 3, backgroundColor: "gray" }} />

      {/* Copyright Section */}
      <Typography
        variant="body2"
        color="gray"
        align="center"
        sx={{
          mt: 2,
          "&::before, &::after": {
            content: '""',
            display: "inline-block",
            width: "1rem",
            height: "1px",
            backgroundColor: "gray",
            verticalAlign: "middle",
            mx: 1,
          },
        }}
      >
        © {currentYear} VeriDoc™. All rights reserved.
      </Typography>
    </Box>
  );
}
