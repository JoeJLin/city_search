import React, { Component } from 'react';
import './App.css';

const apiUrl = "http://ctp-zip-api.herokuapp.com/city/";

const CitySearchFeild = (props) => {
  const handleChange = (event) => {
    props.updateTarget(event.target.value);
  }

  return (
    <div>
      <input placeholder="Enter city" onChange={handleChange.bind(this)}/>
    </div>
  )
}

const Zip = ({zips}) => {
  // /* <City key={key} zipCode={zip}/> */
  return (
    <div>
      {zips.map((zip, key) => 
        <div key={key}>{zip}</div>
      )}
    </div>
  )
}

// const City = (props) => {
//   const url = "http://ctp-zip-api.herokuapp.com/zip/";
//   let city = '';
//    const searchZipApi = (zipCode) =>{
//     console.log(zipCode)
//     fetch(url + zipCode)
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         city = data;
//       })
//       .catch(err => console.log(err))
// }
//   // return (<div />)
// console.log(props.zipCode)
//   // city = searchZipApi(props.zipCode)
//   // if(!city)
//   //   return <div>loading</div>
//   // else
//     return <div>city</div>;
// }

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zips : [],
      // city : "",
    }

  }

  // call api to fetch
  searchCityApi(city) {
    this.setState({zips : [] })
    fetch(apiUrl + city)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          zips : data,
        });
      })
      .then(() => {
        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>City Search</h1>
        </div>
        <CitySearchFeild updateTarget = {(response) => this.searchCityApi(response.toUpperCase())}/>
        <Zip zips={this.state.zips}/>
      </div>
    );
  }
}

export default App;
