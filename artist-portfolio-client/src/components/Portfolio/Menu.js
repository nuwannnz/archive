import React from "react";
import './menu.css';

function Menu({ active, setActive, setCategory }) {
  const links = [
    { id: 1, name: "All", value: "all" },
    { id: 2, name: "Classic", value: "classic" },
    { id: 3, name: "Trailer", value: "trailer" },
    { id: 4, name: "New Release", value: "newrelease" },
  ];

  function onClick(id, value) {
    setActive(id);
    setCategory(value);
  }

  return (
    <nav className="menu">
      <ul>
        {links.map((link) => (
          <li
            key={link.id}
            className={active === link.id ? "active" : "inactive"}
            onClick={() => onClick(link.id, link.value)}
          >
            {link.name}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
