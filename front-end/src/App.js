import { BrowserRouter, Routes, Route} from "react-router-dom";

// pages
import Home from './pages/Home';
import FormEvent from './pages/FormEvent';

// components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/form-event" element={<FormEvent />}/>
        <Route path="/form-event/:id" element={<FormEvent />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
