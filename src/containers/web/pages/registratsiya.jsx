import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SingUp from './singup/SingUp';
import Zayavka from './singup/Zayavka';
import Profayl from "./singup/Profayl"
import Profayl2 from "./singup/Profayl2"
import Profayl3 from "./singup/Profayl3"
import Fayli from './singup/Fayli';
import Oplata from './singup/Oplata';
import Oplata2 from './singup/Oplata2';
import Oplata3 from './singup/Oplata3';
import Navbar from './Navbar';

class Registratsiya extends Component {
	state = {  }
	render() { 
		return ( 
			<React.Fragment>
				<Navbar/>
					<div className="switchs">
						<h2>SAlom registraion</h2>
						{/* <Switch> */}
							{/* <Route  path="/register"><SingUp/></Route>
							<Route  path="/zayavka"><Zayavka/></Route>
							<Route  path="/profayl"><Profayl/></Route>
							<Route  path="/profayl2"><Profayl2/></Route>
							<Route  path="/profayl3"><Profayl3/></Route>
							<Route  path="/fayli"><Fayli/></Route>
							<Route  path="/oplata"><Oplata/></Route>
							<Route  path="/oplata2"><Oplata2/></Route>
							<Route  path="/oplata3"><Oplata3/></Route> */}
						{/* </Switch> */}
					</div>
			</React.Fragment>
		 );
	}
}
 
export default Registratsiya;