import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Foods from "./pages/Foods";
import AddFood from "./pages/AddFood";
import AddMeal from "./pages/AddMeal";

import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/foods"
          element={
            <ProtectedRoute>
              <Foods />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/foods/new"
          element={
            <ProtectedRoute>
              <AddFood />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meals/new"
          element={
          <ProtectedRoute>
            <AddMeal />
          </ProtectedRoute>
        }
      />

      </Routes>
    </BrowserRouter>
  );
}

export default App;