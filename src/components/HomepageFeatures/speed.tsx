import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

import AviSpeed from "@site/static/img/speed.jpg";

const SpeedUse = () => {
  return (
    <div className={clsx(styles.channelHeader)}>
      <div className={clsx(styles.avatarSection)}>
        <div
          className={clsx(styles.avatarHalo)}
          aria-label="Channel Avatar Halo Transparent"
        >
          <div className={clsx(styles.avatarBackground)}></div>
          <div
            className={clsx(styles.avatarImage)}
            aria-label="Channel Avatar Picture"
          >
            <a href="https://www.youtube.com/@IShowSpeed">
              <div className={clsx(styles.avatarWrapper)}>
                <img
                  className={clsx(styles.avatarImg)}
                  title="ISHowSpeed"
                  src={AviSpeed}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className={clsx(styles.channelInfo)}>
        <a href="https://www.youtube.com/@IShowSpeed">
          <div className={clsx(styles.channelDetails)}>
            <span className={clsx(styles.channelName)}>IShowSpeed</span>
            <div className={clsx(styles.verifiedBadgeYT)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                focusable="false"
                aria-hidden="true"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"></path>
              </svg>
            </div>
          </div>
        </a>
        <p className={clsx(styles.followerCount)}>34.6M+ subscribers</p>
      </div>
    </div>
  );
};

export default SpeedUse;
