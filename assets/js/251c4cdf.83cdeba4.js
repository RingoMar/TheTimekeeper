"use strict";(self.webpackChunktiemr_documentation=self.webpackChunktiemr_documentation||[]).push([[109],{6168:(e,t,n)=>{n.r(t),n.d(t,{default:()=>h});var s=n(4586),i=n(781),a=n(6540),o=n(4848);const r=e=>{let{label:t,type:n="text",value:s,onChange:i,handleKeyDown:r}=e;const[l,c]=(0,a.useState)(!1);return(0,o.jsxs)("div",{className:"floating-label-input "+(l||s?"active":""),children:[(0,o.jsx)("input",{type:n,value:s,onChange:e=>i(e.target.value),onFocus:()=>c(!0),onBlur:()=>c(!!s),onKeyDown:e=>r(e),className:"floating-input"}),(0,o.jsx)("label",{className:"floating-label",children:t})]})},l=e=>{let{text:t,maxLength:n=100}=e;const[s,i]=(0,a.useState)(!1),r=t.length>n;return(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{children:s||!r?t:`${t.substring(0,n)}...`}),r&&(0,o.jsx)("button",{onClick:()=>{i(!s)},children:s?"Read Less":"Read More"})]})},c=e=>{let{size:t=24,color:n="#ffffff"}=e;return(0,o.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:n,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"}),(0,o.jsx)("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]})};function d(){const[e,t]=(0,a.useState)(!1),[n,s]=(0,a.useState)(""),[i,d]=(0,a.useState)(""),[h,u]=(0,a.useState)(""),[m,p]=(0,a.useState)(!0),[g,x]=(0,a.useState)(!1),[v,j]=(0,a.useState)(2),[y,w]=(0,a.useState)("https://feelsunnyman.github.io/tools/timer/"),[k,b]=(0,a.useState)(""),[N,f]=(0,a.useState)((0,o.jsx)(c,{})),C=e=>{const t=e.split("/"),n=t[t.length-1].split("?")[0];return isNaN(n)?null:n},S=async()=>{try{let e={operationName:"UseLive",query:"query UseLive($channelLogin: String!) { user(login: $channelLogin) { id login stream { id createdAt __typename } __typename  }}",variables:{channelLogin:n.toLowerCase()}};const t=await fetch("https://gql.twitch.tv/gql",{method:"post",headers:{"client-id":"kimne78kx3ncx6brgo4mv6wki5h1ko",Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);const s=await t.json();if(console.log(s),null===s.data.user.stream)throw new Error("Bad request: Channel Not live!");b(s.data.user.stream.createdAt),u(JSON.stringify(s,null,2))}catch(e){console.error("Error:",e),u("Error occurred. Please try again. "+e)}};return(0,o.jsxs)("div",{className:"container container-api",children:[(0,o.jsx)("h1",{children:"Retrieve Stream Start Time"}),(0,o.jsxs)("p",{children:["This page enables you to fetch information about a Twitch stream, like its start time and other details, using an API call. You just need to provide the ",(0,o.jsx)("strong",{className:"apistrong",children:"channel name"})," and the"," ",(0,o.jsx)("strong",{className:"apistrong",children:"video ID"}),", and it will handle the rest, giving you the data you need for your application."]}),(0,o.jsxs)("div",{className:"apiContent",children:[(0,o.jsxs)("div",{className:"callcenter",children:[(0,o.jsx)("h3",{children:"CREATE URL"}),(0,o.jsx)("div",{className:"create-time",children:(0,o.jsx)("div",{className:"create-container",children:(0,o.jsxs)("div",{className:"customTime",children:[(0,o.jsxs)("div",{className:"infoTwitch time-container-preview",children:[(0,o.jsx)("h3",{children:"Use Twitch's GraphQL API to retrieve the precise time in UTC seconds."}),(0,o.jsxs)("small",{className:"highlight",children:["*Use the"," ",(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"#F5FAD5",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("path",{d:"M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"})})," ","to fetch the current live stream"," "]}),(0,o.jsxs)("div",{className:"flex-box",children:[(0,o.jsx)("div",{className:"SunCheck",children:(0,o.jsxs)("label",{htmlFor:"feelSunny",title:"Feelng Sunny?",className:"radioBtn",children:[(0,o.jsx)("input",{title:"Feelng Sunny?",type:"checkbox",id:"feelSunny",className:"radioAction",defaultChecked:m,onClick:()=>{p(!m),w(m?"https://ringomar.github.io/timer/":"https://feelsunnyman.github.io/tools/timer/")}}),"\u2600\ufe0f?"]})}),(0,o.jsx)("div",{className:"setOutline",children:(0,o.jsxs)("label",{htmlFor:"outlineStroke",title:"Change Stroke outline",className:"radioBtn",children:["Text Outline: ",v,(0,o.jsx)("input",{title:"Feelng Sunny?",type:"range",id:"outlineStroke",value:v,min:1,max:10,step:1,onChange:e=>{j(e.target.value),x(2!=e.target.value)}})]})})]})]}),(0,o.jsx)("div",{className:"codeBlockContent_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module outputLayer time-container-preview",children:(0,o.jsx)("pre",{className:"prism-code language-text codeBlock_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module thin-scrollbar",style:{color:"rgb(248, 248, 242)",backgroundColor:"rgb(40, 42, 54)",width:"100%"},children:(0,o.jsx)("code",{className:"codeBlockLines_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module",children:(0,o.jsxs)("span",{className:"token-line copy-container",style:{color:"rgb(248, 248, 242)"},children:[(0,o.jsxs)("span",{className:"token plain resp_copy",children:[y,"?time=",(0,o.jsx)("strong",{children:k}),g?`&stroke=${v}`:""]}),(0,o.jsx)("button",{className:"copy-button",onClick:()=>(()=>{try{if(!k)throw new Error("No time");let e=g?`&stroke=${v}`:"";navigator.clipboard.writeText(`${y}?time=${k}${e}`).then((()=>{console.log("Text copied to clipboard:",k),f("Copied!")})).catch((e=>{throw console.error("Unable to copy text to clipboard:",e),new Error(e)}))}catch(e){f(e)}setTimeout((()=>{f((0,o.jsx)(c,{}))}),1700)})(),children:N})]})})})}),(0,o.jsxs)("div",{className:"time-container-preview",children:[(0,o.jsxs)("div",{className:"fetch-vod",children:[(0,o.jsx)(r,{label:"TWITCH USER NAME",value:n,onChange:s,handleKeyDown:e=>{"Enter"===e.key&&S()}}),(0,o.jsxs)("div",{className:"fetch-button",children:[(0,o.jsx)("button",{onMouseEnter:()=>t(!0),onMouseLeave:()=>t(!1),onClick:S,children:(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"25",height:"25",viewBox:"0 0 24 24",fill:"none",stroke:"#F5FAD5",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("path",{d:"M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"})})}),e&&(0,o.jsx)("div",{className:"fetch-tool-tip",children:"Fetch current vod"})]})]}),(0,o.jsx)(r,{label:"VOD LINK",value:i,onChange:d,handleKeyDown:e=>{"Enter"===e.key&&S()}}),(0,o.jsx)("div",{className:"smtBtn",children:(0,o.jsx)("button",{className:"submitButton",onClick:async()=>{try{let e={operationName:"VideoMetadata",query:"query VideoMetadata($channelLogin: String!, $videoID: ID!) {  user(login: $channelLogin) { id primaryColorHex isPartner profileImageURL(width: 70) lastBroadcast { id startedAt __typename } __typename }  currentUser { id __typename } video(id: $videoID) {   id title description previewThumbnailURL(height: 60, width: 90) createdAt viewCount publishedAt lengthSeconds broadcastType owner { id login displayName __typename } game { id slug boxArtURL name displayName __typename }  __typename }}",variables:{channelLogin:n.toLowerCase(),videoID:C(i)}};const t=await fetch("https://gql.twitch.tv/gql",{method:"post",headers:{"client-id":"kimne78kx3ncx6brgo4mv6wki5h1ko",Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);const s=await t.json();if(null===s.data?.video)throw new Error("Bad request: No video found");b(s.data.video.createdAt),u(JSON.stringify(s,null,2))}catch(e){console.error("Error:",e),u("Error occurred. Please try again. "+e)}},disabled:!(i&&n),children:"Load Stream Data"})})]})]})})})]}),(0,o.jsxs)("div",{className:"debugContain",children:[(0,o.jsx)("h3",{children:"RAW OUTPUT"}),(0,o.jsx)("pre",{children:(0,o.jsx)(l,{text:h,maxLength:200})})]})]})]})}function h(){const{siteConfig:e}=(0,s.A)();return(0,o.jsx)(i.A,{title:"API",description:"Ringo Mar's Timer browser source for OBS",children:(0,o.jsx)("main",{children:(0,o.jsx)(d,{})})})}}}]);