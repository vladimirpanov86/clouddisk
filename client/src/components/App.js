import Navbar from "./navbar/navbar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from "./registration/Registration";

import './app.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          <Routes>
            <Route path="/registration" element={<Registration />} />
            {/* <Route path="users/*" element={<Users />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
