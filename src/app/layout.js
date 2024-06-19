import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "이름미정 메인",
    template: "%s | 이름미정"
  },
  description: '이름미정입니다.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <meta charSet="utf-8" />
      <meta name='viewport' content='width=device-width, intial-scale=1.0' />
      <body className={inter.className}>
        <Navbar />
        <main className="container">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}