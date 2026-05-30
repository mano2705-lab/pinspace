import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePin from "./components/CreatePin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/search"
          element={<Search />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;