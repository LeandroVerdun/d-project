import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./assets/pages/main";
import { Navbar } from "./assets/layout/navbar";
import { Footer } from "./assets/layout/Footer";
import Categories from "./component/Categories";
import NoFound from "./assets/pages/Error404";
import AdminPage from "./component/admin/AdminPage";
import SearchResult from "./component/SearchResult";
import Descripcion from "./component/Description";
import CartPage from "./component/CartPage";
import Register from "./component/Register";
import Login from "./component/Login";
import ForgotPassword from "./component/ForgotPassword";
import { UserAdmin } from "./component/UserAdmin";
import MyPurchases from "./component/MyPurchases";
import { ProtectedUserAdmin } from "./component/ProtectedUserAdmin";
import Play from "./component/Play";
import Profile from "./component/Profile";
import { AboutUs } from "./component/AboutUs";
import { TermsofService } from "./component/TermsofService";
import LoadingSpinner from "./component/LoadingSpinner";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="container-fluid p-0">
        <div className="container-cover">
          <div className="cover"></div>
          <div className="page-wrapper">
            <div className="routes-wrapper pt-5" style={{ minHeight: "100vh" }}>
              <div className="container d-flex justify-content-center py-4" style={{ marginTop: "13%" }}>
                <div
                  className="w-100 d-flex justify-content-center border border-white rounded-3 mb-5"
                  style={{
                    backgroundImage: "linear-gradient(to right, rgba(23, 26, 33, 0.75), rgba(45, 53, 66, 0.75))",
                  }}
                >
                  <div className="w-100" style={{ maxWidth: "70rem" }}>
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/search/:query" element={<SearchResult />} />
                        <Route path="/descripcion/:id" element={<Descripcion />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/mypurchases" element={<MyPurchases />} />
                        <Route path="/404" element={<NoFound />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/terms-of-service" element={<TermsofService />} />
                        <Route
                          path="/useradmin"
                          element={
                            <ProtectedUserAdmin>
                              <UserAdmin />
                            </ProtectedUserAdmin>
                          }
                        />
                        <Route path="/play" element={<Play />} />
                        <Route path="*" element={<NoFound />} />
                      </Routes>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
