import React, { ReactNode, useState } from "react";
import TimeSelector from "./resources/TimeSelector";
import "../apiFeatures/styles.api.css";
import CopyIcon from "./resources/copy";

export default function GenerateCustomTime(): JSX.Element {
  const [isSunny, setIsSunny] = useState(true);
  const [isDown, setIsDown] = useState(false);
  const [uriName, setUriName] = useState<string>(
    "https://feelsunnyman.github.io/tools/timer/"
  );
  const [createdAt, setcreatedAt] = useState("");
  const [copyButton, setcopyButton] = useState<string | ReactNode>(
    <CopyIcon />
  );

  const handleCreatedTime = (createdAt: string) => {
    setcreatedAt(createdAt);
  };

  const updateUrl = (newIsSunny: boolean, newIsDown: boolean) => {
    let url = "";

    if (newIsSunny) {
      url = newIsDown
        ? "https://feelsunnyman.github.io/tools/down/"
        : "https://feelsunnyman.github.io/tools/timer/";
    } else {
      url = newIsDown
        ? "https://ringomar.github.io/timer/down"
        : "https://ringomar.github.io/timer/";
    }

    setUriName(url);
  };

  const changeUrl = () => {
    const toggledSunny = !isSunny;
    setIsSunny(toggledSunny);
    updateUrl(toggledSunny, isDown);
  };

  const changeDown = () => {
    const toggledDown = !isDown;
    setIsDown(toggledDown);
    updateUrl(isSunny, toggledDown);
  };

  const copyToClipboard = () => {
    try {
      if (!createdAt) {
        throw new Error("No time");
      }
      navigator.clipboard
        .writeText(`${uriName}?time=${createdAt}`)
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

  return (
    <div className="container container-api">
      <h1>Create Custom Time</h1>
      <p>
        Set your timer with precision down to the second, for any time you need.
      </p>
      <div className="apiContent callcenter">
        <div className="cutsomFunctions">
          <div className="create-time">
            <h1>CREATE CUSTOM TIME URL</h1>
            <div className="outputLayer time-container-preview">
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
            <div className="settings-container">
              <div className="downSwitch">
                <label
                  htmlFor="isDown"
                  className="radioBtn"
                  title="start counting down to date"
                >
                  <input
                    title="start counting down to date"
                    type="checkbox"
                    id="isDown"
                    className="radioAction"
                    defaultChecked={isDown}
                    onClick={changeDown}
                  />
                  ⬇️?
                </label>
              </div>
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
            </div>
            <TimeSelector onCreatedAt={handleCreatedTime} />
          </div>

          <div className="previewFrame">
            <h1>TIMER PREVIEW</h1>
            <div className="ifame-display">
              <iframe
                id="scaled-frame"
                src={`${uriName}?time=${createdAt}`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
