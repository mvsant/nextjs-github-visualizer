import React from 'react'
import { connect } from 'react-redux'
import {default as CommitsList} from '../../src/components/CommitsList'



function Commits() {
  return (
    <CommitsList />
  )
}
export default connect()(Commits);