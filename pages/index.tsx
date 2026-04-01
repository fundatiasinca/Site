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
      <h1>Fundatia Sinca</h1>
      <nav>
        {navigation.data.links.map((item, index) => (
          <a key={index} href={asLink(item.link) || "#"}>
            {asText(item.label)}
          </a>
        ))}
      </nav>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      navigation,
      settings,
    },
  };
};