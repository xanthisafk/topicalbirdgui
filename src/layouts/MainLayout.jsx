const MainLayout = ({ children }) => {
  return (
    <main className="layout">
      <section className="layout-content">{children}</section>
    </main>
  );
};

export default MainLayout;
