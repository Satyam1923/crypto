import { ClientProvider } from "../components/ClientProvider";
import "./globals.css";
import Navbar from "./ui/navbar";
import Component from "./ui/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <Navbar />
          {children}
          <Component/>
        </ClientProvider>
      </body>
    </html>
  );
}
