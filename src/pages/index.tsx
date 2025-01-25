import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import HeroImage from "@site/static/img/Time machine-amico.svg";
import Star from "@site/static/img/alarm_star.svg";

import styles from "./index.module.css";
import "./index.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <main className={clsx(styles.heroMain)}>
        <div className={clsx(styles.HeroText)}>
          <h1>
            A Precise OBS Browser Source Stream Marathon Timer
          </h1>
          <div className="my-4 h-2 w-24"></div>
          <p className={clsx(styles.descText)}>
            Track your stream start time with pinpoint accuracy down to the
            millisecond with our OBS Browser Source Stream Marathon Timer.
          </p>
          <div className={clsx(styles.LinkRow)}>
          <Link className={clsx("button button--lg", styles.heroBtn)} to="/api">
            <Star className="Star"/> Get Started Now
          </Link>
          </div>
        </div>
        <div className="HeroImage">
          <HeroImage
            title="Hero Header Image"
            className="heroObject"
          />
        </div>
      </main>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Docs for an elapse time counter for OBS"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
