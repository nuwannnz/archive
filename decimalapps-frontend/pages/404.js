import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NextSeo } from "next-seo";

export default function Contact() {
  return (
    <div className="text-black flex flex-col min-h-screen">
      <NextSeo
        title="404: nine4"
        description="404 Page for all our missing pages"
        canonical="https://nine4-1.vercel.app/404"
        openGraph={{
          url: "https://nine4-1.vercel.app/404",
        }}
      />
      <Head>
        <title>DecimalApps</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="flex flex-col items-center justify-center flex-grow" style={{height:"80vh"}}>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl">
          404 – Unavailable
        </h1>
        <a
          className="w-64 p-1 mx-auto font-bold text-center text-black border border-gray-500 rounded-lg sm:p-4"
          href="/"
        >
          Return Home
        </a>
      </div>

      <Footer />
    </div>
  );
}
