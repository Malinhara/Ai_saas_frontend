import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./pages/home";
import Talkimage from "./pages/talkimage";
import CreateAvatar from "./pages/createAvatar";
import Signin from "./pages/signin";
import Signup from "./pages/signup";


function App() {
  return (
    <BrowserRouter>
    
      <Header/>
      <Routes>
     
        <Route path="/" element={<Home />} />
        <Route path="/talkimage" element={<Talkimage/>} />
        <Route path="/createHqavatar" element={<CreateAvatar/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>


      </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
