import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const local = 'http://localhost:9000'
    const api = 'https://brand-b-1.onrender.com'
  useEffect(() => {
    const url = new URL(window.location.href);
    const tokensParam = url.searchParams.get("tokens");
    if (tokensParam) {
      localStorage.setItem("google_token", tokensParam);
      navigate("/om/employee"); // Go back to homepage or wherever
    } else {
      alert("No token received");
    }
  }, []);

  return <p>Saving token... Redirecting...</p>;
}
