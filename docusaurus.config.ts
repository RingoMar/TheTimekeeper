import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import "dotenv/config";

const config: Config = {
  title: "The Timekeeper",
  tagline: "Count your numbers",
  favicon: "./img/favicon.ico",

  // Set the production url of your site here
  url: "https://ringomar.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/TheTimekeeper/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "RingoMar", // Usually your GitHub org/user name.
  projectName: "TheTimekeeper", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  customFields: {
    // Put your custom environment here
    yt_key: process.env.REACT_APP_YT_KEY,
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "fa", "de", "sa", "fn"],
    localeConfigs: {
      en: {
        htmlLang: "en-GB",
      },
    },
  },

  presets: [
    [
      "classic",
      {
        gtag: {
          trackingID: "G-0GS2KLZXCG",
          anonymizeIP: true,
        },
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "The Timekeeper",
      logo: {
        alt: "Logo",
        src: "img/favicon.ico",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
        {
          to: "/api",
          sidebarid: "apiSidebar",
          position: "left",
          label: "Broadcast API",
        },
        {
          to: "/yt-api",
          sidebarid: "apiSidebar",
          position: "left",
          label: "Youtube API",
        },
        {
          to: "/custom",
          sidebarid: "customSidebar",
          position: "left",
          label: "Custom Time",
        },
        {
          href: "https://github.com/FeelSunnyMan/tools",
          label: "Project",
          position: "right",
        },
        {
          href: "https://ko-fi.com/ringomar",
          label: "Tip",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Links",
          items: [
            {
              label: "RingoMar",
              href: "https://github.com/RingoMar",
            },
          ],
        },
        {
          title: "Donate",
          items: [
            {
              label: "Support Me on Ko-fi",
              href: "https://ko-fi.com/ringomar",
            },
          ],
        },
        {
          title: "Legal",
          items: [
            { label: "Privacy", href: "https://ringomar.github.io/policy" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} RingoMar. This website is not affiliated or endorsed by Twitch Interactive Inc., Google or YouTube.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
