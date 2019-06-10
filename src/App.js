import React, { Component } from "react";
import "./App.css";

function UserCard(props) {

  return (
    <div className="col-md-2 target card">
      <img src={props.picture} className="img-cirlce" />
      <p>{props.firstName}</p>
      <button className="btn btn-info" onClick={props.onClick}>Hide Details</button>
      <p>{props.email}</p>
    </div>
  );
}

function HiddenCard(props) {

  return (
    <div className="col-md-2 target card">
      <img src={props.picture} className="img-cirlce" />
      <p>{props.firstName}</p>
      <button className="btn btn-info" onClick={props.onClick}>Show Details</button>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isHidden: true
    };
  }

  onClick = (event, props) => {
    this.setState(prevState => ({
      isHidden: !prevState.isHidden
    }));

    if (this.state.isHidden === false) {
      return (
        <p>email</p>
      )
    }
  };

  componentDidMount() {
    fetch("https://randomuser.me/api/?results=25")
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        this.setState({
          results: json.results
        });
      });
  }

  render() {
    if (this.state.isHidden === false){
      return (
        <div className="App row">
          {this.state.results.map((results, index) => (
            <UserCard
              key={index}
              firstName={results.name.first}
              email={results.email}
              picture={results.picture.medium}
              onClick={this.onClick}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div className="App row">
          {this.state.results.map((results, index) => (
            <HiddenCard
              key={index}
              firstName={results.name.first}
              picture={results.picture.medium}
              onClick={this.onClick}
            />
          ))}
        </div>
      );
    }
  }
}

export default App;
