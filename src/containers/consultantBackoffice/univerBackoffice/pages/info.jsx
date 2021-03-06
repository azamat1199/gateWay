import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import NumberFormat from "react-number-format";
import GoogleMapReact from "google-map-react";
import Swal from "sweetalert2";
import styled from 'styled-components'
//import img
import userpic from "../../../../assets/icon/userpic.svg";
import image from "../../../../assets/icon/image.jpg";
import img1 from "../../../../assets/icon/img1.svg";
import img2 from "../../../../assets/icon/img2.svg";
import img3 from "../../../../assets/icon/img3.svg";
import img4 from "../../../../assets/icon/img4.svg";
import plus from "../../../../assets/icon/plus.svg";

//import css
import "../../../../style/css/info.css";
import "../../../../style/css/singlepage2.css";
import UniversitetBackoffice from "../universitetBackoffice";
import { useSelector } from "react-redux";
import Axios from "../../../../utils/axios";

// UI modal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

/// input range ///
const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 200,
    label: "200",
  },
  {
    value: 500,
    label: "500",
  },
  {
    value: 800,
    label: "800",
  },
  {
    value: 1000,
    label: "1000",
  },
  {
    value: 2000,
    label: "2000",
  },
  {
    value: 3000,
    label: "3000",
  },
  {
    value: 4000,
    label: "4000",
  },
  {
    value: 5000,
    label: "5000",
  },
  {
    value: 6000,
    label: "6000+",
  },
];

const SSlider = withStyles({
  root: {
    color: "#00587F",
    height: 15,
  },
  thumb: {
    height: 45,
    width: 45,
    backgroundColor: "#E5F7FF",
    border: "6px solid currentColor",
    marginTop: -17,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% - 3px)",
  },
  track: {
    height: 15,
    borderRadius: 7,
  },
  rail: {
    height: 15,
    borderRadius: 7,
    backgroundColor: "#cdeefce8",
  },
})(Slider);

