const MainLayout = ({ left, right, children }) => {
  return (
    <main className="layout">
      <aside className="layout-sidebar left">{left}</aside>
      <section className="layout-content">{children}</section>
      <aside className="layout-sidebar right">{right}</aside>
    </main>
  );
};

export default MainLayout;
