import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import OAuthSuccess from "./pages/OAuthSuccess";
import Builder from "./pages/Builder";
import Settings from "./pages/Settings";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

<Route path="/builder" element={<Builder />} />
<Route path="/builder/:id" element={<Builder />} />

        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route
  path="/settings"
  element={<Settings />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;