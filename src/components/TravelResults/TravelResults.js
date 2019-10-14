import React from 'react';
import Alert from 'react-bootstrap/Alert';

import './TravelResults.css';
import Result from '../Result/Result';

const TravelResults = ({results, errors, apiUrls}) => {
  	const urlComponent = <a href={apiUrls.traitement}>Voir les résultats au format JSON</a>
	const ErrorComponent = errors.map((error, i) =>{
		return <Alert key={i} variant="warning">{error.message}</Alert>
	});

	const ResultsComponent = results.map((travel, i) => {
		return <Result key={i} id={i} type={results[i].type} name={results[i].name} score={results[i].eco} time={results[i].duration} cost={results[i].cost}/>
	})

	return(
		<div>
      		{ErrorComponent}
			{ResultsComponent}
			{urlComponent}
		</div>	
	);
}

export default TravelResults;
