import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import Card from "./components/Card";

const App = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
          <Route path="/card" element={<Card />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
