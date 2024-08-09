import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import CreateForm from "./pages/CreateForm";
import ViewForm from "./pages/ViewForm";
import EditForm from "./pages/EditForm";

// import EditForm from "./pages/EditForm";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/form/create" element={<CreateForm />}></Route>
          <Route path="/form/:id" element={<ViewForm />}></Route>
          <Route path="/form/:id/edit" element={<EditForm />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
