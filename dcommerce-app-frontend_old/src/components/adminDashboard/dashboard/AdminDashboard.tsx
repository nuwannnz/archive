import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Sidebar from "../sidebar/Sidebar";
import DashboardContent from "../common/DashboardContent";
import "./AdminDashboard.css";
import AdminHeader from "../Header/AdminHeader";

function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <AdminHeader setIsOpen={setIsOpen} />
      <div className="dashboard-container">
        {isOpen && <Sidebar />}

        <Grid className={`content-container${!isOpen ? "-sidebar" : ""}`}>
          <DashboardContent />
        </Grid>
      </div>
    </div>
  );
}

export default AdminDashboard;
