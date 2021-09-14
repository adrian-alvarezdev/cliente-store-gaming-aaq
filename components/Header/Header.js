import React from "react";
import Topbar from "../../components/Header/Topbar/Topbar";
import MenuWeb from "./Menu/MenuWeb";

export default function Header() {
  return (
    <div
      className="header
        
        "
    >
      <Topbar />
      <MenuWeb />
    </div>
  );
}
