import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

import AviKai from "@site/static/img/kai.png";

const KaiUse = () => {
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
            <a href="https://twitch.tv/kaicenat">
              <div className={clsx(styles.avatarWrapper)}>
                <img
                  className={clsx(styles.avatarImg)}
                  title="KaiCenat"
                  src={AviKai}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className={clsx(styles.channelInfo)}>
        <a href="https://twitch.tv/kaicenat">
          <div className={clsx(styles.channelDetails)}>
            <span className={clsx(styles.channelName)}>KaiCenat</span>
            <div className={clsx(styles.verifiedBadge)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                aria-label="Verified Partner"
              >
                <path
                  fillRule="evenodd"
                  d="M12.5 3.5 8 2 3.5 3.5 2 8l1.5 4.5L8 14l4.5-1.5L14 8l-1.5-4.5ZM7 11l4.5-4.5L10 5 7 8 5.5 6.5 4 8l3 3Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </a>
        <p className={clsx(styles.followerCount)}>16M+ followers</p>
      </div>
    </div>
  );
};

export default KaiUse;
