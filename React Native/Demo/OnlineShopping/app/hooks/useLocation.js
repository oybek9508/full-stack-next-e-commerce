import { useEffect, useState } from 'react-native'
import * as Location from 'expo-location'
export default useLocation = () => {
  const [location, setLocation] = useState()
  const getLocation = async () => {
    try {
      const { granted } = await Location.requestPermissionsAsync()
      if (!granted) return
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync()
      setLocation({ latitude, longitude })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getLocation()
  }, [])
  return location
}
