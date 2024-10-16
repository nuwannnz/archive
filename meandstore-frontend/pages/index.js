import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <div className="text-white bg-black">
      <NextSeo
        title="Home: MeAndStore"
        description="Welcome to MeAndStore homepage."
        canonical="https://www.meandstore.com/"
        openGraph={{
          url: "https://www.meandstore.com",
        }}
      />
      <Head>
        <title>MeAndStore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
