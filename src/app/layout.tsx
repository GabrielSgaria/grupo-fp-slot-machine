import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ServiceWorkerInitializer } from "@/components/sw-initializer";
import { DownloadAppButton } from "@/components/page-download/download-app-button";
import { Suspense } from "react";
import Loading from "./loading";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GRUPO FP - OFICIAL",
  description: "Site de sorteio de Plataformas recomendadas - GRUPO FP OFICIAL",
  metadataBase: new URL("https://www.grupofp.com.br"),
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '286x286', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '286x286', type: 'image/png' },
    ],
    shortcut: ['/favicon.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PLATAFORAS - FP',
    startupImage: [
      '/favicon.png'
    ],
  },
  openGraph: {
    title: "GRUPO FP - OFICIAL",
    description: "Site de sorteio de Plataformas recomendadas - GRUPO FP OFICIAL",
    url: "https://www.grupofp.com.br",
    siteName: "GRUPO FP - OFICIA",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/images/7c704c64-2dd3-4618-84a4-a15132b61aaf.png?token=EmBxHxLhQ87uFhy2xZtypw1n976wkA0lr93OZD7OGGc&height=302&width=305&expires=33265283505',
        width: 500,
        height: 500,
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
  keywords: [
    "slots online", "roleta de cassino", "apostas de slots", "ganhos de slots", "rodadas grátis", "bônus de cassino", "cassino online",
    "estratégia de slots", "pagamentos de slots", "slots", "jogos de cassino", "símbolos scatter", "símbolos wild", "jogos de bônus", "slots 3D",
    "torneios de slots", "cassino móvel", "experiência de jogador", "slots com jackpot", "apostas altas", "jogos de alta volatilidade",
    "taxa de retorno ao jogador (RTP)", "cassinos com slots", "slots com múltiplas linhas", "slots progressivos", "giros automáticos",
    "slots com multiplicadores", "tabela de pagamentos", "slots com rodadas bônus", "apostas", "tigrinho", "fortune tiger", "fortune", "tiger", "fortune rabbit", "fortune mouse",
    "fortune dragon", "fortune ox",
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt_BR">
      <head>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        <meta name="application-name" content="PLATAFORMAS - FP" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PLATAFORMAS - FP" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="icon" type="image/png" sizes="286x286" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="286x286" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <GoogleAnalytics gaId="G-50F2MTE5Q1" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center bg-fundo bg-fill items-center`}
      >
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
        <ServiceWorkerInitializer />
        <DownloadAppButton />
      </body>
    </html>
  );
}
