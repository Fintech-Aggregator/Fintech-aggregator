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

export const metadata = {
  title: "Fintech Aggregator",
  icons: {
    icon: "/logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.ico" type="image/x-icon" />
      </head>
      <body className={`${inter.variable} ${montserrat.variable}`}>{children}</body>
    </html>
  );
}
