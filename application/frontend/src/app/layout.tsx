import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextAuthProvider from "@/providers/NextAuthProvider";


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
      <body className="text-gray-800 overflow-hidden" >
        <div className="min-h-screen flex flex-col ">
          <NextAuthProvider>
            <Header />
            <main className="flex-1  w-full mx-auto overflow-y-scroll">
              <div className="container mx-auto px-4"  style={{height: "calc(100vh - 5.5rem)"} }>
                {children}
              </div>
            </main>
            <Footer />
          </NextAuthProvider>
        </div>
      </body>
    </html>
  );
}
