import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Hi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Bonni I love you" />
        <p className="description">- Jimmy</p>
      </main>

      <Footer />
    </div>
  );
}
