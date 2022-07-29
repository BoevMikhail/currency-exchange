import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Navbar.module.css';
import {linkList} from './linkList';

const Navbar = () => {
  return (
    <div className={classes.navbar}>

      <ul className={classes.list}>
        {linkList.map(linkItem =>
          <li key={linkItem.name} className={classes.item}>
            <NavLink className={({isActive}) => {
              const currClass = [classes.link];
              if (isActive) currClass.push(classes.link__current);
              return currClass.join(' ')
            }}
              to={linkItem.to} path={linkItem.path}>{linkItem.name}</NavLink>
          </li>)
        }
      </ul>
    </div >
  )
}

export default Navbar
