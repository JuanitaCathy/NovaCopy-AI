import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import RootLayout from './layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
};

export default appWithTranslation(MyApp);
