import { Button, List, ListItem, TextField, Typography } from '@mui/material'
import jsCookie from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'
import useStyles from '../utils/styles'

function Shipping() {
  const classes = useStyles()
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()
  const { state, dispatch } = useContext(Store)
  const {
    userInfo,
    cart: {
      shippingAddress: { fullName, address, city, postalCode, country },
    },
  } = state
  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping')
    }
    setValue('fullName', fullName)
    setValue('address', address)
    setValue('city', city)
    setValue('postalCode', postalCode)
    setValue('country', country)
  }, [])

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    })
    jsCookie.set(
      'shippingAddress',
      JSON.stringify({ fullName, address, city, postalCode, country })
    )
    router.push('/payment')
  }
  return (
    <Layout title='Shipping Address'>
      <CheckoutWizard activeStep={1} />
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <Typography component='h1' variant='h1'>
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name='fullName'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined'
                  fullWidth
                  id='fullName'
                  label='Full Name'
                  error={Boolean(errors.name)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'Full Name must contai at least one character'
                        : 'Full Name is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='address'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined'
                  fullWidth
                  id='address'
                  label='Address'
                  error={Boolean(errors.name)}
                  helperText={
                    errors.address
                      ? errors.address.type === 'minLength'
                        ? 'Address must contai at least one character'
                        : 'Address is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='city'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined'
                  fullWidth
                  id='city'
                  label='City'
                  error={Boolean(errors.name)}
                  helperText={
                    errors.city
                      ? errors.city.type === 'minLength'
                        ? 'City must contai at least one character'
                        : 'City is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='postalCode'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined'
                  fullWidth
                  id='postalCode'
                  label='Postal Code'
                  error={Boolean(errors.name)}
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === 'minLength'
                        ? 'Postal Code must contai at least one character'
                        : 'Postal Code is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name='country'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({ field }) => (
                <TextField
                  variant='outlined'
                  fullWidth
                  id='country'
                  label='Country'
                  error={Boolean(errors.name)}
                  helperText={
                    errors.country
                      ? errors.country.type === 'minLength'
                        ? 'Country must contai at least one character'
                        : 'Country is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Button variant='contained' fullWidth color='primary' type='submit'>
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}

export default Shipping
