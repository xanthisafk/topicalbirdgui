import React, { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { SnackbarContext } from "@/hooks/useSnackbar";
import "@/styles/components/snackbar.css";

export const SnackbarProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");
  const [icon, setIcon] = useState(null);
  const [type, setType] = useState("neutral");
  const [duration, setDuration] = useState(3);

  const hideSnackbar = useCallback(() => {
    setVisible(false);
  }, []);

  const showSnackbar = useCallback(
    ({ content, icon, type = "neutral", duration = 3 }) => {
    setContent(content);
    setIcon(icon);
    setType(type);
    setDuration(duration);
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(hideSnackbar, duration * 1000);
    return () => clearTimeout(timer);
  }, [visible, duration, hideSnackbar]);

  const IconComponent = icon;

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
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
    </SnackbarContext.Provider>
  );
};
