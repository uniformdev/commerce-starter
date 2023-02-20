import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';

const AppDocument = () => (
  <Html lang="en">
    <Head>
      {/* Adobe Fonts connections https://helpx.adobe.com/fonts/using/embed-codes.html */}
      <link rel="stylesheet" href="https://use.typekit.net/amw0suj.css" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default AppDocument;
