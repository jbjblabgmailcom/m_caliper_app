import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import classes from "./page.module.css";
import Image from 'next/image';
import logoImg from '../../public/measurelogo.png';
import ProgramButton from "@/components/NewProgramButton/ProgramButton.js";
import Link from 'next/link';
import { LayoutProvider } from "@/context/LayoutContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Młody pomiarowiec 2d ver 1.0",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <div className={classes.wrappercontainer}>
        <LayoutProvider>
              <div className={classes.topside}>
                  <div>
                    <Image src={logoImg} width="150" alt="logo image" className={classes.logo} />
                    
                  </div>
                  <div className={classes.buttonContainer}>
                    <Link href="/">
                    <ProgramButton>Strona główna</ProgramButton>
                    </Link>
                    <Link href="/program">
                    <ProgramButton>Nowy program</ProgramButton>
                    </Link>
                    <Link href="/raporty">
                    <ProgramButton>Raporty</ProgramButton>
                    </Link>
                  </div>


                  </div>


                  <div className={classes.content}>
                  {children}
                  </div>
            </LayoutProvider>

    </div>
      </body>
    </html>
  );
}
