import React, { useRef } from 'react'
import { ApiProvider, MainLayout, WsListenerProvider } from './components'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import './App.css'
import { Api } from './services'
import { Home, Guards, Clients, Panics, PanicsDetails } from './routes'
import { User } from './routes/User'

function App() {
  const ref = useRef(Api).current
  return (
    <ApiProvider api={ref}>
      <WsListenerProvider>
        <Router>
          <Switch>
            <Route path="/">
              <MainLayout>
                <Route exact path={'/'}>
                  <Redirect to="/Home" />
                </Route>
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
                <Route exact path={['/User/:role/:id', '/User/:role']}>
                  <User />
                </Route>
                <Route exact path={'/Panics/:id'}>
                  <PanicsDetails />
                </Route>
              </MainLayout>
            </Route>
          </Switch>
        </Router>
      </WsListenerProvider>
    </ApiProvider>
    
  )
}

export default App
