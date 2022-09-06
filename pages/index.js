import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { capitalizeFirstLetter } from "../lib/ultis";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/peoples/1", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const name = capitalizeFirstLetter(data.name);
  return (
    <div className="container">
      <Head>
        <title>Hi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title={`${name} I love you`} />
        <p className="description">- Jimmy</p>
      </main>

      <Footer />
    </div>
  );
}
