import React, { useRef } from 'react'
import { ApiProvider, MainLayout } from './components'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import './App.css'
import { Api } from './services'
import { Home, Guards, Clients, Panics } from './routes'

function App() {
  const ref = useRef(Api).current
  return (
    <ApiProvider api={ref}>
      <Router>
        <Switch>
          <Route path="/">
            <MainLayout>
              <Route exact path="/Home">
                <Home />
              </Route>
              <Route exact path="/Guards">
                <Guards />
              </Route>
              <Route exact path="/Clients">
                <Clients />
              </Route>
              <Route exact path="/Panics">
                <Panics />
              </Route>
            </MainLayout>
          </Route>
        </Switch>
      </Router>
    </ApiProvider>
    
  )
}

export default App
