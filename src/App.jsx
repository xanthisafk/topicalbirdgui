import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainLayout from "./layouts/MainLayout";

function App() {
  
  return (
    <div>
      <Header />
      <MainLayout
        left={null}
        right={null}
      >
        <Outlet />
      </MainLayout>
      <Footer />
    </div>
  );
}

export default App;