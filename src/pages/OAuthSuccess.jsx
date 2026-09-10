import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    console.log("OAuthSuccess");
    console.log("Token:", token);

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    localStorage.setItem("token", token);

    console.log("Stored Token:", localStorage.getItem("token"));

    navigate("/dashboard", { replace: true });
  }, [navigate]);

  return null;
}

export default OAuthSuccess;