import React, { ReactNode, useState } from "react";
import FloatingLabelInput from "./resources/FloatingLabelInput";
import ExpandableText from "./resources/ExpandableText";
import "./styles.api.css";
import CopyIcon from "./copy";

export default function APICallWebsite(): JSX.Element {
  const [showTooltip, setShowTooltip] = useState(false);
  const [CHANNEL_NAME, SETCHANNEL_NAME] = useState("");
  const [VIDEO_ID, SETVIDEO_ID] = useState("");
  const [output, setOutput] = useState("");
  const [isSunny, setIsSunny] = useState(true);
  const [isStroke, setIsStroke] = useState(false);
  const [isWhite, setIsWhite] = useState(false);
  const [rangeStroke, setRangeStroke] = useState(2);
  const [uriName, setUriName] = useState<string>(
    "https://feelsunnyman.github.io/tools/timer/"
  );
  const [createdAt, setcreatedAt] = useState("");
  const [copyButton, setcopyButton] = useState<string | ReactNode>(
    <CopyIcon />
  );

  const extractVideoId = (url: any) => {
    const parts = url.split("/");
    const lastPartWithQuery = parts[parts.length - 1];
    const lastPart = lastPartWithQuery.split("?")[0];
    if (!isNaN(lastPart)) {
      return lastPart;
    } else {
      return null;
    }
  };

  const updateWhite = () => {
    setIsWhite(!isWhite);
  };

  const changeUrl = () => {
    setIsSunny(!isSunny);
    setUriName(
      isSunny
        ? "https://ringomar.github.io/timer/"
        : "https://feelsunnyman.github.io/tools/timer/"
    );
  };

  const updateStroke = (e) => {
    setRangeStroke(e.target.value);
    setIsStroke(e.target.value != 2);
  };

  const copyToClipboard = () => {
    try {
      if (!createdAt) {
        throw new Error("No time");
      }
      let addStroke = isStroke ? `&stroke=${rangeStroke}` : "";
      let addWhite = isWhite ? `&white=${isWhite}` : "";

      navigator.clipboard
        .writeText(`${uriName}?time=${createdAt}${addStroke}${addWhite}`)
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
      setcopyButton(error);
    }

    setTimeout(() => {
      setcopyButton(<CopyIcon />);
    }, 1700);
  };

  const checkLive = async () => {
    try {
      let gqlQuery = {
        operationName: "UseLive",
        query:
          "query UseLive($channelLogin: String!) { user(login: $channelLogin) { id login stream { id createdAt __typename } __typename  }}",
        variables: {
          channelLogin: CHANNEL_NAME.toLowerCase(),
        },
      };

      const response = await fetch("https://gql.twitch.tv/gql", {
        method: "post",
        headers: {
          "client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gqlQuery),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const streamlive = await response.json();
      console.log(streamlive);
      // Check if the video property is null
      if (streamlive.data.user.stream === null) {
        throw new Error("Bad request: Channel Not live!");
      }
      setcreatedAt(streamlive.data.user.stream.createdAt);
      setOutput(JSON.stringify(streamlive, null, 2));
    } catch (error) {
      console.error("Error:", error);
      setOutput("Error occurred. Please try again. " + error);
    }
  };

  const makeAPICall = async () => {
    try {
      let gqlQuery = {
        operationName: "VideoMetadata",
        query:
          "query VideoMetadata($channelLogin: String!, $videoID: ID!) {  user(login: $channelLogin) { id primaryColorHex isPartner profileImageURL(width: 70) lastBroadcast { id startedAt __typename } __typename }  currentUser { id __typename } video(id: $videoID) {   id title description previewThumbnailURL(height: 60, width: 90) createdAt viewCount publishedAt lengthSeconds broadcastType owner { id login displayName __typename } game { id slug boxArtURL name displayName __typename }  __typename }}",
        variables: {
          channelLogin: CHANNEL_NAME.toLowerCase(),
          videoID: extractVideoId(VIDEO_ID),
        },
      };

      const response = await fetch("https://gql.twitch.tv/gql", {
        method: "post",
        headers: {
          "client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gqlQuery),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const VideoMetadata = await response.json();

      // Check if the video property is null
      if (VideoMetadata.data?.video === null) {
        throw new Error("Bad request: No video found");
      }
      setcreatedAt(VideoMetadata.data.video.createdAt);
      setOutput(JSON.stringify(VideoMetadata, null, 2));
    } catch (error) {
      console.error("Error:", error);
      setOutput("Error occurred. Please try again. " + error);
    }
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
    <div className="container container-api">
      <h1>Retrieve Stream Start Time</h1>
      <p>
        This page enables you to fetch information about a Twitch stream, like
        its start time and other details, using an API call. You just need to
        provide the <strong className="apistrong">channel name</strong> and the{" "}
        <strong className="apistrong">video ID</strong>, and it will handle the
        rest, giving you the data you need for your application.
      </p>
      <div className="apiContent">
        <div className="callcenter">
          <h3>CREATE URL</h3>
          <div className="create-time">
            <div className="create-container">
              <div className={`customTime`}>
                <div className="infoTwitch time-container-preview">
                  <h3>
                    Use Twitch's GraphQL API to retrieve the precise time in UTC
                    seconds.
                  </h3>
                  <small className="highlight">
                    *Use the{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F5FAD5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                    </svg>{" "}
                    to fetch the current live stream{" "}
                  </small>
                  <div className="flex-box">
                    <div className="SunCheck">
                      <label
                        htmlFor="feelSunny"
                        title="Feelng Sunny?"
                        className="radioBtn"
                      >
                        <input
                          title="Feelng Sunny?"
                          type="checkbox"
                          id="feelSunny"
                          className="radioAction"
                          defaultChecked={isSunny}
                          onClick={changeUrl}
                        />
                        ☀️?
                      </label>
                    </div>
                    <div className="setOutline">
                      <label
                        htmlFor="outlineStroke"
                        title="Change Stroke outline"
                        className="radioBtn"
                      >
                        Text Outline: {rangeStroke}
                        <input
                          title="Feelng Sunny?"
                          type="range"
                          id="outlineStroke"
                          value={rangeStroke}
                          min={1}
                          max={10}
                          step={1}
                          onChange={updateStroke}
                        />
                      </label>
                    </div>

                    <div className="setWhite">
                      <label
                        htmlFor="allWhite"
                        title="Add text Shadow"
                        className="radioBtn"
                      >
                        White Text Mode
                        <input
                          title="Feelng Sunny?"
                          type="checkbox"
                          id="allWhite"
                          className="radioAction"
                          defaultChecked={isWhite}
                          onClick={updateWhite}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="codeBlockContent_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module outputLayer time-container-preview">
                  <pre
                    className="prism-code language-text codeBlock_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module thin-scrollbar"
                    style={{
                      color: "rgb(248, 248, 242)",
                      backgroundColor: "rgb(40, 42, 54)",
                      width: "100%",
                    }}
                  >
                    <code className="codeBlockLines_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module">
                      <span
                        className="token-line copy-container"
                        style={{ color: "rgb(248, 248, 242)" }}
                      >
                        <span className="token plain resp_copy">
                          {uriName}?time=
                          <strong>{createdAt}</strong>
                          {isStroke ? `&stroke=${rangeStroke}` : ""}
                          {isWhite ? `&white=${isWhite}` : ""}
                        </span>
                        <button
                          className="copy-button"
                          onClick={() => copyToClipboard()}
                        >
                          {copyButton}
                        </button>
                      </span>
                    </code>
                  </pre>
                </div>

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

                  <div className="smtBtn">
                    <button
                      className="submitButton"
                      onClick={makeAPICall}
                      disabled={!(VIDEO_ID && CHANNEL_NAME)}
                    >
                      Load Stream Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="debugContain">
          <h3>RAW OUTPUT</h3>
          <pre>
            <ExpandableText text={output} maxLength={200} />
          </pre>
        </div>
      </div>
    </div>
  );
}
