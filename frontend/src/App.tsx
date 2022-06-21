import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./component/MainPage";
import Header from "./component/Header";
import './App.css';
import UpdatePage from "./component/UpdatePage";
import ViewPage from "./component/ViewPage";
import WritePage from "./component/WritePage";

/*
* 1. zustand 따로 빼서 사용
* 2. function >> () => {}
* 3. 코드 정리(indent, 배치)
* */

const App = () => {
    return (
        <BrowserRouter>
            <div className='App'>
                <Header/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/posts/write" element={<WritePage/>}/>
                    <Route path="/posts/:id" element={<ViewPage/>}/>
                    <Route path="/posts/update/:id" element={<UpdatePage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );

}

export default App;