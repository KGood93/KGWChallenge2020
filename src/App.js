import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import Welcome from './Welcome/Welcome'
import Search from './Search/Search'
import Similar from './Similar/Similar'
import Artist from './Artist/Artist'
import Header from './Header/Header'
import './App.css';

class App extends Component {
    renderNavRoutes() {
      return (
        <>
          {['/'].map(path => {
            return(
            <Route 
              exact
              key={path}
              path={path}
              component={Welcome}
            />
          )})}
          <Route path='/similar' component={Similar} />
          <Route path='/artist/:artistName' component={Artist} />
  
        </>
      );
    }

    render() {
      return (
        <div className="App">
          <Header />
          <div className="searchBar">
            <Search />
          </div>
          <div className="body">
            <nav className="AppNav">{this.renderNavRoutes()}</nav>
          </div>
        </div>
      )
    }
}

export default App;
