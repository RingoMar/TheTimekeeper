import React, { ReactNode, useState } from "react";
import FloatingLabelInput from "./resources/FloatingLabelInput";
import ExpandableText from "./resources/ExpandableText";
import "./styles.api.css";
import CopyIcon from "./copy";

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
}

export default function APIYTCallWebsite({ yt_key }): JSX.Element {
  const [showTooltip, setShowTooltip] = useState(false);
  const [CHANNEL_LINK, SETCHANNEL_LINK] = useState("");
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
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : null;
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

  const makeAPICall = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${extractVideoId(
          CHANNEL_LINK
        )}&key=${yt_key}`,
        {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const VideoMetadata: YTapi = await response.json();
      // Check if the video property is null
      if (VideoMetadata.items[0].liveStreamingDetails == null) {
        throw new Error("Bad request: Not a live stream");
      }
      setcreatedAt(VideoMetadata.items[0].liveStreamingDetails.actualStartTime);
      setOutput(JSON.stringify(VideoMetadata, null, 2));
    } catch (error) {
      console.error("Error:", error);
      setOutput("Error occurred. Please try again. " + error);
    }
  };

  const handleKeyDownVod = (event: { key: string }) => {
    if (event.key === "Enter") {
      makeAPICall();
    }
  };

  return (
    <div className="container-api">
      <h1>Retrieve Youtube Stream Start Time</h1>
      <p>
        This page enables you to fetch information about a Youtube stream, like
        its start time and other details, using an API call. You just need to
        provide the <strong className="apistrong">Youtube Link</strong>, and it
        will handle the rest.
      </p>
      <div className="ytapiContent">
        <div className="callcenter">
          <h3>CREATE URL</h3>
          <div className="create-time">
            <div className="create-container">
              <div className={`customTime`}>
                <div className="infoTwitch time-container-preview">
                  <h3>
                    Useing Youtube's Api 3 to retrieve the precise start time in
                    UTC.
                  </h3>
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
                      label="Live Youtube Link or Video ID"
                      value={CHANNEL_LINK}
                      onChange={SETCHANNEL_LINK}
                      handleKeyDown={handleKeyDownVod}
                    />
                  </div>

                  <div className="smtBtn">
                    <button
                      className="submitButton"
                      onClick={makeAPICall}
                      disabled={!CHANNEL_LINK}
                    >
                      Load Youtube Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ytdebugContain">
          <h3>RAW OUTPUT</h3>
          <pre>
            <ExpandableText text={output} maxLength={200} />
          </pre>
        </div>
      </div>
    </div>
  );
}
