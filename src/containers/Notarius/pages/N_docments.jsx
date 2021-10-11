import React, { useState, useEffect } from 'react';
import NotariusSidebar from '../NotariusStudent';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';
import Axios from '../../../utils/axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


import userpic from  "../../../assets/icon/userpic.svg"
import filter from "../../../assets/icon/Filter.svg"
import search from "../../../assets/icon/Search2.svg"  
import close from "../../../assets/icon/close.svg"  

const N_document = () => {
    const [filterCountry, setFilterCountry] = useState([]);
    
    const [universities, setUniversities] = useState([]);

    const [filters, setfilters] = useState(false);

	const [key, setkey] = React.useState("");

	function handleChange(event) {
		setkey(event.target.value);
    }

    const handelFilter = () =>{
        setfilters(!filters)
    }
    
    const univerCountry = async () => {
        try{
        const data2 = await Axios.get('/common/country/');
        const countrys = data2.data.results;
        if (data2.status === 200) {
            setFilterCountry(countrys)
        }
        } catch(err){
        console.log(err)
        }
    }

    const fetchUniversities = async () => {
        try {
          const data = await Axios.get('/university/university/');
          const { results } = data.data;
          //console.log(results);
          if (data.status === 200) {
            setUniversities(results);
          }
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(()=>{
        fetchUniversities();
        univerCountry();
      }, [])
    
    return ( 
        <React.Fragment>
            <NotariusSidebar/>
            <div>
                <div className="up_nav n_up">
                    <div>
                        <h1 className="link_h1">Документы полученные от Консультантов</h1>
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
                        <div className="excel table_excel_btn">
                            
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="download-table-xls-button"
                                table="table_excel"
                                filename="tablexls"
                                sheet="tablexls"
                                buttonText="Excel"/>
                        </div>
                        <div className="search">
                            <div className="input">
                                <button><img src={search} alt="" /></button>
                                <input type="text" onChange={ handleChange }/>
                            </div>
                            <div className="filtr_btn">
                                <button onClick={handelFilter}>
                                    <img src={filter} alt="" />
                                </button>
                            </div>
                        </div>
                        <div className="table">
                            <div className="table_up">
                                <div><h1>Список документов</h1></div>
                                <div></div>
                            </div>
                            
                            <table id="table_excel">
                                <thead>
                                    <th>ФИО</th>
                                    <th>Страна</th>
                                    <th>Университет</th>
                                    <th>Телефон номер</th>
                                    <th>Статус</th>
                                </thead>
                                <tbody>
                                    {/* {data_table.map ((data)=>{
                                        if (filters) {
                                            return(
                                                <tr>
                                                    <th><Link to=`/n-doc-single${id}`></Link></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            )
                                        }
                                        else {
                                            if (data.first_name.toUpperCase().includes(key.toUpperCase())){
                                                return(
                                                    <tr>
                                                        <th><Link to=`/n-doc-single${id}`></Link></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                )
                                            }
                                        }
                                    })} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="ab_2" id={filters ? "ra0" : "ra100"}>
                    <button onClick={handelFilter} className="ab_2_close"><img src={close} alt="" /></button>
                        <h1>Фильтры</h1>
                        <div className="form_ab">
                            <select name="" id="">
                                <option value="">Страна</option>
                                {filterCountry.map((m) =>{
                                    return(
                                        <option value={m.id}>{m.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form_ab">
                            <select name="" id="">
                                <option value="">Университет</option>
                                {universities.map((m) =>{
                                    return(
                                        <option value={m.id}>{m.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form_ab">
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" className="ab_check" row>
                                    <FormControlLabel
                                        value="Поступившие"
                                        control={<Checkbox color="primary" />}
                                        label="Поступившие"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="Непоступившие"
                                        control={<Checkbox color="primary" />}
                                        label="Непоступившие"
                                        labelPlacement="end"
                                    />
                                </FormGroup>
                            </FormControl>
                        </div>
                        <div className="form_ab">
                            <button className="form_button" onClick={handelFilter}>Применить</button>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default N_document;