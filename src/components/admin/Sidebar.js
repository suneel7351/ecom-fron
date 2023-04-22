import React from "react";
import Dashboard from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import TreeView from "@mui/lab/TreeView/TreeView";
import TreeItem from "@mui/lab/TreeItem/TreeItem";
import "./admin.css";
import ListAlt from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
function Sidebar() {
  return (
    <div className="sidebar-container">
      {" "}
      <Link to="/admin/dashboard" className="admin-link-div">
        <Dashboard />
        <span>Dashboard</span>
      </Link>
      <div className="">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product/new">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </div>
      <Link to="/admin/orders" className="admin-link-div">
        <ListAlt />
        <span>Orders</span>
      </Link>{" "}
      <Link to="/admin/users" className="admin-link-div">
        <PeopleIcon />
        <span>Users</span>
      </Link>{" "}
      <Link to="/admin/reviews" className="admin-link-div">
        <RateReviewIcon />
        <span>Reviews</span>
      </Link>
    </div>
  );
}

export default Sidebar;
