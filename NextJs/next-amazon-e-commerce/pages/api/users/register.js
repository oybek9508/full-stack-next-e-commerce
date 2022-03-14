import nextConnect from 'next-connect'
import db from '../../../utils/db'
import bcrypt from 'bcryptjs'
import { signToken } from '../../../utils/auth'
import User from '../../../models/User'

const handler = nextConnect()

// the req is the request that is being sent from client to server
handler.post(async (req, res) => {
  await db.connect()
  // finding the user based on its email
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  })
  //using user.save() method, we are creating a new user and it going to be saved as createdUser
  const user = await newUser.save()
  await db.disconnect()
  const token = signToken(user)
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  })
})

export default handler
