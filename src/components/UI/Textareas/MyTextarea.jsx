import React, {memo} from "react";
import classes from "./MyTextarea.module.css";

const MyTextarea = (props) => {
  return (
    <textarea
      className={classes.textarea}
      {...props}
    />
  );
};

export default memo(MyTextarea);
