import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  async componentDidMount() {
    const {data} = await axios
      .create({
        headers: {
          "Access-Control-Allow-Origin": true
        }
      })
      .get('http://localhost:3002/api/product/brands');
    console.log(data);
  }

  render() {
    return (
      <div>
        Best App
      </div>
    );
  }
}

export default App;