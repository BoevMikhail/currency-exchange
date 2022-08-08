import React, {memo} from "react";
import classes from "./MyWarning.module.css";

const MyWarnings = (props) => {
  return <div className={classes.warning}>{props.children}</div>;
};

export default memo(MyWarnings);
