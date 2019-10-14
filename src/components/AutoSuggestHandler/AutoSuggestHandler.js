import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';

import './AutoSuggestHandler.css';


// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  if(inputLength > 2) {
	let url = `https://gentle-plains-26891.herokuapp.com/googlemaps/place?input=${inputValue}`;
	return fetch(url)
      .then(place => {
        return place.json();
      })
      .then(place => {
        return place.predictions;
      })
      .catch(err => {
        console.error(err);
      });
  }
	
	return [];
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.description;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
	<div>
		{suggestion.description}
	</div>
);

class AutoSuggestHandler extends Component {
	constructor(placeholder, name){
		super();

    	this.state = {
      		suggestions : [],
      		value: '',
      		placeholder: placeholder, 
      		name: name
    	}

    	this.onFormChange = (event) => {
    		this.props.onBlur(this.props.name, event.target.value);
    	}
	}

	onChange = (event, { newValue }) => {
	    this.setState({
	      value: newValue
	    });
	};

	  // Autosuggest will call this function every time you need to update suggestions.
	  // You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested = async ({ value }) => {
	    this.setState({
	      suggestions: await getSuggestions(value)
	    });
	};

	  // Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
	    this.setState({
	      suggestions: []
	    });
    };

    render() {
	    const { value, suggestions, placeholder } = this.state;

	    // Autosuggest will pass through all these props to the input.
	    const inputProps = {
	      placeholder: placeholder.placeholder,
	      value,
	      onChange: this.onChange,
	      onBlur: this.onFormChange
	    };

	    // Finally, render it!
	    return (
	      <Autosuggest
	        suggestions={suggestions}
	        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
	        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
	        getSuggestionValue={getSuggestionValue}
	        renderSuggestion={renderSuggestion}
	        inputProps={inputProps}
	      />
    	);
  }

}

export default AutoSuggestHandler;
