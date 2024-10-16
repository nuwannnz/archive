import type { ReactElement, ReactNode } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { baselightTheme } from "../src/theme/DefaultColors";
import { configAmplify } from "../src/config/amplify";
import { SWRConfig } from "swr";
import { fetcher } from "../src/config/api";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// Configure Amplify
configAmplify();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const theme = baselightTheme;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Modernize NextJs Free Admin template</title>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SnackbarProvider
          autoHideDuration={3000}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <ConfirmProvider
            defaultOptions={{
              confirmationButtonProps: { autoFocus: true },
            }}
          >
            <SWRConfig value={{ fetcher }}>
              {getLayout(<Component {...pageProps} />)}
            </SWRConfig>
          </ConfirmProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
