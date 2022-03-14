import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'
import NextLink from 'next/link'
import Layout from '../components/Layout'
import db from '../utils/db'
import Product from '../models/Product'
import axios from 'axios'
import { useContext } from 'react'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'

export default function Home(props) {
  const { products } = props
  const router = useRouter()
  console.log('products', products)
  const { state, dispatch } = useContext(Store)

  const addToCartHandler = async (product) => {
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
    <Layout>
      <div>
        <h1>Products</h1>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      image={product.image}
                      title={product.name}
                    />
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button
                    size='small'
                    color='primary'
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  await db.connect()
  const products = await Product.find({}).lean()
  await db.disconnect()
  return {
    props: {
      products: products.map(db.convertDocToObject),
    },
  }
}
