import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={"overflow-y-scroll"}
      >
        <Header />
        <main className="container mx-auto py-3 px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
