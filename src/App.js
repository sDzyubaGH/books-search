import React from 'react'
import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom"
import BookFind from './pages/BookFind/BookFind';
import CurBook from './pages/CurBook/CurBook';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<BookFind />} />
        <Route path='/book' element={<CurBook />} />
        <Route path='*' element={<BookFind />} />
      </Routes>
    </div>
  );
}

export default App;
