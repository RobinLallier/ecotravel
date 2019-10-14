import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import './TravelForm.css';
import AutoSuggestHandler from '../AutoSuggestHandler/AutoSuggestHandler';

const baseUrl = 'https://gentle-plains-26891.herokuapp.com';

class TravelForm extends Component {
	constructor({date}){
		super();
		this.state = {
			date: date
		}
		this.onVehicleSelect = this.onVehicleSelect.bind(this);

	}

	onFormChange = (name, value) => {
		this.props.onFormChange(name, value);
	}

	onDateChange = (event) => {
		const date = new Date(event);
		this.setState({date: date});
		this.onFormChange('date', date);
	}

	onVehicleSelect = async ({target}) => {
		const model = target.value.toUpperCase();
		// récupère une liste de 5 véhicules dont le modèle correspond à celui entré par l'utilisateur
		await fetch(`${baseUrl}/car/?model=${model}`)
		.then(vehicleResults =>  {
			return vehicleResults.json();
		})
		.then((vehicleResults) => {
			console.log(vehicleResults);
			const results = vehicleResults;
	      	if(results.records.length) {
		        const vehicle = {
		          model: results.records[0].fields.modele_utac,
		          marque:  results.records[0].fields.marque,
		          consoMixte100Km: results.records[0].fields.consommation_mixte_l_100km,
		          carburant: results.records[0].fields.carburant,
		          particules: results.records[0].fields.particules_g_km,
		          co2: results.records[0].fields.co2_g_km,
		          hydrocarbones: results.records[0].fields.hc_nox_g_km,
		          no2: results.records[0].fields.nox_g_km
		        };
	        	this.onFormChange('vehicle', vehicle);
	      	}
	      	else throw Error;
	    })
	    .catch((err) =>{
	      this.setState({vehicleError: 'Véhicule non trouvé dans la base de donnée de l\'Ademe, vérifiez le modèle.'});
	      console.error(err);
	    });
		}



	render(){

		var searchSubmit = this.props.searchSubmit;
		return(
		<Form className='TravelForm'>
		  <Form.Group controlId="formBasicEmail">
		    <Form.Label>Départ</Form.Label>
		    <div className='TravelFormInput'>
		    	<div className="inputIcon">
		    		<i className='fas fa-dot-circle'></i>
		    	</div>
		    	<AutoSuggestHandler name="origin" onBlur={this.onFormChange} placeholder={"Entrez un point de départ"}/>
    		</div>
		  </Form.Group>

		  <Form.Group controlId="formBasicPassword">
		    <Form.Label>Arrivée</Form.Label>
		    <div className='TravelFormInput'>
		    	<div className="inputIcon">
		    		<i className='fas fa-map-marker-alt'></i>
	    		</div>
		    	<AutoSuggestHandler name="destination" onBlur={this.onFormChange} placeholder={"Entrez une destination"}/>
	    	</div>
		  </Form.Group>

		  <Form.Group controlId="formBasicPassword">
		    <Form.Label>Véhicule possédé</Form.Label>
		    {this.state.vehicleError ? <Alert key={1} variant="danger">{this.state.vehicleError}</Alert> : null}
		    <div className='TravelFormInput'>
		    	<div className="inputIcon">
		    		<i className='fas fa-car-side'></i>
		    	</div>	
		    	<input type='text' className="form-control" name="vehicle" onBlur={this.onVehicleSelect} placeholder={"Entrez le modèle de votre véhicule"}/>
	    	</div>
		  </Form.Group>

		  <Form.Group controlId="formBasicPassword">
		    <Form.Label>Jour de trajet</Form.Label>
		    <div className='TravelFormInput'>
		    	<div className="inputIcon">
		    		<i className='fas fa-calendar-day'></i>
		    	</div>	
		    	<div>
		    	<DatePicker
		    		className='form-control'
		    		dateFormat="dd/MM/yyyy"
    				selected={this.state.date}
            		onChange={this.onDateChange}
            		minDate={new Date()}
				/>
				</div>
	    	</div>
		  </Form.Group>

		  <Button variant="primary" type="Button" onClick={searchSubmit}>
		    Rechercher
		  </Button>
		</Form>
	);
	}
	
}

export default TravelForm;
