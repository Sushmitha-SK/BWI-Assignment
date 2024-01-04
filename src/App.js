import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import { useSelector } from 'react-redux';
import Protected from './pages/ProtectedRoute';
import { useState } from 'react';

function App() {
  const userToken = useSelector((state) => state.login.data.token)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Protected isLoggedIn={userToken}>
                <HomePage />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
