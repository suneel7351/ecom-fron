import { Button } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
function Notfound() {
  return (
    <div className="flex items-center justify-center gap-4 h-[88vh] flex-col">
      <InfoOutlinedIcon
        style={{
          fontSize: "80px",
          color: "#fe5f1e",
        }}
      />
      <p className="text-slate-700 text-5xl text-center">Page Not Found</p>
      <Link to="/">
        <Button
          variant="contained"
          style={{ backgroundColor: "#fe5f1e" }}
          size="large"
          startIcon={<HomeIcon />}
        >
          {" "}
          Home
        </Button>
      </Link>
    </div>
  );
}

export default Notfound;
