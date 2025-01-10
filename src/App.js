import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Import necessary components
import AgentManagement from "./components/Agentmangment";
import AIMarketplace from "./components/AIMarketplace";
import Footer from "./components/footer";
import Header from "./components/header";
import BotConfig from "./pages/botConfigure";
import ContactPage from "./pages/contact";
import CreateAvatar from "./pages/createAvatar";
import Home from "./pages/home";
import Mainchat from "./pages/mainchat";
import ServicesPage from "./pages/services";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Talkimage from "./pages/talkimage";
import PrivateRoute from "./Logichandle/Auth";

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
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Mainchat />
            </PrivateRoute>
          }
        />
        <Route path="/agentmanagment" element={<AgentManagement/>}/>
        <Route path="/botconfigure" element={<BotConfig/>}/>
        <Route path="/aImarketplace" element={<AIMarketplace/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
