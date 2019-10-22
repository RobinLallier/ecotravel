import React from 'react';
import logo from '../../images/logo.png';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';

const Header = () => {
	return (
		<header className='header'>
			<Navbar expand='lg' className='justify-content-between'>
				<Navbar.Brand href='#home'>
					<img src={logo} alt='Logo Ecotravel' height='80px'/>
				</Navbar.Brand>	
			</Navbar>
			<Container>
				<h2>Trouvez le moyen de transport le plus éco-responsable pour tous vos trajets</h2>
				<h3>Décrivez vos trajets et laissez-vous guider pour découvrir les solutions de transports les plus écologiques qui répondent à vos besoins!</h3>
			</Container>
		</header>
	);
}

export default Header;