import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';

import './App.css';
import Header from '../components/Header/Header';
import serverImage from '../images/serverError.png';
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
      errors : [],
      serverError: false
    }
  }


  onFormChange = (property, value) => {
    this.setState({[property]: value});
  }

  onSearchSubmit = async (event) => {
    this.setState({isSearchingResults: true});
    let origin = this.state.origin.split(',')[0];
    let destination = this.state.destination.split(',')[0];
    let date = moment(this.state.date).toISOString(true);
    let vehicle = JSON.stringify(this.state.vehicle);

    let url = `https://gentle-plains-26891.herokuapp.com/traitement?origin=${origin}&destination=${destination}&date=${date}&vehicle=${vehicle}`;

    let results = await fetch(url)
      .then(function(data) {
        return data.json();
      })
      .then(function(data) {
        for(let result of data.results){
          result.duration = moment.duration(result.duration);
        }
        return data;
      })
      .catch(function(err) {
        console.log(err);
        this.setState({isSearchingResults: false, serverError: true});
      }.bind(this)); 
    this.setState({
        results: results.results,
        apiUrls: results.apiUrls,
        errors: results.errors,
        isSearchingResults: false
      });
  }

  render(){
    const {results, date, errors, isSearchingResults, apiUrls, serverError} = this.state;
    
    const mainContent = () => {
      if ( results.length === 0 && isSearchingResults && !serverError){
        return (
          <div class="loadingScreen">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
            <article>
              <h2>Votre recherche est en cours...</h2>
              <p>Nous sommes en train d'interroger les services de transports associés à votre recherche. Merci de votre patience!</p>
            </article>
          </div>
        );
      } else if (results.length > 0 && !isSearchingResults && !serverError){
        return (
          <TravelResults errors={errors} results={results} apiUrls={apiUrls}/>
        );
      } else if (serverError){
        return(
          <div class="serverError">
            <img src={serverImage} alt='Server Error'/>
            <article> 
              <h2>Le serveur ne répond pas (request timeout)</h2>
              <p>Nous sommes désolé, le serveur n'a pas renvoyé de réponse. Vous pouvez envoyer un email à robin.lallier29@gmail.com et je tâcherais de résoudre ce bug!
              </p>
            </article>
          </div>
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
        </div>  
      </div>
    );
  }
  
}

export default App;
