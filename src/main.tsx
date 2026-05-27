import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { cargarCsrf } from "./utils/csrf.tsx";

async function iniciarApp() {

  try {

    await cargarCsrf();

  } catch (error) {

    console.error(
      "Error cargando CSRF",
      error
    );
  }

  createRoot(
    document.getElementById(
      "root"
    )!
  ).render(
    <StrictMode>
      <ThemeProvider>
        <AppWrapper>
          <App />
        </AppWrapper>
      </ThemeProvider>
    </StrictMode>
  );
}

iniciarApp();
