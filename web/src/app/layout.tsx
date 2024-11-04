import { ClientProvider } from "../components/ClientProvider";
import "./globals.css";
import Navbar from "./ui/navbar";
import Component from "./ui/footer";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body
        style={{
          backgroundImage: "url('/img/background.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <ClientProvider>
          <Navbar />
          {children}
          <Component />
        </ClientProvider>
      </body>
    </html>
  );
}
