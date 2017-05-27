import React, { Component } from 'react';
import Graph from './components/Graph';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              <h1 className='text-center'>Force Directed Graph of Country Borders</h1>
              <hr />
              <Graph />
              <hr />
              <p className='text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero id inventore molestiae in ipsam. Vitae commodi soluta voluptatem reprehenderit dolor quia quas tempora debitis, ipsam dolore minus laudantium veniam laboriosam!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
