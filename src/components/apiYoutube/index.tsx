import React, { ReactNode, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import CopyIcon from "../assets/copy";
import styles from "./YTapi.module.css";
import Settings from "../assets/settings";
import ApiCloud from "../assets/api";
import HelpCircle from "../assets/HelpCircle";
import FloatingLabelInput from "./resources/FloatingLabelInput";

interface YTliveStreamingDetails {
  actualStartTime: string;
  scheduledStartTime: string;
  concurrentViewers: string;
  activeLiveChatId: string;
}

interface YTitems {
  kind: string;
  etag: string;
  id: string;
  liveStreamingDetails?: YTliveStreamingDetails;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface YTapi {
  kind: string;
  etag: string;
  items: YTitems[];
  pageInfo: PageInfo;
  error?: string
}

export default function APIYTCallWebsite(): JSX.Element {
  const [CHANNEL_LINK, SETCHANNEL_LINK] = useState("");
  const [isSunny, setIsSunny] = useState(true);
  const [isWhite, setIsWhite] = useState(false);
  const [rangeStroke, setRangeStroke] = useState(2);
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);
  const [uriName, setUriName] = useState<string>(
    "https://ringomar.github.io/timer/"
  );
  const [createdAt, setcreatedAt] = useState("");
  const [timeParms, setTimeParms] = useState({
    time: null,
    stroke: null,
    white: false,
  });
  const [copyButton, setcopyButton] = useState<string | ReactNode>(
    <CopyIcon />
  );

  const changeUrl = () => {
    setIsSunny(!isSunny);
    setUriName(
      isSunny
        ? "https://ringomar.github.io/timer/"
        : "https://ringomar.github.io/timer/"
    );
  };

  const updateStroke = (e) => {
    if (e.target.value === "2") {
      setTimeParms((prevtimeParms) => ({ ...prevtimeParms, stroke: null }));
      setRangeStroke(e.target.value);
    } else {
      setRangeStroke(e.target.value);
      setTimeParms((prevtimeParms) => ({
        ...prevtimeParms,
        stroke: e.target.value,
      }));
    }
  };

  const updateWhite = () => {
    setTimeParms((prevtimeParms) => ({ ...prevtimeParms, white: !isWhite }));
    setIsWhite(!isWhite);
  };

  /**
   * Using a URL object
   * A dynamic way to upgrade a URL or downgrade using a mull value
   * if the value is false it will be ignored / removed
   * @returns {string} The url as a string
   */
  function updateUrl(): string {
    const url = new URL(uriName);

    for (const key in timeParms) {
      if (timeParms[key] === null || timeParms[key] === false) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, timeParms[key]);
      }
    }

    return url.toString();
  }

  const copyToClipboard = () => {
    console.log("copy");

    try {
      if (!createdAt) {
        throw new Error("No time");
      }
      const timerURL: string = updateUrl();
      console.log(timerURL);
      navigator.clipboard
        .writeText(`${timerURL}`)
        .then(() => {
          console.log("Text copied to clipboard:", createdAt);
          setcopyButton("Copied!");

          // After 2 seconds, revert the button text back to "Copy"
        })
        .catch((error) => {
          console.error("Unable to copy text to clipboard:", error);
          throw new Error(error);
        });
    } catch (error) {
      console.log("Copy error:", error);
      setcopyButton("Error");
    }

    setTimeout(() => {
      setcopyButton(<CopyIcon />);
    }, 600);
  };

  const makeAPICall = async () => {
    try {
      const response = await fetch(`https://gomar.vercel.app/youtubelive`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://ringomar.github.io",
        },
        body: JSON.stringify({ stream: CHANNEL_LINK }),
      });

      if (!response.ok) {
        throw new Error(`API Error.`);
      }

      const VideoMetadata: YTapi = await response.json();

      setUpdated(true);
      setTimeParms((prevtimeParms) => ({
        ...prevtimeParms,
        time: VideoMetadata.items[0].liveStreamingDetails.actualStartTime,
      }));
      setcreatedAt(VideoMetadata.items[0].liveStreamingDetails.actualStartTime);
      
      console.log(JSON.stringify(VideoMetadata, null, 2));
    } catch (error) {
      console.error("Error:", error);
      setError("Error occurred, link might be invalid.")
    }

    setTimeout(() => {
      setUpdated(false);
    }, 600);
  };
  const handleKeyDownVod = (event: { key: string }) => {
    if (event.key === "Enter") {
      makeAPICall();
    }
  };

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.APIcontainer)}>
        <div className={clsx("header-info", styles.copyClass)}>
          <div className={clsx(styles.headerIntro)}>
            <small>Youtube API Portal</small>
            <h3>
              Easily get the accurate start time from a live YouTube Video by
              just entering the link, customize the timer settings, and copy the
              generated OBS browser source link.
            </h3>
          </div>
        </div>
        <div className={clsx("url-copy", styles.copyClass)}>
          <div className={styles.copyHelp}>
            <h3>OBS BROWER SOURCE LINK</h3>

            <Link to="/docs/obs-tutorial/bs">
              <div className={clsx(styles.urlHeader)}>
                <HelpCircle />
                <h3>HOW TO USE</h3>
              </div>
            </Link>
          </div>
          <div className={clsx("url-copy", styles.copyContainer)}>
            <span
              className={`${updated ? styles.flashText : ""} ${
                styles.ApiToken
              }`}
            >
              {updateUrl()}
            </span>
            <button
              className={styles.copybtn}
              onClick={() => copyToClipboard()}
            >
              {copyButton}
            </button>
          </div>
        </div>
        <div className={clsx(styles.configContainer)}>
          <div className={clsx(styles.configCard)}>
            <div className={clsx(styles.configHeader)}>
              <ApiCloud />
              <h3>Youtube API</h3>
            </div>

            <div className="time-container-preview">
              <div className={styles.fetchVod}>
                <FloatingLabelInput
                  label="Live Youtube Link or Video ID"
                  value={CHANNEL_LINK}
                  onChange={SETCHANNEL_LINK}
                  handleKeyDown={handleKeyDownVod}
                />
              </div>

              <div className="smtBtn">
                <button
                  className={styles.loadApi}
                  onClick={makeAPICall}
                  disabled={!CHANNEL_LINK}
                >
                  Load Youtube Data
                </button>
              </div>
            </div>
            <div className={styles.errorContainer}>
              <h3>{error}</h3>
            </div>
          </div>
          <div className={clsx(styles.configCard)}>
            <div className={clsx(styles.configHeader)}>
              <Settings />
              <h3>TIMER SETTINGS</h3>
            </div>
            <div className={clsx(styles.configItem)}>
              <h4>
                TEXT STROKE
                <small>Current Stroke:{rangeStroke}</small>
              </h4>
              <label
                className={clsx(styles.customRange, styles.inputOverwrite)}
              >
                <input
                  title="Time Outline"
                  type="range"
                  id="outlineStroke"
                  value={rangeStroke}
                  min={1}
                  max={10}
                  step={1}
                  onChange={updateStroke}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
            <div className={clsx(styles.configItem)}>
              <h4>
                REMOVE SHADOW <small>Makes the timer white</small>{" "}
              </h4>

              <label className={styles.inputOverwrite}>
                <input
                  title="white out mode"
                  type="checkbox"
                  id="allWhite"
                  className="radioAction"
                  defaultChecked={isWhite}
                  onClick={updateWhite}
                />
                <span className={styles.customCheckbox}></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
