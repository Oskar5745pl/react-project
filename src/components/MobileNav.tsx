import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./MobileNav.css";
export default function MobileNav() {
  // State to store the fetched prayer times
  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);
  // const [openDropdown, setOpenDropdown] = useState(false)
  // const toggleDropdown = () => {
  //     setOpenDropdown(!openDropdown)
  // }
  const [openDropdowns, setOpenDropdowns] = useState([false, false, false]);
  const toggleDropdown = (index: number) => {
    const updatedDropdowns = [...openDropdowns];
    updatedDropdowns[index] = !updatedDropdowns[index];
    setOpenDropdowns(updatedDropdowns);
  };
  const dropdownContents = [
    {
      name: "Products",
      links: [
        { text: "Instant Meals", href: "#" },
        { text: "Ready to drink Meal", href: "#" },
        { text: "A-Z Vitamins", href: "#" },
        { text: "Protein Snacks", href: "#" },
        { text: "Daily Greens", href: "#" },
        { text: "Accessories", href: "#" },
      ],
    },
    {
      name: "Nutritional Information",
      links: [
        { text: "Another Link", href: "#" },
        { text: "More Links", href: "#" },
      ],
    },
    {
      name: "Learn",
      links: [
        { text: "Yet Another Link", href: "#" },
        { text: "Last Link", href: "#" },
      ],
    },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const closeDropdownMeno = () => {
    setOpenDropdowns([false]);
  };
  let menuIcon;
  switch (menuOpen) {
    case false:
      menuIcon = (
        <svg
          className="svg-icon"
          height="10"
          width="10"
          viewBox="0 0 10 10"
          aria-labelledby="button-label"
          focusable="false"
          fill="#123524"
        >
          <title id="button-label">Menu</title>
          <path d="m1 7h8v2h-8zm0-3h8v2h-8zm0-3h8v2h-8z" />
        </svg>
      );
      break;
    case true:
      menuIcon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="30"
          fill="white"
          className="bi bi-x-lg"
          viewBox="0 0 16 16"
          onClick={closeDropdownMeno}
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
        </svg>
      );
      break;
  }
  const setDropdownWidth = () => {
    const mnavWidth = $(".mnav ").outerWidth();
    $(".dropdown-content").width(Number(mnavWidth) - Number(20));
    $(".links").width(Number(mnavWidth));
    $(".dropdown").width(Number(mnavWidth));
    $(".dropbtn").width(Number(mnavWidth) - Number(40));
  };
  useEffect(() => {
    // Call the function when the component mounts
    setDropdownWidth();

    // Set up resize event listener to keep the width updated
    window.addEventListener("resize", setDropdownWidth);

    // Clean up the event listener on unmount
  }, [menuOpen]);
  return (
    <>
      {menuOpen && (
        <div>
          <nav
            className="mnav animate__animated animate__fadeInDown "
            id="bottom"
          >
            <ul className="mnav-links" id="topLinks">
              <div className="dropdownMenus">
                {dropdownContents.map((dropdown, index) => (
                  <div className="dropdown " key={index}>
                    <button
                      className="dropbtn"
                      onClick={() => toggleDropdown(index)}
                    >
                      {dropdown.name}{" "}
                      {openDropdowns[index] ? (
                        <i className="bi bi-caret-up"></i>
                      ) : (
                        <i className="bi bi-caret-down"></i>
                      )}
                    </button>
                    {openDropdowns[index] && (
                      <div className="dropdown-content ">
                        {dropdown.links.map((link, linkIndex) => (
                          <Link key={linkIndex} to={link.href}>
                            {link.text}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <ul className="links">
                <li>
                  <Link className="mlinks" to={"/Lessons"} onClick={closeMenu}>
                    FAQS
                  </Link>
                </li>
                <li>
                  <Link
                    className="mlinks"
                    to={"/EventBooking"}
                    onClick={closeMenu}
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link className="mlinks" to={"/Lectures"} onClick={closeMenu}>
                    Delivery Schedule
                  </Link>
                </li>
                <li>
                  <Link className="mlinks" to={"/Services"} onClick={closeMenu}>
                    Butcher's Blog
                  </Link>
                </li>

                <li>
                  <Link className="mlinks" to={"/Contact"} onClick={closeMenu}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </ul>

            <ul className="account">
              <li>
                {token ? (
                  // If user is logged in, link to the dashboard

                  <Link
                    className="mlinks"
                    id="accountID"
                    to={"/dashboard"}
                    onClick={closeMenu}
                  >
                    Account Dashboard
                  </Link>
                ) : (
                  // If user is not logged in, link to the login page
                  <Link
                    className="mlinks"
                    id="accountID"
                    to={"/LoginForm"}
                    onClick={closeMenu}
                  >
                    Log-in
                  </Link>
                )}
                {/* <Link className='mlinks' id="accountID" to={"/LoginForm"} onClick={closeMenu}>Log-in</Link>
                            {user && <Link className='mlinks' id="accountID" to={"/dashboard"} onClick={closeMenu}>Account Dashboard</Link>} */}
              </li>
              {/* <li><Link className='mlinks' id="accountID" to={"/dashboard"} onClick={closeMenu}>Account Dashboard</Link></li>             */}
            </ul>
          </nav>
        </div>
      )}
      <nav id="top" className="nav">
        <Link to={"/"} className="logo">
          <img src="./treelogo.jpg" alt="" />
        </Link>
        <div className="navGroup">
          <Link to={"/SearchPage"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#123524"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </Link>
          <Link to={"/cart"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#123524"
              className="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
          </Link>
          <button onClick={toggleMenu} className="menuTgl">
            {menuIcon}
          </button>
        </div>
      </nav>
    </>
  );
}
