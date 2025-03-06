import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { AxiosError } from "axios"; 
import Input from "../components/Input";
import Button from "../components/Button";
import Form from "../components/Form";
import { signUpUser } from "../services/api-client"; 
import "../styles/auth.css";

function SignUpPage() {
  const navigate = useNavigate();
  
  // ✅ יצירת מצב עם resetKey שיגרום ל-React לרנדר מחדש את השדות
  const [resetKey, setResetKey] = useState(Date.now());

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ כל פעם שנכנסים לדף - השדות מתאפסים
  useEffect(() => {
    setUsername("");
    setEmail("");
    setPassword("");
    setResetKey(Date.now()); // גורם ל-React לרנדר מחדש את השדות
  }, []);

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    setError("");

    try {
      const data = await signUpUser(username, email, password);
      console.log("Sign Up Success:", data);
      navigate("/login");
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorData = axiosError.response?.data as unknown;
      const errorMessage = typeof errorData === "object" && errorData !== null && "message" in errorData
        ? (errorData as { message: string }).message
        : "Sign up failed";
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="text-center">Sign Up</h2>
        {error && <p className="error-text">{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Input key={resetKey + "-username"} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input key={resetKey + "-email"} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input key={resetKey + "-password"} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button text="Sign Up" onClick={handleSubmit} />
          <div className="text-center mt-3">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUpPage;
