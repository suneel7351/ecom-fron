import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/userSlice";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import { Backdrop, Button, SpeedDial } from "@mui/material";
import Badge from "@mui/material/Badge";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const { isAuthenticated, user, message, loading } = useSelector(
    (state) => state.user
  );
  const { cartItems, loading: cartLoading } = useSelector(
    (state) => state.cart
  );
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  useEffect(() => {
    if (location.pathname !== "/" || "/products" || "/product/:id") {
      setOpen(false);
    }
  }, [location.pathname]);

  const dashboard = () => {
    navigate("/admin/dashboard");
  };
  const profile = () => {
    navigate("/profile");
  };
  const orders = () => {
    navigate("/orders");
  };

  const actions = [
    { icon: <AccountCircleIcon />, name: "Profile", func: profile },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <LogoutIcon />, name: "Logout", func: handleLogout },
  ];

  if (user && user.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  return (
    <>
      <Backdrop open={isAuthenticated ? openSpeedDial : false} />
      <AppBar
        position="static"
        style={{ backgroundColor: "#fff", color: "#000" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/">
              {" "}
              <Typography
                variant="h6"
                noWrap
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Eng.Eccomerce
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/">Home</Link>
                </MenuItem>{" "}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/products">Products</Link>
                </MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                gap: "15px",
              }}
            >
              <Link to="/" className="link">
                Home
              </Link>
              <Link to="/products" className="link">
                Products
              </Link>
            </Box>
            <button onClick={handleClickOpen}>
              <SearchIcon fontSize="medium" />
            </button>
            <Link to="/cart" className="mx-4 mr-8">
              <Badge
                badgeContent={!cartLoading && cartItems && cartItems.length}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#fe5f1e",
                  },
                }}
              >
                <ShoppingCartIcon style={{ color: "#000" }} />
              </Badge>
            </Link>

            {isAuthenticated === true && !loading ? (
              <>
                <div className="h-[56px]">
                  <SpeedDial
                    open={openSpeedDial}
                    onClose={() => setOpenSpeedDial(false)}
                    onOpen={() => setOpenSpeedDial(true)}
                    ariaLabel="SpeedDial basic example"
                    direction="down"
                    icon={
                      <Avatar
                        alt={user && user.name}
                        src={user && user.avatar && user.avatar.url}
                        style={{ width: "100%", height: "100%" }}
                      />
                    }
                  >
                    {actions.map((action) => (
                      <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.func}
                        tooltipOpen={window.innerWidth < 600 ? true : false}
                      />
                    ))}
                  </SpeedDial>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 ">
                {" "}
                <Link to="/login" className="btn">
                  Login
                </Link>{" "}
                <Link to="/register" className="btn">
                  SignUp
                </Link>{" "}
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog onClose={handleClose} open={open}>
        <DialogContent style={{ padding: "0px" }}>
          {" "}
          <form
            onSubmit={searchHandler}
            className="flex items-center border border-slate-200 shadow-md md:w-[100%] w-[250px] px-2 py-1"
          >
            <div className="input-div">
              <input
                className="outline-none focus:ring-0  w-full"
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder="Search Products"
              />
              <Button size="small" variant="contained" type="submit">
                Search{" "}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Header;
