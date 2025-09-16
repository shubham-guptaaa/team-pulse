import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { switchRole, setUser } from "../redux/slices/roleSlice";
import MemberSelectionModal from "./MemberSelectionModal";

const SunIcon = () => (
  <svg
    className="w-5 h-5 text-yellow-500 dark:text-gray-300 transition-colors duration-300"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <g
        clip-path="url(#a)"
        stroke="#000000"
        stroke-width="1.5"
        stroke-miterlimit="10"
      >
        <path
          d="M5 12H1M23 12h-4M7.05 7.05 4.222 4.222M19.778 19.778 16.95 16.95M7.05 16.95l-2.828 2.828M19.778 4.222 16.95 7.05"
          stroke-linecap="round"
        ></path>
        <path
          d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
          fill="#000000"
          fill-opacity=".16"
        ></path>
        <path d="M12 19v4M12 1v4" stroke-linecap="round"></path>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#ffffff" d="M0 0h24v24H0z"></path>
        </clipPath>
      </defs>
    </g>
  </svg>
);

const MoonIcon = () => (
  <svg
    className="w-5 h-5 text-indigo-500 dark:text-gray-300 transition-colors duration-300"
    fill="#ffffff"
    viewBox="0 0 35 35"
    data-name="Layer 2"
    id="Layer_2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z"></path>
    </g>
  </svg>
);

function Header() {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector((state) => state.role);
  const allMembers = useSelector((state) => state.members.list);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleRoleToggle = () => {
    if (currentRole === "TeamLead") {
      setIsMenuOpen(false);
      setIsModalOpen(true);
    } else {
      const teamLead = allMembers.find((m) => m.role === "TeamLead");
      if (teamLead) {
        dispatch(setUser(teamLead));
        dispatch(switchRole("TeamLead"));
      }
    }
  };

  // --- Effect to close the menu when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!currentUser) {
    return (
      <header className="bg-gray-100 dark:bg-gray-800 shadow-md p-4 flex justify-between items-center transition-colors duration-300">
        <div className="text-2xl font-extrabold text-red-800 dark:text-red-600">
          TeamPulse
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 dark:text-gray-300">
            Loading user info...
          </span>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center transition-colors duration-300">
        <div className="text-2xl font-extrabold text-red-600 dark:text-red-400">
          TeamPulse
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 shadow-sm focus:outline-none "
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } theme`}
          >
            {theme === "light" ? <SunIcon /> : <MoonIcon />}
          </button>
          <div className="flex items-center space-x-3">
            {currentUser.picture && (
              <img
                src={currentUser.picture}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full border-2 border-blue-400 dark:border-blue-300 object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
            <div>
              <p className="text-gray-800 dark:text-gray-100 font-semibold text-sm">
                {currentUser.name}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-xs">
                {currentUser.role}
              </p>
            </div>
          </div>
          <button
            onClick={handleRoleToggle}
            className="px-4 py-2 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-700 transition duration-200"
          >
            Switch to {currentRole === "TeamLead" ? "Team Member" : "Team Lead"}{" "}
            View
          </button>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div ref={menuRef} className="md:hidden relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {currentUser.picture && (
              <img
                src={currentUser.picture}
                alt="Open menu"
                className="w-10 h-10 rounded-full border-2 border-blue-400 dark:border-blue-300 object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-12 right-0 w-60 bg-white dark:bg-gray-700 rounded-lg shadow-xl border dark:border-gray-600 z-50">
              <div className="p-4 border-b dark:border-gray-600">
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  {currentUser.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {currentUser.role}
                </p>
              </div>
              <div className="py-2">
                <button
                  onClick={handleRoleToggle}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Switch to{" "}
                  {currentRole === "TeamLead" ? "Team Member" : "Team Lead"}
                </button>
                <button
                  onClick={toggleTheme}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex justify-between items-center"
                >
                  <span>Switch Theme</span>
                  {theme === "light" ? <SunIcon /> : <MoonIcon />}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
      {isModalOpen && (
        <MemberSelectionModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default Header;