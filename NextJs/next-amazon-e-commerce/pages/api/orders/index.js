import nc from 'next-connect'
import db from '../../../utils/db'
import Order from '../../../models/Order'
import { onError } from '../../../utils/error'
import { isAuth } from '../../../utils/auth'

const handler = nc({
  onError,
})

handler.use(isAuth)
// creating get api
handler.post(async (req, res) => {
  await db.connect()
  // creating a newOrder instance from Order model
  const newOrder = new Order({ ...req.body, user: req.user._id })
  // saving the newOrder into database and taking it as order
  const order = await newOrder.save()
  res.status(201).send(order)
})

export default handler
