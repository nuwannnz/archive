import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <div >
      <NextSeo
        title="Home: DecimalApps"
        description="Welcome to DecimalApps homepage."
        canonical="https://www.decimalapps.com/"
        openGraph={{
          url: "https://www.decimalapps.com",
        }}
      />
      <Head>
        <title>DecimalApps</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
