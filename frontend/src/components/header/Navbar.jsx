import React from 'react'
import { Link } from 'react-router-dom'
import {CiSearch} from "react-icons/ci"

const Navbar = () => {
  return (
    <div className="navbar shadow-lg justify-between px-5">
    <div className="flex">
     
      <ul className="flex gap mt-3 p-2 gap-5">
        <li><Link to="/articles">Mine</Link></li>
        <li><Link to={"/post"}>Post</Link></li>
      </ul>
    </div>
  <div className="items-center justify-center w-1/2 flex relative">
    <CiSearch className="absolute md:left-44 left-0 text-bold text-2xl"/>
    <input className="input pl-5 border border-slate-200 outline-none focus:outline-none" type="text" />
  </div>
  <div className="navbar-center">
    <a className="normal-case text-xl">BlogThought</a>
  </div>
</div>
  )
}

export default Navbar