import bcrypt from 'bcryptjs'

const data = {
  users: [
    {
      name: 'Oybek',
      email: 'oybek123@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Elyor',
      email: 'elyor123@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Free Shirt',
      slug: 'free-shirt',
      category: 'Shirts',
      image: '/images/shirt1.jpg',
      price: 40,
      brand: 'Adidas',
      rating: 4.4,
      numReviews: 9,
      countInStock: 4,
      description: 'A popular shirt',
    },
    {
      name: 'Fit Shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      image: '/images/shirt2.jpg',
      price: 40,
      brand: 'Adidas',
      rating: 3.9,
      numReviews: 4,
      countInStock: 24,
      description: 'A popular shirt',
    },
    {
      name: 'Black Pants',
      slug: 'black-pants',
      category: 'Pants',
      image: '/images/pants1.jpg',
      price: 50,
      brand: 'Nike',
      rating: 4.1,
      numReviews: 19,
      countInStock: 13,
      description: 'A popular pant',
    },
    {
      name: 'White Pants',
      slug: 'white-pants',
      category: 'Pants',
      image: '/images/pants2.jpg',
      price: 80,
      brand: 'Reebook',
      rating: 3.4,
      numReviews: 43,
      countInStock: 4,
      description: 'A popular pant',
    },
    {
      name: 'Fashion Pants',
      slug: 'fashion-pants',
      category: 'Pants',
      image: '/images/pants3.jpg',
      price: 30,
      brand: 'Adidas',
      rating: 3.1,
      numReviews: 15,
      countInStock: 9,
      description: 'A popular pant',
    },
  ],
}

export default data
