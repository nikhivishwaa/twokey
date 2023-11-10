import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePic from "../assets/profilePic.png";
import { useDarkMode } from "../context/darkModeContext";
import { useAuth } from "../context/authContext";
import { supabase } from "../helper/supabaseClient";

// Mui Icons And Drawers
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import { departmentIcons } from "../utils/iconComponents";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import MenuIcon from "@mui/icons-material/MenuRounded";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";

/**
 * Sidebar component for navigation and user-related actions.
 * @returns {JSX.Element} The Sidebar component.
 */
function SideBar() {
  const location = useLocation();

  const [data, setData] = useState("");
  const { darkMode } = useDarkMode();
  const [picture, setPicture] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const getProfilePic = async () => {
      try {
        const { data } = supabase.storage
          .from("avatar")
          .getPublicUrl("onlyforsave1@gmail.com");

        setPicture(data.publicUrl);

        // console.log(data.publicUrl);
      } catch (error) {
        console.log("Error while getting ProfilePic.");
      }
    };

    getProfilePic();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        let token = JSON.parse(sessionStorage.getItem("token"));
        setData(token.user.user_metadata.full_name);

        // console.log("sidebar token :", token.user.user_metadata.full_name);
      } catch (error) {
        console.log("Error while fetching the user profile data.");
      }
    }

    fetchUser();
  }, []);

  const hideSideBar =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/onboarding";

  let departments = [
    { name: "Account", path: "/account" },
    { name: "Finance", path: "/finance" },
    { name: "Development", path: "/development" },
    { name: "Manufacturing", path: "/manufacturing" },
    { name: "Sales", path: "/sales" },
    { name: "Human Resources", path: "/humanresources" },
  ];
  /**
   * If the user is unauthorised then no need to show the side panel.
   * Feel free to delete if needed.
   */
  if (!sessionStorage.getItem("token") || hideSideBar) {
    return null;
  }

  return (
    <nav className="max-h-[100vh]">
      <div className="w-fit h-fit border-2 px-4 py-2">
        <IconButton
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          color="inherit"
          edge="start"
          sx={{
            display: { md: "none", xs: "block" },
          }}
        >
          <MenuIcon />
        </IconButton>
      </div>

      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        variant="temporary"
        sx={{
          display: { md: "none", xs: "block" },
          borderBottom: 2,
        }}
      >
        <nav
          className={`w-[60vw] p-2 h-screen  bg-gray-10 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } `}
        >
          <div className="w-full">
            <div
              className={`flex justify-between items-center sticky top-0 pt-4 px-2  ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <a
                href="/dashboard"
                alt="LOGO"
                className={`text-xl md:text-2xl ${
                  darkMode
                    ? "hover:text-gray-400 text-gray-300"
                    : "text-gray-500 hover:text-gray-600"
                }`}
              >
                Twokey
              </a>
            </div>
            <SideBarContents departments={departments} darkMode={darkMode} />
            <div className="my-12"></div>
          </div>
          <div
            className={`sticky bottom-0 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <footer className="w-full py-2 sticky bottom-0">
              <span>
                <a
                  href="/profile"
                  alt="Profile"
                  className={` p-2 rounded-md  
                  ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "hover:bg-gray-100"
                  } flex justify-start items-center font-medium duration-200`}
                >
                  <img
                    src={picture ? picture : ProfilePic}
                    loading="lazy"
                    alt={data ? `${data}'s Profile Picture` : "Profile Picture"}
                    className={`w-6 h-6 rounded-full ${
                      darkMode
                        ? "filter brightness-100 border border-white"
                        : ""
                    }`}
                  />
                  <p className="px-2">#{data ? data : "Profile"}</p>
                </a>
              </span>
            </footer>
          </div>
        </nav>
      </Drawer>
      <Drawer
        anchor="top"
        open
        variant="persistent"
        sx={{
          width: { md: 224, lg: 240, xs: "auto" },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: { md: 224, lg: 240, xs: "auto" },
          },
          "& .MuiDrawer-paper::-webkit-scrollbar": {
            display: "none" /* Hide scrollbar for Chrome, Safari, and Edge */,
          },
        }}
      >
        <nav
          className={` ${
            !isMenuOpen && "hidden md:block md:w-56 lg:w-60"
          }  px-4 bg-gray-100  border-r-2 border-r-gray-200 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="w-full">
            <div
              className={`flex justify-between items-center sticky top-0 pt-4 px-2  ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <a
                href="/dashboard"
                alt="LOGO"
                className={`text-xl md:text-2xl ${
                  darkMode
                    ? "hover:text-gray-400 text-gray-300"
                    : "text-gray-500 hover:text-gray-600"
                }`}
              >
                Twokey
              </a>
            </div>
            <SideBarContents departments={departments} darkMode={darkMode} />
          </div>
          <div
            className={`sticky bottom-0 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <footer className="w-full py-2 sticky bottom-0">
              <span>
                <a
                  href="/profile"
                  alt="Profile"
                  className={` p-2 rounded-md  
                  ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "hover:bg-gray-100"
                  } flex justify-start items-center font-medium duration-200`}
                >
                  <img
                    src={picture ? picture : ProfilePic}
                    loading="lazy"
                    alt={data ? `${data}'s Profile Picture` : "Profile Picture"}
                    className={`w-6 h-6 rounded-full ${
                      darkMode
                        ? "filter brightness-100 border border-white"
                        : ""
                    }`}
                  />
                  <p className="px-2">#{data ? data : "Profile"}</p>
                </a>
              </span>
            </footer>
          </div>
        </nav>
      </Drawer>
    </nav>
  );
}

