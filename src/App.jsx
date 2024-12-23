import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import Topup from "./pages/Topup";
import Pembayaran from "./pages/Pembayaran";

const App = () => {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/topup" element={<Topup />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment" element={<Pembayaran />} />
          </Route>
        </Routes>
      </main>
    </Router>
  )
}

export default App