import { useState } from "react";
import { /*Link*/ NavLink } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="shadow sticky top-0 z-50">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        
          {/* Desktop Menu */}
          <div className="flex items-center lg:order-2">
            <NavLink
              to="/login"
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Log in
            </NavLink>
            <NavLink
              to="/signup"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
            >
              Sign Up
            </NavLink>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-800 hover:bg-gray-50 p-2 rounded-md focus:outline-none"
            >
              <span className="material-icons">menu</span>
            </button>
          </div>

          {/* Mobile Menu */}
          {/* <div
            className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"} absolute top-16 left-0 w-full bg-white shadow-md`}
          >
            <ul className="flex flex-col items-center py-4 space-y-4 font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-4 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 px-4 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div> */}

          {/* Desktop Menu Items */}
          {/* <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </header>
  );
}
