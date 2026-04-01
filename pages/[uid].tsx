import { GetStaticPaths, GetStaticProps } from "next";
import { createClient } from "../prismicio";
import { Content , asText } from "@prismicio/client";

interface PageProps {
  page: Content.PageDocument;
}

export default function Page({ page }: PageProps) {
  return (
    <div>
      <h1>{asText(page.data.title)}</h1>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params, previewData }) => {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", params?.uid as string);

  return {
    props: { page },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = createClient();
  const pages = await client.getAllByType("page");

  return {
    paths: pages.map((page) => ({ params: { uid: page.uid } })),
    fallback: false,
  };
};