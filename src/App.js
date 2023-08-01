import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import LoginPage from "./pages/authentication/login/login.jsx";
import RegisterPage from "./pages/authentication/register/register";

//toastify setting
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DragDropImage from "./components/new/dragDrop";
import PdfViewer from "./components/new/pdf-stamp";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/new-stamp" element={<DragDropImage />} />
          <Route path="/new-pdf" element={<PdfViewer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
