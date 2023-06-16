import './navToggle.css';
import React, {Dispatch, SetStateAction} from 'react';

interface IProps {
    navbarToggled: boolean,
    toggle: Dispatch<SetStateAction<any>>
}

const NavToggle = (props: IProps) => {
    const {navbarToggled, toggle} = props;
    
    return (
        <button 
            id="navbar-toggle-icon" 
            className={navbarToggled ? 'open' : ''} 
            onClick={toggle}
            aria-label='toggle navigation menu'
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}

export default NavToggle;