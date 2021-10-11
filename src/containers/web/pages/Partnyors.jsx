import React, { Component } from 'react';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import "../../../style/css/partnyors.css" 
import normal from "../../../assets/icon/normal.svg"
import Navbar from './Navbar';

class Partnyors extends Component {
	state = {  }
	render() { 
		return ( 
			<React.Fragment>
				<div className="navPart">
					<Navbar />
				</div>
				<div className="partnyor">
					<h1>Стать партнёром</h1>
					<div className="partnyor_main ">
						<div className="partnyor_left">
							<h1>Почему с нами работать выгодно?</h1>
							<div className="partnyor_list"><img src={normal} alt="" /><p>Гарантированный и стабильный доход</p></div>
							<div className="partnyor_list"><img src={normal} alt="" /><p>Быстрый и маленький вклад</p></div>
							<div className="partnyor_list"><img src={normal} alt="" /><p>Быстрый и маленький вклад</p></div>
							<div className="partnyor_list"><img src={normal} alt="" /><p>Гарантированный и стабильный доход</p></div>
							<div className="partnyor_list"><img src={normal} alt="" /><p>Быстрый и маленький вклад</p></div>
							<div className="partnyor_list"><img src={normal} alt="" /><p>Быстрый и маленький вклад</p></div>
							<div className="partnyor_list"><img src={normal} alt="" /><p>Гарантированный и стабильный доход</p></div>
						</div>
						<div className="partnyor_right">
							<h1>Напишите нам</h1>
							<div className="partnyor_input">
								<p>Ваш телефон номера</p>
								<input type="text" />
							</div>
							<div className="partnyor_input">
								<p>Ваш e-mail адрес (необязательно)</p>
								<input type="text" />
							</div>
							<div className="partnyor_radio">
								<p>Кем вы являетесь?</p>
								<FormControl component="fieldset">
									<RadioGroup row aria-label="position" name="position" defaultValue="1">
									<FormControlLabel
										value="1"
										control={<Radio color="primary" />}
										label="Университет"
									/>
									<FormControlLabel
										value="2"
										control={<Radio color="primary" />}
										label="Партнер"
									/>
									</RadioGroup>
								</FormControl>
							</div>
							<div className="partnyor_input">
								<p>Ваше предложение</p>
								<textarea name="" id="" cols="51" rows="6"></textarea>
							</div>
							<a href="#">Написать</a>
						</div>
					</div>
				</div>
			</React.Fragment>
		 );
	}
}
 
export default Partnyors;