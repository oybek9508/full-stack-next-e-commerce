import React, { useContext } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import {
  Link,
  AppBar,
  Toolbar,
  Container,
  Typography,
  CssBaseline,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useStyles from '../utils/styles'
import { Store } from '../utils/Store'
import jsCookie from 'js-cookie'
import { useRouter } from 'next/router'

function Layout({ title, description, children }) {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const { darkMode, cart, userInfo } = state
  const { cartItems } = cart
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  })

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const loginClickHandler = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const loginMenuCloseHandler = () => {
    setAnchorEl(null)
  }

  const logoutClickHandler = () => {
    setAnchorEl(null)
    dispatch({ type: 'USER_LOGOUT' })
    jsCookie.remove('userInfo')
    jsCookie.remove('cartItems')
    router.push('/')
  }

  const classes = useStyles()
  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - Next E-commerce` : 'Next E-commerce'}
        </title>
        {description && <meta name='description' content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='static' className={classes.navbar}>
          <Toolbar>
            <NextLink href='/' passHref>
              <Link>
                <Typography className={classes.brand}>Amazona</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <Switch
              checked={darkMode}
              onChange={() => {
                dispatch({
                  type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON',
                })
                const newDarkMode = !darkMode
                jsCookie.set('darkMode', newDarkMode ? 'ON' : 'OFF')
              }}
            />
            <div>
              <NextLink href='/cart' passHref>
                <Link>
                  {cartItems.length > 0 ? (
                    <Badge color='secondary' badgeContent={cartItems.length}>
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button
                    className={classes.navbarButton}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={loginClickHandler}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={loginMenuCloseHandler}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                    <MenuItem onClick={loginMenuCloseHandler}>
                      My account
                    </MenuItem>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href='/login' passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved. Next E-commerce</Typography>
        </footer>
      </ThemeProvider>
    </div>
  )
}

export default Layout
