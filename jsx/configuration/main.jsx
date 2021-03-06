import React from 'react'
import Admin from './admin'
import Settings from './settings'
import Telemetry from 'telemetry/main'
import Dashboard from './dashboard'
import Auth from 'auth'
import Connectors from 'connectors/main'
import $ from 'jquery'

const components = {
  settings: <Settings />,
  connectors: <Connectors />,
  telemetry: <Telemetry />,
  dashboard: <Dashboard />,
  authentication: <Auth />,
  admin: <Admin />
}

export default class Configuration extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      body: 'settings'
    }
    this.setBody = this.setBody.bind(this)
  }

  setBody (k) {
    return () => { this.setState({body: k}) }
  }

  render () {
    var panels = [ ]
    $.each(['settings', 'connectors', 'telemetry', 'dashboard', 'authentication', 'admin'], (_, k) => {
      var cname = this.state.body === k ? 'nav-item active text-info' : 'nav-item'
      panels.push(
        <li className={cname} key={k}>
          <a id={'config-' + k} className='nav-link' onClick={this.setBody(k)}>{k} </a>
        </li>
      )
    })
    var body = components[this.state.body]
    return (
      <div className='container'>
        <ul className='nav nav-tabs'>
          {panels}
        </ul>
        {body}
      </div>
    )
  }
}
