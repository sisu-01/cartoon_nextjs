import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";
import SSRProvider from 'react-bootstrap/SSRProvider';
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { openGraphImage, twitterImage } from "./shared-metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "카연갤북마크",
    template: "%s | 카연갤북마크"
  },
  description: '재밌는 만화가 많아요.',
  metadataBase: new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`),
  openGraph: {
    title: {
      default: "카연갤북마크",
      template: "%s | 카연갤북마크"
    },
    description: '재밌는 만화가 많아요.',
    url: new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`),
    siteName: "카연갤북마크",
    type: "website",
    ...openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "카연갤북마크",
      template: "%s | 카연갤북마크"
    },
    description: "재밌는 만화가 많아요.",
    ...twitterImage,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <meta charSet="utf-8" />
      <meta name='viewport' content='width=device-width, intial-scale=1.0' />
      <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
      integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4" crossorigin="anonymous" async></script>
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