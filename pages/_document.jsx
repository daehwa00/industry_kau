import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <title>{"내맘을 위로해조"}</title>
          <meta
            name="description"
            content={
              "내 마음에 쌓인 것들 여기서 터놓고 얘기해봐요, 위로해줄게요."
            }
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta property="og:title" content={"내맘을 위로해조 "} />
          <meta
            property="og:description"
            content={
              "내 마음에 쌓인 것들 여기서 터놓고 얘기해봐요, 위로해줄게요."
            }
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={"https://comfortme.shop"} />
          <meta
            property="og:image"
            content={
              "https://comfortme-static.s3.ap-northeast-2.amazonaws.com/20220619_141617.png"
            }
          />
          <meta property="og:article:author" content="내맘을 위로해조" />
          <link
            rel="shortcut icon"
            href="https://comfortme-static.s3.ap-northeast-2.amazonaws.com/20220619_141617.png"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
