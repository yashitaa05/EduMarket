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

const HomeRedirect = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return isAuthenticated ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/register" replace />
  );
};

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/material/:id" element={<MaterialDetail />} />
      <Route path="/materials/:id" element={<MaterialDetail />} />
      <Route
        path="/upload-material"
        element={
          <ProtectedRoute>
            <UploadMaterial />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoute;

