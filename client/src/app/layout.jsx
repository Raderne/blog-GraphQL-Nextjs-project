import { Inter, Unbounded, Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AppProvider } from "./context";

const inter = Inter({ subsets: ["latin"] });

const unbounded = Unbounded({
  subsets: ["latin"],
  weights: [400, 500, 600, 700, 900],
});
const workSans = Work_Sans({
  subsets: ["latin"],
  weights: [400, 500, 600, 700, 800],
});

export const metadata = {
  title: "INKBLOG",
  description:
    "A blog about everything, and the things that make them special.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
