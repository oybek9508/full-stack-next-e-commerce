import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import Button from '../components/Button'
import Card from '../components/Card'
import colors from '../config/colors'
import listingApi from '../api/listings'
import routes from '../navigation/routes'
import Screen from '../components/Screen'
import { set } from 'react-native-reanimated'
import AppText from '../components/Text'
import ActivityIndicator from '../components/ActivityIndicator'
import useApi from '../hooks/useApi'

function ListingsScreen({ navigation }) {
  useEffect(() => {
    loadListings()
  }, [])

  const { data: listings, error, loading, request: loadListings } = useApi(
    listingApi.getListing
  )

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Could not retrieve the app listings</AppText>
          <Button title='Retry' onPress={loadListings} />
        </>
      )}
      <ActivityIndicator visible={loading} />
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={'$' + item.price}
            imageUrl={item.images[0].url}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
})

export default ListingsScreen
