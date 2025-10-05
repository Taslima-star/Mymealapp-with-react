import './App.css';
import Form from './component/login.jsx';
import GeminiDashboard from './component/GeminiDashboard.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/gemini-dashboard" element={<GeminiDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
