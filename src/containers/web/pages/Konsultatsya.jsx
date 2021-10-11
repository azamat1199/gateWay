import React, { Component } from 'react';
import Navbar from './Navbar';

class Konsultatsya extends Component {
	state = {  }
	render() { 
		return ( 
			<React.Fragment>
				<div className="navPart">
					<Navbar />
				</div>
				<div className="partnyor konsultantsiya">
					<div className="konsultantsiya_main">
						<h1>Консультация</h1>
						<div className="partnyor_input">
							<p>Ваш телефон номера</p>
							<input type="text" />
						</div>
						<div className="partnyor_input">
							<p>Ваш e-mail адрес</p>
							<input type="text" />
						</div>
						<a href="#">Написать</a>
					</div>
				</div>
			</React.Fragment>
		 );
	}
}
 
export default Konsultatsya;