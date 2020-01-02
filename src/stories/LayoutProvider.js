import React from 'react'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import { initializeStore } from '../redux/store'

const ProviderWrapper = ({ children, store = initializeStore() }) => (
  <Provider store={store}>
    <Layout>
      {children}
    </Layout>
  </Provider>
)

export default ProviderWrapper