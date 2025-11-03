import React, { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import "./styles.css";

let showSnackbarHandler;

export const showSnackbar = (options) => {
  if (showSnackbarHandler) {
    showSnackbarHandler(options);
  }
};

const Snackbar = () => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");
  const [icon, setIcon] = useState(null);
  const [type, setType] = useState("neutral");
  const [duration, setDuration] = useState(3);

  const hideSnackbar = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    showSnackbarHandler = ({ content, icon, type = "neutral", duration = 3 }) => {
      setContent(content);
      setIcon(icon);
      setType(type);
      setDuration(duration);
      setVisible(true);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  const IconComponent = icon;

  return (
    <div className={`snackbar-container ${visible ? "show" : "hide"}`}>
      <div className={`snackbar snackbar-${type}`}>
        <div className="snackbar-content">
          {IconComponent && <IconComponent className="snackbar-icon" size={18} />}
          <span className="snackbar-text">{content}</span>
        </div>
        <button className="snackbar-close" onClick={hideSnackbar}>
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
