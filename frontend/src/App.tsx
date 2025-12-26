import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";

function App() {
  const auth = useAuth();

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Routes>
          <Route
            path="/"
            element={auth?.isLoggedIn ? <Chat /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={!auth?.isLoggedIn ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!auth?.isLoggedIn ? <Signup /> : <Navigate to={"/"} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster />
    </>
  );
}

export default App;
