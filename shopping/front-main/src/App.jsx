import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './compnents/header.jsx'
import Addmain from './compnents/addmain.jsx'
import Product from './compnents/product.jsx'
import Cart from './compnents/cart.jsx'
import Login from './compnents/Login'
import Member from './compnents/Member.jsx'
import Settings from './compnents/Settings'
import EditUser from './compnents/EditUser'
import DeleteUser from './compnents/DeleteUser'
import MainPage from './compnents/MainPage'
import AuthProvider from './context/Authcontext.jsx' // 이거 로그인 시 로그아웃 버튼 바로 나오게 추가함

function App() {
 

  return (
     <AuthProvider> {/*전체 앱을 Context로 감싸기*/}
    <BrowserRouter>
      <Header/>
      
      <Routes>
        <Route path= '/' element={<Addmain/>}/>
        <Route path= '/product' element={<Product/>}/>
        <Route path= '/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/member' element={<Member/>}/>
        <Route path='/mainpage' element={<MainPage/>}/>
        <Route path='/mypage' element={<Settings/>}/>
        <Route path='/mypage/edit' element={<EditUser/>}/>
        <Route path='/mypage/delete' element={<DeleteUser/>}/>
         
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
