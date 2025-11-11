import React from "react";

const Layout = ({ sidebar, children }) => {
  const gridContainerStyle = sidebar
    ? {
        display: "grid",
        gridTemplateColumns: "1fr 3fr", 
        gridTemplateRows: "1fr",
        columnGap: "var(--space-sm)",
        height: "100%", 
      }
    : {
        display: "grid",
        gridTemplateColumns: "100%",
        height: "100%",
      };

  const contentStyle = {
    minWidth: 0, 
    overflow: 'auto', 
    maxWidth: '100%', 
  };

  return (
    <div style={gridContainerStyle}>
      {/* Apply contentStyle to the sidebar container */}
      {sidebar && <aside style={contentStyle}>{sidebar}</aside>}
      
      {/* Apply contentStyle to the main content container */}
      <main style={contentStyle}>{children}</main>
    </div>
  );
};

export default Layout;