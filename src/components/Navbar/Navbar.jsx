import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/storeimage.webp';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();
  
  return (
    <>
        <AppBar position='fixed' className={classes.AppBar} color='inherit'>
            <Toolbar>
                <Typography component={Link} to='/cart' variant='h6' className={classes.AppBar} color='inherit'>
                    <img src={logo} alt='Commerce.js' height='25px' className={classes.image} />
                    Fitverse
                </Typography>
                <div className={classes.grow} />
                {location.pathname === '/' && (   
                <div className={classes.button}> 
                <IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
                  <Badge badgeContent={totalItems} color='secondary'>
                    <ShoppingCart />
                  </Badge>

                </IconButton>
                </div> )} {/* The logic will only show this if the location is in the home screen otherwise will not execute */}
            </Toolbar>

        </AppBar>

    </>
  )
}

export default Navbar;
