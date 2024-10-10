import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicationsList from './pages/publicationList';
import PublicationDetails from './pages/publicationDetails';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicationsList />} />
        <Route path="/publication/:id" element={<PublicationDetails />} />
      </Routes>
    </Router>
  );
};


