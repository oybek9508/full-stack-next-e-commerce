import nc from 'next-connect'
import db from '../../utils/db'
import Product from '../../models/Product'

import data from '../../utils/data'
import User from '../../models/User'

const handler = nc()
// creating get api
handler.get(async (req, res) => {
  await db.connect()
  //deleting the previous records of products
  await Product.deleteMany()
  // inserting new products
  await Product.insertMany(data.products)
  //deleting the previous records of users
  await User.deleteMany()
  // inserting new products
  await User.insertMany(data.users)
  await db.disconnect()
  res.send({ message: 'seeded successfully' })
})

export default handler
