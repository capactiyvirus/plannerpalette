import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  SocialFooter from '@/components/layout/SocialFooter';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});




const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlannerPalette",
  description: "A writing space for authors and storytellers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
      

        <div className="min-h-screen flex flex-col">
        
          <main className="flex-grow">
            {children}
          </main>
          
          <SocialFooter />
        </div>
      </body>
    </html>
  );
}