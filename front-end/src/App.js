import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider} from "./contexts/AuthContext";
import RoutesApp from "./routes/RoutesApp";

// components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <NavBar />
          <RoutesApp />
        <Footer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
