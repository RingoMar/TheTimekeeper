import React, { ReactNode, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import CopyIcon from "../assets/copy";
import styles from "./api.module.css";
import Settings from "../assets/settings";
import ApiCloud from "../assets/api";
import HelpCircle from "../assets/HelpCircle";
import FloatingLabelInput from "./resources/FloatingLabelInput";

export default function APICallWebsite(): JSX.Element {
  const [showTooltip, setShowTooltip] = useState(false);
  const [CHANNEL_NAME, SETCHANNEL_NAME] = useState("");
  const [VIDEO_ID, SETVIDEO_ID] = useState("");
  const [isSunny, setIsSunny] = useState(true);
  const [isWhite, setIsWhite] = useState(false);
  const [rangeStroke, setRangeStroke] = useState(2);
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);
  const [uriName, setUriName] = useState<string>(
    "https://feelsunnyman.github.io/tools/timer/"
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
        : "https://feelsunnyman.github.io/tools/timer/"
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

  const checkLive = async () => {
    if (!CHANNEL_NAME) {
      return;
    }
    try {
      const response = await fetch(`https://gomar.vercel.app/broadcastlive`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://ringomar.github.io",
        },
        body: JSON.stringify({ channelname: CHANNEL_NAME }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const streamlive = await response.json();
      if (streamlive.data.user.stream === null) {
        throw new Error("Bad request: Channel Not live!");
      }

      setUpdated(true);
      setTimeParms((prevtimeParms) => ({
        ...prevtimeParms,
        time: streamlive.data.user.stream.createdAt,
      }));
      setcreatedAt(streamlive.data.user.stream.createdAt);
      console.log(JSON.stringify(streamlive, null, 2));
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setError("Error occurred. Channel may not be live!");
    }

    setTimeout(() => {
      setUpdated(false);
    }, 600);
  };

  const makeAPICall = async () => {
    try {
      const response = await fetch(`https://gomar.vercel.app/broadcast`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://ringomar.github.io",
        },
        body: JSON.stringify({ channelname: CHANNEL_NAME, videoid: VIDEO_ID }),
      });

      if (!response.ok) {
        throw new Error(`API ERROR: ${response.status}`);
      }

      const VideoMetadata = await response.json();

      // Check if the video property is null
      if (VideoMetadata.data?.video === null) {
        throw new Error("Bad request: No video found");
      }
      setUpdated(true);
      setTimeParms((prevtimeParms) => ({
        ...prevtimeParms,
        time: VideoMetadata.data.video.createdAt,
      }));
      setcreatedAt(VideoMetadata.data.video.createdAt);
      console.log(JSON.stringify(VideoMetadata, null, 2));
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setError("Error occurred. Unable to get channel data.");
    }

    setTimeout(() => {
      setUpdated(false);
    }, 600);
  };

  const handleKeyDownLive = (event: { key: string }) => {
    if (event.key === "Enter") {
      checkLive();
    }
  };

  const handleKeyDownVod = (event: { key: string }) => {
    if (event.key === "Enter") {
      checkLive();
    }
  };

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.APIcontainer)}>
        <div className={clsx("header-info", styles.copyClass)}>
          <div className={clsx(styles.headerIntro)}>
            <small>Twitch API Portal</small>
            <h3>
              Easily retrieve and display stream or VOD start times for Twitch
              below. Enter the Twitch username or VOD link, customize the timer
              settings, and copy the generated OBS browser source link.
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
              <h3>Twitch API</h3>
            </div>
            
            <small className="highlight">
                    *Use the{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                    </svg>{" "}
                    to fetch the current live stream{" "}
                  </small>
            <div className="time-container-preview">
              <div className="fetch-vod">
                <FloatingLabelInput
                  label="TWITCH USER NAME"
                  value={CHANNEL_NAME}
                  onChange={SETCHANNEL_NAME}
                  handleKeyDown={handleKeyDownLive}
                />
                <div className="fetch-button">
                  <button
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={checkLive}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F5FAD5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                    </svg>
                  </button>
                  {showTooltip && (
                    <div className="fetch-tool-tip">Fetch current vod</div>
                  )}
                </div>
              </div>
              <FloatingLabelInput
                label="VOD LINK"
                value={VIDEO_ID}
                onChange={SETVIDEO_ID}
                handleKeyDown={handleKeyDownVod}
              />

              <div className={styles.smtBtn}>
                <button
                  className={styles.loadApi}
                  onClick={makeAPICall}
                  disabled={!(VIDEO_ID && CHANNEL_NAME)}
                >
                  Load Stream Data
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
              <h4 style={{ flexDirection: "row" }}>
                FEELING <span className={clsx(styles.Sunny)}>SUNNY?</span>
              </h4>

              <label className={styles.inputOverwrite}>
                <input
                  title="Feelng Sunny?"
                  type="checkbox"
                  id="feelSunny"
                  className={clsx("customRadio")}
                  defaultChecked={isSunny}
                  onClick={changeUrl}
                />
                <span className={styles.customCheckbox}></span>
              </label>
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
