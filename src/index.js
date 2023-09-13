import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataItemList from './pages/DataItemList';
import DataItemForm from './pages/DataItemForm';
import MainPage from './pages/MainPage';

function Database() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<MainPage/>}>
            <Route path='/DataItemList' element = {<DataItemList />} />
            <Route path='/DataItemForm' element = {<DataItemForm />} />
          </Route>  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<Database />, document.getElementById("root"));
