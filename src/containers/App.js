import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';

import './App.css';
import Header from '../components/Header/Header';
import TravelForm from '../components/TravelForm/TravelForm';
import TravelResults from '../components/TravelResults/TravelResults';

class App extends Component {
  constructor(){
    super();

    this.state = {
      origin: '',
      destination: '',
      vehicle: '',
      date: new Date(),
      results : [],
      apiUrls: {},
      isSearchingResults : false,
      errors : []
    }
  }


  onFormChange = (property, value) => {
    this.setState({[property]: value});
  }

  onSearchSubmit = async (event) => {
    this.setState({isSearchingResults: true});
    let origin = this.state.origin.split(',')[0];
    let destination = this.state.destination.split(',')[0];
    let date = this.state.date;
    let vehicle = JSON.stringify(this.state.vehicle);
    let url = `https://gentle-plains-26891.herokuapp.com/traitement?origin=${origin}&destination=${destination}&date=${date}&vehicle=${vehicle}`;

    let results = await fetch(url)
      .then(function(data) {
        return data.json();
      })
      .then(function(data) {
        console.log(data);
        for(let result of data.results){
          result.duration = moment.duration(result.duration);
        }
        return data;
      })
      .catch(function(err) {
        console.log(err);
    }); 
    this.setState({
        results: results.results,
        apiUrls: results.apiUrls,
        errors: results.errors,
        isSearchingResults: false
      });
  }

  render(){
    const {results, date, errors, isSearchingResults, apiUrls} = this.state;
    //Affiche un Loader pendant le chargement des résultats
    
    const mainContent = () => {
      if ( results.length === 0 && isSearchingResults ){
        return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        );
      } else if (results.length > 0 && !isSearchingResults){
        return (
          <TravelResults errors={errors} results={results} apiUrls={apiUrls}/>
        );
      } else {
        return <TravelForm onFormChange={this.onFormChange} date={date} searchSubmit={this.onSearchSubmit}/>
      }
    }

    return (
      <div className="App">
        <div className="AppMain">
          <Header/>
          <div className='mainContainer'>
            {mainContent()}
          </div>  
            }
        </div>  
      </div>
    );
  }
  
}

export default App;
