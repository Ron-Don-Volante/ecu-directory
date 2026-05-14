import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Directory from './pages/Directory';
import Submit from './pages/Submit';
import { ECUs, Builds } from './pages/Placeholders';

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/"          element={<Navigate to="/directory" replace />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/ecus"      element={<ECUs />} />
        <Route path="/builds"    element={<Builds />} />
        <Route path="/submit"    element={<Submit />} />
      </Routes>
    </BrowserRouter>
  );
}
