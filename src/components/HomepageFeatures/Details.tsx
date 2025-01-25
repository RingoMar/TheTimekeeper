import Link from "@docusaurus/Link";
import React from "react";
import styles from "./PolicyCards.module.css";

type PolicyCardProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  theme: "red" | "purple"; // For different card themes
};

function PolicyCard({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonLink,
  theme,
}: PolicyCardProps) {
  return (
    <div className={`${styles.card} ${styles[theme]}`}>
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} />
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className={styles.description}>{description}</p>
      <Link href={buttonLink} className={styles.button}>
        <Icon className={styles.buttonIcon} />
        {buttonText}
      </Link>
    </div>
  );
}

export default function PolicyCards() {
  return (
    <div className={styles.cardContainer}>
      <PolicyCard
        icon={(props) => (
          <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="#000"
          >
            <path d="M12.04 3.5c.59 0 7.54.02 9.34.5a3.02 3.02 0 0 1 2.12 2.15C24 8.05 24 12 24 12v.04c0 .43-.03 4.03-.5 5.8A3.02 3.02 0 0 1 21.38 20c-1.76.48-8.45.5-9.3.51h-.17c-.85 0-7.54-.03-9.29-.5A3.02 3.02 0 0 1 .5 17.84c-.42-1.61-.49-4.7-.5-5.6v-.5c.01-.9.08-3.99.5-5.6a3.02 3.02 0 0 1 2.12-2.14c1.8-.49 8.75-.51 9.34-.51zM9.54 8.4v7.18L15.82 12 9.54 8.41z" />
          </svg>
        )}
        title="Connect With Youtube"
        description="Add a live YouTube link to easily access the actual start time of any event."
        buttonText="Youtube API"
        buttonLink="/api"
        theme="red"
      />
      <PolicyCard
        icon={(props) => (
          <svg
            {...props}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill="#ffffff"
                d="M13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8v5.5z"
              ></path>{" "}
              <g fill="#9146FF">
                {" "}
                <path d="M4.5 1L2 3.5v9h3V15l2.5-2.5h2L14 8V1H4.5zM13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8v5.5z"></path>{" "}
                <path d="M11.5 3.75h-1v3h1v-3zM8.75 3.75h-1v3h1v-3z"></path>{" "}
              </g>{" "}
            </g>
          </svg>
        )}
        title="Connect With Twitch"
        description="Use the Twitch API to retrieve the current stream or a past stream to start recording an event"
        buttonText="Twitch API"
        buttonLink="/yt-api"
        theme="purple"
      />
    </div>
  );
}
