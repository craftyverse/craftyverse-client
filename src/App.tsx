import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SigninPage } from './pages/SigninPage';

export const App = () => {
  return (
    <div>
      <SigninPage />
    </div>
  );
};
