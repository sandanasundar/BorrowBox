import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BrowseItems from './pages/BrowseItems';
import AddItem from './pages/AddItem';
import ItemDetails from './pages/ItemDetails';
import MyItems from './pages/MyItems';
import Requests from './pages/Requests';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<BrowseItems />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/items/:id" element={<ItemDetails />} />
            <Route path="/my-items" element={<MyItems />} />
            <Route path="/requests" element={<Requests />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>🎓 BorrowBox – MERN Stack Development Laboratory Project</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
