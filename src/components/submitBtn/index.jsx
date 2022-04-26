import React from "react";
import styles from "./.module.css";

export default function SubmitBtn({ text }) {
  return (
    <button className={styles.form_submit_btn} type="submit">
      {text}
    </button>
  );
}
