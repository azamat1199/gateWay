import React, { Component } from 'react';
import NotariusSidebar from '../NotariusStudent';

import userpic from  "../../../assets/icon/userpic.svg"
import search from "../../../assets/icon/Search2.svg"  
import { Link } from 'react-router-dom';
import frame from "../../../assets/images/Frame.svg"

const data = require("../strani.json")

const N_info = () => {

	const [key, setkey] = React.useState("");

	function handleChange(event) {
		setkey(event.target.value);
    }
    return ( 
        <React.Fragment>
            <NotariusSidebar/>
			<div>
				<div className="up_nav n_up">
					<div>
						<h1 className="link_h1">Информация по требованием государств</h1>
					</div>
					<div className="user_info">
						<img src={userpic} alt="" />
						<div>
							<h1>Sevara Ibragimova</h1>
							<h2>Нотариус</h2>
						</div>
					</div>
				</div>
				<div className="invoys n_documents">
					<div className="ab_1">
						<div className="search">
							<div className="input">
								<button><img src={search} alt="" /></button>
								<input type="text" onChange={ handleChange }/>
							</div>
						</div>
						<div className="table">
							<div className="table_up">
								<div><h1>Выберите страну для подробной информации</h1></div>
								<div></div>
							</div>
							<div className="n_strani">
								{data.map((dat)=>{
									if (key === "") {
										return(
											<Link to={`/n-info/${dat.id}`}>
												<img src={frame} alt="" />
												<p>{dat.name}</p>
											</Link>
										)
									} else {
										if (dat.name.toUpperCase().includes(key.toUpperCase())){
											return(
												<Link to={`/n-info/${dat.id}`}>
													<img src={frame} alt="" />
													<p>{dat.name}</p>
												</Link>
											)
										}
									}
									
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
        </React.Fragment>
     );
}
 
export default N_info;