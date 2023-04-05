import { AppProps } from "next/app";
import Head from "next/head";
import { Lora } from "next/font/google";

import Footer from "../../components/Footer";
import "../styles/global.css";

const font = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={font.className}>
      <Head>
        <title>Rafael Araújo</title>
        <meta name="description" content="Rafael Araújo - Software Developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <>
        <Component {...pageProps} />
        <Footer />
      </>
    </main>
  );
}
