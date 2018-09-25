import React, { Component } from "react";
import "./App.css";

const apiUrl = "http://ctp-zip-api.herokuapp.com/city/";
const url = "http://ctp-zip-api.herokuapp.com/zip/";

// search feild
const CitySearchFeild = props => {
  const handleChange = event => {
    props.updateTarget(event.target.value);
  };

  return (
    <div>
      <input placeholder="Enter city" onChange={handleChange.bind(this)} />
    </div>
  );
};

// zip component
const Zip = ({ zips }) => {
  return (
    <div>
      {zips.map((zip, key) => (
        <City key={key} zipCode={zip} />
      ))}
    </div>
  );
};

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: []
    };
  }

  componentDidMount() {
    fetch(url + this.props.zipCode)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data[0]);
        this.setState({ city: data[0] });
      })
      .then(() => {
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div
        className="row justify-content-center"
        key={this.state.city.RecordNumber}
      >
        <div className="card col-lg-4 col-md-4">
          <div className="card-header">{this.state.city.LocationText}</div>
          <ul>
            <li>State: {this.state.city.State}</li>
            <li>
              Location: ({this.state.city.Lat}, {this.state.city.Long})
            </li>
            <li>Population: {this.state.city.EstimatedPopulation}</li>
            <li>Total Wages: {this.state.city.TotalWages}</li>
          </ul>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zips: []
      // city : "",
    };
  }

  // call api to fetch
  searchCityApi(city) {
    this.setState({ zips: [] });
    fetch(apiUrl + city)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          zips: data
        });
      })
      .then(() => {
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>City Search</h1>
        </div>
        <CitySearchFeild
          updateTarget={response => this.searchCityApi(response.toUpperCase())}
        />
        <Zip zips={this.state.zips} />
      </div>
    );
  }
}

export default App;
