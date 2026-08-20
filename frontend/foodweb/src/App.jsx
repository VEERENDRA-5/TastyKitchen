import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/login/index.jsx";
import Register from "./components/register/index .jsx";
import ProtectedRoute from "./components/protectedRoute/index.jsx";
import Home from "./components/home/index.jsx";
import Cart from "./components/cart/index.jsx";
import Addfood from "./components/addfoodsection/index.jsx";
import Notfound from "./components/notfound/index.jsx";
import Payment from "./components/payment/index.jsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        exact
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/addfood/:id"
        element={
          <ProtectedRoute>
            <Addfood />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<Notfound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  </BrowserRouter>
);

export default App;
