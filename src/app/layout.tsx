import type { Metadata } from "next";
import { Fredoka, Nunito, Poppins } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FocusFun Kids | Interactive Learning",
  description: "A fun and interactive learning platform for kids. ADHD optimized.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${nunito.variable} ${poppins.variable} font-nunito antialiased text-slate-800 selection:bg-yellow-300`}>
        {children}
      </body>
    </html>
  );
}
