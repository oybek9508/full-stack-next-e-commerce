import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#fff',
      marginLeft: 10,
    },
  },
  brand: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  grow: { flexGrow: 1 },
  main: {
    minHeight: '80vh',
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    textAlign: 'center',
  },
  form: {
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#fff',
    textTransform: 'initial',
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  error: {
    color: '#f04040',
  },
  fullWidth: {
    width: '100%',
  },
}))

export default useStyles
