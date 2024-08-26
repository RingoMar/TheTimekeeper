import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import GenerateCustomTime from "../components/customTime";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Custom Time`}
      description="Ringo Mar's Timer browser source for OBS"
    >
      <main>
        <GenerateCustomTime />
      </main>
    </Layout>
  );
}