function valuetext(value) {
  return `${value}`;
}
//// google map locatsiyasi
const center = {
  lat: 42.37702172345865,
  lng: -71.116660363554,
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Info = () => {
  const [values, setValues] = useState(null);
  const reload = () => {
    window.location.reload();
  };
  const select = useSelector((state) => state.payload.payload.data);
  const [univerImg, setUniverImg] = useState(null);
  const [foiz, setFoiz] = useState();
  const [openDescript, setOpenDescript] = React.useState(false);
  const [city, setCity] = useState();
  const [danniInp, setDanniInp] = useState(false);
  const [nameU, setNameU] = useState();
  const [year, setYear] = useState();
  const [country, setCountry] = useState();
  const [moto, setMoto] = useState();
  const [cityId, setCityId] = useState(0);
  const [bacalavir, setBacalavir] = useState();
  const [magistr, setMagistr] = useState();
  const [livingPrice, setLivingPrice] = useState();
  const [startSalary, setStartSalary] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [images, setImages] = useState();
  const [openImgUniver, setOpenImgUniver] = React.useState(false);
  const [preview, setPreview] = useState();
  const [description, setDescription] = useState();
  const [input, setInput] = useState();
  const [bachelor,setBachelor] = useState('')
  const [masters,setMaster] = useState('')
  const [living,setLiving] = useState('')
  const [currency,setCurrency] = useState([])


  const handleClose = () => {
    setOpenDescript(false);
    setOpenImgUniver(false);
  };
 

  const selector = useSelector((state) => state);
  const [univerData, setUniverData] = useState({});
  const [UniID, setUniID] = useState({
    id: "",
    name: "",
    location: "",
    description: "",
    founding_year: "",
    city: {
      id: "",
      name: "",
      country: {
        id: "",
        name: "",
      },
    },
    motto: "",
    rating: "",
    rating_source: "",
    education_quality: [],
    bachelor_degree_fee_per_annum: "",
    masters_degree_fee_per_annum: "",
    living_price_per_annum: "",
    faculties: [],
    images: [],
  });

  const getCity = async () => {
    try {
      const res = await Axios.get("/company/city/");
      setCity(res.data.results);
    } catch (error) {}
  };

  const descriptPatch = async (e) => {
    e.preventDefault();
    try {
      const data = await Axios.patch(`/university/${select?.id}/`, {
        description: description,
      });
      if (data.status === 200) {
        reload();
      }
    } catch (err) {
      
    }
  };
  console.log(bachelor,masters,living);
  const univerID = async () => {
    try {
      const data = await Axios.get(`/university/${select.id}/`);
      const uni = data.data;
      const {
        starting_salary,
        year_of_creation,
        name,
        motto,
        masters_degree_fee_per_annum,
        living_price_per_annum,
        education_quality,
        education_fee_per_annum,
        application_end_date,
        description,
        bachelor_degree_fee_per_annum,
        quota,
      } = uni;
      setNameU(name);
      setYear(year_of_creation);
      setMoto(motto);
      setBacalavir(bachelor_degree_fee_per_annum);
      setLivingPrice(living_price_per_annum);
      setStartSalary(starting_salary);
      setMagistr(masters_degree_fee_per_annum);
      setDescription(description);
      if (data.status === 200) {
        setFoiz(uni.percent);

        setUniID(uni);
      }
    } catch (err) {
      
    }
  };

  const setDataUniver = async () => {
    console.log('clicked');
    try {
      console.log('clicked');
      const res = await Axios.patch(`/university/${select.id}/`, {
        name: nameU,
        year_of_creation: year,
        motto: moto,
        bachelor_degree_fee_per_annum: `${bacalavir + ' ' + bachelor}` ,
        masters_degree_fee_per_annum: `${magistr + ' ' + masters}` ,
        living_price_per_annum: `${livingPrice + ' ' + living}` ,
        starting_salary: startSalary,
        city_id: `${cityId ? cityId : UniID.city.id}` ,
      });
      console.log('clicked');
    } catch (error) {

    }
    setDanniInp(false);
    univerID();
  };
  useEffect(() => {
    univerID();
    getCity();
  }, [univerData]);
  const onSelectFile = (e) => {
    setImages(e.target.files[0]);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setOpenImgUniver(true);
  };
  const formData = new FormData();
  formData.append("image", images);
  formData.append("university", select.id);

  const univerImgPost = async () => {
    try {
      const dataImg = await Axios.post(`/university/image/`, formData);
      reload();
    } catch (err) {
      
    }
    handleClose();
  };
  const getCurrency = async() =>{
    try {
      const res = await Axios.get('/common/currency/')
      const {status,data} = res;
      if(status === 200){
        const {results} = data
        setCurrency(results)
      }     
    } catch (error) {
      console.log(error);
    }
  }
console.log(typeof(livingPrice),livingPrice);
  useEffect(() => {
    getCurrency()
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const patchQuto = async (e) => {
    try {
      const res = await Axios.patch(`/university/${select.id}/`, {
        quota: e.target.ariaValueNow,
      });
    } catch (error) {}
  };
  return (
    <>
      <UniversitetBackoffice>
        <div className="infoTopBlock">
          <div className="infoDanJs">
            <div className="infoTop">
              <h1 className="link_h1 ">????????????</h1>
            </div>
            <img
              style={{ objectFit: "cover" }}
              className="img_big"
              src={
                UniID.images.length === 0
                  ? image
                  : UniID.images[0].image.toString()
              }
            />
            <div className="user_info">
              <img
                src={
                  UniID.images.length === 0
                    ? userpic
                    : UniID.images[0].image.toString()
                }
                alt=""
              />
              <div className="infoBottom">
                <h1>{UniID.name}</h1>
                <h2>
                  {UniID.city.name}, {UniID.city.country.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="info">
          <div className="info-1">
            <h1>?????? ?????????????? ???????????????? ???? {foiz}%</h1>
            <h2>?????????????? ?????????????? ???? ??????????</h2>
            <div className="info_line">
              <div className="info_out">
                <div className="info_in" style={{ width: `${foiz}%` }}>
                  <h1>{foiz}%</h1>
                </div>
              </div>
              <div className="info_line_list">
                <div>
                  <h3>?????????????????? ????????????????</h3>
                </div>
                <div>
                  <h3>?????????????????? {UniID.images.length} ????????</h3>
                </div>
                <div>
                  <h3>?????????????? ??????????</h3>
                </div>
                <div>
                  <h3>?????????????? ?????????????? ???? ??????????</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="single_down">
            <div className="single_h1">
              <h1>???????? ????????????</h1>
              <button onClick={() => setDanniInp(true)}>
                {danniInp ? null : "????????????????"}
              </button>
            </div>
            <div className="single_info">
              <div className="info_1">
                <div>
                  <h1>????????????????</h1>
                </div>
                <div>
                  {danniInp ? (
                    <input
                      className="danniInpEdit"
                      type="text"
                      name="name"
                      value={nameU}
                      onChange={(e) => setNameU(e.target.value)}
                    />
                  ) : (
                    <p>{UniID.name}</p>
                  )}
                </div>
              </div>
              <div className="info_1">
                <div>
                  <h1>?????? ??????????????????</h1>
                </div>
                <div>
                  {danniInp ? (
                    <input
                      className="danniInpEdit"
                      type="text"
                      name="year_of_creation"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  ) : (
                    <p>{UniID.year_of_creation}</p>
                  )}
                </div>
              </div>
              <div className="info_1">
                <div>
                  <h1>???????????? ??????????</h1>
                </div>
                <div>
                  {/* {danniInp ? (
                    <input
                      className="danniInpEdit"
                      type="text"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  ) : ( */}
                  <p>{UniID.city.country.name}</p>
                  {/* )} */}
                </div>
              </div>
              <div className="info_1">
                <div>
                  <h1> ??????????</h1>
                </div>
                <div>
                  {danniInp ? (
                    <select
                      onChange={(e) => setCityId(e.target.value)}
                      className="danniInpEdit"
                      type="text"
                      name="city"
                    >
                      <option selected hidden value={UniID.city.id}>{UniID.city.name}</option>
                      {city?.map((v) => {
                        return <option value={v.id}>{v.name}</option>;
                      })}
                    </select>
                  ) : (
                    <p>{UniID.city.name}</p>
                  )}
                </div>
              </div>
              <div className="info_1">
                <div>
                  <h1>??????????</h1>
                </div>
                <div>
                  {danniInp ? (
                    <input
                      className="danniInpEdit"
                      type="text"
                      name="motto"
                      value={moto}
                      onChange={(e) => setMoto(e.target.value)}
                    />
                  ) : (
                    <p>{UniID.motto}</p>
                  )}
                </div>
              </div>
              <div className="info_1">
                <div>
                  <h1>???????? (????????????????) </h1>
                </div>
                <div>
                  {danniInp ? (
                    <>
                    <input
                      className="danniInpEdit"
                      type="text"
                      name="bachelor_degree_fee_per_annum"
                      value={bacalavir?.split(' ')[0]}
                      onChange={(e) => setBacalavir(e.target.value)}
                    />
                    <SelectStyle>
                      <select  onChange={(e)=> setBachelor(e.target.value)} name="bachelor" id="">
                      <option selected hidden >{bacalavir.split(' ') ? bacalavir.split(' ')[1] :'????????????' }</option>
                      {currency.map(type => {
                        return (
                          <option value={type.name}>{type.name}</option>
                        )
                      })}
                     </select>
                    </SelectStyle>
                  </>
                  ) : (
                    <p>{UniID.bachelor_degree_fee_per_annum}</p>
                  )}
                
                </div>
              </div>
              <div className="info_1">
                <div>
                  <h1> ???????? (??????????????.) </h1>
                </div>
                <div>
                  {danniInp ? (
                    <>
                    <input
                      className="danniInpEdit"
                      type="text"
                      name="masters_degree_fee_per_annum"
                      value={magistr?.split(' ')[0]}
                      onChange={(e) => setMagistr(e.target.value)}
                    />
                    <SelectStyle>
                      <select onChange={(e)=> setMaster(e.target.value)} name="masters" id="">
                      <option selected hidden >{magistr.split(' ')? magistr.split(' ')[1] :'????????????' }</option>
                      {currency.map(type => {
                        return (
                          <option value={type.name}>{type.name}</option>
                        )
                      })}
                    </select>
                    </SelectStyle>
                  </>
                  ) : (
                    <p>{UniID.masters_degree_fee_per_annum}</p>
                  )}
                   
                </div>
              </div>
              <div className="info_1">
                <div>
                  <h1> ???????? ???? ???????????????????? </h1>
                </div>
                <div>
                  {danniInp ? (
                    <>
                    <input
                      className="danniInpEdit"
                      type="text"
                      name="living_price_per_annum"
                      value={livingPrice.split(' ')[0]}
                      onChange={(e) => setLivingPrice(e.target.value)}
                    />
                    <SelectStyle>
                      <select onChange={(e)=>setLiving(e.target.value)} name="living" id="">
                      <option selected hidden >{livingPrice.split(' ') ? livingPrice.split(' ')[1] :'????????????' }</option>
                      {currency.map(type => {
                        return (
                          <option value={type.name}>{type.name}</option>
                        )
                      })}

                    </select>
                    </SelectStyle>
                  </>
                  ) : (
                    <p>{UniID.living_price_per_annum}</p>
                  )}
                   
                </div>
              </div>
              <div className="info_1">
                <div>
                  <h1>?????????????????? ?????? - ?????????? ??????????????????????</h1>
                </div>
                <div>
                  {danniInp ? (
                    <input
                      className="danniInpEdit"
                      type="text"
                      name="starting_salary"
                      value={startSalary}
                      onChange={(e) => setStartSalary(e.target.value)}
                    />
                  ) : (
                    <p>{UniID.starting_salary}$</p>
                  )}
                </div>
              </div>
              <div
                className="info_1"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div>
                  {danniInp ? (
                    <div>
                      <button
                        style={{
                          padding: "10px 30px",
                          color: "#00587F",
                          outline: "none",
                          border: "none",
                          backgroundColor: "#F3F5F7",
                          borderRadius: "8px",
                        }}
                        onClick={() => setDanniInp(false)}
                      >
                        ????????????
                      </button>
                      <button
                        style={{
                          padding: "10px 30px",
                          color: "white",
                          outline: "none",
                          marginLeft: "30px",
                          border: "none",
                          backgroundColor: "#00587F",
                          borderRadius: "8px",
                        }}
                        onClick={() => setDataUniver()}
                      >
                        ??????????????????
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="info-2">
            <div className="single_h1">
              <h1>???????? ????????????</h1>
              <a onClick={() => setOpenDescript(true)}>????????????????</a>
            </div>
            <div className="info_2_list">
              <h1>{description}</h1>
            </div>
          </div>
          <div className="info-3">
            <div className="single_h1">
              <h1>???????? ??????????????</h1>
            </div>
            <div className="info_3_list">
              {UniID.images.map((x) => {
                return (
                  <div>
                    <img src={x.image} alt="" />
                  </div>
                );
              })}
              <div>
                <div className="type_file">
                  <label htmlFor="chFile">
                    <input type="file" id="chFile" onChange={onSelectFile} />
                    <img src={plus} alt="" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="info-4">
            <div className="single_h1">
              <h1>?????????????? ???? ??????????</h1>
            </div>
            <div className="info_5_list">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCIuhJElVEhGVPYptJbkrWxEy4lKzEoOA8",
                }}
                defaultCenter={center}
                defaultZoom={15}
              >
                <AnyReactComponent
                  lat={41.31398038757752}
                  lng={69.24571025285795}
                  text=""
                />
              </GoogleMapReact>
            </div>
          </div> */}
        </div>
        {/*  */}
        {/*  */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="class1"
          open={openDescript}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openDescript}>
            <div className="editDescription">
              <div className="modalContainer">
                <h1>???????????????? ????????????</h1>
                <textarea
                  onChange={(event) => setDescription(event.target.value)}
                  rows="7"
                  cols="40"
                  value={description}
                >{description}</textarea>
                <div>
                  <button onClick={() => handleClose()}>????????????</button>
                  <button onClick={(e) => descriptPatch(e)}>????????????????</button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>

        {/* //!~img */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="class1"
          open={openImgUniver}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openImgUniver}>
            <div className="editDescription">
              <div className="modalContainer">
                <h1>???????????????? ????????</h1>
                {selectedFile && <img src={preview} />}
                {/* <img src={univerImg} alt="" /> */}
                <div>
                  <button onClick={() => handleClose()}>????????????</button>
                  <button onClick={() => univerImgPost()}>????????????????</button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>

        {/*  */}
        {/*  */}
      </UniversitetBackoffice>
    </>
  );
};

export default Info;


const SelectStyle = styled.div`
  select{
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 0.02em;
    color: #00121A;
    outline: none;
    padding: 3px 10px;
    border: 1px solid #00587F;
    border-radius: 8px;
    color: #00121A;
    background: none;
    margin-left: 15px;
  }
 
`