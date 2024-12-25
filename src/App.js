import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Import necessary components
import Footer from "./components/footer";
import Header from "./components/header";
import CreateAvatar from "./pages/createAvatar";
import Home from "./pages/home";
import ServicesPage from "./pages/services";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Talkimage from "./pages/talkimage";
import ContactPage from "./pages/contact";

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
        <Route path="/service" element={<ServicesPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
