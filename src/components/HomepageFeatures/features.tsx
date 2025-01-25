import clsx from "clsx";
import React from "react";
import styles from "./Features.module.css";

type FeatureItem = {
  title: string;
  Svg: React.FC<React.SVGProps<SVGSVGElement>>;
  description: string;
};

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("featCard", styles.featureCard)}>
      <div className={styles.iconContainer}>
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

const features: FeatureItem[] = [
  {
    title: "Millisecond precision timing",
    Svg: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    description:
      "By utilizing endpoint data from streams, we achieve a highly accurate UTC timestamp.",
  },
  {
    title: "Easy integration with OBS",
    Svg: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        <path d="M14 3v5h5M12 18v-6M9 15h6" />
      </svg>
    ),
    description:
      "As a website link, it's seamless to add a new browser source and get the timer running.",
  },
  {
    title: "Compatibility with various streaming platforms",
    Svg: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
    description:
      "Compatibility with major streaming platforms like Twitch and YouTube.",
  },
  {
    title: "Controls",
    Svg: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 3h5v5M4 20L20.2 3.8M21 16v5h-5M15 15l5.1 5.1M4 4l5 5" />
      </svg>
    ),
    description:
      "The timer includes intuitive controls allowing you to pause, play, or reset the countdown at any moment, providing flexibility during your streaming sessions.",
  },
];

export default function TKFeatureList() {
  return (
    <div className={styles.featureList}>
      {features.map((feature, index) => (
        <Feature key={index} {...feature} />
      ))}
    </div>
  );
}
