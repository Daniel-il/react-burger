import React from "react";
import mainStyle from "./main.module.css";
class Main extends React.Component {
  render() {
    return <main className={mainStyle.main}>{this.props.children}</main>;
  }
}
export default Main;
