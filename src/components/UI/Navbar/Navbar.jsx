import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={classes.Navbar}>
        <ul className={classes.Navbar__list}>
            <li className={classes.Navbar__item}>
                <Link className={classes.Navbar__link} to='/exchanger' path='../../../pages/Exchanger.jsx'>Exchanger</Link>
            </li>
            <li className={classes.Navbar__item}>
                <Link className={classes.Navbar__link} to='/rates' path='../../../pages/Rates.jsx' >Rates</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar