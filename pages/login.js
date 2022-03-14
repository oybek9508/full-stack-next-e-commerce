import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import jsCookie from 'js-cookie'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'
import useStyles from '../utils/styles'

function Login() {
  const router = useRouter()
  const classes = useStyles()
  const { redirect } = router.query // /login?redirect=/shopping
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (userInfo) {
      router.push('/')
    }
  }, [])

  const submitHandler = async ({ email, password }) => {
    closeSnackbar()
    try {
      const { data } = await axios.post('/api/users/login', { email, password })
      dispatch({ type: 'USER_LOGIN', payload: data })
      jsCookie.set('userInfo', JSON.stringify(data))
      router.push(redirect || '/')
    } catch (error) {
      enqueueSnackbar(
        error.response.data ? error.response.data.message : error.message,
        {
          variant: 'error',
        }
      )
    }
  }
  return (
    <Layout title='Login'>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <Typography component='h1' variant='h1'>
          Login
        </Typography>
        <List>
          <ListItem>
            <Controller
              name='email'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined'
                  fullWidth
                  id='email'
                  label='Email'
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  inputProps={{ type: 'email' }}
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='password'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined'
                  fullWidth
                  id='password'
                  label='Password'
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password is must contain at least 6 characters'
                        : 'Password is required'
                      : ''
                  }
                  inputProps={{ type: 'password' }}
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Button variant='contained' fullWidth color='primary' type='submit'>
              Login
            </Button>
          </ListItem>
          <ListItem>
            Do not have an account?
            <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
              <Link> Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}

export default Login
