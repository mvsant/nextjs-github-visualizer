import React from 'react';
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import { initializeStore } from '../src/redux/store'
import App from 'next/app';
import Layout from '../src/components/Layout'

export default withRedux(initializeStore)(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {},
      }
    }
    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
      }
    }

    render() {
      const { Component, pageProps, store } = this.props;

      return (
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      );
    }
  }
)