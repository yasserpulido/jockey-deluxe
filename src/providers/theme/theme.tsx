import { css, Global } from "@emotion/react";

import PoppinsThin from "../../fonts/Poppins-Thin.ttf";
import PoppinsThinItalic from "../../fonts/Poppins-ThinItalic.ttf";
import PoppinsExtraLight from "../../fonts/Poppins-ExtraLight.ttf";
import PoppinsExtraLightItalic from "../../fonts/Poppins-ExtraLightItalic.ttf";
import PoppinsLight from "../../fonts/Poppins-Light.ttf";
import PoppinsLightItalic from "../../fonts/Poppins-LightItalic.ttf";
import PoppinsRegular from "../../fonts/Poppins-Regular.ttf";
import PoppinsItalic from "../../fonts/Poppins-Italic.ttf";
import PoppinsMedium from "../../fonts/Poppins-Medium.ttf";
import PoppinsMediumItalic from "../../fonts/Poppins-MediumItalic.ttf";
import PoppinsSemiBold from "../../fonts/Poppins-SemiBold.ttf";
import PoppinsSemiBoldItalic from "../../fonts/Poppins-SemiBoldItalic.ttf";
import PoppinsBold from "../../fonts/Poppins-Bold.ttf";
import PoppinsBoldItalic from "../../fonts/Poppins-BoldItalic.ttf";
import PoppinsExtraBold from "../../fonts/Poppins-ExtraBold.ttf";
import PoppinsExtraBoldItalic from "../../fonts/Poppins-ExtraBoldItalic.ttf";
import PoppinsBlack from "../../fonts/Poppins-Black.ttf";
import PoppinsBlackItalic from "../../fonts/Poppins-BlackItalic.ttf";

const global = css`
  @font-face {
    font-family: "PoppinsThin";
    src: local("Poppins-Thin"), url(${PoppinsThin}) format("truetype");
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsThinItalic";
    src: local("Poppins-ThinItalic"),
      url(${PoppinsThinItalic}) format("truetype");
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsExtraLight";
    src: local("Poppins-ExtraLight"),
      url(${PoppinsExtraLight}) format("truetype");
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsExtraLightItalic";
    src: local("Poppins-ExtraLightItalic"),
      url(${PoppinsExtraLightItalic}) format("truetype");
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsLight";
    src: local("Poppins-Light"), url(${PoppinsLight}) format("truetype");
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsLightItalic";
    src: local("Poppins-LightItalic"),
      url(${PoppinsLightItalic}) format("truetype");
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "Poppins";
    src: local("Poppins-Regular"), url(${PoppinsRegular}) format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsItalic";
    src: local("Poppins-Italic"), url(${PoppinsItalic}) format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsMedium";
    src: local("Poppins-Medium"), url(${PoppinsMedium}) format("truetype");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsMediumItalic";
    src: local("Poppins-MediumItalic"),
      url(${PoppinsMediumItalic}) format("truetype");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsSemiBold";
    src: local("Poppins-SemiBold"), url(${PoppinsSemiBold}) format("truetype");
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsSemiBoldItalic";
    src: local("Poppins-SemiBoldItalic"),
      url(${PoppinsSemiBoldItalic}) format("truetype");
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsBold";
    src: local("Poppins-Bold"), url(${PoppinsBold}) format("truetype");
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsBoldItalic";
    src: local("Poppins-BoldItalic"),
      url(${PoppinsBoldItalic}) format("truetype");
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsExtraBold";
    src: local("Poppins-ExtraBold"), url(${PoppinsExtraBold}) format("truetype");
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsExtraBoldItalic";
    src: local("Poppins-ExtraBoldItalic"),
      url(${PoppinsExtraBoldItalic}) format("truetype");
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsBlack";
    src: local("Poppins-Black"), url(${PoppinsBlack}) format("truetype");
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: "PoppinsBlackItalic";
    src: local("Poppins-BlackItalic"),
      url(${PoppinsBlackItalic}) format("truetype");
    font-weight: 800;
    font-style: normal;
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  #root {
    font-family: "Poppins", Arial, sans-serif;
  }
`;

const Provider = () => {
  return <Global styles={global} />;
};

export default Provider;
