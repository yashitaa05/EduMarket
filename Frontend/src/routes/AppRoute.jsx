import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/Dashboard";
import UploadMaterial from "../pages/uploadmaterial";
import Wishlist from "../pages/wishlist";
import MaterialDetail from "../pages/MaterialDetail";
import MyMaterials from "../pages/MyMaterial";

import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/Authcontext";

// 🔥 Entry redirect logic
const HomeRedirect = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return (
    <Navigate
      to={isAuthenticated ? "/dashboard" : "/login"}
      replace
    />
  );
};

const AppRoute = () => {
  return (
    <Routes>
      {/* Entry */}
      <Route path="/" element={<HomeRedirect />} />

      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Optional public landing (can also protect if needed) */}
      <Route path="/home" element={<Home />} />

      {/* Protected Core Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload-material"
        element={
          <ProtectedRoute>
            <UploadMaterial />
          </ProtectedRoute>
        }
      />

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-materials"
        element={
          <ProtectedRoute>
            <MyMaterials />
          </ProtectedRoute>
        }
      />

      {/* Material routes */}
      <Route
        path="/material/:id"
        element={
          <ProtectedRoute>
            <MaterialDetail />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoute;