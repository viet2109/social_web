import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import ThemeListener from "./components/ThemeListener";
import routers from "./configs/router";
import type { RootState } from "./redux/store";
import { setNavigate } from "./utils/navigation";

const NavigationProvider = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return null;
};

function App() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.app.loading);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavigationProvider />
      <ThemeListener />

      <ToastContainer
        hideProgressBar
        draggable
        theme="colored"
        position="top-right"
        autoClose={1500}
      />
      {isLoading && <Loading />}
      <Routes>
        {routers.publicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.layout ? (
                <route.layout>
                  <route.page />
                </route.layout>
              ) : (
                <route.page />
              )
            }
          />
        ))}

        {routers.privateRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <PrivateRoute isAuthenticated={!!user}>
                {route.layout ? (
                  <route.layout>
                    <route.page />
                  </route.layout>
                ) : (
                  <route.page />
                )}
              </PrivateRoute>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
