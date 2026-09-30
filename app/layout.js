import { Great_Vibes, Poppins } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cursive",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Happy Birthday, Mami 💙",
  description: "A little something made just for you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${greatVibes.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}