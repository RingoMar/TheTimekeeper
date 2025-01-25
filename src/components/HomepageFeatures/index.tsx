import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import KaiUse from "./kai";
import SpeedUse from "./speed";
import SunnyUse from "./sunny";

import TKFeatureList from "./features";
import PolicyCards from "./Details";

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={clsx(styles.features)}>
      <div className="container">
        <div className={clsx("row", styles.gap)}>
          <div className={clsx(styles.HeaderContainer)}>
            <h1>POPULAR AMONG THESE CREATORS</h1>
            <span>
              Created for kaicenat in under 30 minutes when his old timer
              failed.
            </span>
          </div>
          <div className={clsx(styles.displayRow)}>
            <KaiUse />
            <SpeedUse />
            <SunnyUse />
          </div>
        </div>
        <div className={clsx("row", styles.gap)}>
          <div className={clsx(styles.HeaderContainer)}>
            <h1>A User focused desgin</h1>
            <span>
              Somethings go without saying, same with from features happend
              without thinking.
            </span>
          </div>
          <TKFeatureList />
          <div className={clsx(styles.HeaderContainer)}>
            <h1>Built for Streaming</h1>
            <span>
              Using an API you can get easy acess the timer and even change some
              features
            </span>
          </div>
          <PolicyCards />
        </div>
      </div>
    </section>
  );
}
