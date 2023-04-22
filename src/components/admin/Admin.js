import React from "react";
import Sidebar from "./Sidebar";
import "./admin.css";
import Dashboard from "./Dashboard";

function Admin() {
  return (
    <div className="admin-container ">
      <div className="sidebar border-r border-slate-200">
        <Sidebar />
      </div>
      <div className=" main-container">
        <Dashboard />
      </div>
    </div>
  );
}

export default Admin;
