import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from "@theme/Layout";
import APIYTCallWebsite from "../components/apiYoutube";

export default function Home(): JSX.Element {
    const {
      siteConfig: {customFields},
    } = useDocusaurusContext();
  return (
    <Layout
      title={`Youtube API`}
      description="Ringo Mar's Timer browser source for OBS"
    >
      <main>
        <APIYTCallWebsite yt_key={customFields.yt_key}/>
      </main>
    </Layout>
  );
}
