import Document, { Html, NextScript } from "next/document";
import Head from "next/head";

export default class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html>
                <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com"  />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <main>
                        <NextScript />
                    </main>
                </body>
            </Html>
        )
    }
}