import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PageList, PageUpdate, PageUpload } from "./pages/Pages";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageUpload/>}/>
        <Route path="/list" element={<PageList/>}/>
        <Route path="/confirm" element={<PageUpdate/>}/>
      </Routes>
    </Router>
  )
}

export default App;
