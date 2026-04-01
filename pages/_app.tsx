import type { AppProps } from "next/app";
import { GetStaticProps } from "next";
import { createClient } from "../prismicio";
import { Content } from "@prismicio/client";
import Navigation from "../components/Navigation";

interface AppPropsWithPages extends AppProps {
  pageProps: {
    pages?: Content.PageDocument[];
  };
}

export default function App({ Component, pageProps }: AppPropsWithPages) {
  return (
    <>
    <h1>Fundatia Sinca</h1>
      {pageProps.pages && <Navigation pages={pageProps.pages} />}
      <Component {...pageProps} />
    </>
  );
}