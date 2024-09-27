import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  icons: '/favicon.png',
  openGraph: {
    title: "GRUPO FP - OFICIAL",
    description: "Site de sorteio de Plataformas recomendadas - GRUPO FP OFICIAL",
    url: "https://www.grupofp.com.br",
    siteName: "FP - SINAIS SLOTS",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: '../../public/favicon.png',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center bg-fundo bg-fill items-center`}
      >
        {children}
      </body>
    </html>
  );
}
