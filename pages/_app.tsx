import { useState, useEffect } from "react"
import { AppProps } from "next/app"

import { Layout } from "components"
import "assets/styles/index.scss"

export default ({ Component, pageProps }: AppProps) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
