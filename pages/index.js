import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { capitalizeFirstLetter } from "../lib/ultis";
import useSWR from "swr";
import Countdown, {
  zeroPad,
  calcTimeDelta,
  formatTimeDelta,
} from "react-countdown";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/peoples/1", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const feb25 = new Date("2023-02-25");
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
        <Countdown date={feb25} renderer={renderer}>
          <Completionist />
        </Countdown>
      </main>

      <Footer />
    </div>
  );
}

const renderer = ({ days, hours, minutes, seconds }) => (
  <div style={{ textAlign: "center" }}>
    {`${zeroPad(days)} days ${zeroPad(hours)} hours ${zeroPad(minutes)} minutes
    ${zeroPad(seconds)} seconds`}
    <br />
    LEFT TO GO TO JAPAN!
  </div>
);

const Completionist = () => <div>JAPAN!</div>;
