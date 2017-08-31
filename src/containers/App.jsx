import React from "react"
import PropTypes from "prop-types"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import * as Actions from "../actions"

import Game from "../components/Game"

export const App = ({character, actions}) =>
  <div>
    <Game character={character} actions={actions} />
  </div>

App.propTypes = {
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({character: state.character})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
