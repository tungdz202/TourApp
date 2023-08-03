import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/User/Login/Login";
import { Register } from "../pages/User/Register/Register";
import Home from "../pages/User/Home/Home";
import Tours from "../pages/User/Tours/index";
import Blog from "../pages/User/Blog/Blog";
import DashBoard from "../pages/Manager/DashBoard/DashBoard";
import Account from "../pages/Manager/Accounts/Account";
import ToursManager from "../pages/Manager/Tours/Tours";
import BlogManager from "../pages/Manager/Blogs/Blog";
import CommentManager from "../pages/Manager/Comments/Comment";
import ProvinceManager from "../pages/Manager/Province/Province";
import Profile from "../pages/User/Profile/Profile";

export default function Mainroute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tour" element={<Tours />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<DashBoard />} />
        <Route path="/admin/user" element={<Account />} />
        <Route path="/admin/tour" element={<ToursManager />} />
        <Route path="/admin/blog" element={<BlogManager />} />
        <Route path="/admin/comment" element={<CommentManager />} />
        <Route path="/admin/province" element={<ProvinceManager />} />
      </Routes>
    </BrowserRouter>
  );
}
