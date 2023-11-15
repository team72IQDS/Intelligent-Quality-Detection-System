import "@/styles/globals.css";
import "@/styles/DataGraphs.css";
import "@/styles/DataTable.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
