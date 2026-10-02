import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Proveedores from "./pages/Proveedores";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
// import Home from "./pages/Dashboard/Home";
import ProductosPage from "./pages/ProductosPage";
// import Movimientos from "./pages/MovimientosPage";
import Reportes from "./pages/InventariosPage";
import Inventario from "./pages/InventarioTotal";
import ProdcutoEconomico from "./pages/ReportesPage";
import ProtectedRoute from "../src/ProtectedRoute";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

export default function App() {

  const loadUser =
    useAuthStore(
      s => s.loadUser
    );

  useEffect(() => {

    loadUser();

  }, []);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>

          <Route path="/signin" element={<SignIn />} />

          {/* RUTAS PROTEGIDAS */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>

              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/Proveedores" element={<Proveedores />} />
              <Route path="/" element={<ProductosPage />} />
              {/* <Route path="/Movimientos" element={<Movimientos />} /> */}
              <Route path="/Reportes" element={<Reportes />} />
              <Route path="/ProdcutoEconomico" element={<ProdcutoEconomico />} />
              <Route path="/Inventario" element={<Inventario />} />
              <Route path="/blank" element={<Blank />} />

              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />

              {/* Tables */}
              <Route path="/basic-tables" element={<BasicTables />} />

              {/* Ui Elements */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />

              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />

            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
