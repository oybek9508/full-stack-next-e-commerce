import "../styles/globals.css";
// import createEmotionCache from "src/utility/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";

// const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, pageProps } = props;
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