/**
 * Renders the contents of the Sidebar based on the provided departments.
 * @param {Object} props - The component props.
 * @param {Array} props.departments - The list of department objects.
 * @param {boolean} props.darkMode - The dark mode state.
 * @returns {JSX.Element} The SidebarContents component.
 */
function SideBarContents({ departments, darkMode }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
    sessionStorage.removeItem("token");
  }

  return (
    <>
      <ul
        className={`overflow-y-auto h-full ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        <p
          className={`text-xs  mt-4 mb-2 p-2 ${
            darkMode ? "text-gray-200" : "text-gray-600"
          }`}
        >
          Overview
        </p>
        <div className="flex items-center">
          <li className="min-w-full">
            <a
              href="/dashboard"
              alt="Dashboard"
              className={`flex justify-start items-center min-w-full ${
                location.pathname === "/dashboard"
                  ? `bg-gray-200 hover:bg-gray-100 duration-200 p-2 rounded-md text-sm ${
                      darkMode && "hover:bg-gray-600 bg-gray-600"
                    } `
                  : `hover:bg-gray-100 ${
                      darkMode && "hover:bg-gray-700 text-gray-100"
                    } p-2 rounded-md text-sm duration-200`
              }`}
            >
              <DashboardRoundedIcon />
              <p className="px-2">Dashboard</p>
            </a>
          </li>
        </div>
        <p
          className={`text-xs  mt-4  p-2 ${
            darkMode ? "text-gray-200" : "text-gray-600"
          }`}
        >
          Department
        </p>

        {departments.map((department, index) => (
          <li key={index} className="min-w-full my-2">
            <a
              href={department.path}
              alt={department.name}
              className={`flex justify-start items-center min-w-full ${
                location.pathname === department.path
                  ? `bg-gray-200 hover:bg-gray-100 duration-200 p-2 rounded-md text-sm ${
                      darkMode && "hover:bg-gray-600 bg-gray-600"
                    } `
                  : `hover:bg-gray-100 ${
                      darkMode && "hover:bg-gray-700 text-gray-100"
                    } p-2 rounded-md text-sm duration-200`
              }`}
            >
              {departmentIcons[department.name]}
              <p className="px-2">{department.name}</p>
            </a>
          </li>
        ))}

        <p
          className={`text-xs mt-4 mb-2 p-2 ${
            darkMode ? "text-gray-200" : "text-gray-600 "
          }`}
        >
          Settings
        </p>
        <li className="min-w-full my-2">
          <div className="flex items-center">
            <a
              href="/settings"
              alt="settings"
              className={`flex justify-start items-center min-w-full ${
                location.pathname === "/settings"
                  ? `bg-gray-200 hover:bg-gray-100 duration-200 p-2 rounded-md text-sm ${
                      darkMode && "hover:bg-gray-700 bg-gray-600"
                    }`
                  : `hover:bg-gray-100 p-2 rounded-md text-sm ${
                      darkMode && "hover:bg-gray-600 text-gray-100"
                    } duration-200`
              }`}
            >
              <TuneRoundedIcon />
              <p className="px-2">Settings</p>
            </a>
          </div>
        </li>
        <li className="min-w-full my-2">
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className={`flex justify-start items-center min-w-full ${
                location.pathname === "#"
                  ? `hover:${
                      darkMode ? "bg-gray-600" : "bg-gray-100"
                    } duration-200 p-2 rounded-md ${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    } text-sm`
                  : `hover:${
                      darkMode ? "bg-gray-600" : "bg-gray-100"
                    } p-2 rounded-md text-sm ${
                      darkMode ? "text-gray-100" : ""
                    } duration-200`
              }`}
            >
              <ExitToAppRoundedIcon />
              <p className="px-2">LogOut</p>
            </button>
          </div>
        </li>
      </ul>
    </>
  );
}

export default SideBar;
