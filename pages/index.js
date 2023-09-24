import Head from "next/head";
import Header from "@components/Header";
import { capitalizeFirstLetter } from "../lib/ultis";
import useSWR from "swr";
import MyCountdown from "@components/MyCountdown";
import MyBackground from "@components/MyBackground";
import Dashboard from "@components/Dashboard";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
import {
  BrowserRouter as Router,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";

function Home() {
  const { data, error } = useSWR("/api/peoples/1", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const name = capitalizeFirstLetter(data.name);
  return (
    <MyBackground className="container">
      <Head>
        <title>Hi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title={`${name}'s World`} />
        <MyCountdown />
      </main>
    </MyBackground>
  );
}

export default function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
