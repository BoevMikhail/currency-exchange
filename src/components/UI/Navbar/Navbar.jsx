import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={classes.Navbar}>
        <ul className={classes.Navbar__list}>
            <li className={classes.Navbar__item}>
                <NavLink className={({isActive}) => {
                  const currClass = [classes.Navbar__link];
                  if(isActive) currClass.push(classes.Navbar__linkActive);
                  return currClass.join(' ')}}
                  to='/exchanger' path='../../../pages/Exchanger.jsx'>Exchanger</NavLink>
            </li>
            <li className={classes.Navbar__item}>
                <NavLink className={({isActive}) => {
                  const currClass = [classes.Navbar__link];
                  if(isActive) currClass.push(classes.Navbar__linkActive);
                  return currClass.join(' ')}} to='/rates' path='../../../pages/Rates.jsx' >Rates</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Navbar
