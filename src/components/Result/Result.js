import React from 'react';
import logo from '../../images/blabla_logo.png';

import './Result.css';

const Result = (props) => {
	
	const icon = (type) => {
		switch (type) {
			case 'train':
				return <i className='fas fa-train'></i>;
			case 'car':
				return <i className='fas fa-car-alt'></i>;
			case 'blabla':
				return <img width="50" height="auto" src={logo} alt="blablacar logo"/>;
			case 'boat':
				return <i className='fas fa-ship'></i>;
			default : 
				return <i className='fas fa-question'></i>;				
		}
	}	

	const isFirst = () => {
		if(props.id === 0) return <h2>Le meilleur résultat :</h2>
	}

	return (

		<div>
			<div className='resultBest'>{isFirst()}</div>
			<div className='result'>
				<div className='resultIcon'>{icon(props.type)}</div>
				<div className='resultContent'>
					<h2 className='resultName'>{props.name}</h2>
					<div className='resultScores'>
						<div className='resultScore'>
							<i className='fas fa-leaf'></i>
							<div>
								<h3>Score écologique</h3>
								<span>{Math.trunc(props.score)} g de CO2</span>
							</div>
						</div>
						<div className='resultScore'>
							<i className='fas fa-hourglass-half'></i>
							<div>
								<h3>Durée</h3>
								<span>{props.time.hours()}h{props.time.minutes()}</span>
							</div>
						</div>
						<div className='resultScore'>
							<i className='fas fa-coins'></i>
							<div>
								<h3>Coût estimé</h3>
								<span>{Math.trunc(props.cost)}€</span>
							</div>	
						</div>
					</div>	
				</div>
			</div>	
		</div>
	);
}

export default Result;