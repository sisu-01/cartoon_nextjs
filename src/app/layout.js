import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";
import SSRProvider from 'react-bootstrap/SSRProvider';
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "카연갤북마크",
    template: "%s | 카연갤북마크"
  },
  description: '테스트중입니다.',
  metadataBase: new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`),
  openGraph: {
    title: {
      default: "카연갤북마크",
      template: "%s | 카연갤북마크"
    },
    description: '테스트중입니다.',
    url: new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`),
    siteName: "카연갤북마크",
    type: "website",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <meta charSet="utf-8" />
      <meta name='viewport' content='width=device-width, intial-scale=1.0' />
      <body className={inter.className}>
        <div className="grid-container">
          <Header />
          <main className="main">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}