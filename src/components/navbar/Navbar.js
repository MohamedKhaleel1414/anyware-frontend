import React from "react";
import { useNavigate } from "react-router";
import swal from "sweetalert";

function Navbar() {
  const navigate = useNavigate();
  function gotoSearch() {
    let logged = localStorage.getItem("authState");
    if (logged) {
      navigate("/search");
    } else {
      swal("You must login first!");
      navigate("/");
    }
  }
  function gotoHistory() {
    let logged = localStorage.getItem("authState");
    if (logged) {
      navigate("/history");
    } else {
      swal("You must login first!");
      navigate("/");
    }
  }
  function logout() {
    let cookie = document.cookie.split(";")[0];
    let cook = document.cookie.split(";")[0].indexOf("=");
    let nm = cookie.substring(0, cook);
    document.cookie = `${nm}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    localStorage.clear();
    navigate("/");
  }
  return (
    <nav className="bg-success px-5 py-1">
      <ul
        className="d-flex justify-content-start gap-5 text-light mt-3 fs-5 fw-bold"
        style={{ listStyle: "none" }}
      >
        <li onClick={gotoSearch}>Search</li>
        <li onClick={gotoHistory}>History</li>
        <li onClick={logout}>Logout</li>
      </ul>
    </nav>
  );
}

export default Navbar;
