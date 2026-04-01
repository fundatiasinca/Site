import { GetStaticProps } from "next";
import { createClient } from "../prismicio";
import { Content, asText, asLink } from "@prismicio/client";

interface HomeProps {
  navigation: Content.NavigationDocument;
  settings: Content.SettingsDocument;
}

export default function Home({ navigation, settings }: HomeProps) {
  return (
    <div>
      
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");
  const pages = await client.getAllByType("page");

  return {
    props: {
      navigation,
      settings,
      pages,
    },
  };
};