import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage"; // נוסיף מסך בית
import "./styles/global.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="808477696231-s5vkd4i518p1ler7n9cmbqbs1f87gvp0.apps.googleusercontent.com">
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage key="login-page" />} />
            <Route path="/signup" element={<SignUpPage key="signup-page" />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
