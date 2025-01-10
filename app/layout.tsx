import { Inter } from "next/font/google";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link data-rh="true" rel="icon" href="/logo.svg" />
      </head>
      <body className={(inter.variable, montserrat.variable)}>{children}</body>
    </html>
  );
}
