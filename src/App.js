import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Import necessary components
import Footer from "./components/footer";
import Header from "./components/header";
import CreateAvatar from "./pages/createAvatar";
import Home from "./pages/home";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Talkimage from "./pages/talkimage";

function App() {
  return (
    <Router> {/* Use Router as an alias for BrowserRouter */}
      <Header />
      <Routes> {/* Use Routes to define your route mapping */}
        <Route path="/" element={<Home />} />
        <Route path="/talkimage" element={<Talkimage />} />
        <Route path="/createHqavatar" element={<CreateAvatar />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
