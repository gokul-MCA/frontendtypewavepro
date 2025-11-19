import styles from "../../css/Dashboard.module.css";

import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InsightsIcon from "@mui/icons-material/Insights";
import SettingsIcon from "@mui/icons-material/Settings";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { HeartIcon, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";

import Analytics from "../../components/dashboard/Analytics";
import SelectContent from "../../components/dashboard/SelectContent";
import { Logout } from "@mui/icons-material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { GoogleUser } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/authService";

const SidebarMenu = [
  { title: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { title: "Practice", href: "#practice", icon: RocketLaunchIcon },
  { title: "Insights", href: "#insights", icon: InsightsIcon },
  { title: "Settings", href: "#settings", icon: SettingsIcon },
];

interface OutletContext {
  user: GoogleUser;
}

const Dashboard = () => {
  const { user } = useOutletContext<OutletContext>();

  const [hideSidebar, setHideSidebar] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const navigate = useNavigate();

  const { setUser, isFirstLogin } = useAuth();

  // const [days, setDays] = useState<string[]>([]);
  // useEffect(() => {
  //   const currentDate = new Date();
  //   const streakDates: string[] = [];

  //   // Generate today's date and next 6 days
  //   for (let i = 0; i < 7; i++) {
  //     const newDate = new Date(currentDate);
  //     newDate.setDate(currentDate.getDate() + i); // Add i days to the current date
  //     streakDates.push(
  //       newDate.toLocaleDateString("en-US", { weekday: "narrow" })
  //     ); // Format the date to 'MM/DD/YYYY'
  //   }

  //   setDays(streakDates);
  // }, []);

  const handleSidebar = () => {
    setHideSidebar((prev) => !prev);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    logout();
  };

  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning!";
    if (hour >= 12 && hour < 17) return "Good afternoon!";
    if (hour >= 17 && hour < 20) return "Good evening!";
    return "Good night!";
  };

  return (
    <>
      <div className={styles.dashboard_container}>
        <aside
          className={styles.sidebar}
          style={{
            width: hideSidebar ? "70px" : "250px",
            transition: "width 0s ease",
          }}
        >
          <Tooltip title={hideSidebar && "Expand menu"} placement="right">
            <Button
              onClick={handleSidebar}
              sx={{
                width: "100%",
                display: "block",
                textAlign: hideSidebar ? "center" : "left",
                padding: "8px 20px",
                paddingTop: "20px",
                "&:hover": {
                  backgroundColor: "#2e2e2e",
                  boxShadow: "none",
                },
                "&:active": {
                  backgroundColor: "#2e2e2e",
                  boxShadow: "none",
                },
              }}
            >
              {hideSidebar ? (
                <MenuIcon
                  sx={{ color: "var(--secondary-color)", fontSize: 26 }}
                />
              ) : (
                <Tooltip title="Collapse menu" placement="right">
                  <MenuOpenIcon
                    sx={{ color: "var(--secondary-color)", fontSize: 26 }}
                  />
                </Tooltip>
              )}
            </Button>
          </Tooltip>

          {SidebarMenu.map(({ title, href, icon: IconComponent }) => (
            <div key={title} style={{ padding: "4px 0", marginBottom: "4px" }}>
              {hideSidebar ? (
                <Tooltip title={title} placement="right">
                  <Button
                    variant="outlined"
                    sx={{
                      padding: {
                        xs: "4px 2px",
                        sm: "6px 2px",
                        md: "8px 20px",
                      },
                      border: "none",
                      display: "flex",
                      "&:hover": {
                        backgroundColor: "#2e2e2e",
                        boxShadow: "none",
                      },
                      "&:active": {
                        backgroundColor: "#2e2e2e",
                        boxShadow: "none",
                      },
                    }}
                    href={href}
                  >
                    <IconComponent style={{ color: "red", fontSize: "26px" }} />
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  variant="outlined"
                  sx={{
                    padding: {
                      xs: "4px 2px",
                      sm: "6px 2px",
                      md: "8px 20px",
                    },
                    width: "100%",
                    border: "none",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 1,
                    textTransform: "none",
                    fontSize: "15px",
                    "&:hover": {
                      backgroundColor: "#2e2e2e",
                      boxShadow: "none",
                    },
                    "&:active": {
                      backgroundColor: "#2e2e2e",
                      boxShadow: "none",
                    },
                  }}
                  href={href}
                >
                  <IconComponent style={{ color: "red", fontSize: "26px" }} />
                  {title}
                </Button>
              )}
            </div>
          ))}

          <div
            style={{ position: "absolute", bottom: "40px", marginLeft: "14px" }}
          >
            <Tooltip title={user.name} onClick={handleClick}>
              <Avatar src={user.picture} />
            </Tooltip>
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mb: 1,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      bottom: 4,
                      left: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={() => navigate("account-settings")}>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                Account Settings
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </aside>

        <div className={styles.main}>
          <div className={styles.welcome_section}>
            <div className={styles.welcome}>
              <p className={styles.para}>
                {isFirstLogin ? "Welcome aboard!" : getGreetingMessage()}
              </p>
              {/* <h1 className={styles.name}>{user.name}</h1> */}
              {user ? (
                <div>
                  <h1 className={styles.name}>
                    Hi,
                    {user?.name}
                  </h1>
                  <p className={styles.subtext}>
                    We're glad to have you {isFirstLogin ? "on board" : "back"}.
                  </p>
                </div>
              ) : (
                <p>Loading user...</p>
              )}
            </div>
            {/* <div className={styles.streak}>
              <h2>Streak</h2>
              <p>Current Streak:</p>
              <h3>3 days</h3>
              <ul className={styles.days}>
                {days.map((day, index) => (
                  <li key={index}>
                    <div>
                      {index === Number([1, 2, 3].includes(index)) ? (
                        <HeartIcon fill="red" />
                      ) : (
                        <HeartIcon />
                      )}
                      {day}
                    </div>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
          <div className={styles.select_content_wrap} id="practice">
            <SelectContent />
          </div>

          <div className={styles.analytics_section} id="insights">
            <Analytics />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
