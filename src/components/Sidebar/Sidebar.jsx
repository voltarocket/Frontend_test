import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import logo from '../../assets/logo.png';

const routes = [
    { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales' },
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];

const SidebarWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => (props.isOpened ? '250px' : '60px')};
    transition: width 0.3s ease;
    background-color: ${props => (props.theme === 'dark' ? '#1a1a1a' : '#fff')};
    box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.1);
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }
    span {
        font-size: 20px;
        font-weight: bold;
        color: ${props => (props.theme === 'dark' ? '#fff' : '#000')};
    }
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: ${props => (props.theme === 'dark' ? '#fff' : '#000')};

    &:hover {
        background-color: ${props => (props.theme === 'dark' ? '#333' : '#e5e5e5')};
        border-radius: 10px;
    }

    span {
        margin-left: 10px;
        font-size: 16px;
        font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
        color: ${props => (props.theme === 'dark' ? (props.isActive ? '#00aaff' : '#ccc') : (props.isActive ? '#007bff' : '#333'))};
    }
`;

const ToggleButton = styled.div`
    position: absolute;
    top: 20px;
    left: ${props => (props.isOpened ? '220px' : '75px')};
    cursor: pointer;
    transition: left 0.3s ease;
    background-color: ${props => (props.theme === 'dark' ? '#333' : '#fff')};
    border-radius: 50%;
    padding: 10px;
    wight: 80px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 4px 0px 6px rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: ${props => (props.theme === 'dark' ? '#555' : '#e5e5e5')};
    }
    font-size: 24px;
    color: ${props => (props.theme === 'dark' ? '#fff' : '#000')};
`;

const Sidebar = (props) => {
    const { theme } = props;
    const [isOpened, setIsOpened] = useState(false);
    const [activeRoute, setActiveRoute] = useState('/sales'); // Дефолтный активный маршрут

    const containerClassnames = isOpened ? 'sidebar opened' : 'sidebar';

    const goToRoute = (path) => {
        setActiveRoute(path);
        console.log(`Going to "${path}"`);
    };

    const toggleSidebar = () => {
        setIsOpened(prev => !prev);
    };

    return (
        <SidebarWrapper theme={theme} isOpened={isOpened}>
            <LogoContainer theme={theme}>
                <img src={logo} alt="Logo" />
                {isOpened && <span>Technifly</span>}
            </LogoContainer>

            <div>
                {routes.map(route => (
                    <MenuItem
                        key={route.title}
                        theme={theme}
                        isActive={route.path === activeRoute}
                        onClick={() => goToRoute(route.path)}
                    >
                        <FontAwesomeIcon icon={route.icon} />
                        {isOpened && <span>{route.title}</span>}
                    </MenuItem>
                ))}
            </div>

            <div>
                {bottomRoutes.map(route => (
                    <MenuItem
                        key={route.title}
                        theme={theme}
                        isActive={route.path === activeRoute}
                        onClick={() => goToRoute(route.path)}
                    >
                        <FontAwesomeIcon icon={route.icon} />
                        {isOpened && <span>{route.title}</span>}
                    </MenuItem>
                ))}
            </div>

            <ToggleButton isOpened={isOpened} theme={theme} onClick={toggleSidebar}>
                <FontAwesomeIcon icon={isOpened ? 'angle-left' : 'angle-right'} />
            </ToggleButton>
        </SidebarWrapper>
    );
};

Sidebar.propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
};

Sidebar.defaultProps = {
    theme: 'light',
};

export default Sidebar;
