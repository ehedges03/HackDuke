import './global.css';

import { Routes, Route } from "react-router-dom";
import Home from "./screens/home/Home";
import Account from "./screens/account/Account";
import About from "./screens/about/About";
import Donate from "./screens/donate/Donate";
import Feedback from "./screens/feedback/Feedback";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </>
  );
}

export default App;
