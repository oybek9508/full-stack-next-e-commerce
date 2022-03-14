import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import NextLink from 'next/link'
import { useContext } from 'react'
import {
  Grid,
  Link,
  Card,
  List,
  ListItem,
  Typography,
  Button,
} from '@mui/material'
import useStyles from '../../utils/styles'
import Image from 'next/image'
import Product from '../../models/Product'
import db from '../../utils/db'
import axios from 'axios'
import { Store } from '../../utils/Store'

function ProductScreen(props) {
  let { product } = props
  const router = useRouter()
  const classes = useStyles()
  const { state, dispatch } = useContext(Store)

  if (!product) return <div>No Product Found</div>
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`)
    const existItem = state.cart.cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (data.countInStock < quantity) {
      alert('Sorry, product is out of stock')
      return
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    router.push('/cart')
  }
  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href='/' passHref>
          <Link>
            <Typography>Back to products </Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.image}
            width={640}
            height={640}
            layout='responsive'
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component='h1' variant='h1'>
                {product.name}{' '}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category} </Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              Desciption: <Typography>{product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ProductScreen

export const getServerSideProps = async (context) => {
  console.log('context', context)
  const { params } = context
  const { slug } = params
  await db.connect()
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()
  return {
    props: {
      product: db.convertDocToObject(product),
    },
  }
}
