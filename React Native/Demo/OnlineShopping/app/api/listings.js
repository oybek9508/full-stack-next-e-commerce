import client from './client'

const endpoint = '/listings'

const getListing = () => client.get(endpoint)

const addListing = (listing) => {
  const data = new FormData()
  data.append('title', listing.title)
  data.append('price', listing.price)
  data.append('categoryId', listing.category.value)
  data.desciption('description', listing.desciption)

  listing.images.forEach((image, index) =>
    data.append('images', {
      name: 'image' + index,
      type: 'image/jpeg',
      uri: image,
    })
  )

  if (listing.location) {
    data.append('location', JSON.stringify(listing.location))
  }
  return client.post(endpoint, data)
}

export default {
  addListing,
  getListing,
}
