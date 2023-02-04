import "react-perfect-scrollbar/dist/css/styles.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "App";

const { VERSION } = process.env;

if ("serviceWorker" in navigator) {
  if (process.env.NODE_ENV === "production") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js");
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      // A new service worker has taken over, check if there's a new version of the app.
      if (window.confirm("A new version of this app is available. Would you like to update?")) {
        const prevVersion = Number(VERSION) - 0.001;
        const cacheName = `cache-every-file-${prevVersion}`;
        caches.delete(cacheName).then(boolean => {
          if (boolean) {
            console.log(`Cache deleted ${cacheName}`);
          } else {
            console.log("Cache not found");
          }
        });

        window.location.reload();
      }
    });
  }
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <Routes>
      <Route path='/:tabName' element={<App />} />
      <Route path='*' element={<Navigate to='/search' />} />
    </Routes>
  </Router>
);
