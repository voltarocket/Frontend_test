import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import logo from "../../assets/logo.png";

const routes = [
  { title: "Home", icon: "fas-solid fa-house", path: "/" },
  { title: "Sales", icon: "chart-line", path: "/sales" },
  { title: "Costs", icon: "chart-column", path: "/costs" },
  { title: "Payments", icon: "wallet", path: "/payments" },
  { title: "Finances", icon: "chart-pie", path: "/finances" },
  { title: "Messages", icon: "envelope", path: "/messages" },
];

const bottomRoutes = [
  { title: "Settings", icon: "sliders", path: "/settings" },
  { title: "Support", icon: "phone-volume", path: "/support" },
];

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => (props.isOpened ? "260px" : "61px")};
  transition: width 0.3s ease;
  background-color: var(
    ${(props) =>
      props.color === "dark"
        ? "--color-sidebar-background-dark-default"
        : "--color-sidebar-background-light-default"}
  );
  box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 30px;
  margin-left: ${(props) => (props.isOpened ? "20px" : "10px")};

  img {
    width: 40px;
    height: 40px;
    margin-right: 4px;
  }

  span {
    font-size: 20px;
    font-weight: bold;
    color: var(
      ${(props) =>
        props.color === "dark"
          ? "--color-text-logo-dark-default"
          : "--color-text-logo-light-default"}
    );
  }
`;

const MenuContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const BottomContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 50px;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isOpened ? "start" : "center")};
  align-items: center;
  padding: 10px;
  width: ${(props) => (props.isOpened ? "210px" : "20px")};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, width 0.3s ease;
  color: var(
    ${(props) =>
      props.color === "dark"
        ? "--color-text-dark-default"
        : "--color-text-light-default"}
  );

  &:hover {
    background-color: var(
      ${(props) =>
        props.color === "dark"
          ? "--color-sidebar-background-dark-hover"
          : "--color-sidebar-background-light-hover"}
    );
  }

  span {
    margin-left: ${(props) => (props.isOpened ? "10px" : "0px")};
    font-size: 16px;
    font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
    color: var(
      ${(props) =>
        props.color === "dark"
          ? props.isActive
            ? "--color-text-dark-active"
            : "--color-text-dark-default"
          : props.isActive
          ? "--color-text-light-active"
          : "--color-text-light-default"}
    );
  }
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 20px;
  left: ${(props) => (props.isOpened ? "205px" : "70px")};
  cursor: pointer;
  transition: left 0.3s ease;
  background-color: var(
    ${(props) =>
      props.color === "dark"
        ? "--color-button-background-dark-default"
        : "--color-button-background-light-default"}
  );
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: var(
      ${(props) =>
        props.color === "dark"
          ? "--color-sidebar-background-dark-hover"
          : "--color-sidebar-background-light-hover"}
    );
  }

  font-size: 20px;
  color: ${(props) =>
    props.color === "dark"
      ? "var(--color-text-dark-default)"
      : "var(--color-text-light-default)"};
`;

const Sidebar = ({ color }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/sales");

  const goToRoute = (path) => {
    setActiveRoute(path);
    console.log(`Going to "${path}"`);
  };

  const toggleSidebar = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <SidebarWrapper color={color} isOpened={isOpened}>
      <LogoContainer color={color}>
        <img src={logo} alt="Logo" />
        {isOpened && <span>Technifly</span>}
      </LogoContainer>

      <MenuContainer isOpened={isOpened}>
        {routes.map((route) => (
          <MenuItem
            key={route.title}
            color={color}
            isOpened={isOpened}
            isActive={route.path === activeRoute}
            onClick={() => goToRoute(route.path)}
          >
            <FontAwesomeIcon icon={route.icon} />
            {isOpened && <span>{route.title}</span>}
          </MenuItem>
        ))}
      </MenuContainer>

      <BottomContainer>
        {bottomRoutes.map((route) => (
          <MenuItem
            key={route.title}
            color={color}
            isOpened={isOpened}
            isActive={route.path === activeRoute}
            onClick={() => goToRoute(route.path)}
          >
            <FontAwesomeIcon icon={route.icon} />
            {isOpened && <span>{route.title}</span>}
          </MenuItem>
        ))}
      </BottomContainer>

      <ToggleButton color={color} isOpened={isOpened} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpened ? "angle-left" : "angle-right"} />
      </ToggleButton>
    </SidebarWrapper>
  );
};

Sidebar.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

Sidebar.defaultProps = {
  color: "light",
};

export default Sidebar;
