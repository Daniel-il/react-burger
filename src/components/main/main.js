import React from "react";
import mainStyle from "./main.module.css";
function Main(props) {
  return <main className={mainStyle.main}>{props.children}</main>;
}
export default Main;
