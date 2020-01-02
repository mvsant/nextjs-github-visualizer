import React from 'react'
import { connect } from 'react-redux'
import {default as Searcher} from '../src/components/Searcher'
import {default as User} from '../src/components/User'
import ReposList from '../src/components/ReposList'



class Index extends React.Component {
  static getInitialProps({ reduxStore, req }) {
    return {}
  }
  render() {
    return (
      <>
        <Searcher />
        <User />
        <ReposList />
      </>
    )
  }
}

export default connect()(Index)