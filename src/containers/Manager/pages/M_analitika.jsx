import React, { useEffect, useState } from "react";
import ManegerSidebar from "../ManagerSidebar";
import userpic from "../../../assets/icon/userpic.svg";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { scaleOrdinal } from "d3-scale";
import { interpolateCividis, schemeCategory10 } from "d3-scale-chromatic";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "../../../utils/axios";
import styled from "styled-components";
const colors = scaleOrdinal(schemeCategory10).range();

const dataPie = require("../../consultantBackoffice/univerBackoffice/json/data2.json");
const dataPie2 = require("../../consultantBackoffice/univerBackoffice/json/data3.json");
const dataComposed = require("../../consultantBackoffice/univerBackoffice/json/dataComposed.json");

const M_analitika = () => {
  const [dataFirst, setDataFirst] = useState();
  const [data, setData] = useState();
  const [dataComposeds, setDataComposeds] = useState();
  const [data_doxod, setDataDoxod] = useState();
  const [loading, setLoading] = useState(false);
  const [second, setSecond] = useState([]);
  const [endDate, setEndDate] = useState(null);
  const [payment, setPayment] = useState({
    not_paid: "",
    paid: "",
    waiting_confirmation: "",
  });

  const fetchByDay = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/manager/statistics/third_block/?day=true`
      );
      const { status, data } = res;
      if (status === 200) {
        const { payment } = data;
        setPayment(payment);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchByWeek = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/manager/statistics/third_block/?week=true`
      );
      const { status, data } = res;
      if (status === 200) {
        const { payment } = data;
        setPayment(payment);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchByMonth = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/manager/statistics/third_block/?month=true`
      );
      const { status, data } = res;
      if (status === 200) {
        const { payment } = data;
        setPayment(payment);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchByYear = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/manager/statistics/third_block/?year=true`
      );
      const { status, data } = res;
      if (status === 200) {
        const { payment } = data;
        setPayment(payment);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchByChoosenDate = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/manager/statistics/third_block/?date-from=${startDate.toLocaleDateString()}&date-to=${endDate.toLocaleDateString()}`
      );
      const { status, data } = res;
      if (status === 200) {
        const { payment } = data;
        setPayment(payment);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchSecondBlock = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/company/manager/statistics/second_block/");
      const { status, data } = res;
      if (status === 200) {
        setSecond(data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getDataStatistika = async () => {
    try {
      const res = await Axios.get("/company/manager/statistics/");
      const { first_block, second_block, fourth_block, third_block } = res.data;
      setDataFirst(first_block);
      setData(second_block);
      setDataDoxod(third_block);
      setDataComposeds(fourth_block);
    } catch (error) {}
  };

  useEffect(() => {
    getDataStatistika();
  }, []);

  const [startDate, setStartDate] = useState(null);
  const selector = useSelector((state) => state.payload.payload.data);
  const genderOfStudents = [
    {
      name: "Group A",
      value: dataComposeds?.applicants?.male,
    },
    { name: "Group B", value: dataComposeds?.applicants?.female },
  ];

  return (
    <React.Fragment>
      <ManegerSidebar />
      <div className="asos">
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">Отдел аналитики</h1>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>
                {selector.first_name} {selector.last_name}
              </h1>
              <h2>{selector.role}</h2>
            </div>
          </div>
        </div>
        <div className="home m_analitika">
          <FilterContainer>
            <p onClick={fetchByDay}>День</p>
            <p onClick={fetchByWeek}>Неделя</p>
            <p onClick={fetchByMonth}> Месяц</p>
            <p onClick={fetchByYear}>Год</p>
            <p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                openTo="year"
                views={["year", "month", "day"]}
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd MM yyyy"
                placeholderText="От"
              />
            </p>
            -
            <p>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                onSelect={fetchByChoosenDate}
                dateFormat="dd MM yyyy"
                minDate={startDate}
                placeholderText="До"
              />
            </p>
          </FilterContainer>
          <div className="block_1">
            {/* card */}
            <div className="card_1 card">
              <h4>Обшее количество</h4>
              <h3>{dataFirst?.applicants}</h3>
            </div>
            {/* card */}
            <div className="card_2 card">
              <h4> Прошли</h4>
              <h3>{dataFirst?.completed}</h3>
            </div>
            {/* card */}
            <div className="card_3 card">
              <h4> Не прошли</h4>
              <h3>{dataFirst?.closed}</h3>
            </div>
            {/* card */}
            <div className="card_4 card">
              <h4> В университете</h4>
              <h3>{dataFirst?.in_process}</h3>
            </div>
          </div>
          <div className="scroll">
            <div className="block_2">
              <div>
                <h5>Динамика роста или спада</h5>
                <div className="seeMoreAct">
                  <select>
                    <option>Показать все</option>
                    <option>lorem1</option>
                    <option>lorem2</option>
                  </select>
                </div>
              </div>
              <div className="diag">
                <ResponsiveContainer>
                  <LineChart height={300} data={data}>
                    <CartesianGrid strokeDasharray="12 12" vertical="" />
                    <XAxis dataKey="Месяц" />
                    <YAxis />
                    <Tooltip />
                    <Legend iconType="square" />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey="applicants"
                      stroke="#00587F"
                      name="Обшее количество"
                    />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey="in_process"
                      stroke="#10CC9B"
                      name="в университете"
                    />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey="closed"
                      stroke="#E96383"
                      name="не прошли"
                    />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey="completed"
                      stroke="#FCCA58"
                      name=" прошли"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="scroll">
            <div className="block_3">
              <div className="block_3_up">
                <p>количество</p>
                <div>
                  <div>
                    <DatePicker
                      placeholderText="Выбрать период"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                  <select>
                    <option>Показать все</option>
                    <option>Показать 1</option>
                    <option>Показать 2</option>
                  </select>
                </div>
              </div>
              <div className="block_3_chart">
                <ResponsiveContainer>
                  <BarChart
                    data={data_doxod}
                    margin={{
                      top: 20,
                      right: 0,
                      left: -20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="10 10" vertical="" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" barSize={45} fill="#8884d8">
                      {data_doxod?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="block_4">
            <div className="block_4_1">
              <h4>Студенты по полу</h4>
              <div className="pieChart diag">
                <div>
                  <span>
                    {dataComposeds?.applicants?.female +
                      dataComposeds?.applicants?.male}
                  </span>
                  <PieChart width={188} height={188}>
                    <Pie
                      data={genderOfStudents}
                      cx={80}
                      cy={80}
                      innerRadius={50}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dataComposed.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
                <div className="PieChartSurf">
                  <span>
                    <div style={{ background: "#4897D1" }}></div>
                    <h5>Мужчины</h5>
                    <h6>{dataComposeds?.applicants?.male}</h6>
                  </span>
                  <span>
                    <div style={{ background: "rgb(255, 127, 14)" }}></div>
                    <h5>Женщина</h5>
                    <h6>{dataComposeds?.applicants?.female}</h6>
                  </span>
                </div>
              </div>
            </div>
            <div className="block_2">
              <h4>Самые популярные факультеты</h4>
              <div className="diag">
                <ResponsiveContainer>
                  <BarChart
                    data={dataComposeds?.popular_faculties}
                    margin={{
                      top: 0,
                      right: 0,
                      left: -20,
                      bottom: 50,
                    }}
                  >
                    <CartesianGrid strokeDasharray="20 20" vertical="" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applicants_count" barSize={35} fill="#8884d8">
                      {dataComposed.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          {/* <div className="block_5">
            <h4>Университеты партнеры</h4>
            <div>
         
              <svg
                width="1188"
                height="510"
                viewBox="0 0 1188 510"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    d="M821.501 155.609L822.392 156.678L820.67 157.153L819.244 157.806L815.74 158.282L812.591 159.054L811.166 160.717L812.294 162.321L813.126 164.222L811.938 165.825L812.413 167.31L811.879 168.677L808.79 168.558L810.631 171.053L808.79 172.062L807.958 174.32L808.612 176.636L807.542 177.705L806.295 177.349L803.919 177.884L803.8 178.893H801.365L799.999 181.091L800.474 184.299L796.553 185.903L794.237 185.546L793.702 186.378L791.683 185.903L788.534 186.497L782.832 184.536L785.149 181.091L784.495 178.656L781.941 178.002L781.228 175.567L779.624 172.538L780.575 170.459L779.09 169.865L779.387 167.073L779.743 162.321L783.248 163.806L785.564 163.271L785.802 161.549L788.178 161.014L789.722 159.826L789.604 156.797L792.098 156.024L792.277 154.718L793.999 155.727L794.95 155.846H796.732L799.286 156.678L800.355 157.094L802.375 155.906L803.622 156.618L804.157 154.896L806.057 154.955L806.414 154.421L806.295 152.876L807.305 151.569L809.265 152.401L809.206 153.589L810.215 153.767L810.75 156.975L812.354 158.222L813.245 157.391L814.552 157.034L816.037 155.312L818.294 155.609H821.501Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M665.992 339.986L666.348 341.174L665.932 343.015L666.467 344.797L665.932 346.223L666.17 347.529L659.22 347.47L658.745 359.647L660.883 362.736L663.022 365.112L656.844 366.656L648.825 366.122L646.568 364.34L633.084 364.458L632.609 364.755L630.649 363.033L628.51 362.914L626.491 363.567L624.887 364.28L624.59 361.904L625.124 358.518L626.312 355.014L626.491 353.41L627.619 349.965L628.451 348.42L630.411 345.926L631.54 344.203L631.896 341.411L631.718 339.213L630.767 337.847L629.876 335.531L629.104 333.273L629.282 332.442L630.292 330.957L629.342 327.274L628.629 324.72L626.966 322.284L627.322 321.572L628.688 321.037L629.698 321.096L630.886 320.681L640.806 320.74L641.578 323.532L642.529 325.848L643.301 327.096L644.548 329.056L646.805 328.759L647.875 328.224L649.716 328.759L650.251 327.809L651.142 325.611L653.221 325.433L653.399 324.779H655.121L654.824 326.145L658.864 326.086L658.923 328.521L659.576 329.947L659.042 332.264L659.279 334.64L660.349 336.065L660.111 340.58L660.943 340.223L662.368 340.342L664.447 339.748L665.992 339.986Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M626.848 320.384L625.957 317.532L627.323 315.869L628.333 315.216L629.58 316.523L628.392 317.354L627.798 318.305L627.68 319.968L626.848 320.384Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M646.273 135.649L646.511 136.362L647.342 136.006L648.055 137.016L648.827 137.431L649.184 138.798L648.887 140.104L649.481 141.708L650.847 142.599L650.906 143.609L649.897 144.144L649.837 145.391L648.53 147.232L647.996 146.995L647.877 146.163L646.036 144.856L645.62 143.074L645.679 140.461L645.976 139.332L645.442 138.738L645.145 137.491L646.273 135.649Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M769.942 200.218L770.714 203.247H769.051V205.742L769.705 206.277L768.279 207.049L768.398 208.593L767.626 210.138V211.682L767.032 212.514L756.993 210.613L755.389 206.693L755.211 205.861L755.746 205.623L755.983 206.693L758.478 206.099L761.21 206.217L763.23 206.336L765.19 203.723L767.388 201.287L769.17 198.911L769.942 200.218Z"
                    fill="#00587F"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M397.445 506.128L395.663 506.009H392.693L389.129 497.931L390.97 499.594L393.525 502.326L398.158 504.524L402.494 505.415L402.019 507.197L399.405 507.375L397.445 506.128Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M379.329 383.17L386.041 389.348L388.774 389.942L393.11 392.793L396.614 394.278L397.268 395.941L394.773 401.762L398.218 402.772L401.96 403.366L404.455 402.772L407.009 399.802L407.188 396.476L408.732 395.704L410.633 397.961L410.87 400.99L408.376 403.069L406.415 404.614L403.267 408.356L399.703 413.524L399.406 416.612L399.169 420.533L399.881 424.334L399.347 425.166L399.584 427.601L399.763 429.621L404.396 432.888L404.515 435.502L406.831 437.165L407.009 439.006L405.049 443.877L400.891 445.956L394.832 446.728L391.268 446.312L392.516 448.629L392.575 451.421L393.644 453.322L392.159 454.688L389.13 455.222L385.804 453.797L384.913 454.807L386.398 458.549L388.774 459.677L390.14 458.489L391.625 460.45L389.13 461.638L387.407 464.014L388.12 467.756L388.061 469.775H385.21L383.428 471.676L383.487 474.527L387.348 477.26L390.437 477.973L390.556 481.358L387.823 483.437L387.467 487.774L385.388 489.199L384.853 490.922L387.348 494.783L390.08 496.862L388.833 496.684L385.922 496.09L378.735 495.614L376.656 493.476L375.527 490.744L373.686 490.981L372.142 489.615L370.3 485.754L371.904 484.091L371.963 481.774L370.894 479.873L371.31 476.666L370.657 471.736L369.587 469.538L370.657 468.825L369.825 467.399L368.162 466.687L368.637 465.083L366.796 463.657L364.598 459.321L365.608 458.549L363.647 453.916L363.172 450.055L363.053 446.669L364.538 445.303L362.578 441.56L361.628 438.115L363.41 435.62L362.578 432.413L363.529 428.73L362.697 425.225L361.747 424.513L358.836 417.919L360.083 413.999L359.074 410.316L359.608 406.811L361.153 403.247L363.113 400.871L361.925 399.386L362.4 398.139L361.45 391.783L364.776 389.942L365.489 385.962L364.954 385.012L367.33 381.566L371.785 382.517L373.983 385.249L374.933 382.16L378.735 382.339L379.329 383.17Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M731.094 150.499L730.025 150.618L728.362 148.42L728.243 147.826H726.877L725.748 146.817L725.154 146.876L723.729 145.807L721.234 144.856L721.175 143.015L720.402 141.708L724.56 141.114L725.392 142.065L726.699 142.718L726.283 143.668L728.184 144.975L727.53 146.223L729.075 147.232L730.56 147.826L731.094 150.499Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1035.34 453.796L1037.54 455.103L1039.5 454.568L1042.41 453.855L1044.07 454.093L1041.4 458.607L1039.44 459.855L1037.07 462.943L1036.71 461.874L1032.79 464.488L1032.31 464.31L1030.53 464.191L1030.83 460.983L1032.02 458.488L1032.37 455.162L1033.56 453.439L1035.34 453.796Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1065.34 350.796L1066.05 353.766L1068.43 352.341L1069.26 353.944L1070.63 355.429L1069.97 357.152L1070.09 360.419L1070.21 362.32L1070.98 362.795L1071.22 366.062L1070.51 368.022L1070.98 370.576L1074.19 372.596L1076.09 374.378L1077.99 376.041L1077.34 376.992L1078.7 379.368L1079 383.526L1080.55 382.694L1081.44 384.298L1082.39 383.763L1081.97 387.802L1083.69 390.119L1084.82 391.545L1086.49 394.633V397.722L1085.89 399.92L1084.82 402.237L1085.24 405.504L1083.75 408.889L1082.51 410.671L1080.25 414.057L1079.36 416.255L1077.52 418.987L1074.55 422.433L1071.28 424.333L1068.67 427.244L1066.71 429.145L1064.09 432.412L1061.89 434.313L1059.58 437.164L1057.74 439.777L1057.26 441.025L1054.71 442.332L1051.08 442.45L1047.34 444.054L1045.08 445.48L1042.23 447.143L1040.63 445.42L1039.08 444.767L1040.63 442.807L1038.55 443.52L1034.27 446.252L1032.13 445.242L1030.71 444.648L1029.05 444.351L1026.61 443.282L1025.84 440.906L1026.73 438.055L1026.97 436.095L1026.14 434.55L1023.34 434.134L1025.24 432.234L1025.78 429.442L1022.99 432.055L1019.84 432.768L1022.51 430.689L1024 428.491L1026.08 426.591L1027.03 423.799L1022.99 427.006L1020.43 428.313L1017.88 431.343L1016.1 429.798L1017.11 427.779L1016.27 424.987L1015.21 423.561L1016.16 422.67L1013.01 420.354L1010.75 420.294L1008.37 418.393L1002.49 418.75L997.801 420.116L993.703 421.423L990.733 421.185L986.575 423.145L983.426 423.977L982.06 425.997L980.278 427.541L977.486 427.66L975.348 427.957L972.853 427.303L970.358 427.719L968.101 427.897L965.428 429.917L964.537 429.739L962.518 430.808L960.498 431.996L958.241 431.877H956.162L953.726 429.442L952.301 428.729L953.192 426.531L954.914 425.997L955.805 425.165L956.162 423.799L957.528 421.126L957.944 418.869L957.528 415.008L957.647 412.81L958.478 410.671L957.944 408.177L958.122 407.048L957.112 405.504L957.528 402.534L956.399 399.504L956.34 397.9L957.409 399.564L957.112 396L958.478 397.128L959.132 398.613L959.488 396.653L958.538 393.624L958.478 392.436L958.003 391.307L958.775 389.109L959.666 388.159L960.439 386.258L960.498 384.001L962.339 381.268L962.102 384.179L963.943 381.565L966.854 380.259L968.755 378.655L971.546 377.229L973.091 376.932L973.922 377.407L976.774 375.982L978.853 375.566L979.506 374.734L980.397 374.378L982.238 374.497L985.921 373.368L988 371.646L989.188 369.626L991.505 367.725L991.921 366.181L992.336 364.102L995.247 360.835L996.079 364.161L997.623 363.389L996.732 361.607L998.098 359.766L999.405 360.597L1000.3 357.687L1002.38 355.786L1003.44 354.301L1005.17 353.647L1005.4 352.578L1006.77 352.994L1007.01 352.044L1008.55 351.509L1010.22 350.974L1012.41 352.756L1013.96 355.014H1016.04L1018.12 355.37L1017.7 353.291L1019.78 350.262L1021.38 349.252L1021.03 348.301L1022.75 346.104L1024.95 344.737L1026.55 345.213L1029.46 344.5L1029.64 342.54L1027.32 341.292L1029.16 340.758L1031.3 341.708L1032.91 343.252L1035.58 344.203L1036.59 343.846L1038.55 345.034L1040.63 343.906L1041.82 344.262L1042.71 343.49L1044.01 345.391L1042.83 347.47L1041.34 349.014L1040.21 349.133L1040.39 350.618L1039.08 352.519L1037.6 354.42L1037.72 355.489L1039.98 357.627L1042.35 358.815L1043.84 360.122L1045.8 362.379H1046.75L1048.29 363.389L1048.59 364.577L1051.5 365.824L1053.93 364.518L1055 362.498L1056.01 360.775L1056.79 358.696L1058.33 355.667L1058.21 353.826L1058.63 352.697L1058.57 350.559L1059.4 347.648L1060.17 346.876L1059.81 345.628L1060.88 343.609L1061.78 341.53L1062.01 340.401L1063.38 338.976L1064.15 340.876L1064.09 343.252L1064.86 343.728L1064.8 345.331L1065.75 347.232L1065.7 349.43L1065.34 350.796Z"
                    fill="#00587F"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M635.936 113.553L635.758 114.028L636.174 115.275L636.055 116.82H634.392L635.045 117.651L634.273 120.027L633.739 120.681L631.125 120.74L629.699 121.631L627.205 121.334L622.868 120.324L622.096 119.077L619.186 119.73L618.889 120.443L617.047 119.909L615.503 119.79L614.137 119.077L614.552 118.186L614.434 117.533L615.265 117.354L616.869 118.364L617.225 117.354L619.839 117.533L621.918 116.879L623.344 116.998L624.353 117.77L624.591 117.117L623.997 114.681L625.007 114.206L625.957 112.484L628.214 113.731L629.759 112.187L630.769 111.89L633.145 113.018L634.511 112.84L635.936 113.553Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M730.027 150.618L727.77 150.083L725.869 148.361L725.156 146.876L725.75 146.816L726.879 147.826H728.245L728.364 148.42L730.027 150.618Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M733.77 140.52L735.255 138.976L737.334 140.936L739.472 143.669L740.957 143.847L742.086 144.857L739.591 145.154L739.65 148.124L739.413 149.43L738.403 150.321L738.878 152.163L738.106 152.4L735.789 150.381L736.502 148.539L735.373 147.411L734.245 147.708L731.097 150.5L730.562 147.827L729.077 147.233L727.533 146.223L728.186 144.975L726.285 143.669L726.701 142.718L725.394 142.065L724.562 141.114L725.216 140.461L727.711 141.59L729.433 141.768L729.79 141.352L727.83 139.273L728.542 138.798L729.433 138.917L731.988 141.174L733.413 141.471L733.77 140.52Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M686.01 315.275L685.653 315.334V315.156L684.465 311.533L684.459 311.497L684.406 310.879L683.574 309.157L685.653 309.454L686.663 307.256L688.504 307.493L688.683 308.978L689.395 309.869V311.117L688.564 311.889L687.198 313.909L686.01 315.275Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M603.801 105.415L603.563 107.91L602.791 108.028L602.553 110.107L599.94 108.385L598.455 108.682L596.376 106.959L594.95 105.474L593.643 105.415L593.168 104.108L595.485 103.395L597.623 103.692L600.296 102.92L602.137 104.524L603.801 105.415Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M597.981 253.856L597.862 255.103L598.634 257.361L597.981 258.905L598.337 259.915L596.674 262.291L595.664 263.479L595.011 265.855L595.129 268.29L594.951 274.408L592.159 274.884L591.328 272.27L591.506 263.479L590.793 262.707L590.674 260.806L589.486 259.499L588.477 258.37L588.892 256.351L590.08 255.935L590.734 254.272L592.397 253.915L593.11 252.787L594.238 251.658H595.426L597.981 253.856Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M587.168 241.382L586.871 243.223L587.347 244.946L589.188 247.441L589.307 249.282L593.168 250.173L593.108 252.787L592.396 253.915L590.732 254.272L590.079 255.935L588.891 256.351L585.98 256.291L584.436 255.994L583.367 256.588L581.882 256.291L576.061 256.469L575.942 258.667L576.417 261.518L574.1 260.568L572.556 260.687L571.368 261.637L569.883 260.865L569.289 259.558L567.804 258.727L567.566 256.529L568.517 254.925L568.398 253.618L571.071 250.47L571.606 247.856L572.497 246.906L574.1 247.441L575.526 246.668L576.001 245.659L578.555 243.995L579.209 242.807L582.357 241.204L584.198 240.669L585.03 241.382H587.168Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M891.355 214.236L891.711 216.968L890.464 216.374L891.117 219.463L889.87 217.503L889.395 215.543L888.504 213.701L886.84 211.504L883.752 211.325L884.286 212.929L883.573 215.008L882.029 214.236L881.673 214.949L880.663 214.533L879.356 214.177L878.406 211.028L876.861 208.177L877.039 205.861L874.842 204.851L875.376 203.485L877.158 202.059L874.426 200.039L875.139 197.426L878.049 199.089L879.653 199.267L880.366 201.94L883.573 202.475L886.603 202.415L888.622 203.069L887.672 206.276L886.246 206.514L885.534 208.652L887.672 210.672L887.85 208.177H888.741L891.355 214.236Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M672.763 131.848L671.397 133.392L670.625 136.065L671.872 138.204L669.14 137.728L666.17 138.916L666.348 140.817L663.616 141.174L661.299 139.807L658.923 140.877L656.666 140.758L656.191 138.263L654.528 137.016L654.943 136.54L654.587 136.065L654.943 134.877L656.013 133.689L654.349 132.085L653.934 130.66L654.587 129.828L655.656 131.373L656.785 131.135L659.161 131.67L663.675 131.907L665.041 130.957L668.546 130.066L670.922 131.432L672.763 131.848Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M643.301 127.512L644.43 127.452L643.776 129.115L645.38 130.6L645.083 132.323L644.43 132.501L643.895 132.858L642.945 133.749L642.707 135.828L639.856 134.402L638.608 132.798L637.361 131.967L635.876 130.541L635.104 129.412L633.5 127.63L633.975 126.086L635.163 126.977L635.757 126.145L637.123 126.086L639.796 126.739L641.875 126.68L643.301 127.512Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M678.11 96.8612L675.793 96.7424L675.318 97.0988L676.209 98.2868L677.397 100.663L674.962 100.841L674.19 101.673L674.368 103.514L673.12 103.158L670.566 103.336L669.675 102.445L668.665 103.098L667.537 102.564L665.22 102.504L661.834 101.613L658.924 101.316L656.667 101.435L655.241 102.385L653.875 102.564L653.578 100.9L652.449 99.2372L654.112 98.465L653.875 97.0394L652.865 95.6732L652.509 94.0694H655.3L658.152 92.7032L658.449 90.6836L660.587 89.4956L659.993 87.8918L661.597 87.2978L664.329 85.9316L667.477 86.8226L668.012 87.7136L669.438 87.2978L672.289 88.1294L672.942 89.852L672.526 90.8024L674.784 93.1784L676.031 93.8318V94.4852L678.051 95.1386L679.06 96.089L678.11 96.8612Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M289.752 237.699H288.742L289.514 233.422L289.93 230.393L289.99 229.799L290.405 229.621L290.94 230.096L292.425 227.779L293.078 227.72L293.019 228.314H293.613L293.435 229.383L292.663 230.987L292.9 231.581L292.366 232.947L292.544 233.303L291.95 235.264L291.178 236.273L290.524 236.392L289.752 237.699Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M393.526 375.27L393.348 374.082L390.141 372.122L387.052 372.062L381.349 373.191L380.102 376.517L380.221 378.596L379.33 383.17L378.736 382.338L374.934 382.16L373.984 385.249L371.786 382.517L367.331 381.566L364.955 385.011L362.638 385.546L360.797 380.259L358.599 375.983L359.253 372.3L357.352 370.696L356.639 367.964L354.738 365.35L356.461 361.251L354.738 358.044L355.392 356.737L354.679 355.311L355.807 353.411L355.629 350.203V347.471L356.283 346.223L353.016 340.046L355.51 340.402L357.233 340.283L357.886 339.155L360.738 337.61L362.46 336.185L366.796 335.531L366.559 338.382L367.093 339.867L366.915 342.422L370.776 345.807L374.578 346.461L375.944 347.886L378.261 348.659L379.746 349.728H381.825L383.844 350.856L384.141 353.054L384.854 354.183L385.032 355.787L384.022 355.846L385.686 360.301L392.041 360.479L391.744 362.677L392.22 364.162L394.12 365.231L395.13 367.607L394.774 370.637L394.002 372.3L394.477 374.438L393.526 375.27Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M395.484 291.04L397.325 291.396L397.682 290.565L397.088 289.852L397.444 288.723L398.81 289.08L400.414 288.664L402.315 289.495L403.8 290.268L404.81 289.258L405.582 289.377L406.057 290.446L407.661 290.208L408.968 288.723L410.037 285.931L412.056 282.427L413.244 282.249L414.017 284.387L415.799 291.04L417.64 291.693L417.699 294.307L415.145 297.455L416.155 298.584L422.154 299.178L422.273 303.039L424.827 300.544L429.045 301.91L434.688 304.227L436.351 306.424L435.816 308.563L439.737 307.375L446.271 309.394L451.32 309.276L456.309 312.424L460.705 316.701L463.319 317.77L466.17 317.948L467.417 319.136L468.605 324.007L469.259 326.323L468.011 332.62L466.407 335.115L461.834 340.401L459.814 344.737L457.438 348.004L456.606 348.123L455.834 350.915L456.369 358.043L455.715 363.924L455.537 366.418L454.587 367.963L454.29 373.071L451.201 378.001L450.904 381.981L448.35 383.585L447.696 385.902H444.132L439.083 387.327L436.886 389.05L433.322 390.178L429.698 393.208L427.263 397.009L427.085 399.861L427.857 401.94L427.679 405.801L427.203 407.642L425.184 409.78L422.511 416.493L420.135 419.463L418.234 421.304L417.343 424.927L415.62 427.066L414.373 424.927L415.442 423.086L413.185 420.532L410.334 418.393L406.592 415.958L405.463 416.077L401.721 413.107L399.701 413.523L403.265 408.355L406.413 404.613L408.374 403.068L410.868 400.989L410.631 397.96L408.73 395.703L407.186 396.475L407.601 394.277L407.78 392.02L407.601 389.881L406.354 389.228L405.166 389.822L403.919 389.644L403.443 388.218L402.79 384.714L402.077 383.585L399.761 382.516L398.454 383.288L394.949 382.516L394.712 377.348L393.524 375.269L394.474 374.437L393.999 372.299L394.771 370.636L395.127 367.606L394.118 365.23L392.217 364.161L391.742 362.676L392.039 360.478L385.683 360.3L384.02 355.845L385.029 355.786L384.851 354.182L384.138 353.053L383.841 350.856L381.822 349.727H379.743L378.258 348.658L375.941 347.886L374.575 346.46L370.773 345.807L366.912 342.421L367.091 339.867L366.556 338.382L366.794 335.53L362.457 336.184L360.735 337.609L357.884 339.154L357.23 340.282L355.508 340.401L353.013 340.045L351.112 340.698L349.568 340.282L349.508 334.521L346.895 336.718L343.925 336.659L342.558 334.58L340.301 334.402L340.895 332.739L338.935 330.422L337.391 326.977L338.282 326.323L338.163 324.66L340.182 323.591L339.767 321.512L340.598 320.205L340.776 318.423L344.519 315.81L347.251 315.097L347.726 314.503L350.756 314.681L352.062 304.227L352.122 302.563L351.587 300.425L350.043 298.999L350.102 296.208L352.003 295.614L352.656 296.029L352.775 294.544L350.815 294.129V291.753L357.349 291.871L358.478 290.505L359.428 291.753L360.022 294.01L360.675 293.535L362.517 295.554L365.13 295.317L365.784 294.129L368.279 293.238L369.704 292.584L370.12 290.98L372.555 289.911L372.377 289.08L369.526 288.783L369.11 286.347L369.288 283.793L367.803 282.843L368.457 282.486L370.892 282.961L373.565 283.912L374.575 283.021L377.01 282.427L380.812 281.001L382.059 279.516L381.644 278.447L383.426 278.328L384.138 279.16L383.663 280.882L384.851 281.417L385.564 283.199L384.614 284.565L384.02 287.773L384.851 289.733L385.029 291.515L387.108 293.297L388.772 293.475L389.128 292.703L390.197 292.525L391.742 291.871L392.811 290.862L394.712 291.218L395.484 291.04Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M970.062 281.061L971.369 279.635L974.102 277.497L974.042 279.398L973.983 281.833L972.379 281.714L971.726 283.021L970.062 281.061Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M884.345 192.377L885.89 193.625L886.187 195.941L883.514 196.06L880.722 195.822L878.821 196.416L875.554 194.931L875.316 194.219L876.861 191.367L878.405 190.417L880.959 191.249L882.682 191.367L884.345 192.377Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M669.796 365.943L670.925 368.973L671.578 369.686L672.529 371.883L676.152 376.041L677.518 376.457L677.459 377.823L678.35 380.259L680.904 380.853L682.924 382.575L678.112 385.367L675.023 388.218L673.835 390.773L672.766 392.198L670.984 392.495L670.271 394.337L669.915 395.525L667.777 396.356L665.104 396.178L663.619 395.109L662.252 394.693L660.589 395.525L659.698 397.366L658.094 398.495L656.431 400.217L654.055 400.633L653.402 399.267L653.758 396.95L651.976 393.327L651.145 392.733L651.501 381.625L654.768 381.506L655.243 367.904L657.738 367.785L662.906 366.419L664.094 368.022L666.292 366.537H667.301L669.202 365.646L669.796 365.943Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M666.053 265.439L668.37 266.924L670.211 268.469L670.271 269.716L672.587 271.676L674.013 273.339L674.844 275.597L677.399 277.141L677.933 278.329L676.864 278.745L674.666 278.685L672.171 278.27L670.924 278.567L670.389 279.517L669.32 279.636L668.013 278.804L664.271 280.705L662.727 280.349L662.252 280.646L661.301 282.962L658.747 282.19L656.312 281.834L654.173 280.408L651.381 279.101L649.599 280.349L648.293 282.249L647.996 284.922L645.857 284.744L643.541 284.091L641.58 286.11L639.798 289.674L639.442 288.546L639.264 286.823L637.719 285.576L636.472 283.616L636.175 282.249L634.571 280.23L634.868 279.101L634.512 277.497L634.749 274.527L635.581 273.874L637.244 270.013L639.977 269.716L640.571 268.706L641.165 268.825L641.996 269.657L646.214 268.231L647.639 266.746L649.362 265.38L649.005 264.073L649.956 263.717L653.223 263.954L656.312 262.172L658.688 258.014L660.351 256.47L662.489 255.816L662.905 257.42L664.865 259.796V261.4L664.39 262.944L664.628 264.132L665.756 265.261L666.053 265.439Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M395.546 121.156L397.566 121.691L400.358 121.572L398.397 123.116L397.209 123.354L393.942 121.75L393.586 120.503L395.071 119.374L395.546 121.156Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M404.098 111.652L402.673 111.712L399.227 110.583L397.148 108.801L398.277 108.504L401.782 109.454L404.276 110.999L404.098 111.652Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M221.206 113.85L219.364 114.385L215.622 112.722V111.415L213.899 110.108L214.078 109.039L211.523 108.385L211.88 106.366L212.771 105.534L215.206 106.306L216.632 106.9L219.067 107.257L219.186 108.564L219.424 110.286L221.324 111.831L221.206 113.85Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M422.632 105.831L419.662 109.039L421.979 107.791L423.701 108.623L422.276 109.87L424.533 110.88L426.196 109.989L428.75 111.118L427.087 113.85L429.344 113.197L429.166 115.157L429.463 117.473L427.325 120.8L425.899 120.919L424.176 120.206L425.661 117.176L424.949 116.701L420.612 119.909L418.83 119.79L421.444 118.008L418.83 117.117L415.563 117.355L409.861 117.236L409.742 116.167L411.999 114.8L410.99 113.85L414.197 111.593L419.068 105.712L421.563 103.633L424.533 102.386L425.78 102.505L424.889 103.514L422.632 105.831Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M208.792 93.1191L209.683 93.5943L212.653 93.2973L208.376 97.3959L208.555 100.366H207.426L207.01 98.7027L207.307 96.9801L206.832 95.8515L207.604 94.2477L208.792 93.1191Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M377.129 64.904L374.991 66.686L373.981 66.389L373.922 65.3792L374.159 65.1416L375.823 64.1318L376.832 64.1912L377.129 64.904Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M371.367 63.0038L367.091 64.9046L365.309 64.7858V63.8948L368.279 62.291L371.843 62.3504L371.367 63.0038Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M369.529 53.0247L368.995 54.5097L370.598 53.9751L371.489 54.8661L373.568 56.0541L375.826 57.0639L374.994 58.6677L377.073 58.4301L378.202 59.5587L375.232 60.6279L371.727 59.7963L371.252 58.2519L367.51 60.0933L362.639 61.8159L363.055 59.8557L359.312 60.1527L362.698 58.4895L364.837 55.8165L367.866 52.7871L369.529 53.0247Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M396.2 48.0939L393.289 48.2721L393.705 46.6683L395.962 44.8269L398.516 44.4111L399.882 45.3021L398.991 46.6683L398.457 47.1435L396.2 48.0939Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M351.946 41.7385L349.511 42.8671L347.016 41.9167L344.699 42.2137L342.68 40.7881L345.65 39.7783L348.56 38.4121L350.342 39.3031L351.293 39.8971L351.53 40.4911L351.946 41.7385Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M383.427 126.443L382.12 124.304L383.843 119.255L382.892 118.186L380.695 118.78L380.041 117.83L376.774 120.621L374.873 123.532L373.21 125.255L371.725 125.849L370.715 126.027L370.062 126.918H364.538L359.905 126.977L358.301 127.631L354.262 130.244V130.185L353.727 129.947L352.539 130.482L351.41 131.254L350.341 130.601L347.549 131.076L345.233 131.61L344.104 132.086L342.738 133.333L343.807 133.749L344.817 133.511H344.995L344.817 134.64L341.966 135.056L340.303 135.531L339.293 136.125L337.748 135.768L336.798 135.947L335.075 137.016L332.343 138.204L330.739 137.966L331.927 136.659L334.125 134.58L336.56 133.333L337.214 132.264L337.748 130.482L340.006 128.403L340.54 126.027L341.194 128.343L343.451 128.878L344.876 127.631L344.045 124.779L343.51 123.591L341.134 122.879L338.877 122.463H336.56L334.541 121.988L334.303 121.156L333.472 121.691L332.759 121.572L333.887 120.324L332.818 119.849L333.947 118.424L333.234 117.354L334.244 116.285L331.155 115.751L331.096 113.612L330.62 113.137L328.66 113.018L326.225 112.305L325.334 112.781L324.265 113.672L322.304 114.266L320.463 115.751L317.255 114.741L314.642 115.216L312.325 114.087L309.593 113.493L307.633 113.256L307.039 112.662L307.573 110.642H306.563L305.791 112.068H299.732H289.634H279.655H270.805H262.013H253.282H244.312H241.461H232.729H224.354H223.938L220.73 108.444L219.78 106.841L215.622 105.296L216.394 102.029L218.533 99.8313L216.097 98.2275L217.939 95.3169L216.691 92.7033L218.176 90.8025L221.206 89.0799L223.106 86.8227L220.374 84.5655L221.206 80.4669L221.859 77.9721L220.909 76.3683L220.433 74.9427L220.79 73.1013L216.929 74.2299L212.414 76.1901L212.236 73.9329L211.939 72.3885L210.276 71.4381L207.781 71.3193L228.928 51.8955L243.54 39.7779L247.104 40.5501L249.064 42.0945L251.262 42.3915L255.004 41.0847L259.162 40.0749L262.31 40.4313L267.597 39.0651L272.468 38.2929L272.587 39.5997L275.26 38.8275L277.576 37.3425L278.824 37.6989L279.655 40.5501L285.298 38.3523L282.982 40.7877L286.546 40.2531L288.446 39.3621L291.179 39.5403L293.495 40.8471L297.95 42.0351L300.742 42.5697L303.356 42.3915L305.078 44.0547L300.029 45.6585L303.831 46.3119L310.9 45.9555L313.513 45.3615L314.345 47.3217L318.562 45.7179L317.315 44.2923L319.988 43.2231L323.077 43.0449L325.393 42.7479L326.641 43.5201L327.532 45.2427L330.502 45.0051L333.65 46.4901L337.927 45.9555L341.491 46.0149L342.916 43.9953L345.589 43.4607L348.5 44.5299L345.946 47.6187L349.628 45.0051L351.529 45.1239L355.331 41.8569L354.38 39.8967L352.658 38.5899L355.925 35.0853L360.796 32.8281L363.469 33.3627L364.657 34.7289L364.894 38.2929L361.449 39.8373L365.429 40.4907L362.815 43.7577L368.102 41.2629L369.409 43.3419L366.854 45.7179L367.627 47.9157L371.963 45.5991L375.824 42.7479L378.616 39.2433L381.883 39.4809L385.09 39.9561L387.229 41.5599L386.219 43.1637L383.189 44.8863L383.724 46.6089L382.298 48.2127L375.824 50.5293L371.963 51.0639L370.062 50.0541L368.102 51.7173L363.706 54.5091L361.924 55.9941L357.35 58.2513L353.489 58.4889L350.46 59.9145L348.737 62.1717L345.352 62.5875L340.184 65.3793L334.6 69.2403L331.63 71.9727L328.72 76.0713L332.284 76.6653L331.393 79.9323L330.917 82.6647L335.254 81.9519L339.412 83.4963L341.372 84.8625L342.382 86.5257L345.292 87.5355L347.431 89.0205L351.945 89.2581L354.796 89.6145L352.658 92.7033L351.648 96.3267L351.707 100.425L354.321 103.93L357.113 102.742L360.439 98.9403L361.805 93.2379L360.796 91.3371L366.142 89.6145L370.597 87.1197L373.448 84.6249L374.458 82.2489L374.22 79.2195L372.319 76.5465L377.606 72.8637L378.2 69.7155L380.516 64.3695L382.774 63.5379L386.753 64.4883L389.248 64.8447L391.921 63.8943L393.763 65.0823L395.901 67.1019L396.02 68.4087L400.594 68.7057L399.049 71.6163L397.683 76.0119L399.94 76.6059L400.891 78.6849L405.761 76.7247L410.216 72.8043L412.711 71.2005L413.365 74.3487L414.909 78.8037L416.097 83.0805L414.077 85.3377L416.929 87.3573L418.651 89.3769L422.75 90.3273L424.175 91.4559V94.5447L426.195 95.0199L426.848 96.3861L425.66 100.485L423.106 101.851L420.611 103.158L415.384 104.465L410.692 107.435L405.583 108.088L399.584 107.256H395.248L392.099 107.494L388.714 110.167L384.318 111.83L378.319 116.701L373.626 120.146L376.418 119.552L382.892 114.622L390.199 111.533L394.713 111.177L396.673 113.018L393.05 115.513L392.693 119.493L392.753 122.344L396.079 124.185L401.188 123.651L405.464 119.433L404.87 122.166L406.355 123.532L401.96 125.967L394.594 128.225L391.149 129.71L386.872 132.442L384.674 132.145L385.565 128.997L391.743 125.849L386.932 125.967L383.427 126.443Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M320.168 29.1458L317.376 30.5714L323.613 29.6804L325.158 31.2248L329.494 29.621L330.563 30.6308L329.256 33.6602L331.81 32.4128L333.474 29.2646L336.028 28.7894L337.81 29.2646L339.117 30.512L337.513 33.5414L336.087 35.7392L338.582 37.2836L341.552 38.828L340.008 40.1942L335.79 40.4912L336.265 41.6792L334.365 42.8672L330.385 42.392L326.999 41.501L323.97 41.6792L318.327 42.8078L311.614 43.283L306.922 43.58L307.1 42.0356L304.665 41.204L302.11 41.5604L301.754 39.0062L303.714 38.6498L308.05 38.1152L311.317 38.2934L315 37.6994L311.139 36.9866L305.734 37.2242L302.348 37.1648V36.0362L309.298 34.7294L305.556 34.7888L302.348 33.9572L306.981 31.6406L310.07 30.3932L318.505 28.5518L320.168 29.1458Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M343.63 28.2548L339.472 30.2744L338.105 28.136L339.353 27.6608L342.62 27.542L343.63 28.2548Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M408.135 29.2051L407.72 30.0367L405.284 29.9773L402.849 29.9179L399.938 30.3337L399.404 30.0961L398.156 28.4923L399.166 27.4231L400.473 27.1855L405.462 27.5419L408.135 29.2051Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M384.497 29.0266L384.675 30.9274L388.952 28.492L395.902 27.2446L397.268 30.3928L395.367 32.4124L400.713 31.5214L403.861 30.274L407.901 31.8184L410.098 33.3034L409.445 34.6696L414.316 33.9568L415.444 35.9764L420.434 37.2238L421.741 38.4712L422.275 41.5006L416.87 42.9856L421.444 45.124L424.948 45.8368L426.909 48.8068L430.77 49.0444L428.809 51.361L422.335 55.222L419.959 53.7964L417.702 50.5888L414.197 51.0046L412.831 52.9648L414.435 54.8656L417.108 56.41L417.702 57.301L417.642 60.6868L415.504 63.1222L412.712 62.1718L407.604 59.4988L409.742 62.4094L411.405 64.4884L411.227 65.6764L404.752 64.3102L400.238 62.2906L397.981 60.6868L399.406 59.677L396.555 57.9544L393.763 56.3506L393.229 57.301L385.447 57.8356L384.022 56.707L387.229 54.2122L392.041 54.1528L397.565 53.737L397.446 52.549L399.288 50.8858L404.515 47.6782L404.752 46.1932L404.455 45.124L401.664 43.5202L397.446 42.451L399.525 41.6194L398.337 39.5998L396.318 39.4216L395.189 38.3524L393.229 39.3028L388.536 39.7186L380.22 39.0058L375.825 38.0554L372.32 37.5802L371.191 36.4516L374.934 35.026H371.548L373.508 31.8778L377.725 29.1454L381.289 27.898L387.942 27.0664L384.497 29.0266Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M354.558 26.9473L356.696 27.6007L361.211 27.1849L360.914 28.0759L357.29 29.5609L359.547 30.8677L356.459 33.6595L351.469 34.8475L349.449 34.6099L348.915 33.4219L345.41 31.0459L346.42 30.0361L350.816 30.3925L350.281 28.4323L354.558 26.9473Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M367.981 30.2146L363.348 32.5312L360.734 32.4124L361.804 29.68L363.348 28.195L365.843 26.8882L368.932 26.0566L373.624 26.1754L377.307 26.8882L371.308 29.6206L367.981 30.2146Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M299.199 34.4916L291.18 36.036L291.537 34.6698L287.973 33.0066L290.586 31.6998L295.041 29.4426L299.556 27.423L299.793 25.5816L308.109 25.1064L310.604 25.7598L316.247 25.938L317.376 26.7696L318.326 28.0764L314.465 28.8486L306.208 30.987L300.744 33.1848L299.199 34.4916Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M373.566 23.5616L371.13 24.6902L368.041 24.4526L366.141 23.6804L368.814 22.3736L372.912 21.542L373.744 22.6112L373.566 23.5616Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M368.339 18.3936L368.458 19.7598L366.795 21.2448L363.349 23.502L359.251 23.799L357.35 23.3238L359.37 21.6012L355.449 21.7794L358.003 19.5222L360.261 19.641L364.834 18.6312L367.745 18.8094L368.339 18.3936Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M344.934 19.9384L344.518 20.9482L347.132 20.473L349.27 20.5918L347.904 22.0768L344.875 23.443L336.618 23.9182L329.312 25.225L325.748 25.2844L326.639 24.334L332.995 22.9678L322.362 23.3242L319.867 22.7896L326.817 19.9384L330.025 19.1068L334.955 20.1166L336.677 21.8392L340.301 22.0768L340.717 19.285L344.162 18.2158L346.003 18.5128L344.934 19.9384Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M378.022 17.3247L379.388 18.2751H383.784L384.616 19.2255L382.952 20.2947L384.794 20.9481L385.507 21.6609L388.417 21.7797L391.447 22.0173L395.664 21.4233L400.475 21.1263L403.921 21.3639L405.287 22.4925L404.693 23.6805L402.554 24.5121L398.575 25.1655L396.02 24.7497L389.011 25.2249L384.259 25.2843L380.933 24.9279L375.824 23.9775L376.775 22.3143L378.022 20.8887L377.191 19.5819L373.033 19.2255L371.488 18.3345L373.745 17.1465L378.022 17.3247Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M333.056 15.7803L329.611 17.9781L326.462 18.9879L324.205 19.1067L318.325 20.3541L314.107 20.8293L311.969 20.1759L318.919 17.9781L326.165 16.1367L329.432 16.1961L333.056 15.7803Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M381.29 16.1371L380.221 16.1965L376.301 16.0183L376.717 15.2461L380.993 15.3055L381.944 15.7807L381.29 16.1371Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M346.363 15.6029L341.136 16.4345L339.176 15.5435L342.205 14.6525L345.769 14.3555L348.205 14.7713L346.363 15.6029Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M350.993 13.1075L347.607 13.6421H344.043L344.637 13.2263L348.023 12.4541L349.033 12.5729L350.993 13.1075Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M378.793 14.5923L374.872 15.1863L373.922 14.5329L374.278 13.5231L375.585 12.3945L378.199 12.5133L379.208 12.6915L380.575 13.6419L378.793 14.5923Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M370.596 13.88L369.943 15.0086L366.794 14.7116L364.418 13.8206L359.785 13.7018L362.933 12.9296L361.27 12.2762L362.577 11.207L366.2 11.5634L370.655 12.5732L370.596 13.88Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M402.733 10.256L404.337 11.147L400.476 11.9192L394.179 13.9982L390.14 14.1764L386.101 13.82L385.151 12.6914L386.398 11.741L388.952 11.0282H385.032L383.844 10.1372L384.081 9.0086L386.992 7.88L389.427 7.1078L391.803 6.9296L391.625 6.3356L396.555 6.2168L397.506 7.5236L400.298 8.0582L403.149 8.5928L402.733 10.256Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M449.775 1.93975L454.943 2.11795L458.923 2.41495L462.012 3.00895L461.358 3.60295L455.537 4.61275L450.191 5.08795L447.815 5.62255H452.27L446.033 7.10755L441.994 7.82035L436.47 9.89935L431.658 10.3151L429.817 10.9091L423.105 11.1467L425.718 11.5031L423.758 11.9783L424.174 13.3445L421.204 14.2949L417.105 15.0671L415.026 16.1363L411.106 17.0273L410.809 17.6807L414.67 17.5619L414.017 18.2747L406.473 19.9973L401.424 19.1657L394.474 19.6409L391.504 19.2845L387.465 19.1063L388.712 17.7401L393.464 17.0867L394.652 15.0671L396.197 14.8889L400.652 16.0769L399.642 14.2949L396.731 13.7603L399.701 12.6911L404.216 12.0377L405.879 11.0873L404.097 10.0775L404.75 8.77075L410.334 8.83015L411.641 9.12715L415.977 8.17675L411.641 7.87975L404.156 8.05795L401.543 7.22635L401.067 6.21655L399.582 5.50375L400.236 4.73155L403.8 4.25635L406.295 4.19695L410.69 3.84055L414.729 2.94955L417.046 3.06835L418.472 3.72175L421.442 2.53375L424.53 2.17735L428.391 1.93975L434.569 1.82095L435.341 2.05855L441.459 1.70215L445.617 1.82095L449.775 1.93975Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M614.432 117.533L614.551 118.186L614.135 119.077L615.501 119.79L617.045 119.909L616.867 121.394L615.62 122.047L613.363 121.572L612.769 123.057L611.343 123.176L610.808 122.582L609.205 123.889L607.72 124.067L606.413 123.235L605.344 121.631L603.918 122.225V120.503L606.056 118.424L605.938 117.473L607.304 117.83L608.076 117.176H610.571L611.165 116.404L614.432 117.533Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M951.707 227.067L949.153 228.908L946.242 227.72L945.648 224.453L946.955 222.73L950.4 221.661L952.361 221.721L953.311 223.206L952.123 224.869L951.707 227.067Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M965.605 110.405L970.951 113.078L974.515 116.523H979.029L980.574 115.098L984.672 113.969L985.444 117.355L985.266 118.721L986.929 122.76L987.286 126.443L983.187 125.79L981.465 127.096L984.256 130.304L986.573 134.759L985.088 134.818L986.217 136.779L982.95 134.521V136.66L979.148 138.264L980.811 140.283L978.079 140.105L975.94 138.917L975.287 141.649L972.97 143.669L971.723 146.104L967.981 147.174L966.555 148.956L963.704 150.025L964.476 148.243L963.11 146.758L964.298 144.204L961.625 142.243L959.605 143.55L957.467 146.223L956.695 148.659L953.725 148.837L952.953 150.619L955.804 153.173L958.655 153.826L959.487 155.49L962.516 156.618L964.773 153.886L968.278 155.371L970.357 155.49L971.723 157.45L967.743 158.519L967.149 160.598L964.892 162.499L964.357 165.172L968.575 167.251L971.307 170.993L974.574 174.498L977.841 177.408L978.792 180.259L977.128 181.329L978.554 183.348L980.871 184.536L981.346 187.625L981.405 190.654L979.742 191.011L978.495 195.109L977.128 200.158L975.109 204.673L971.307 208.177L967.387 211.444L963.763 211.86L962.041 213.523L960.675 212.335L959.19 214.177L954.913 216.137L951.468 216.672L951.052 220.711L949.21 220.948L947.904 218.157L948.438 216.731L943.805 215.484L942.379 216.137L938.875 215.127L937.033 213.583L937.212 211.385L934.063 210.672L932.222 209.247L929.787 211.266L926.638 211.741L924.025 211.682L922.421 212.632L920.817 213.167L922.005 217.563L920.223 217.444L919.748 216.553L919.451 214.949L917.194 216.078L915.649 215.365L912.976 213.939L913.452 210.791L911.254 210.019L909.828 206.514L906.502 207.168L906.086 202.653L908.581 199.446L908.046 196.297L907.274 193.387L905.67 192.496L904.066 190.239L902.225 190.536L898.602 189.942L899.314 188.338L897.176 185.962L895.275 187.566L892.365 186.675L889.157 189.051L886.84 191.902L884.346 192.377L882.682 191.367L880.96 191.248L878.406 190.417L876.861 191.367L875.317 194.218L874.426 191.189L872.584 192.021L868.723 191.605L864.862 190.773L861.892 189.051L859.219 188.338L857.734 186.496L855.774 185.962L851.973 183.467L849.121 182.279L847.993 183.17L842.884 180.497L839.202 178.121L837.301 173.904L839.736 174.438L839.38 172.478L837.598 170.518L837.123 167.429L832.549 162.915L826.906 161.43L825.183 158.46L822.391 156.678L821.5 155.608L820.431 153.47L820.134 151.985L817.936 151.094L817.045 151.51L815.204 147.946L815.857 147.114L815.145 146.223L817.58 144.441L819.481 143.669L822.926 144.204L823.282 141.768L827.084 141.352L827.678 139.808L831.777 137.788L831.895 136.957L830.886 134.759L832.608 133.809L827.381 127.275L832.786 125.79L833.974 124.958L833.38 118.246L839.796 119.493L840.746 117.771L839.261 114.088L841.518 113.731L842.647 111.237L843.657 110.94L845.617 113.553L849.003 115.513L853.873 116.88L857.319 119.909L858.15 124.245L859.932 125.908L863.793 126.562L868.07 127.037L872.822 129.413L874.842 129.829L877.812 133.274L880.603 135.531L883.93 135.412L890.642 136.303L894.444 135.769L897.77 136.303L903.354 138.62H907.036L908.997 139.749L911.61 137.729L915.887 136.422L920.401 136.303L923.312 134.997L924.5 132.977L925.926 131.67L924.797 130.423L923.074 128.997L923.371 126.562L925.272 126.918L928.777 127.69L930.678 125.671L934.479 124.245L935.251 121.75L936.736 120.681L940.776 120.206L943.389 120.622L942.914 119.315L938.637 116.701L935.548 115.513L934.063 116.88L930.796 116.286L929.43 116.761L927.767 115.276L927.589 111.534L927.232 108.742L931.628 110.167L934.242 107.851L933.113 106.188L932.994 102.327L933.766 101.139L932.281 99.119L930.084 98.2874L931.093 96.446L934.123 95.7926L937.806 95.6738L942.914 96.8024L946.478 98.1092L951.052 101.792L953.309 103.396L955.982 105.653L959.665 109.217L965.605 110.405Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M567.803 258.726L569.288 259.558L569.882 260.864L571.367 261.637L572.555 260.686L574.099 260.567L576.416 261.518L577.307 266.983L575.881 270.131L574.99 274.467L576.416 277.734L576.297 279.278H574.753L572.436 278.566H570.238L566.259 279.278L563.942 280.348L560.616 281.773L559.962 281.654L560.2 278.506L560.556 278.031L560.437 276.546L559.012 274.942L557.943 274.705L556.992 273.635L557.705 271.913L557.408 270.071L557.527 269.002H558.061L558.299 267.339L558.061 266.567L558.358 266.032L559.606 265.616L558.774 262.528L558.002 260.983L558.299 259.676L558.952 259.379L559.428 259.023L560.319 259.617H562.932L563.526 258.548L564.12 258.607L565.071 258.191L565.605 259.795L566.377 259.32L567.803 258.726Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M637.243 270.013L635.58 273.874L634.748 274.527L634.511 277.497L634.867 279.101L634.57 280.23L636.174 282.249L636.471 283.615L637.718 285.576L639.263 286.823L639.441 288.546L639.797 289.674L639.56 291.694L636.887 290.803L634.154 289.793L629.937 289.674L629.521 289.437L627.502 289.912L625.482 289.437L623.878 289.674L618.354 289.615L618.889 286.585L617.522 284.031L615.978 283.437L615.325 281.715L614.434 281.18L614.493 280.111L615.325 277.378L616.928 273.696H617.879L619.898 271.438L621.146 271.379L623.047 272.983L625.363 271.676L625.66 270.072L626.432 268.528L626.908 266.627L628.69 265.083L629.343 262.41L630.056 261.519L630.531 259.558L631.363 257.123L634.154 254.153L634.333 252.906L634.689 252.193L633.323 250.708L633.442 249.46L634.333 249.282L635.699 251.718L635.996 254.212L635.877 256.767L637.778 260.212H635.877L634.927 260.449L633.382 260.093L632.669 261.875L634.689 264.132L636.174 264.786L636.649 266.33L637.718 268.944L637.243 270.013Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M677.932 278.328L680.011 281.476L681.555 281.951L682.446 281.298L683.99 281.536L685.832 280.763L686.663 282.367L689.693 284.921L689.515 289.376L690.881 289.911L689.752 291.218L688.505 292.287L687.198 294.247L686.485 296.029L686.307 299.059L685.535 300.544L685.475 303.395L684.525 304.464L684.406 306.721L683.931 307.018L683.575 309.157L684.406 310.879L684.466 311.473L683.753 317.591L684.644 319.73L684.05 321.334L685.119 324.066L687.139 326.145L687.554 328.224L688.505 329.234L688.327 329.887L687.792 329.709L683.218 330.362L682.327 330.838L681.317 333.273L682.03 334.936L681.377 339.451L680.842 343.252L681.733 343.965L684.05 345.45L685 344.737L685.119 348.836H682.565L681.258 346.757L680.07 345.094L677.516 344.559L676.803 342.599L674.724 343.787L672.11 343.252L670.982 341.53L668.903 341.173L667.299 341.233L667.121 340.045L665.992 339.985L664.448 339.748L662.369 340.342L660.943 340.223L660.112 340.579L660.349 336.065L659.28 334.639L659.042 332.263L659.577 329.947L658.924 328.521L658.864 326.086L654.825 326.145L655.122 324.779H653.399L653.221 325.432L651.142 325.61L650.251 327.808L649.717 328.759L647.875 328.224L646.806 328.759L644.549 329.056L643.301 327.095L642.529 325.848L641.579 323.531L640.807 320.74L630.887 320.68L629.699 321.096L628.689 321.037L627.323 321.571L626.848 320.383L627.679 319.967L627.798 318.304L628.392 317.354L629.58 316.522L630.471 316.938L631.659 315.453L633.5 315.512L633.679 316.582L634.926 317.235L636.946 314.859L638.906 313.018L639.737 311.77L639.678 308.622L641.163 304.939L642.707 302.979L644.905 301.138L645.321 299.95L645.38 298.524L645.915 297.217L645.737 295.019L646.153 291.634L646.806 289.258L647.816 287.238L647.994 284.921L648.291 282.248L649.598 280.348L651.38 279.1L654.172 280.407L656.31 281.833L658.745 282.189L661.3 282.961L662.25 280.645L662.725 280.348L664.27 280.704L668.012 278.803L669.319 279.635L670.388 279.516L670.922 278.566L672.17 278.269L674.665 278.684L676.862 278.744L677.932 278.328Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M647.996 284.922L647.818 287.239L646.808 289.259L646.155 291.635L645.739 295.02L645.917 297.218L645.383 298.525L645.323 299.951L644.908 301.139L642.71 302.98L641.165 304.94L639.68 308.623L639.74 311.771L638.908 313.019L636.948 314.86L634.928 317.236L633.681 316.583L633.503 315.513L631.661 315.454L630.473 316.939L629.582 316.523L628.335 315.216L627.325 315.87L625.959 317.533L623.227 313.494L625.781 311.355L624.533 308.861L625.721 307.91L627.979 307.435L628.216 305.712L630.058 307.554L633.028 307.732L634.037 305.95L634.453 303.396L634.097 300.426L632.493 298.169L633.978 293.714L633.146 293.001L630.652 293.298L629.701 291.338L629.939 289.674L634.156 289.793L636.889 290.803L639.562 291.694L639.799 289.674L641.581 286.11L643.541 284.091L645.858 284.744L647.996 284.922Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M347.135 253.381L344.937 254.034L343.987 255.935L342.62 257.004L341.551 258.43L341.017 261.162L339.947 263.419L341.67 263.657L342.026 265.379L342.739 266.27L342.917 267.755L342.502 269.181L342.561 270.013L343.393 270.31L344.105 271.616L348.442 271.26L350.402 271.735L352.659 275.062L354.025 274.646L356.461 274.824L358.361 274.408L359.549 275.062L358.837 277.081L358.064 278.388L357.708 281.12L358.361 283.675L359.252 284.803L359.371 285.635L357.649 287.536L358.837 288.367L359.728 289.733L360.678 293.535L360.025 294.01L359.431 291.753L358.48 290.506L357.352 291.872L350.818 291.753V294.129L352.778 294.545L352.659 296.03L352.006 295.614L350.105 296.208L350.045 299L351.59 300.425L352.124 302.564L352.065 304.227L350.758 314.681L349.036 312.662L348.026 312.602L350.105 308.682L347.491 306.9L345.472 307.256L344.224 306.603L342.383 307.613L339.888 307.078L337.809 303.098L336.265 302.148L335.195 300.307L332.938 298.525L332.047 298.881L330.622 297.99L328.958 296.743L328.008 297.337L325.157 296.802L324.325 295.139L323.672 295.198L320.345 293.06L319.93 291.872L321.177 291.575L321.058 289.674L321.89 288.248L323.553 288.011L325.038 285.635L326.345 283.615L325.157 282.724L325.87 280.526L325.216 277.022L325.988 276.012L325.573 272.804L324.266 270.725L324.8 268.884L325.87 269.181L326.523 268.052L325.87 265.795L326.285 265.261L328.008 265.379L330.681 262.706L332.107 262.291L332.166 261.043L332.998 257.776L335.017 256.054L337.096 255.935L337.453 255.163L340.066 255.46L342.799 253.559L344.165 252.727L345.887 250.886L347.075 251.123L347.848 252.133L347.135 253.381Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M305.674 256.588L306.387 258.667L307.575 260.211L309.06 261.815L307.753 262.171L307.694 263.716L308.347 264.25L307.813 264.726L307.932 265.379L307.575 266.151L307.397 266.923L305.615 266.092L304.962 265.26L305.377 264.607L305.318 263.775L304.427 262.884L303.12 262.112L302.051 261.637L301.873 260.508L301.041 259.855L301.16 260.924L300.447 261.874L299.734 260.805L298.725 260.389L298.309 259.677L298.368 258.489L298.903 257.301L298.012 256.766L298.843 255.994L299.378 255.519L301.516 256.528L302.289 256.053L303.358 256.35L303.833 257.122L304.843 257.419L305.674 256.588Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M323.61 211.504L324.738 212.87L327.827 212.454L328.896 213.345L331.391 215.721L333.292 217.444L334.361 217.385L336.262 218.157L335.906 219.226L338.282 219.404L340.598 220.949L340.123 221.84L337.866 222.315L335.609 222.493L333.411 222.196L328.599 222.552L331.094 220.473L329.847 219.464L327.708 219.226L326.699 218.097L326.223 215.959L324.323 216.078L321.353 215.068L320.462 214.236L316.244 213.642L315.175 212.93L316.541 211.979L313.334 211.801L310.72 213.761L309.354 213.821L308.76 214.771L307.097 215.187L305.73 214.771L307.631 213.642L308.522 212.217L310.126 211.385L311.908 210.672L314.462 210.316L315.294 209.841L318.086 210.138L320.699 210.197L323.61 211.504Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M629.462 104.286L630.947 105.474L633.145 105.771L633.026 106.781L634.689 107.553L635.045 106.603L637.065 107.018L637.481 108.206L639.679 108.385L641.223 110.226H640.332L639.916 110.879L639.263 111.058L639.144 111.889L638.609 112.067L638.55 112.424L637.6 112.78L636.293 112.721L635.936 113.552L634.511 112.84L633.145 113.018L630.769 111.889L629.759 112.186L628.214 113.731L625.957 112.483L624.175 110.939L622.631 110.048L622.215 108.444L621.621 107.375L623.641 106.603L624.65 105.652L626.729 104.939L627.383 104.227L628.155 104.642L629.462 104.286Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M626.017 94.6046L626.849 96.446L626.136 97.4558L627.265 98.7032L628.156 100.663L628.037 101.97L629.463 104.287L628.156 104.643L627.384 104.227L626.73 104.94L624.651 105.653L623.641 106.603L621.622 107.376L622.216 108.445L622.632 110.049L624.176 110.94L625.958 112.484L625.008 114.207L623.998 114.682L624.592 117.117L624.354 117.771L623.344 116.998L621.919 116.88L619.84 117.533L617.226 117.355L616.87 118.365L615.266 117.355L614.434 117.533L611.167 116.404L610.573 117.177H608.079L608.316 114.504L609.742 112.009L605.465 111.296L604.039 110.346L604.158 108.742L603.564 107.91L603.802 105.415L603.148 101.554H604.871L605.584 100.188L606.118 96.8618L605.584 95.6144L606.059 94.8422L608.435 94.664L609.029 95.4362L610.87 93.6542L610.098 92.288L609.861 90.2684L612.058 90.7436L613.781 90.209L613.959 91.5752L616.87 92.4068L616.929 93.7136L619.721 93.0008L621.265 92.0504L624.592 93.476L626.017 94.6046Z"
                    fill="#00587F"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M730.322 254.569L729.193 256.648L728.421 255.935L727.649 256.232L725.748 256.172L725.629 254.984L725.332 253.915L726.401 252.133L727.53 250.47L728.955 250.826L729.965 249.876L730.797 251.064L730.737 252.608L728.896 253.559L730.322 254.569Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M621.385 87.9517L619.959 90.8624L616.871 88.7834L616.336 87.2984L620.375 86.1104L621.385 87.9517Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M613.78 90.209L612.058 90.7436L609.86 90.2684L608.613 88.2488L608.375 84.6254L608.731 83.6156L609.504 82.5464L611.88 82.3682L612.83 81.3584L614.968 80.3486V82.19L614.256 83.378L614.671 84.3284L616.216 84.863L615.622 86.2292L614.79 85.8728L612.949 88.427L613.78 90.209Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M347.907 229.501L348.085 228.432L347.312 227.304L348.204 226.65L348.619 225.165L348.56 223.146L349.035 222.492H351.589L353.49 223.443L354.381 223.383L354.797 224.749L356.638 224.631L356.401 225.759L357.886 225.937L359.371 227.304L358.005 228.848L356.46 228.016L354.916 228.195L353.847 228.016L353.193 228.729L351.886 228.967L351.471 228.016L350.342 228.551L348.738 231.165L347.966 230.571L347.907 229.501Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M612.412 157.39L611.818 159.35L612.412 162.973L611.759 166.122L609.858 168.26L610.214 171.111L612.887 173.428L612.947 174.319L614.966 175.863L616.511 182.694L617.639 186.08L617.877 187.862L617.402 190.951L617.639 192.733L617.283 194.812L617.639 197.188L616.333 198.792L618.352 201.583L618.471 203.187L619.718 205.326L621.203 204.613L623.876 206.395L625.361 208.771L614.194 216.077L604.69 223.561L600.057 225.225L596.374 225.64L596.315 223.205L594.77 222.552L592.691 221.482L591.919 219.7L580.811 211.384L569.763 203.068L557.586 193.802L557.645 193.089L557.705 192.852L557.764 188.337L563.051 185.486L566.258 184.892L568.931 183.882L570.179 181.981L573.98 180.496L574.159 177.645L576 177.289L577.485 175.923L581.702 175.269L582.296 173.784L581.465 172.953L580.336 168.913L580.158 166.597L579.029 164.161L582.059 162.082L585.504 161.429L587.464 159.885L590.494 158.697L595.84 158.043L601.067 157.746L602.671 158.281L605.581 156.796L608.967 156.736L610.274 157.627L612.412 157.39Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M332.048 298.881L332.523 301.791L331.513 304.227L327.89 308.266L323.91 309.751L321.89 313.077L321.356 315.632L319.514 317.235L318.029 315.275L316.663 314.859L315.297 315.156L315.119 313.79L316.069 312.899L315.653 311.295L317.376 308.444L316.604 306.781L315.356 308.563L313.277 306.84L313.931 305.771L313.337 302.326L314.525 301.732L315.119 299.356L316.366 296.921L316.188 295.376L318.029 294.545L320.346 293.06L323.672 295.198L324.326 295.139L325.157 296.802L328.009 297.336L328.959 296.742L330.622 297.99L332.048 298.881Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M696.226 179.249L698.543 184.832L698.958 185.783L698.186 187.327L697.77 190.178L697.058 192.198L696.345 192.851L695.157 191.604L693.553 189.941L690.761 184.476L690.464 184.832L692.127 188.812L694.444 192.673L697.355 198.613L698.721 200.692L699.909 202.831L703.116 207.048L702.522 207.701L702.76 210.196L706.799 213.641L707.453 214.414H694.325H681.554H668.308L667.714 200.336L666.942 186.793L665.754 183.704L666.407 181.387L665.813 179.724L666.823 177.883L671.1 177.823L674.307 178.833L677.574 179.962L679.119 180.556L681.495 179.368L682.742 178.298L685.534 177.942L687.851 178.417L688.92 180.318L689.573 179.071L692.187 179.962L694.741 180.199L696.226 179.249Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M729.967 249.876L728.958 250.826L727.532 250.47L726.344 249.222L724.859 247.024L723.315 245.777L722.424 244.47L719.454 242.926L717.137 242.866L716.305 242.094L714.405 242.985L712.266 241.263L711.375 244.114L707.455 243.282L707.039 241.797L708.227 236.154L708.405 233.659L709.415 232.471L711.791 231.818L713.395 229.68L715.533 234.075L716.662 237.58L718.563 239.421L723.315 243.045L725.275 245.183L727.176 247.44L728.245 248.747L729.967 249.876Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M661.54 74.2301L662.074 74.8241L660.53 76.8437L661.955 80.1701L661.005 81.2987L658.748 81.2393L656.134 79.9325L654.887 79.5167L652.63 80.1107L652.57 78.0317L651.679 78.5069L649.719 77.2595L649.125 75.2399L652.392 74.2301L655.718 73.7549L658.748 74.2895L661.54 74.2301Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M717.135 242.867L719.452 242.926L722.422 244.47L723.313 245.777L724.857 247.025L726.342 249.222L727.53 250.47L726.402 252.133L725.332 253.915L725.629 254.984L725.748 256.172L727.649 256.232L728.421 255.935L729.193 256.647L728.481 257.954L729.787 260.093L731.094 261.934L732.401 263.3L743.509 267.814L746.36 267.755L737.094 279.219L732.757 279.397L729.787 282.07L727.649 282.13L726.758 283.377H724.441L723.075 282.07L719.986 283.674L719.036 285.278L716.779 284.922L716.007 284.506L715.234 284.625L714.165 284.565L709.888 281.358H707.512L706.384 280.11L706.324 277.972L704.602 277.318L702.523 273.16L700.978 272.269L700.384 270.725L698.602 268.884L696.523 268.587L697.652 266.448L699.434 266.33L699.909 265.201L699.79 262.231V261.756L700.681 257.776L702.226 256.707L702.523 255.162L703.889 252.192L705.849 250.351L707.037 246.549L707.453 243.282L711.373 244.114L712.264 241.263L714.403 242.985L716.304 242.094L717.135 242.867Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M655.834 41.8571L656.072 44.1143L660.408 46.3121L658.685 48.8069L662.546 52.5491L661.536 55.4003L664.447 57.8951L663.912 60.1523L668.308 62.4689L667.773 64.1915L665.754 66.2111L661.002 70.6067L656.25 70.9037L651.735 72.1511L647.518 72.9233L645.617 71.0225L642.825 69.8939L642.885 66.4487L641.103 63.3599L642.053 61.3403L644.013 59.2613L649.241 55.5785L650.785 54.8657L650.25 53.4401L646.389 51.8957L645.32 50.5889L644.251 45.5399L639.974 43.3421L636.41 41.7383L637.717 40.9067L640.746 42.5699L643.895 42.4511L646.686 43.2233L648.706 41.7977L649.359 39.4217L652.864 38.3525L656.309 39.5999L655.834 41.8571Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M629.938 289.674L629.701 291.337L630.651 293.298L633.146 293.001L633.977 293.713L632.492 298.168L634.096 300.426L634.453 303.396L634.037 305.95L633.027 307.732L630.057 307.554L628.216 305.712L627.978 307.435L625.721 307.91L624.533 308.86L625.78 311.355L623.226 313.494L619.781 309.633L617.583 306.484L615.504 302.564L615.623 301.257L616.395 300.069L617.167 297.277L617.88 294.426L619.009 294.248H623.879V289.674L625.483 289.437L627.503 289.912L629.522 289.437L629.938 289.674Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M568.279 94.1887L566.2 93.4759L564.418 93.5353L565.131 91.5751L564.596 89.6743L566.972 89.4961L569.883 91.7533L568.279 94.1887Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M577.726 77.1406L574.696 81.0016L577.488 80.5264H580.517L579.745 83.437L577.191 86.6446L580.102 86.8228L580.28 87.2386L582.775 91.456L584.675 92.05L586.398 96.208L587.23 97.6336L590.734 98.287L590.378 100.663L588.952 101.732L590.081 103.633L587.467 105.534L583.606 105.474L578.617 106.544L577.31 105.771L575.35 107.494L572.677 107.078L570.538 108.504L569.053 107.791L573.389 103.93L576.003 103.098L571.489 102.504L570.716 101.019L573.746 99.8908L572.261 97.9306L572.855 95.5546L577.072 95.911L577.547 93.7726L575.706 91.5748L575.647 91.5154L572.261 90.862L571.607 89.9116L572.677 88.3078L571.786 87.298L570.241 89.0206L570.182 85.516L568.875 83.734L570.004 80.0512L572.261 77.2L574.399 77.4376L577.726 77.1406Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M722.126 135.59L725.156 136.363L726.403 137.907L728.542 138.798L727.829 139.273L729.789 141.352L729.433 141.768L727.71 141.59L725.215 140.461L724.562 141.115L720.404 141.709L717.077 139.808L713.81 139.986L713.989 138.382L712.741 135.828L710.722 134.402L708.94 133.987L707.633 132.858L707.87 132.383L710.603 133.036L715.177 133.63L719.691 135.472L720.404 136.184L722.126 135.59Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M585.981 256.291L585.744 257.479L587.11 259.439V262.231L587.466 265.201L588.298 266.627L587.526 270.013L587.823 271.913L588.714 274.349L589.486 275.715L584.199 277.913L582.298 279.22L579.269 280.348L576.299 279.279L576.418 277.735L574.992 274.468L575.883 270.131L577.309 266.983L576.418 261.518L575.943 258.667L576.061 256.469L581.883 256.291L583.368 256.588L584.437 255.994L585.981 256.291Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M547.372 250.827L547.551 252.252H548.085L548.976 251.718L549.511 251.836L550.461 252.846L551.887 253.143L552.778 252.312L553.906 251.777L554.679 251.242L555.332 251.361L556.104 252.193L556.461 253.262L557.827 254.866L557.173 255.816L556.995 257.064L557.708 256.707L558.124 257.123L557.946 258.252L558.955 259.38L558.302 259.677L558.005 260.984L558.777 262.528L559.609 265.617L558.361 266.033L558.064 266.568L558.302 267.34L558.064 269.003H557.53L556.579 268.884L555.926 270.429H554.976L554.322 269.597L554.56 268.053L553.134 265.736L552.303 266.152L551.53 266.271L550.639 266.449L550.699 265.083L550.164 264.073L550.283 262.944L549.57 261.34L548.62 259.974H545.947L545.175 260.687L544.224 260.806L543.63 261.637L543.274 262.647L541.432 264.37L540.007 262.113L538.7 260.628L537.868 260.093L537.037 259.321L536.68 257.658L536.205 256.826L535.195 256.173L536.74 254.331L537.75 254.391L538.641 253.797L539.353 253.737L539.888 253.262L539.65 252.015L540.007 251.599L540.066 250.292L541.67 250.351L544.105 251.242L544.818 251.183L545.056 250.767L546.897 251.064L547.372 250.827Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M529.609 248.153L530.085 246.431L533.708 246.371L534.48 245.421L535.549 245.361L536.856 246.312H537.866L538.995 245.718L539.648 246.787L538.163 247.678L536.737 247.559L535.312 246.787L534.064 247.678H533.47L532.639 248.213L529.609 248.153Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M540.065 250.291L540.006 251.598L539.649 252.014L539.887 253.261L539.352 253.737L538.64 253.796L537.749 254.39L536.739 254.331L535.194 256.172L533.472 254.628L532.046 254.331L531.274 253.261L531.333 252.667L530.324 251.895L530.086 251.064L531.868 250.47L532.997 250.588L533.888 250.113L540.065 250.291Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M623.879 289.674V294.247H619.009L617.88 294.426L617.227 293.891L618.355 289.614L623.879 289.674Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M660.944 162.142L662.785 163.448L665.221 163.211L667.597 163.448V164.161L669.26 163.686L668.963 164.815L664.449 165.112L664.389 164.518L660.469 163.745L660.944 162.142Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M666.407 142.719L664.506 142.6L662.902 142.243L659.219 143.194L661.595 145.332L660.11 145.986H658.388L656.546 144.025L656.012 144.857L656.962 147.114L658.685 148.896L657.556 149.728L659.457 151.45L661.12 152.579L661.358 154.717L658.388 153.708L659.457 155.668L657.497 156.024L658.982 159.41L656.903 159.469L654.17 157.806L652.745 154.777L651.973 152.223L650.606 150.5L648.824 148.302L648.527 147.233L649.834 145.392L649.894 144.144L650.903 143.61L650.844 142.6L652.864 142.303L653.933 141.471L655.596 141.531L656.071 140.877L656.665 140.758L658.922 140.877L661.298 139.808L663.615 141.174L666.347 140.818L666.169 138.917L667.773 139.927L667.12 142.303L666.407 142.719Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M532.401 1.04912L544.222 2.83112L540.242 3.66272L532.52 3.78152L521.531 4.01912L522.363 4.43492L529.669 4.13792L535.431 4.96952L539.589 4.25672L541.014 5.08832L538.341 6.51392L543.806 5.56352L553.963 4.67252L559.903 5.14772L560.913 6.15752L552.122 7.88012L550.815 8.47412L544.044 8.94932L548.855 9.06812L545.944 10.9689L543.806 12.6915L543.093 15.7803L545.291 17.6811L541.786 17.7405L537.925 18.6909L541.668 20.2353L541.608 22.7301L539.113 23.0271L541.549 25.5813L536.381 25.8189L538.757 27.0069L537.807 28.0761L534.421 28.5513L531.154 28.6107L533.649 30.6303L533.352 32.0559L529.015 30.7491L527.59 31.5807L530.56 32.3529L533.292 34.2537L533.649 36.8079L529.253 37.4019L527.649 36.1545L525.154 34.3725L525.451 36.5109L522.244 38.1741L528.6 38.2929L531.867 38.4711L524.798 41.2629L517.551 43.8171L510.007 44.8863L507.275 44.9457L504.364 46.1931L499.909 49.6383L493.851 51.9549L492.069 52.1331L488.445 52.9053L484.525 53.7369L481.674 55.7565L480.842 58.1325L478.822 60.3897L473.714 63.1221L473.892 65.7951L471.754 68.6463L469.318 72.0321L465.457 72.2697L462.487 69.4185L457.141 69.3591L455.241 67.4583L454.765 64.1319L451.914 59.8551L451.498 57.6573L452.389 54.6279L450.192 51.5985L452.152 49.1631L451.023 47.9751L455.181 44.1735L459.458 42.9261L461.002 41.6193L462.666 39.1245L459.399 40.2531L457.854 40.7283L455.419 41.1441L452.924 40.1343L453.815 37.9365L455.597 36.2733L457.854 36.2139L462.369 37.1049L459.22 35.0853L457.617 34.0161L455.003 34.4319L453.459 33.6597L457.617 30.8085L456.844 29.6205L456.191 27.5415L455.359 24.3339L453.221 23.2053L454.053 21.9579L449.241 20.2353L444.667 19.9977L438.668 20.1165L433.025 20.3541L431.184 19.4037L428.926 17.5623L435.46 16.6713L439.975 16.5525L431.302 15.7803L427.441 14.6517L428.748 13.5825L438.074 12.2757L446.984 10.9689L448.647 10.0185L443.836 9.06812L446.568 8.05832L455.3 6.33572L458.508 6.09812L458.626 5.02892L463.972 4.37552L470.506 4.01912H476.684L478.347 4.73192L484.644 3.42512L488.861 4.31612L491.593 4.49432L495.276 5.26652L491.296 4.01912L492.247 3.00932L499.791 1.70252L506.681 1.82132L509.71 0.989723L516.779 0.811523L532.401 1.04912Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M289.933 230.392L289.517 233.422L288.745 237.699H289.755L290.765 238.411L291.121 237.817L292.012 238.293L290.349 239.778L288.626 240.847L288.329 241.56L288.507 242.332L287.735 243.282L286.904 243.52L287.082 243.995L286.369 244.411L285.181 245.361L285.003 245.896L283.34 245.242L281.261 245.183L279.835 244.411L278.172 242.866L278.409 241.738L278.885 240.847L278.469 240.134L280.429 237.045H284.706L284.943 235.738L284.468 235.501L284.171 234.669L283.043 233.778L281.973 232.531L283.458 232.471L283.755 230.333H286.844L289.933 230.392Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M393.761 275.536L393.167 278.981L391.088 279.932L391.266 280.823L390.613 282.842L392.038 285.575H393.107L393.523 287.713L395.483 291.04L394.711 291.218L392.81 290.861L391.741 291.871L390.197 292.525L389.128 292.703L388.771 293.475L387.108 293.297L385.029 291.515L384.851 289.733L384.019 287.773L384.613 284.565L385.564 283.199L384.851 281.417L383.663 280.882L384.138 279.16L383.425 278.328L381.643 278.447L379.445 275.596L380.396 274.526V272.744L382.475 272.15L383.306 271.438L382.237 270.012L382.534 268.646L385.326 266.389L387.464 267.814L389.425 270.25L389.484 272.269L390.731 272.329L392.513 274.17L393.761 275.536Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M308.643 241.085L307.515 241.025L306.98 241.56L305.792 242.035H304.96L304.188 242.51L303.535 242.392L303 241.798L302.644 241.916L302.109 242.807L301.812 242.748L301.693 243.58L300.446 244.589L299.733 245.065L299.377 245.54L298.486 244.768L297.654 245.777H296.941L296.169 245.837L296.05 247.738H295.575L295.1 248.629L294.031 248.807L293.556 247.619L292.546 247.262L292.962 245.718L292.546 245.302L291.833 245.065L290.348 245.48L290.289 245.005L289.338 244.352L288.685 243.639L287.734 243.283L288.507 242.332L288.328 241.56L288.625 240.847L290.348 239.778L292.011 238.293L292.368 238.471L293.14 237.818L294.09 237.758L294.387 238.055L294.922 237.877L296.466 238.234L298.011 238.115L299.08 237.699L299.555 237.283L300.565 237.461L301.337 237.699L302.228 237.64L302.941 237.283L304.426 237.818L304.901 237.937L305.851 238.649L306.742 239.481L307.871 240.075L308.643 241.085Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M642.411 123.532L643.302 125.017L644.312 126.086L643.302 127.512L641.877 126.68L639.798 126.739L637.125 126.086L635.758 126.145L635.164 126.977L633.976 126.086L633.501 127.63L635.105 129.412L635.877 130.541L637.362 131.967L638.61 132.798L639.857 134.402L642.708 135.828L642.411 136.422L639.441 135.055L637.54 133.689L634.689 132.561L631.897 129.828L632.491 129.531L631.006 127.927L630.828 126.68L628.868 126.086L628.036 127.69L627.086 126.442V125.136L627.145 125.076L629.284 125.195L629.759 124.601L630.828 125.195L632.016 125.254L631.957 124.245L632.967 123.829L633.145 122.344L635.461 121.334L636.412 121.809L638.788 123.413L641.342 124.126L642.411 123.532Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M348.561 223.146L348.621 225.166L348.205 226.651L347.314 227.304L348.086 228.433L347.908 229.502L345.769 228.849L344.166 229.086L342.146 228.849L340.542 229.561L338.879 228.373L339.295 227.126L342.324 227.661L344.76 227.958L346.066 227.126L344.7 225.463L344.938 223.978L342.859 223.384L343.75 222.374L345.769 222.493L348.561 223.146Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M651.143 114.206L652.925 115.216L653.222 116.225L651.499 116.998L650.371 119.492L648.826 122.047L646.51 122.759L644.609 122.581L642.411 123.532L641.342 124.126L638.788 123.413L636.412 121.809L635.461 121.334L634.749 120.086L634.273 120.027L635.046 117.651L634.392 116.819H636.055L636.174 115.275L637.778 116.285L638.907 116.641L641.342 116.225L641.52 115.453L642.649 115.334L644.015 114.8L644.371 115.037L645.738 114.562L646.332 113.671L647.282 113.434L650.549 114.562L651.143 114.206Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M990.495 337.372L989.069 337.432L984.852 334.759L988.059 333.986L989.722 335.174L990.792 336.303L990.495 337.372Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1005.23 332.204L1005.52 332.976L1005.46 334.105L1003.03 336.956L1000.06 337.788L999.703 337.372L1000.12 336.065L1001.78 333.748L1005.23 332.204Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M981.705 329.175L982.833 330.185L984.972 329.888L985.685 331.491L981.705 332.264L979.388 332.798L977.547 332.739L978.854 330.541H980.754L981.705 329.175Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M998.514 329.175L997.86 331.313L992.752 332.382L988.297 331.907L988.416 330.482L991.148 329.709L993.168 330.838L995.425 330.541L998.514 329.175Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M950.875 324.126L957.29 324.542L958.122 322.938L964.24 324.78L965.309 327.274L970.299 327.987L974.278 330.244L970.358 331.67L966.735 330.126L963.705 330.244L960.26 329.947L957.171 329.294L953.37 327.809L950.934 327.453L949.509 327.928L943.45 326.324L942.975 324.72L939.945 324.423L942.44 320.8L946.479 321.037L949.093 322.522L950.518 322.819L950.875 324.126Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1038.73 321.988L1036.83 324.601L1036.71 321.75L1037.36 320.384L1038.13 319.077L1038.85 320.206L1038.73 321.988Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1014.13 311.474L1012.83 312.781L1010.57 312.068L1009.98 310.405L1013.36 310.227L1014.13 311.474Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1025.07 310.108L1026.14 313.019L1023.4 311.415L1020.61 311.118L1018.65 311.355L1016.34 311.237L1017.23 309.158L1021.38 308.979L1025.07 310.108Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1060.59 308.207L1059.99 320.622L1059.04 333.096L1056.31 329.947L1052.98 329.175L1052.09 330.244L1047.81 330.363L1049.48 327.274L1051.68 326.205L1051.08 322.047L1049.72 318.899L1043.36 315.632L1040.63 315.335L1035.7 311.771L1034.63 313.672L1033.32 313.969L1032.67 312.603L1032.73 310.939L1030.23 309.039L1033.92 307.672L1036.29 307.732L1036.05 306.722H1031.12L1029.82 304.465L1026.85 303.752L1025.48 301.851L1029.99 300.96L1031.72 299.713L1037.12 301.257L1037.66 302.683L1038.43 308.86L1041.82 311.118L1044.79 307.078L1048.71 304.821H1051.68L1054.53 306.128L1056.96 307.494L1060.59 308.207Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1007.66 292.881L1004.99 296.683L1002.43 297.396L999.227 296.683L993.584 296.861L990.673 297.396L990.198 300.306L993.168 303.692L995.009 301.97L1001.31 300.663L1001.01 302.385L999.524 301.851L998.039 304.108L995.009 305.593L998.039 310.464L997.385 311.771L1000.24 316.166L1000.06 318.661L998.217 319.79L996.97 318.423L998.752 315.335L995.366 316.82L994.594 315.75L995.069 314.265L992.752 312.008L993.168 308.325L990.851 309.454L990.97 313.909L990.851 319.374L988.654 319.908L987.287 318.839L988.416 315.335L988.06 311.652L986.634 311.592L985.684 308.979L987.169 306.484L987.703 303.455L989.485 297.693L990.139 296.148L992.99 293.297L995.663 294.426L999.88 294.96L1003.74 294.782L1007.07 292.05L1007.66 292.881Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1019.3 294.01L1019.13 297.336L1017.4 296.921L1016.87 299.237L1018.24 301.257L1017.29 301.732L1015.98 299.297L1014.97 294.426L1015.56 291.396L1016.63 290.03L1016.93 292.109L1018.95 292.406L1019.3 294.01Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M955.153 290.624L955.747 293.179L958.063 295.376L960.261 294.604L962.399 294.842L964.36 292.941L965.963 292.585L969.171 293.654L971.903 292.822L973.448 287.536L974.695 286.229L975.705 281.893H979.566L982.536 282.546L980.754 285.991L983.368 289.555L982.833 291.337L986.635 294.842L982.655 295.317L981.586 297.931L981.704 301.376L978.437 303.989L978.2 307.791L976.715 313.612L976.299 312.246L972.379 313.969L971.131 311.652L968.755 311.414L967.092 310.167L963.053 311.593L961.924 309.692L959.667 309.929L956.935 309.514L956.578 304.405L954.915 303.336L953.311 300.069L952.836 296.743L953.192 293.179L955.153 290.624Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M941.608 320.621L937.925 320.681L935.252 317.532L931.035 314.384L929.668 312.068L927.233 308.979L925.629 306.128L923.134 300.782L920.224 297.574L919.214 294.307L917.907 291.337L914.818 288.961L912.977 285.694L910.363 283.556L906.681 279.338L906.324 277.378L908.463 277.556L913.749 278.269L916.838 282.011L919.57 284.625L921.471 286.169L924.738 290.268L928.183 290.327L931.035 292.941L933.054 296.148L935.608 297.93L934.242 301.019L936.202 302.326L937.39 302.445L937.925 305.118L939.054 307.197L941.489 307.553L943.033 309.989L942.024 314.741L941.608 320.621Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M847.993 183.169L846.33 184.951L845.796 188.515L849.241 189.941L852.686 191.782L857.319 193.921L861.893 194.455L864.15 196.356L866.704 196.713L870.803 197.604L873.535 197.544L873.595 196.059L872.704 193.624L872.585 192.02L874.426 191.188L875.317 194.218L875.555 194.931L878.822 196.416L880.723 195.822L883.515 196.059L886.188 195.94L885.891 193.624L884.346 192.376L886.841 191.901L889.158 189.05L892.365 186.674L895.276 187.565L897.177 185.961L899.315 188.337L898.602 189.941L902.226 190.535L902.82 191.961L901.81 192.673L902.641 194.99L900.147 194.337L896.464 196.95L896.998 199.148L895.81 202.356L895.989 204.197L895.038 207.345L892.306 206.454L892.84 210.434L892.246 211.741L892.84 213.345L891.355 214.236L888.742 208.177H887.851L887.673 210.672L885.534 208.652L886.247 206.514L887.673 206.276L888.623 203.068L886.603 202.415L883.574 202.474L880.366 201.94L879.654 199.267L878.05 199.089L875.139 197.425L874.426 200.039L877.159 202.059L875.377 203.484L874.842 204.85L877.04 205.86L876.862 208.177L878.406 211.028L879.357 214.176L879.06 215.602L876.802 215.542L872.882 216.315L873.417 219.166L871.991 221.423L867.536 224.037L864.388 228.492L862.131 230.927L859.161 233.422L859.339 235.144L857.794 236.095L854.943 237.461L853.399 237.639L852.686 240.55L853.815 245.539L854.23 248.688L853.102 252.311L853.518 258.786L851.795 258.964L850.429 261.874L851.557 263.181L848.528 264.25L847.518 266.805L846.211 267.933L842.885 264.369L841.044 259.023L839.559 255.162L838.252 253.38L836.232 249.697L835.044 244.945L834.213 242.569L830.708 237.342L828.629 229.917L827.085 225.046L826.609 220.413L825.6 216.849L821.026 219.166L818.65 218.691L813.838 214.057L815.264 212.691L814.135 211.206L809.918 207.939L811.819 205.385H819.006L817.937 202.118L815.858 200.217L815.026 197.247L812.65 195.584L815.561 191.545L819.422 191.842L822.095 187.862L823.402 184.001L825.718 180.14L825.124 177.408L827.382 175.21L824.352 173.368L822.63 170.755L820.669 167.428L821.857 165.765L826.906 166.716L830.292 166.122L832.549 162.914L837.123 167.428L837.598 170.517L839.38 172.477L839.737 174.438L837.301 173.903L839.202 178.12L842.885 180.496L847.993 183.169Z"
                    fill="#00587F"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M568.28 94.1882L568.696 96.8018L566.38 100.069L561.152 102.207L557.113 101.673L559.667 97.871L558.42 94.1882L562.4 91.337L564.598 89.6738L565.132 91.5746L564.419 93.5348L566.201 93.4754L568.28 94.1882Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M730.026 150.618L731.096 150.499L734.244 147.708L735.372 147.411L736.501 148.539L735.788 150.381L738.105 152.4L738.877 152.163L740.362 155.014L743.51 155.786L746.064 157.687L750.638 158.34L755.39 157.33L755.509 156.439L758.123 155.727L759.905 153.529L762.043 153.648L763.231 152.935L765.548 153.291L769.468 155.251L772.022 155.667L776.358 158.994L778.734 159.172L779.744 162.32L779.388 167.072L779.091 169.864L780.576 170.458L779.625 172.537L781.229 175.566L781.942 178.002L784.496 178.655L785.15 181.09L782.833 184.536L784.734 186.555L786.397 188.872L789.783 190.535L790.377 193.861L791.981 194.515L792.515 196.237L788.06 198.257L787.407 202.653L781.11 201.524L777.428 200.633L773.685 200.158L771.725 195.465L770.062 194.812L767.627 195.465L764.597 197.307L760.439 196.059L756.816 193.089L753.549 192.02L750.935 188.397L747.846 183.348L746.183 183.942L743.985 182.694L742.976 184.179L740.897 182.16L740.6 180.14H739.59L739.709 177.348L737.63 174.497L733.412 172.359L730.68 168.735L730.977 165.765L732.343 164.458L731.808 162.261L729.551 161.073L726.759 156.558L724.502 153.529L724.918 152.341L723.195 148.005L725.156 146.876L725.868 148.361L727.769 150.084L730.026 150.618Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M726.757 156.558L729.549 161.073L731.806 162.261L732.341 164.458L730.975 165.765L730.678 168.735L733.41 172.359L737.627 174.497L739.706 177.348L739.588 180.14H740.597L740.894 182.16L742.973 184.179L741.013 184.001L738.815 183.645L736.855 187.327L730.796 187.03L720.817 179.368L715.709 176.695L711.67 175.626L709.828 170.992L716.362 167.013L716.956 162.439L716.243 159.647L717.847 158.697L719.095 156.321L720.342 155.727L724.084 156.261L725.332 157.212L726.757 156.558Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M549.332 50.4105L548.5 52.5489L551.114 54.8061L547.49 57.3603L539.709 59.6769L537.392 60.3303L534.066 59.7957L526.997 58.7265L529.849 57.2415L524.503 55.6377L529.195 54.9843L529.255 53.9745L524.027 53.2023L526.166 51.0045L530.086 50.5293L533.65 52.7865L537.808 51.0045L540.838 51.8955L545.174 50.1729L549.332 50.4105Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M700.385 171.408L700.622 172.953L700.266 173.547H700.325L699.909 174.735L698.662 174.259L698.246 176.754L699.137 177.17L698.365 177.705L698.306 178.714L699.791 178.239L700.028 179.724L698.959 185.783L698.543 184.833L696.227 179.249L697.058 178.002L696.821 177.764L697.474 175.982L697.83 173.131L698.187 172.121H698.246H699.315L699.553 171.468L700.385 171.408Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M634.513 152.52L633.503 155.549L634.037 156.678L633.503 158.638L631.008 157.212L629.404 156.796L624.949 154.896L625.246 152.935L628.929 153.292L632.137 152.876L634.513 152.52Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M614.313 141.233L616.273 143.906L616.036 148.955L614.61 148.718L613.363 149.965L612.175 148.955L611.878 144.382L611.105 142.243L612.828 142.421L614.313 141.233Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M627.207 121.334L626.969 123.176L627.801 124.78L625.365 124.186L623.049 125.552L623.286 127.393L622.989 128.462L624.118 130.363L627.088 132.264L628.81 135.412L632.434 138.442L634.81 138.382L635.641 139.214L634.81 139.986L637.661 141.352L640.037 142.481L642.829 144.5L643.185 145.154L642.71 146.52L640.869 144.738L638.136 144.144L637.008 146.579L639.324 148.005L639.087 149.965L637.839 150.203L636.354 153.47L635.047 153.767L634.988 152.579L635.523 150.559L636.176 149.728L634.81 147.53L633.741 145.629L632.434 145.154L631.365 143.55L629.345 142.837L627.919 141.293L625.662 141.055L623.108 139.392L620.197 136.897L618 134.759L616.871 131.017L615.327 130.601L612.832 129.353L611.466 129.829L609.743 131.611L608.496 131.848L608.793 130.244L607.129 129.769L606.238 126.859L607.248 125.73L606.357 124.304L606.417 123.235L607.723 124.067L609.208 123.889L610.812 122.582L611.347 123.176L612.772 123.057L613.366 121.572L615.624 122.047L616.871 121.394L617.049 119.909L618.891 120.443L619.188 119.731L622.098 119.077L622.87 120.325L627.207 121.334Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M330.562 230.155L329.493 230.808L327.711 230.155L325.988 228.789L326.463 227.898L327.889 227.66L328.661 227.779L330.859 228.135L332.463 229.026L332.938 230.096L330.562 230.155Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M711.673 175.626L711.138 176.22L704.96 178.121L708.524 181.982L707.574 182.576L707.158 183.883L704.723 184.418L704.069 185.784L702.822 186.972L699.139 186.318L698.961 185.784L700.03 179.725L699.793 178.24L700.149 177.111L699.911 174.735L700.327 173.547L704.069 175.092L709.831 170.993L711.673 175.626Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1014.85 168.083L1015.8 169.389L1015.03 171.706L1013.19 170.459L1011.94 171.35L1012 173.547L1009.44 172.478L1008.73 170.696L1009.5 168.38L1011.52 168.855L1012.12 167.251L1014.85 168.083Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1029.46 156.677L1029.82 159.707L1031.3 161.608L1030.95 164.281L1027.74 166.063L1022.27 166.3L1019.66 170.696L1016.87 169.211L1015.44 166.36L1010.33 167.191L1007.3 168.973L1003.62 169.092L1008.02 171.884L1008.49 178.358L1007.01 179.962L1004.87 178.477L1004.33 175.032L1001.9 173.963L999.523 171.349L1002.08 170.161L1002.73 167.726L1005.05 165.766L1006.24 163.152L1012 162.023L1015.74 162.796V156.024L1018.77 157.865L1021.44 154.064L1022.45 152.579L1021.86 147.946L1018.83 143.669L1018.71 141.293L1021.56 140.58L1026.43 145.867L1028.09 148.896L1027.32 152.757L1029.46 156.677Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1022.39 130.066L1025.07 130.838L1026.14 129.294L1029.7 133.511L1025.9 134.521L1025.66 138.263L1019.19 135.709L1020.14 139.808L1016.75 139.867L1013.96 136.125L1013.6 133.214L1016.69 133.036L1014.08 127.809L1013.01 124.898L1019.24 128.819L1022.39 130.066Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M794.951 95.5546L797.565 95.3764L803.03 91.9312L802.554 93.1192L807.544 95.911L818.414 105.177L819.068 103.277L824.057 105.356L827.74 104.405L829.7 105.059L832.136 107.197L834.512 107.91L836.472 109.514L840.036 108.979L842.649 111.236L841.521 113.731L839.264 114.087L840.749 117.77L839.798 119.493L833.383 118.245L833.977 124.958L832.789 125.789L827.384 127.274L832.611 133.808L830.888 134.759L831.898 136.956L829.819 136.362L827.799 134.996L823.107 134.64L817.998 134.521L817.048 134.937L812.177 133.333L810.692 134.165L810.989 136.362L805.524 135.056L803.683 135.59L803.505 137.253L801.96 137.966L798.753 140.58L798.218 143.312H797.03L795.664 141.53L791.684 141.411L790.199 138.323L788.655 138.263L787.764 134.462L783.249 131.729L778.141 132.026L774.755 132.561L770.835 129.175L767.984 127.749L762.519 125.076L761.865 124.779L754.737 126.977L758.42 140.877L756.876 141.055L754.025 138.085L751.708 137.016L748.382 137.788L747.312 139.095L746.956 138.144L747.312 136.6L746.421 135.293L742.56 133.986L740.363 130.601L738.462 129.65L738.105 128.403L741.135 128.759L740.541 126.027L742.976 125.433L745.768 125.967L745.352 122.344L744.224 120.027L741.254 120.206L738.462 119.315L735.432 120.918L732.819 121.75L731.156 121.097L731.037 119.196L728.483 116.701L726.344 116.82L723.196 114.325L724.206 111.474L723.137 110.761L724.443 106.662L728.007 108.801L727.651 106.128L732.462 102.148L736.977 102.029L744.105 104.583L748.025 106.068L750.639 104.524L755.213 104.465L759.549 106.365L760.024 105.237L764.182 105.415L764.301 103.692L758.717 101.138L760.796 99.3562L759.905 98.4058L762.281 97.4554L759.252 94.9606L760.083 93.7132L770.181 92.4658L771.191 91.5748L777.666 90.2086L779.507 88.7236L784.913 89.4958L787.526 93.238L790.08 92.347L794.298 93.5944L794.951 95.5546Z"
                    fill="#00587F"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M726.757 283.377L723.847 287.654L723.966 301.554L725.926 304.702L723.55 306.246L722.718 307.85L721.411 308.088L720.936 310.82L719.808 312.364L719.154 314.859L717.788 316.107L712.977 312.305L712.798 310.107L700.621 302.326L700.859 299.534L700.027 298.049V297.871L700.978 296.326L702.641 293.832L703.888 291.04L702.344 286.644L701.928 284.743L700.324 282.07L702.344 279.813L704.601 277.318L706.324 277.972L706.383 280.11L707.512 281.358H709.888L714.165 284.565L715.234 284.625L716.006 284.506L716.778 284.922L719.035 285.278L719.986 283.674L723.075 282.07L724.441 283.377H726.757Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M831.899 136.956L831.78 137.788L827.681 139.808L827.087 141.352L823.286 141.768L822.929 144.203L819.484 143.669L817.583 144.441L815.148 146.223L815.861 147.114L815.207 147.945L809.505 148.539L805.287 147.292L802.02 147.589L801.664 145.451L805.228 146.045L806.06 144.916L808.495 145.272L811.643 142.54L807.366 140.52L805.466 141.471L802.733 140.045L804.515 137.61L803.505 137.253L803.684 135.59L805.525 135.056L810.99 136.362L810.693 134.165L812.178 133.333L817.049 134.937L817.999 134.521L823.107 134.64L827.8 134.996L829.82 136.362L831.899 136.956Z"
                    fill="#00587F"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M944.341 244.114L945.411 246.668L945.47 251.242L940.124 254.212L941.787 256.469L938.283 256.766L935.55 258.311L932.699 257.776L931.155 255.757L929.076 251.836L927.828 247.203L929.67 244.055L933.887 243.342L937.035 243.877L940.005 245.362L941.193 242.748L944.341 244.114Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M981.824 154.361V154.004L983.309 154.123L983.666 152.46L985.804 152.222L986.992 151.985V151.094L991.922 155.549L993.882 158.044L995.902 162.439L995.605 164.518L993.051 165.231L991.209 166.835L988.477 167.132L987.23 165.053L986.576 162.202L983.428 158.281L985.448 157.628L981.824 154.361Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M741.013 184.001L741.904 185.664L741.726 186.555L743.152 189.406L740.835 189.525L739.825 187.684L736.855 187.327L738.816 183.645L741.013 184.001Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M944.342 244.114L941.194 242.748L940.006 245.361L937.036 243.876L937.927 242.154L937.689 238.946L934.541 235.62L933.769 231.818L930.799 228.729L928.245 228.492L927.769 229.798L925.869 229.917L924.74 229.264L921.592 231.521L920.998 228.076L921.235 224.096L918.978 223.918L918.444 221.601L916.84 220.413L917.315 219.047L919.75 216.552L920.226 217.443L922.008 217.562L920.82 213.166L922.423 212.632L924.799 215.661L926.878 219.106H930.918L932.7 222.433L930.739 223.443L930.027 224.809L934.363 227.125L937.749 231.64L940.362 234.966L943.273 237.639L944.461 240.312L944.342 244.114Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M700.384 171.409L699.553 171.468L699.315 172.122H698.246L699.018 168.973L700.325 166.3V166.182L701.81 166.36L702.523 167.845L700.919 169.33L700.384 171.409Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M557.528 269.002L557.409 270.072L557.706 271.913L556.993 273.636L557.943 274.705L559.013 274.942L560.438 276.546L560.557 278.031L560.201 278.506L559.963 281.655L559.072 281.714L555.627 279.873L552.538 276.962L549.687 274.883L547.43 272.448L548.261 271.2L548.439 270.072L549.984 268.052L551.528 266.27L552.3 266.151L553.132 265.735L554.558 268.052L554.32 269.596L554.973 270.428H555.924L556.577 268.884L557.528 269.002Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M666.826 177.883L665.816 179.725L666.41 181.388L665.757 183.705L666.945 186.793L667.717 200.337L668.311 214.414L668.608 222.018H664.806V223.621L651.382 216.315L638.017 209.009L634.75 211.088L632.493 212.514L630.592 210.435L625.365 208.771L623.88 206.395L621.207 204.613L619.722 205.326L618.474 203.188L618.356 201.584L616.336 198.792L617.643 197.188L617.286 194.812L617.643 192.733L617.405 190.951L617.88 187.863L617.643 186.081L616.514 182.695L618.059 181.863L618.296 180.2L617.94 178.656L620.078 177.171L621.029 175.923L622.573 174.854L622.632 171.943L626.434 173.25L627.8 172.894L630.473 173.547L634.809 175.27L636.473 178.656L639.383 179.368L644.016 180.972L647.58 182.873L649.065 181.863L650.55 180.141L649.6 177.23L650.491 175.329L652.689 173.547L654.887 173.072L659.282 173.844L660.47 175.507L661.658 175.567L662.727 176.22L665.935 176.636L666.826 177.883Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M858.866 274.646L856.015 275.537L854.292 272.508L853.461 267.043L854.649 260.865L857.084 262.944L858.747 265.617L860.589 269.597L860.232 273.577L858.866 274.646Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M676.624 414.77L675.436 415.186L673.238 412.216L675.139 409.84L676.98 408.355L678.584 407.523L679.891 408.711L680.901 409.899L679.772 411.741L679.119 412.988L677.277 413.582L676.624 414.77Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M659.994 87.8917L660.588 89.4955L658.45 90.6835L658.153 92.7031L655.301 94.0693H652.51L651.678 92.9407L650.193 92.5249L649.837 91.6339L649.955 90.6241L648.649 90.0895L645.619 89.4361L644.609 86.4067L647.639 85.3375L652.331 85.5751L655.004 85.2188L655.539 85.9315L657.024 86.1691L659.994 87.8917Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M604.04 110.346L603.208 110.405L602.555 110.108L602.792 108.029L603.564 107.91L604.158 108.742L604.04 110.346Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M661.004 81.2986L662.489 82.0708L663.083 83.7934L664.33 85.9318L661.598 87.298L659.994 87.892L657.024 86.1694L655.539 85.9318L655.005 85.219L652.332 85.5754L647.639 85.3378L644.61 86.407L644.312 83.734L645.322 81.4768L647.758 80.2888L650.371 82.9618L652.569 82.843L652.629 80.1106L654.886 79.5166L656.133 79.9324L658.747 81.2392L661.004 81.2986Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M579.032 164.161L580.161 166.597L580.339 168.913L581.468 172.953L582.299 173.784L581.705 175.269L577.488 175.923L576.003 177.289L574.162 177.645L573.983 180.496L570.182 181.981L568.934 183.882L566.261 184.892L563.054 185.486L557.767 188.337L557.708 192.852H557.173L557.233 194.871L555.213 194.99L554.144 195.881H552.659L551.471 195.346L548.738 195.762L547.61 198.732L546.541 199.029L544.937 203.841L540.244 207.939L539.056 213.226L537.631 214.948L537.215 216.315L529.79 216.612H529.73L529.909 214.83L531.215 213.82L532.344 211.8L532.166 210.493L533.354 207.82L535.255 205.385L536.383 204.791L537.334 202.593L537.452 200.514L538.7 198.198L540.957 196.772L543.095 192.911L543.155 192.852L544.877 191.367L547.907 190.951L550.52 188.337L552.184 187.327L554.975 184.12L554.263 179.427L555.569 176.101L556.104 174.081L558.242 171.527L561.45 169.804L563.885 168.201L566.083 164.28L567.152 161.904L569.469 161.964L571.31 163.567L574.34 163.33L577.607 164.161H579.032Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M670.862 125.136L670.09 123.414L670.209 121.81L669.852 120.206L667.833 117.949L666.645 116.404L665.575 115.335L664.625 114.919L665.278 114.385L667.179 114.028L669.555 115.157L670.743 115.335L672.288 116.345L672.228 117.592L673.416 118.186L674.07 119.731L675.258 120.681L675.139 121.275L675.733 121.632L674.961 121.929L673.179 121.81L672.822 121.275L672.228 121.572L672.585 122.226L671.931 123.473L671.575 124.72L670.862 125.136Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M753.131 350.024L753.369 354.598L754.141 356.38L753.725 358.222L753.013 359.291L752.062 357.093L751.349 358.222L751.825 361.013L751.409 362.677L750.399 363.508L749.983 366.775L748.379 371.23L746.36 376.457L743.806 383.704L742.083 388.991L740.242 393.446L737.509 394.337L734.48 395.941L732.698 394.99L730.203 393.624L729.49 391.604V388.219L728.599 385.189L728.48 382.397L729.253 379.665L730.797 379.012L730.916 377.764L732.638 374.854L733.114 372.418L732.46 370.636L731.985 368.201L731.926 364.696L733.232 362.558L733.826 360.122L735.49 360.004L737.39 359.231L738.697 358.519L740.123 358.459L742.142 356.321L745.053 353.945L746.122 352.044L745.766 350.381L747.191 350.856L749.152 348.242L749.33 345.926L750.518 344.203L751.587 345.866L752.419 347.47L753.131 350.024Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M266.883 199.742L268.19 199.623L266.289 203.009L265.22 205.741L264.151 210.85L263.497 212.691L263.735 214.77L264.507 216.671L264.745 219.582L266.527 222.433L267.002 224.631L268.012 226.472L271.398 227.482L272.526 229.086L275.615 228.016L278.169 227.66L280.783 226.947L282.921 226.294L285.238 224.749L286.307 222.552L287.02 219.344L287.733 218.215L290.109 217.206L293.732 216.315L296.643 216.493L298.662 216.136L299.375 216.968L299.019 218.809L296.94 221.067L295.87 223.383L296.405 224.037L295.692 225.7L294.445 228.67L293.732 227.66L293.079 227.719L292.425 227.779L290.94 230.095L290.406 229.62L289.99 229.798L289.93 230.392L286.842 230.333H283.753L283.456 232.471L281.971 232.531L283.04 233.778L284.169 234.669L284.466 235.501L284.941 235.738L284.703 237.045H280.426L278.466 240.134L278.882 240.847L278.407 241.738L278.169 242.866L274.843 238.768L273.298 237.52L270.685 236.511L268.784 236.808L265.933 238.233L264.21 238.59L262.012 237.58L259.577 236.867L256.726 235.144L254.29 234.61L250.786 232.828L248.232 230.986L247.578 229.977L245.737 229.739L242.529 228.551L241.401 226.828L238.193 224.631L236.886 222.255L236.411 220.354L237.54 219.997L237.361 218.928L238.312 217.918L238.549 216.612L237.658 214.889V213.404L236.886 211.444L234.629 207.642L231.897 204.672L230.768 202.296L228.333 200.752L227.917 199.801L228.927 197.485L227.501 196.594L226.016 194.693L225.897 192.079L224.234 191.723L222.868 189.763L221.858 187.862L222.036 186.674L221.145 183.823L220.967 180.912L221.442 179.427L219.601 177.883L218.472 178.061L217.047 177.051L215.977 178.596L215.918 180.378L215.324 183.288L215.918 184.833L217.581 187.446L217.819 188.397L218.235 188.634L218.294 189.941L218.888 189.882V192.376L219.66 193.327L219.957 194.693L221.561 196.594L221.799 200.158L222.393 201.821L222.927 203.603L222.749 205.623L224.293 205.741L225.244 207.464L226.135 209.187L225.957 209.899L224.293 211.266H223.699L223.284 208.949L221.561 206.751L219.541 204.91L218.056 203.959L218.769 201.168L218.71 199.089L217.462 197.901L215.621 196.237L215.086 196.713L214.492 195.703L212.71 194.812L211.404 192.555L211.701 192.317L212.948 192.495L214.552 191.07L215.146 189.347L213.423 186.615L211.879 185.605L211.404 183.229L211.047 180.675L210.572 177.645L210.453 174.2L214.195 173.903L218.413 173.487L217.878 174.259L222.036 176.101L228.511 178.774H234.926H237.48L237.955 177.17H243.539L244.311 178.536L245.559 179.784L246.984 181.447L247.459 183.407L247.697 185.545L249.063 186.674L251.439 187.803L254.29 184.833L256.963 184.714L258.864 186.258L259.815 188.872L260.349 191.129L261.775 193.267L261.894 195.94L262.428 197.722L264.745 198.91L266.883 199.742Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M656.668 140.758L656.074 140.877L655.599 141.53L653.936 141.471L652.866 142.302L650.847 142.599L649.481 141.708L648.887 140.104L649.184 138.798L649.599 138.857L649.659 138.085L651.381 137.491L652.094 137.313L653.104 137.134L654.53 137.016L656.193 138.263L656.668 140.758Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M600.06 225.225L600.119 234.016L598.278 236.57L598.04 238.946L595.07 239.54L590.496 239.837L589.308 241.203L587.17 241.381H585.032L584.2 240.669L582.359 241.203L579.21 242.807L578.557 243.995L576.003 245.658L575.528 246.668L574.102 247.44L572.498 246.906L571.607 247.856L571.073 250.47L568.4 253.618L568.518 254.925L567.568 256.528L567.806 258.726L566.38 259.32L565.608 259.795L565.073 258.192L564.123 258.607L563.529 258.548L562.935 259.617H560.321L559.43 259.023L558.955 259.38L557.945 258.251L558.123 257.122L557.708 256.707L556.995 257.063L557.173 255.816L557.826 254.865L556.46 253.261L556.104 252.192L555.332 251.361L554.678 251.242L553.906 251.776L552.777 252.311L551.886 253.143L550.461 252.846L549.51 251.836L548.976 251.717L548.085 252.252H547.55L547.372 250.826L547.55 249.638L547.253 248.212L546.065 247.143L545.412 244.945L545.293 242.569L546.422 241.857L547.016 239.599L548.085 239.54L550.401 240.609L552.302 239.837L553.55 240.075L554.084 239.243L567.449 239.184L568.221 236.511L567.627 236.035L566.142 219.582L564.717 203.128L569.766 203.068L580.814 211.384L591.922 219.7L592.694 221.482L594.773 222.552L596.318 223.205L596.377 225.64L600.06 225.225Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M919.749 216.552L917.314 219.047L916.838 220.413L915.056 221.304L913.393 222.968L911.077 223.146L910.186 227.244L908.879 227.957L910.958 231.284L913.393 234.075L915.116 236.63L914.284 239.897L913.215 240.609L914.284 242.51L916.838 245.54L917.432 247.678L917.551 249.46L919.155 252.965L917.611 256.529L916.304 260.449L915.769 257.598L916.541 254.687L915.235 252.43L915.116 248.272L913.571 246.252L911.968 241.738L910.78 236.927L908.938 233.719L907.037 235.679L903.592 238.352L901.632 238.055L899.494 237.164L900.028 232.412L898.84 228.848L895.692 224.453L895.87 223.086L893.851 222.552L891.118 219.463L890.465 216.374L891.712 216.968L891.356 214.236L892.841 213.345L892.247 211.741L892.841 210.434L892.306 206.454L895.039 207.345L895.989 204.197L895.811 202.356L896.999 199.148L896.464 196.95L900.147 194.337L902.642 194.99L901.81 192.674L902.82 191.961L902.226 190.535L904.067 190.238L905.671 192.495L907.275 193.386L908.047 196.297L908.582 199.445L906.087 202.653L906.503 207.167L909.829 206.514L911.255 210.018L913.453 210.791L912.977 213.939L915.65 215.364L917.195 216.077L919.452 214.949L919.749 216.552Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M647.816 135.175L647.34 136.007L646.509 136.363L646.271 135.65L645.143 137.492L645.44 138.739L644.786 138.442L643.776 137.195L642.41 136.422L642.707 135.828L642.945 133.749L643.895 132.858L644.43 132.502L645.261 133.155L645.796 133.69L646.806 134.106L648.053 134.878L647.816 135.175Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M888.741 108.028L891.117 107.315L894.503 106.84L897.71 107.375L901.631 109.097L904.541 110.998H907.274L911.313 111.592L913.451 110.642L916.956 110.048L919.569 107.434L921.589 107.85L923.906 109.097L927.232 108.741L927.588 111.533L927.767 115.275L929.43 116.76L930.796 116.285L934.063 116.879L935.548 115.513L938.637 116.701L942.914 119.314L943.389 120.621L940.775 120.205L936.736 120.68L935.251 121.75L934.479 124.244L930.677 125.67L928.776 127.69L925.272 126.917L923.371 126.561L923.074 128.996L924.797 130.422L925.925 131.669L924.5 132.976L923.312 134.996L920.401 136.303L915.887 136.421L911.61 137.728L908.996 139.748L907.036 138.619H903.353L897.77 136.303L894.443 135.768L890.642 136.303L883.929 135.412L880.603 135.53L877.811 133.273L874.841 129.828L872.822 129.412L868.07 127.036L863.793 126.561L859.932 125.908L858.15 124.244L857.318 119.908L853.873 116.879L849.002 115.513L845.616 113.552L843.656 110.939L846.448 110.285L850.428 107.137L853.932 105.415L857.081 106.543L860.169 106.603L863.021 108.325L865.991 108.444L870.743 109.394L872.168 106.781L869.792 104.642L870.564 100.841L874.722 102.326L877.574 102.801L881.553 103.751L883.692 106.484L888.741 108.028Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M693.021 400.277H690.586L690.408 398.554L690.051 396.831L689.814 395.465L690.645 391.248L689.992 388.515L688.685 383.169L692.368 378.833L693.378 376.101L693.853 375.744L694.388 373.487L693.912 372.359L694.15 369.507L694.922 366.894L695.16 362.023L693.497 360.835L691.893 360.538L691.239 359.588L689.695 358.815L686.903 358.875L686.784 357.449L686.547 354.717L696.764 351.569L698.664 353.41L699.555 353.054L700.862 354.004L700.981 355.548L700.209 357.33L700.328 360.003L702.407 362.379L703.535 359.706L705.02 358.934L704.961 354.004L703.654 351.272L702.525 350.024H702.288L701.931 345.688L702.822 342.065L704.129 341.946L708.109 343.015L709 342.54L711.317 342.421L712.564 341.292L714.584 341.352L718.266 339.867L720.999 337.669L721.533 339.332L721.236 343.134L721.533 346.52L721.415 352.46L721.89 354.301L720.761 357.033L719.336 359.706L717.138 362.082L713.99 363.508L710.129 365.349L706.208 369.448L704.901 370.161L702.407 372.893L701.04 373.725L700.565 376.457L701.991 379.368L702.525 381.566V382.754L703.119 382.516L702.822 386.258L702.169 388.04L702.882 388.694L702.288 390.297L700.862 391.664L698.07 392.911L693.972 394.99L692.487 396.416L692.665 398.019L693.437 398.257L693.021 400.277Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M569.765 203.069L564.716 203.129L566.141 219.582L567.626 236.036L568.22 236.511L567.448 239.184L554.083 239.244L553.548 240.075L552.301 239.838L550.4 240.61L548.084 239.541L547.014 239.6L546.42 241.857L545.292 242.57L543.153 239.957L541.134 237.105L538.995 236.096L537.392 235.026H535.55L533.887 235.858L532.283 235.561L531.095 236.749L530.858 234.729L531.808 232.829L532.283 229.265L532.046 225.463L531.689 223.562L532.046 221.661L531.214 219.879L529.551 218.216L530.323 216.969H543.213L542.678 211.445L543.569 209.484L546.658 209.187L546.777 199.386L557.469 199.624L557.588 193.803L569.765 203.069Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M702.286 350.024H702.523L703.652 351.271L704.959 354.004L705.018 358.934L703.533 359.706L702.405 362.379L700.326 360.003L700.207 357.33L700.979 355.548L700.86 354.004L699.553 353.053L698.662 353.41L696.762 351.568L695.039 350.618L696.227 347.054L697.296 345.747L696.762 342.54L697.534 339.451L698.128 338.441L697.356 335.233L695.811 333.511L699.078 334.224L699.672 335.233L699.613 335.709L700.682 338.144L700.801 342.718L699.732 344.856L700.682 347.648L700.563 349.311L701.276 350.44L701.217 351.865L701.751 352.697L702.345 351.747L703.474 353.232L703.593 352.756L702.999 350.737L702.345 350.559L702.286 350.024Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M929.196 274.586L930.027 274.943L932.106 277.259L933.591 279.813L933.948 282.368L933.651 284.09L934.007 285.397L934.304 287.654L935.552 288.723L936.918 292.109V293.357L934.542 293.654L931.275 290.802L927.236 287.773L926.76 285.813L924.741 283.259L924.147 280.11L922.84 278.031L923.078 275.24L922.246 273.636L922.781 272.982L925.632 274.646L925.988 276.606L928.186 276.131L929.196 274.586Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M982.536 282.546L979.566 281.893H975.705L974.695 286.229L973.448 287.536L971.903 292.823L969.171 293.654L965.963 292.585L964.359 292.941L962.399 294.842L960.261 294.605L958.063 295.377L955.746 293.179L955.152 290.625L957.647 291.932L960.201 291.219L960.795 288.011L962.221 287.298L966.26 286.467L968.517 283.437L970.062 281.061L971.725 283.022L972.378 281.715L973.982 281.834L974.042 279.398L974.101 277.497L976.536 274.884L978.081 271.914L979.447 271.854L981.288 273.815L981.526 275.478L983.783 276.547L986.634 277.676L986.516 279.161L984.258 279.339L984.912 281.24L982.536 282.546Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M663.021 365.112L665.754 364.28L667.892 364.458L669.199 365.349V365.646L667.298 366.537H666.288L664.091 368.022L662.903 366.419L657.735 367.785L655.24 367.904L654.765 381.506L651.498 381.625L651.141 392.733L650.488 406.811L647.518 408.771L645.795 409.068L643.776 408.355L642.291 408.058L641.816 406.454L640.628 405.385L638.964 407.286L636.648 404.375L635.46 401.643L634.866 397.901L634.153 395.168L633.203 389.288L633.262 384.714L632.906 382.635L631.658 381.031L629.995 377.883L628.332 373.309L627.678 370.933L625.065 367.191L624.887 364.28L626.49 363.567L628.51 362.914L630.648 363.033L632.609 364.755L633.084 364.458L646.568 364.34L648.825 366.122L656.844 366.656L663.021 365.112Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M634.747 211.088L635.698 217.028L637.005 218.038L637.064 219.226L638.49 220.533L637.777 222.196L636.708 229.918L636.589 234.907L632.431 238.471L631.065 243.52L632.49 244.946V247.381L634.688 247.441L634.332 249.282L633.441 249.46L633.322 250.708L632.728 250.767L630.411 246.609L629.58 246.431L627.025 248.569L624.412 247.441L622.63 247.263L621.679 247.797L619.719 247.678L617.759 249.282L616.036 249.401L611.997 247.441L610.393 248.332L608.671 248.272L607.423 246.847L604.097 245.421L600.474 245.896L599.642 246.669L599.167 248.866L598.216 250.411L597.979 253.856L595.425 251.658H594.237L593.108 252.787L593.167 250.173L589.306 249.282L589.188 247.441L587.346 244.946L586.871 243.223L587.168 241.382L589.306 241.204L590.494 239.838L595.068 239.541L598.038 238.947L598.276 236.571L600.117 234.016L600.058 225.225L604.691 223.562L614.195 216.078L625.362 208.771L630.589 210.435L632.49 212.514L634.747 211.088Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M633.322 250.708L634.688 252.193L634.331 252.905L634.153 254.153L631.361 257.123L630.53 259.558L630.055 261.518L629.342 262.409L628.688 265.082L626.906 266.627L626.431 268.528L625.659 270.072L625.362 271.676L623.045 272.983L621.145 271.379L619.897 271.438L617.878 273.695H616.927L615.323 277.378L614.492 280.111L610.987 281.477L609.74 281.299L608.433 282.13L605.76 282.071L603.919 279.635L602.79 276.903L600.414 274.408H597.919H594.949L595.127 268.29L595.009 265.855L595.662 263.479L596.672 262.291L598.335 259.915L597.979 258.905L598.632 257.36L597.86 255.103L597.979 253.856L598.216 250.411L599.167 248.866L599.642 246.668L600.473 245.896L604.097 245.421L607.423 246.847L608.671 248.272L610.393 248.332L611.997 247.441L616.036 249.401L617.759 249.282L619.719 247.678L621.679 247.797L622.63 247.262L624.412 247.441L627.025 248.569L629.579 246.431L630.411 246.609L632.728 250.767L633.322 250.708Z"
                    fill="#00587F"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M308.644 241.085L308.347 241.501L308.05 242.332L308.288 243.698L307.397 245.005L306.922 246.55L306.625 248.213L306.743 249.223L306.684 250.945L306.149 251.302L305.734 252.965L305.852 253.975L305.14 254.925L305.199 255.935L305.674 256.588L304.843 257.42L303.833 257.123L303.358 256.351L302.288 256.054L301.516 256.529L299.378 255.519L298.843 255.994L297.774 254.806L296.289 253.262L295.636 252.014L294.329 250.767L292.844 249.044L293.26 248.45L293.735 249.044L294.032 248.807L295.101 248.629L295.576 247.738H296.051L296.17 245.837L296.942 245.777H297.655L298.487 244.768L299.378 245.54L299.734 245.065L300.447 244.589L301.694 243.58L301.813 242.748L302.11 242.807L302.645 241.916L303.001 241.798L303.536 242.392L304.189 242.51L304.961 242.035H305.793L306.981 241.56L307.516 241.025L308.644 241.085Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M661.54 40.3123L657.738 41.5597L655.837 41.8567L656.312 39.5995L652.867 38.3521L649.363 39.4213L648.709 41.7973L646.69 43.2229L643.898 42.4507L640.75 42.5695L637.72 40.9063L636.413 41.7379L634.869 41.8567L634.928 43.9951L630.176 43.4605L629.82 45.3019H627.444L626.078 47.6185L624.058 51.2419L620.672 55.9345L621.742 57.1225L620.969 58.4293L618.415 58.3699L616.99 61.5775L617.584 66.1513L619.425 67.8739L618.95 71.9725L616.93 74.3485L615.861 76.3681L613.901 74.2297L608.792 78.2689L605.169 79.1005L601.308 77.3185L600.239 73.5763L599.051 65.5573L601.427 63.3595L608.139 60.4489L612.95 56.9443L617.227 52.3111L622.514 45.9553L626.315 43.5199L632.434 39.4807L637.483 38.0551L641.462 38.2333L644.551 35.6197L648.947 35.7385L653.105 35.1445L661.243 37.4611L658.332 38.2927L661.54 40.3123Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M639.502 15.1866L634.988 16.3152L630.948 15.6618L632.255 14.949L630.711 14.058L635.047 13.5234L636.176 14.5332L639.502 15.1866Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M624.293 10.1371L631.777 12.1567L626.669 13.2259L625.956 15.2455L624.174 15.7801L623.639 18.1561L621.026 18.2749L615.977 16.5523L617.759 15.5425L614.373 14.7109L609.799 12.3943L607.898 10.3153L613.423 9.36489L614.789 10.2559H617.759L618.353 9.36489L621.442 9.24609L624.293 10.1371Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M638.786 8.35555L643.182 9.24655L640.568 10.6721L634.569 10.9691L628.213 10.4939L627.619 9.78115H624.589L622.035 8.59315L628.272 7.88035L631.48 8.47435L633.321 7.70215L638.786 8.35555Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M872.586 192.02L872.705 193.624L873.596 196.059L873.537 197.544L870.804 197.604L866.706 196.713L864.151 196.356L861.894 194.455L857.32 193.921L852.687 191.782L849.242 189.941L845.797 188.515L846.331 184.951L847.995 183.169L849.123 182.278L851.974 183.466L855.776 185.961L857.736 186.496L859.221 188.337L861.894 189.05L864.864 190.773L868.725 191.604L872.586 192.02Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M762.579 234.788L761.272 232.115L758.184 225.819L767.866 222.017L769.41 214.414L767.628 211.682V210.137L768.4 208.593L768.282 207.049L769.707 206.276L769.054 205.742V203.247H770.717L772.499 205.861L774.459 207.227L776.895 207.761L778.914 208.415L780.637 210.613L781.647 211.86L782.835 212.395L782.953 213.226L781.944 215.483L781.528 216.553L780.221 217.8L779.211 220.414L777.726 220.176L777.132 221.126L776.716 223.027L777.37 225.581L777.073 226.057H775.588L773.628 227.482L773.449 229.324L772.737 230.155L770.658 230.096L769.47 231.046L769.588 232.591L768.044 233.66L766.203 233.303L764.064 234.61L762.579 234.788Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M769.944 200.217L769.172 198.91L770.003 197.663L770.419 197.96L770.3 199.564L769.944 200.217Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M832.55 162.915L830.293 166.122L826.907 166.716L821.858 165.766L820.67 167.429L822.63 170.756L824.353 173.369L827.382 175.211L825.125 177.408L825.719 180.141L823.402 184.002L822.095 187.863L819.422 191.843L815.561 191.546L812.651 195.585L815.027 197.248L815.858 200.218L817.937 202.119L819.007 205.386H811.819L809.918 207.94L807.424 206.99L806.117 204.257L803.206 201.347L797.266 202.059L791.92 202.119L787.406 202.653L788.059 198.258L792.514 196.238L791.98 194.516L790.376 193.862L789.782 190.536L786.396 188.873L784.733 186.556L782.832 184.536L788.534 186.497L791.683 185.903L793.702 186.378L794.237 185.546L796.553 185.903L800.474 184.299L799.999 181.091L801.365 178.893H803.8L803.919 177.884L806.295 177.349L807.542 177.705L808.612 176.636L807.958 174.32L808.79 172.062L810.631 171.053L808.79 168.558L811.879 168.677L812.413 167.31L811.938 165.825L813.126 164.222L812.294 162.321L811.166 160.717L812.591 159.054L815.74 158.282L819.244 157.806L820.67 157.153L822.392 156.678L825.184 158.46L826.907 161.43L832.55 162.915Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M326.284 265.26L325.868 265.795L326.521 268.052L325.868 269.181L324.799 268.884L324.264 270.725L323.195 269.656L322.601 267.577L323.433 266.567L322.601 266.329L322.066 265.082L320.403 264.013L318.978 264.25L318.205 265.557L316.78 266.508L316.067 266.626L315.711 267.458L317.196 269.537L316.245 270.012L315.77 270.547L314.166 270.784L313.691 268.468L313.216 269.121L312.147 268.884L311.553 267.399L310.186 267.102L309.295 266.686H307.87L307.751 267.517L307.395 266.923L307.573 266.151L307.929 265.379L307.81 264.726L308.345 264.25L307.692 263.716L307.751 262.171L309.058 261.815L310.186 263.181L310.068 264.013L311.374 264.191L311.731 263.835L312.622 264.785L314.285 264.488L315.77 263.538L317.849 262.765L319.037 261.637L320.878 261.874L320.76 262.231L322.601 262.35L324.027 263.062L325.096 264.191L326.284 265.26Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M350.756 314.681L347.727 314.503L347.252 315.097L344.519 315.81L340.777 318.423L340.599 320.205L339.767 321.512L340.183 323.591L338.163 324.66L338.282 326.324L337.391 326.977L338.936 330.422L340.896 332.739L340.302 334.402L342.559 334.58L343.925 336.659L346.895 336.719L349.509 334.521L349.568 340.283L351.113 340.698L353.013 340.045L356.28 346.223L355.627 347.47V350.202L355.805 353.41L354.677 355.311L355.389 356.736L354.736 358.043L356.459 361.251L354.736 365.349L354.083 367.31L352.419 368.26L348.915 366.062L348.44 364.518L341.49 360.716L335.134 356.499L332.342 354.182L330.679 351.034L331.154 349.905L327.947 344.916L324.145 337.907L320.581 330.303L319.155 328.521L317.967 325.73L315.235 323.235L312.8 321.69L313.809 320.027L312.027 316.344L313.037 313.671L315.651 311.295L316.067 312.899L315.116 313.79L315.294 315.156L316.661 314.859L318.027 315.275L319.512 317.235L321.353 315.632L321.888 313.077L323.907 309.751L327.887 308.266L331.511 304.227L332.52 301.791L332.045 298.881L332.936 298.524L335.193 300.306L336.263 302.148L337.807 303.098L339.886 307.078L342.381 307.613L344.222 306.603L345.47 307.256L347.489 306.9L350.103 308.682L348.024 312.602L349.034 312.662L350.756 314.681Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1010.1 266.211L1010.63 268.765L1010.99 270.904L1010.04 274.349L1008.55 270.488L1007.13 272.448L1008.37 275.24L1007.54 277.022L1003.44 274.824L1002.32 272.032L1003.21 270.25L1000.95 268.409L999.999 270.013L998.454 269.834L996.078 271.973L995.484 270.844L996.554 267.637L998.573 266.567L1000.3 265.142L1001.6 266.864L1004.1 265.855L1004.51 264.132L1006.89 264.013L1006.41 261.103L1009.32 262.885L1009.74 264.785L1010.1 266.211Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1001.43 259.083L1000.36 260.331L999.525 262.766L998.574 263.895L996.258 261.281L996.852 260.212L997.624 259.143L997.743 256.826L999.584 256.589L999.287 259.143L1001.43 255.46V259.083Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M983.428 262.766L979.211 266.389L980.637 263.716L982.894 261.34L984.676 258.726L986.042 254.925L986.992 258.073L984.913 260.152L983.428 262.766Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M993.82 252.965L995.959 254.153H998.038L998.157 255.697L996.79 257.36L994.771 258.489L994.474 256.707L994.533 254.747L993.82 252.965Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1005.76 251.895L1007.19 256.172L1004.51 255.162L1004.69 256.469L1005.76 258.786L1004.22 259.677L1003.86 256.944L1002.79 256.766L1002.08 254.449L1004.04 254.746L1003.86 253.321L1001.48 250.41L1004.69 250.47L1005.76 251.895Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M992.1 248.451L991.566 251.777L989.962 249.876L987.883 246.966L990.734 247.085L992.1 248.451Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M988.237 227.72L990.495 228.848L991.326 227.839L991.801 228.789L991.564 230.393L993.108 233.125L992.752 236.273L991.029 237.521L990.97 240.61L992.158 243.639L993.94 244.055L995.365 243.639L999.82 245.718L999.761 247.797L1001.01 248.747L1000.83 250.47L998.038 248.629L996.553 246.609L995.841 248.035L993.465 245.718L990.495 246.312L988.713 245.48L988.653 243.877L989.604 242.926L988.475 242.035L988.237 243.401L986.277 241.204L985.505 239.54L984.852 235.917L986.396 237.164L985.743 231.165L986.218 227.72H988.237Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1109.65 324.304L1108.7 324.72L1107.34 323.235L1106.03 320.799L1105.55 317.889L1106.03 317.532L1106.33 318.661L1107.28 319.552L1108.7 321.928L1110.19 323.235L1109.65 324.304Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1096.94 319.195L1095.16 319.492L1094.56 320.562L1092.66 321.512L1090.88 322.403H1089.04L1086.36 321.274L1084.52 320.205L1084.88 319.017L1087.85 319.611L1089.75 319.314L1090.34 317.473L1090.88 317.354L1091.06 319.374L1092.96 319.136L1094.03 317.829L1095.99 316.463L1095.75 314.206L1097.77 314.146L1098.42 314.74L1098.19 316.879L1096.94 319.195Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1059.04 333.096L1059.99 320.622L1060.59 308.207L1066.29 310.821L1072.41 313.018L1074.61 314.979L1076.39 316.879L1076.74 319.137L1082.21 321.513L1082.86 323.532L1079.77 323.948L1080.31 326.502L1083.1 328.997L1084.88 333.036L1086.84 332.917L1086.49 334.581L1089.04 335.234L1087.97 335.947L1091.36 337.551L1090.82 338.679L1088.56 338.917L1087.85 337.966L1085.06 337.491L1081.73 336.957L1079.36 334.521L1077.69 332.383L1076.21 329.056L1071.99 327.393L1069.08 328.462L1066.88 329.769L1067.06 332.561L1064.33 333.868L1062.49 333.214L1059.04 333.096Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1101.04 315.454L1099.97 316.464L1099.43 314.206L1098.78 312.781L1097.3 311.533L1095.45 309.87L1093.08 308.742L1094.03 307.851L1095.81 308.92L1096.94 309.751L1098.31 310.642L1099.55 312.246L1100.8 313.494L1101.04 315.454Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M641.46 92.1686L644.964 92.5844L650.191 92.525L651.676 92.9408L652.508 94.0694L652.864 95.6732L653.874 97.0394L654.112 98.465L652.449 99.2372L653.577 100.9L653.874 102.564L655.775 105.771L655.597 106.781L654.231 107.197L651.973 110.286L652.924 111.949L652.27 111.711L649.3 110.286L647.221 110.82L645.796 110.464L644.133 111.236L642.529 109.929L641.4 110.464L641.222 110.226L639.678 108.385L637.48 108.207L637.064 107.019L635.044 106.603L634.688 107.553L633.025 106.781L633.144 105.771L630.946 105.474L629.461 104.286L628.035 101.97L628.154 100.663L627.263 98.7026L626.134 97.4552L626.847 96.4454L626.016 94.604L627.857 93.5348L632.074 91.8716L635.52 90.6836L638.371 91.2776L638.727 92.1686H641.46Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M986.22 136.779L987.052 137.432L985.745 137.194L985.151 138.501L984.973 139.749L986.636 142.481L985.507 143.313L985.329 143.966L984.795 145.095L983.072 145.748L982.24 146.758L983.013 148.362L982.834 148.777L984.379 149.431L986.992 151.094V151.985L985.804 152.223L983.666 152.46L983.31 154.123L981.825 154.005V154.361L979.924 153.648L979.864 154.361L979.092 154.658L978.676 153.945L977.667 153.589L976.538 152.995L976.597 151.332L977.132 150.856L976.538 150.203L976.3 148.124L975.766 147.53L973.746 147.114L971.727 146.104L972.974 143.669L975.291 141.649L975.944 138.917L978.082 140.105L980.815 140.283L979.152 138.264L982.953 136.66V134.521L986.22 136.779Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M393.525 375.269L394.713 377.348L394.95 382.516L398.455 383.288L399.762 382.516L402.078 383.585L402.791 384.714L403.445 388.218L403.92 389.644L405.167 389.822L406.355 389.228L407.603 389.882L407.781 392.02L407.603 394.277L407.187 396.475L407.009 399.801L404.454 402.771L401.96 403.365L398.217 402.771L394.772 401.762L397.267 395.94L396.614 394.277L393.109 392.792L388.773 389.941L386.04 389.347L379.328 383.169L380.219 378.596L380.1 376.517L381.348 373.19L387.05 372.062L390.139 372.121L393.347 374.081L393.525 375.269Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M699.909 174.735L700.147 177.111L699.79 178.24L698.305 178.715L698.365 177.705L699.137 177.17L698.246 176.755L698.662 174.26L699.909 174.735Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M754.439 204.375L753.548 204.672L752.479 203.9L752.004 201.108L752.657 199.148L753.548 198.732L754.618 199.92L754.915 202.118L754.439 204.375Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M664.625 114.919L665.575 115.335L666.644 116.404L667.832 117.948L669.852 120.206L670.208 121.809L670.09 123.413L670.862 125.136L672.287 125.849L673.654 125.195L675.079 125.849L675.317 126.858L673.951 127.631L673 127.274L672.763 131.848L670.921 131.432L668.545 130.066L665.041 130.957L663.674 131.907L659.16 131.67L656.784 131.135L655.655 131.373L654.586 129.828L653.992 129.175L654.586 128.522L653.814 128.106L652.923 128.937L651.082 127.809L650.666 126.264L648.765 125.433L648.29 124.185L646.508 122.76L648.824 122.047L650.369 119.493L651.497 116.998L653.22 116.226L654.408 115.394L656.309 115.81H658.21L659.695 116.76L660.645 116.166L662.783 115.81L663.377 114.919H664.625Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M688.326 302.623L689.633 304.761L689.455 307.019L688.504 307.494L686.663 307.256L685.653 309.454L683.574 309.157L683.931 307.019L684.406 306.722L684.525 304.464L685.475 303.395L686.307 303.811L688.326 302.623Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M557.706 192.852L557.647 193.089L557.588 193.802L557.469 199.623L546.777 199.386L546.658 209.187L543.569 209.484L542.678 211.444L543.213 216.968H530.323L529.551 218.215L529.729 216.612H529.788L537.213 216.315L537.629 214.948L539.055 213.226L540.243 207.939L544.935 203.841L546.539 199.029L547.608 198.732L548.737 195.762L551.469 195.346L552.657 195.881H554.142L555.212 194.99L557.231 194.871L557.172 192.852H557.706Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M736.856 187.328L739.826 187.684L740.836 189.526L743.152 189.407L744.756 192.733L746.479 193.565L747.192 194.931L749.568 196.535L749.983 198.079L749.746 199.386L750.28 200.633L751.35 201.703L751.884 202.95L752.478 203.9L753.547 204.673L754.438 204.376L755.211 205.861L755.389 206.692L756.993 210.613L767.031 212.513L767.625 211.682L769.407 214.414L767.863 222.017L758.181 225.819L748.736 227.304L745.766 229.027L743.687 233.006L742.143 233.66L741.252 232.412L740.004 232.591L736.737 232.175L736.084 231.818L732.282 231.878L731.391 232.234L729.966 231.284L729.193 233.125L729.669 234.729L728.243 235.976L727.708 234.313L726.639 233.185L726.342 231.64L724.501 230.274L722.541 227.066L721.412 223.978L718.977 221.364L717.492 220.711L715.056 217.087L714.522 214.474V212.216L712.383 207.94L710.72 206.455L708.938 205.682L707.691 203.485L707.809 202.653L706.74 200.633L705.73 199.802L704.245 196.951L701.988 193.921L700.147 191.308H698.543L698.84 189.229L698.899 187.862L699.137 186.318L702.82 186.971L704.067 185.783L704.721 184.417L707.156 183.883L707.572 182.576L708.522 181.982L704.958 178.121L711.136 176.22L711.67 175.626L715.71 176.695L720.818 179.368L730.797 187.031L736.856 187.328Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M707.455 243.282L707.039 246.549L705.851 250.351L703.891 252.192L702.524 255.162L702.227 256.707L700.683 257.776L699.792 261.756V262.231L699.317 262.112L699.376 260.211L698.901 258.905L697.178 257.42L696.644 254.687L697 251.836L695.456 251.598L695.218 252.43L693.199 252.668L694.09 253.737L694.387 256.053L692.605 258.132L691.001 260.865L689.278 261.281L686.427 259.083L685.18 259.855L684.883 260.924L683.16 261.696L683.041 262.469H679.715L679.24 261.696L676.804 261.518L675.616 262.172L674.666 261.875L672.943 259.617L672.349 258.608L669.914 259.142L669.023 260.865L668.251 264.31L667.063 265.023L666.053 265.439L665.756 265.26L664.627 264.132L664.39 262.944L664.865 261.399V259.796L662.905 257.42L662.489 255.816V254.865L661.241 253.737L661.182 251.539L660.41 250.054L659.281 250.292L659.578 248.866L660.41 247.322L659.994 245.718L661.063 244.53L660.35 243.639L661.123 241.322L662.608 238.471L665.459 238.768L664.805 223.621V222.017H668.607L668.31 214.414H681.556H694.327H707.455L708.702 218.156L707.989 218.81L708.702 222.789L710.187 227.304L711.494 228.254L713.395 229.68L711.791 231.818L709.415 232.472L708.405 233.66L708.227 236.154L707.039 241.797L707.455 243.282Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M699.79 262.231L699.909 265.201L699.434 266.33L697.652 266.449L696.523 268.587L698.602 268.884L700.384 270.725L700.978 272.27L702.522 273.161L704.601 277.319L702.344 279.814L700.325 282.071L698.246 283.853H695.87L693.197 284.744L691.058 283.853L689.692 284.922L686.663 282.368L685.831 280.764L683.99 281.536L682.445 281.299L681.554 281.952L680.01 281.477L677.931 278.329L677.396 277.141L674.842 275.596L674.01 273.339L672.585 271.676L670.268 269.716L670.209 268.468L668.367 266.924L666.051 265.439L667.061 265.023L668.249 264.31L669.021 260.865L669.912 259.142L672.347 258.608L672.941 259.618L674.664 261.875L675.614 262.172L676.802 261.518L679.238 261.697L679.713 262.469H683.039L683.158 261.697L684.881 260.924L685.178 259.855L686.425 259.083L689.276 261.281L690.999 260.865L692.603 258.133L694.385 256.054L694.088 253.737L693.197 252.668L695.216 252.43L695.454 251.599L696.998 251.836L696.642 254.687L697.176 257.42L698.899 258.905L699.374 260.212L699.315 262.112L699.79 262.231Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M545.294 242.569L545.412 244.945L546.066 247.143L547.254 248.212L547.551 249.638L547.373 250.826L546.897 251.063L545.056 250.766L544.818 251.182L544.106 251.242L541.67 250.351L540.066 250.291L533.889 250.113L532.998 250.588L531.869 250.469L530.087 251.063L529.612 248.153L532.641 248.212L533.473 247.678H534.067L535.314 246.787L536.74 247.559L538.166 247.678L539.651 246.787L538.997 245.717L537.869 246.311H536.859L535.552 245.361L534.483 245.42L533.711 246.371L530.087 246.43L528.721 243.46L527.117 242.153L528.602 241.381L530.265 238.708L531.097 236.748L532.285 235.56L533.889 235.857L535.552 235.025H537.393L538.997 236.095L541.136 237.104L543.155 239.956L545.294 242.569Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M551.528 266.271L549.983 268.053L548.439 270.073L548.261 271.201L547.429 272.449L546.538 272.152L544.162 270.607L542.38 268.588L541.845 267.162L541.43 264.37L543.271 262.648L543.627 261.638L544.221 260.806L545.172 260.687L545.944 259.975H548.617L549.567 261.341L550.28 262.945L550.161 264.073L550.696 265.083L550.637 266.449L551.528 266.271Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M292.544 247.262L292.128 248.153L290.168 248.094L288.98 247.737L287.673 246.965L285.891 246.727L285 245.896L285.178 245.361L286.366 244.411L287.079 243.995L286.901 243.52L287.732 243.282L288.683 243.639L289.336 244.351L290.287 245.005L290.346 245.48L291.831 245.064L292.544 245.302L292.96 245.718L292.544 247.262Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M654.587 129.829L653.934 130.66L654.35 132.086L656.013 133.69L654.944 134.878L654.587 136.066L654.944 136.541L654.528 137.016L653.102 137.135L652.092 137.313L651.914 137.016L652.271 136.6L652.508 135.65L652.092 135.709L651.439 134.997L650.904 134.818L650.429 134.224L649.835 133.987L649.36 133.452L648.825 133.69L648.528 134.937L647.816 135.175L648.053 134.878L646.806 134.106L645.796 133.69L645.261 133.155L644.43 132.502L645.083 132.324L645.38 130.601L643.776 129.116L644.43 127.453L643.301 127.512L644.311 126.087L643.301 125.017L642.41 123.532L644.608 122.582L646.509 122.76L648.291 124.186L648.766 125.433L650.667 126.265L651.083 127.809L652.924 128.938L653.815 128.106L654.587 128.522L653.993 129.175L654.587 129.829Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M404.513 276.368L402.672 279.635L402.85 282.249L404.157 284.506L403.503 286.11L403.206 287.892L402.315 289.495L400.414 288.664L398.811 289.08L397.444 288.723L397.088 289.852L397.682 290.565L397.326 291.396L395.484 291.04L393.524 287.713L393.108 285.575H392.039L390.613 282.843L391.267 280.823L391.089 279.932L393.168 278.982L393.762 275.536L397.801 276.309L398.157 275.596L400.89 275.299L404.513 276.368Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M652.271 111.712L651.558 112.721L651.142 114.206L650.548 114.563L647.281 113.434L646.331 113.672L645.737 114.563L644.371 115.038L644.014 114.8L642.648 115.335L641.52 115.454L641.341 116.226L638.906 116.642L637.777 116.285L636.174 115.276L635.758 114.028L635.936 113.553L636.292 112.721L637.599 112.781L638.55 112.424L638.609 112.068L639.144 111.89L639.262 111.058L639.916 110.88L640.332 110.227H641.223L641.401 110.464L642.529 109.93L644.133 111.236L645.796 110.464L647.222 110.821L649.301 110.286L652.271 111.712Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M635.463 121.334L633.146 122.344L632.968 123.829L631.958 124.245L632.018 125.255L630.83 125.195L629.761 124.601L629.285 125.195L627.147 125.076L627.8 124.779L626.969 123.176L627.206 121.334L629.701 121.631L631.127 120.74L633.74 120.681L634.275 120.027L634.75 120.087L635.463 121.334Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M646.391 51.8957L642.233 52.8461L640.154 55.1627L640.926 57.2417L637.243 59.9147L632.61 62.8847L631.363 67.6961L633.561 70.1315L636.412 72.0917L634.452 76.0121L631.719 76.8437L631.363 82.7837L630.115 86.1695L626.73 85.8131L625.423 88.6643L622.156 88.8425L621.027 85.4567L618.354 81.3581L615.859 76.3685L616.929 74.3489L618.948 71.9729L619.423 67.8743L617.582 66.1517L616.988 61.5779L618.414 58.3703L620.968 58.4297L621.74 57.1229L620.671 55.9349L624.057 51.2423L626.076 47.6189L627.442 45.3023H629.818L630.175 43.4609L634.927 43.9955L634.867 41.8571L636.412 41.7383L639.976 43.3421L644.253 45.5399L645.322 50.5889L646.391 51.8957Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M690.051 396.831L690.407 398.554L690.585 400.276L689.754 401.94L687.853 402.355L686.012 400.276L686.071 398.97L687.081 397.544L687.437 396.415L688.447 396.178L690.051 396.831Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M709.829 170.993L704.067 175.092L700.325 173.547H700.266L700.622 172.953L700.385 171.409L700.919 169.33L702.523 167.845L701.81 166.36L700.325 166.182L699.672 163.271L700.266 161.667L701.038 160.836L701.751 160.004L701.632 157.925L702.761 158.638L706.087 157.569L707.869 158.281H710.483L713.868 156.856L715.591 156.915L719.096 156.321L717.848 158.697L716.244 159.648L716.957 162.439L716.363 167.013L709.829 170.993Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M664.806 223.621L665.459 238.768L662.608 238.471L661.123 241.322L660.351 243.639L661.063 244.53L659.994 245.718L660.41 247.322L659.578 248.866L659.281 250.292L660.41 250.054L661.182 251.539L661.242 253.737L662.489 254.866V255.816L660.351 256.469L658.687 258.014L656.311 262.172L653.223 263.954L649.956 263.716L649.005 264.073L649.362 265.379L647.639 266.746L646.213 268.231L641.996 269.656L641.164 268.825L640.57 268.706L639.976 269.716L637.244 270.013L637.719 268.943L636.65 266.33L636.175 264.785L634.69 264.132L632.67 261.875L633.383 260.093L634.927 260.449L635.878 260.212H637.779L635.878 256.766L635.997 254.212L635.7 251.717L634.333 249.282L634.69 247.441L632.492 247.381V244.946L631.066 243.52L632.433 238.471L636.591 234.907L636.709 229.918L637.779 222.196L638.491 220.532L637.066 219.226L637.006 218.038L635.7 217.028L634.749 211.088L638.016 209.009L651.381 216.315L664.806 223.621Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M588.89 256.35L588.475 258.37L589.484 259.499L590.672 260.805L590.791 262.706L591.504 263.478L591.326 272.27L592.157 274.883L589.484 275.715L588.712 274.349L587.821 271.913L587.524 270.012L588.296 266.627L587.465 265.201L587.108 262.231V259.439L585.742 257.479L585.98 256.291L588.89 256.35Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M937.035 243.876L933.886 243.341L929.669 244.054L927.828 247.202L929.075 251.836L925.927 250.054L923.076 250.172L923.254 247.143H920.343L920.462 251.36L919.155 256.944L918.324 260.33L918.739 263.062L920.937 263.181L922.541 266.686L923.313 269.953L925.333 272.15L927.352 272.566L929.194 274.586L928.184 276.13L925.986 276.605L925.63 274.645L922.779 272.982L922.244 273.635L920.878 272.21L920.165 270.309L918.264 268.171L916.542 266.329L916.126 268.586L915.354 266.448L915.591 264.072L916.304 260.449L917.611 256.528L919.155 252.964L917.551 249.46L917.433 247.678L916.839 245.539L914.284 242.51L913.215 240.609L914.284 239.896L915.116 236.629L913.393 234.075L910.958 231.283L908.879 227.957L910.186 227.244L911.077 223.145L913.393 222.967L915.057 221.304L916.839 220.413L918.442 221.601L918.977 223.918L921.234 224.096L920.997 228.076L921.591 231.521L924.739 229.264L925.867 229.917L927.768 229.798L928.243 228.491L930.798 228.729L933.768 231.818L934.54 235.619L937.688 238.946L937.926 242.153L937.035 243.876Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M806.056 144.916L805.225 146.045L801.661 145.451L802.017 147.589L805.284 147.292L809.502 148.539L815.204 147.945L817.045 151.509L817.936 151.094L820.134 151.985L820.431 153.47L821.5 155.608H818.293L816.036 155.311L814.551 157.034L813.244 157.39L812.353 158.222L810.749 156.974L810.214 153.767L809.205 153.588L809.264 152.4L807.304 151.569L806.294 152.876L806.413 154.42L806.056 154.955L804.156 154.895L803.621 156.618L802.374 155.905L800.354 157.093L799.285 156.677L800.057 152.816L798.631 149.965L796.137 149.074L796.493 147.411L799.107 147.589L799.998 145.51L800.295 143.075L804.156 142.184L804.037 143.966L804.809 144.975L806.056 144.916Z"
                    fill="#00587F"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M794.951 155.846L794.001 155.727L792.278 154.717L792.1 156.024L789.605 156.796L789.724 159.826L788.18 161.014L785.804 161.548L785.566 163.271L783.25 163.805L779.745 162.32L778.735 159.172L776.359 158.994L772.023 155.668L769.469 155.252L765.548 153.292L763.232 152.935L762.044 153.648L759.905 153.529L758.123 155.727L755.51 156.44L754.381 153.767L754.025 149.787L751.292 148.48L751.53 145.926L749.451 145.688L749.391 142.481L752.54 143.431L754.975 142.243L752.183 139.927L750.758 137.788L748.5 138.739L748.857 141.53L747.312 139.095L748.382 137.788L751.708 137.016L754.025 138.085L756.876 141.055L758.42 140.877L761.925 140.818L760.915 138.917L763.172 137.61L765.192 135.412L769.884 137.432L771.013 140.402L772.379 141.174L775.646 140.996L776.894 141.709L779.448 145.629L783.665 148.243L786.16 150.025L789.902 151.866L794.476 153.529L794.951 155.846Z"
                    fill="#00587F"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1005.46 334.105L1005.52 332.976L1005.23 332.204L1005.7 331.313L1008.61 330.482L1010.99 330.303L1012.06 329.828L1013.3 330.303L1012 331.373L1008.37 333.036L1005.46 334.105Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M622.63 171.943L622.571 174.854L621.027 175.923L620.076 177.17L617.938 178.655L618.294 180.2L618.057 181.863L616.512 182.695L614.968 175.864L612.948 174.319L612.889 173.428L610.216 171.112L609.859 168.26L611.76 166.122L612.414 162.974L611.82 159.35L612.414 157.39L615.799 155.905L617.997 156.321V158.281L620.611 156.856L620.848 157.568L619.363 159.469L619.423 161.192L620.551 162.142L620.254 165.469L618.175 167.369L618.888 169.448L620.551 169.508L621.383 171.349L622.63 171.943Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M713.81 139.986L717.077 139.808L720.404 141.708L721.176 143.015L721.235 144.857L723.73 145.807L725.156 146.876L723.195 148.005L724.918 152.341L724.502 153.529L726.759 156.558L725.334 157.212L724.086 156.261L720.344 155.727L719.097 156.321L715.592 156.915L713.87 156.855L710.484 158.281H707.87L706.088 157.568L702.762 158.637L701.633 157.925L701.752 160.004L701.039 160.835L700.267 161.667L698.901 159.944L699.911 158.519L698.01 158.875L695.277 157.984L693.377 160.182L688.625 160.598L685.833 158.578L682.447 158.459L681.853 160.004L679.715 160.479L676.507 158.459L673.062 158.519L670.805 154.717L668.31 152.638L669.498 149.668L667.359 147.827L670.389 144.203L675.141 144.084L676.091 141.174L682.031 141.708L685.358 139.273L688.803 138.204L693.852 138.085L699.673 140.758L704.366 142.243L707.811 141.649L710.543 142.005L713.81 139.986Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M666.409 142.718L667.122 142.302L667.776 139.926L666.172 138.917L669.142 137.729L671.874 138.204L672.409 139.689L675.26 140.877L674.844 141.827L671.161 142.005L669.973 143.193L667.657 145.213L666.469 143.49L666.409 142.718Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M984.794 211.385L983.962 214.533L981.586 211.266L980.695 208.474L981.824 204.732L983.784 201.821L985.566 202.95L985.507 205.267L984.794 211.385Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M693.199 302.207L693.08 304.523L692.426 307.196L693.377 308.681L694.862 307.79L696.822 307.553L697.238 308.028L699.198 307.078L697.832 305.771L698.96 304.048L700.624 302.326L712.801 310.107L712.979 312.305L717.79 316.106L716.127 320.858L716.305 322.997L718.384 324.363L718.503 325.373L717.493 327.689L717.671 328.818L717.434 330.659L718.503 333.035L719.81 336.837L720.998 337.669L718.265 339.866L714.583 341.351L712.563 341.292L711.316 342.421L708.999 342.539L708.108 343.015L704.128 341.945L702.821 342.064L702.881 342.005L701.812 340.579L701.633 336.54L699.911 334.52L699.673 335.233L699.079 334.223L695.812 333.511L693.911 332.382L691.773 331.729L690.466 331.075L690.288 330.956L688.684 327.036L688.447 324.719L685.774 322.106L686.605 320.68L685.952 319.136L686.071 317.532L685.477 316.997L685.655 315.334L686.011 315.275L687.199 313.909L688.565 311.889L689.397 311.117V309.869L688.684 308.978L688.506 307.493L689.456 307.018L689.635 304.761L688.328 302.623L689.516 302.147L693.199 302.207Z"
                    fill="#00587F"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M700.327 282.07L701.93 284.743L702.346 286.644L703.891 291.04L702.643 293.832L700.98 296.326L700.03 297.871V298.049L699.911 297.811L698.129 297.039L696.703 297.99L694.565 298.524L693.02 300.722L693.199 302.207L689.516 302.148L688.328 302.623L686.308 303.811L685.477 303.395L685.536 300.544L686.308 299.059L686.486 296.029L687.199 294.247L688.506 292.287L689.753 291.218L690.882 289.911L689.516 289.377L689.694 284.922L691.06 283.852L693.199 284.743L695.872 283.852H698.248L700.327 282.07Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M687.379 103.93L688.745 105.534L688.804 106.247L692.784 107.554L694.922 106.96L697.061 108.682L698.783 108.623L703.357 109.811L703.595 110.94L702.823 112.84L703.892 114.919L703.714 116.167L700.862 116.404L699.556 117.474L699.793 119.077L697.477 119.374L695.695 120.622L692.962 120.8L690.586 122.226L691.18 124.542L692.843 125.433L695.873 125.196L695.516 126.562L692.309 127.215L688.567 129.354L686.725 128.581L687.141 126.859L683.636 125.73L684.052 125.017L686.785 123.77L685.775 122.938L680.963 121.988L680.488 120.562L677.815 121.038L677.043 123.117L675.083 125.849L673.657 125.196L672.291 125.849L670.865 125.136L671.578 124.72L671.935 123.473L672.588 122.226L672.232 121.572L672.826 121.275L673.182 121.81L674.964 121.929L675.736 121.632L675.142 121.275L675.261 120.681L674.073 119.731L673.42 118.186L672.232 117.592L672.291 116.345L670.747 115.335L669.559 115.157L667.183 114.028L665.282 114.385L664.628 114.919H663.381L662.787 115.81L660.649 116.167L659.698 116.761L658.213 115.81H656.312L654.412 115.395L653.224 116.226L652.927 115.216L651.145 114.207L651.56 112.722L652.273 111.712L652.927 111.949L651.976 110.286L654.233 107.197L655.6 106.782L655.778 105.772L653.877 102.564L655.243 102.386L656.669 101.436L658.926 101.317L661.837 101.614L665.222 102.505L667.539 102.564L668.668 103.099L669.677 102.445L670.568 103.336L673.123 103.158L674.37 103.515L674.192 101.673L674.964 100.842L677.399 100.663L678.469 100.782L679.063 99.9507L679.954 100.129L682.864 99.7725L685.121 101.851L684.587 102.624L685.062 103.752L687.379 103.93Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M415.622 427.066L414.671 429.502L411.464 431.581L408.969 430.809L407.306 431.224L404.039 429.621L401.9 429.739L399.584 427.601L399.346 425.166L399.881 424.334L399.168 420.532L399.406 416.612L399.703 413.523L401.722 413.107L405.464 416.077L406.593 415.959L410.335 418.394L413.186 420.532L415.444 423.087L414.374 424.928L415.622 427.066Z"
                    fill="#00587F"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M803.506 137.253L804.516 137.61L802.734 140.045L805.466 141.471L807.367 140.52L811.644 142.54L808.495 145.272L806.06 144.916L804.813 144.975L804.04 143.965L804.159 142.183L800.298 143.074L800.001 145.51L799.11 147.589L796.497 147.411L796.14 149.074L798.635 149.965L800.061 152.816L799.288 156.677L796.734 155.845H794.952L794.477 153.529L789.903 151.866L786.161 150.024L783.666 148.242L779.449 145.629L776.895 141.708L775.647 140.995L772.38 141.174L771.014 140.401L769.885 137.431L765.193 135.412L763.173 137.61L760.916 138.916L761.926 140.817L758.421 140.877L754.738 126.977L761.866 124.779L762.52 125.076L767.985 127.749L770.836 129.175L774.756 132.561L778.142 132.026L783.25 131.729L787.765 134.461L788.656 138.263L790.2 138.322L791.685 141.411L795.665 141.53L797.031 143.312H798.219L798.754 140.58L801.961 137.966L803.506 137.253Z"
                    fill="#00587F"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M385.327 266.389L382.535 268.646L382.238 270.013L383.307 271.438L382.476 272.151L380.397 272.745V274.527L379.446 275.596L381.644 278.447L382.06 279.517L380.813 281.002L377.011 282.427L374.576 283.021L373.566 283.912L370.893 282.962L368.457 282.487L367.804 282.843L369.289 283.793L369.111 286.348L369.527 288.783L372.378 289.08L372.556 289.912L370.121 290.981L369.705 292.585L368.279 293.238L365.784 294.129L365.131 295.317L362.517 295.555L360.676 293.535L359.726 289.733L358.835 288.367L357.647 287.536L359.369 285.635L359.25 284.803L358.359 283.675L357.706 281.12L358.062 278.388L358.835 277.081L359.547 275.062L358.359 274.408L356.459 274.824L354.023 274.646L352.657 275.062L350.4 271.735L348.44 271.26L344.103 271.616L343.391 270.31L342.559 270.013L342.5 269.181L342.915 267.755L342.737 266.27L342.024 265.379L341.668 263.657L339.945 263.419L341.015 261.162L341.549 258.43L342.618 257.004L343.985 255.935L344.935 254.034L347.133 253.381L347.014 254.272L344.994 254.747L346.004 256.469L345.826 258.489L344.222 260.687L345.351 263.716L346.836 263.479L347.727 260.687L346.717 259.38V256.469L350.994 254.925L350.637 253.143L351.885 251.896L352.895 254.628L355.271 254.687L357.29 256.766L357.409 258.073H360.379L364.002 257.717L365.844 259.38L368.339 259.855L370.299 258.667L370.358 257.717L374.576 257.479L378.555 257.42L375.645 258.548L376.714 260.39L379.387 260.627L381.882 262.528L382.298 265.558L384.02 265.498L385.327 266.389Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M942.38 216.136L938.519 219.344L936.321 222.967L935.965 225.64L939.113 229.62L942.974 234.61L946.36 236.986L948.795 240.015L951.171 247.084L951.409 253.796L948.855 256.291L945.231 258.786L942.737 261.934L938.816 265.498L937.45 263.062L938.163 260.449L935.549 258.31L938.282 256.766L941.786 256.469L940.123 254.212L945.469 251.242L945.41 246.668L944.34 244.114L944.459 240.312L943.271 237.639L940.361 234.966L937.747 231.64L934.361 227.125L930.025 224.809L930.738 223.443L932.698 222.433L930.916 219.106H926.877L924.798 215.661L922.422 212.632L924.026 211.681L926.639 211.741L929.787 211.266L932.223 209.246L934.064 210.672L937.212 211.384L937.034 213.582L938.876 215.127L942.38 216.136Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M762.576 234.789L760.2 235.799L759.666 237.521V238.828L756.458 240.432L751.231 242.214L748.439 244.887L746.954 245.124L745.944 244.887L744.043 246.491L741.964 247.203L739.173 247.382L738.341 247.619L737.688 248.629L736.797 248.926L736.321 249.876L734.658 249.758L733.648 250.292L731.272 250.114L730.322 247.857V245.778L729.728 244.649L728.956 241.857L727.887 240.313L728.54 240.075L728.124 238.353L728.481 237.64L728.243 235.977L729.669 234.729L729.193 233.126L729.966 231.284L731.391 232.235L732.282 231.878L736.084 231.819L736.737 232.175L740.004 232.591L741.252 232.413L742.143 233.66L743.687 233.007L745.766 229.027L748.736 227.304L758.181 225.819L761.269 232.116L762.576 234.789Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M690.287 330.957L690.466 331.076L691.772 331.73L693.911 332.383L695.812 333.512L697.356 335.234L698.128 338.442L697.534 339.452L696.762 342.54L697.297 345.748L696.227 347.055L695.039 350.619L696.762 351.569L686.545 354.717L686.783 357.45L684.229 357.984L682.268 359.469L681.793 360.776L680.605 361.133L677.576 364.221L675.675 366.716L674.546 366.776L673.477 366.36L669.794 365.944L669.2 365.647V365.35L667.894 364.459L665.755 364.281L663.023 365.112L660.884 362.736L658.746 359.648L659.221 347.471L666.171 347.53L665.933 346.223L666.468 344.798L665.933 343.016L666.349 341.174L665.993 339.986L667.121 340.046L667.3 341.234L668.903 341.174L670.982 341.531L672.111 343.253L674.725 343.788L676.804 342.6L677.516 344.56L680.071 345.095L681.259 346.758L682.565 348.837H685.12L685.001 344.738L684.05 345.451L681.734 343.966L680.843 343.253L681.377 339.452L682.031 334.937L681.318 333.274L682.328 330.839L683.219 330.363L687.793 329.71L688.327 329.888L688.149 330.72L689.278 331.017L689.99 331.789L690.584 331.611L690.287 330.957Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M688.682 383.169L686.96 382.754L685.831 383.229L684.227 382.575H682.92L680.901 380.853L678.347 380.259L677.456 377.823L677.515 376.457L676.149 376.041L672.525 371.883L671.575 369.686L670.922 368.973L669.793 365.943L673.476 366.359L674.545 366.775L675.674 366.716L677.574 364.221L680.604 361.132L681.792 360.776L682.267 359.469L684.227 357.984L686.781 357.449L686.9 358.875L689.692 358.815L691.236 359.588L691.89 360.538L693.494 360.835L695.157 362.023L694.919 366.894L694.147 369.507L693.909 372.359L694.385 373.487L693.85 375.744L693.375 376.101L692.365 378.833L688.682 383.169Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M725.927 304.702L723.966 301.553L723.848 287.654L726.758 283.377L727.649 282.13L729.788 282.07L732.758 279.397L737.094 279.219L746.36 267.755L743.509 267.814L732.401 263.3L731.094 261.934L729.788 260.092L728.481 257.954L729.194 256.647L730.322 254.568L731.451 255.281L732.164 256.885L733.767 258.488H735.431L738.519 257.479L742.143 257.063L745.053 255.875L746.717 255.637L747.905 254.924L749.805 254.806L750.875 254.687L752.36 254.152L754.142 253.736L755.627 252.43H756.933L757.052 253.499L756.815 255.697L756.933 257.716L756.28 259.082L755.448 263.24L754.023 267.458L752.063 272.329L749.33 277.912L746.538 282.189L742.618 287.416L739.292 290.505L734.302 294.307L731.154 297.158L727.471 301.791L726.699 303.811L725.927 304.702Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M652.092 137.313L651.379 137.491L649.656 138.085L649.597 138.858L649.181 138.798L648.825 137.432L648.053 137.016L647.34 136.006L647.815 135.175L648.528 134.937L648.825 133.69L649.359 133.452L649.835 133.987L650.429 134.224L650.904 134.818L651.438 134.997L652.092 135.709L652.508 135.65L652.27 136.6L651.914 137.016L652.092 137.313Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M688.683 383.169L689.989 388.515L690.643 391.248L689.811 395.465L690.049 396.831L688.445 396.178L687.435 396.415L687.079 397.544L686.069 398.97L686.01 400.276L687.851 402.355L689.752 401.94L690.583 400.276H693.019L692.009 403.068L691.415 406.216L690.405 407.939L688.029 409.899L687.376 410.434L685.831 412.394L684.762 414.354L682.683 417.087L678.703 421.007L676.268 423.264L673.714 425.046L670.209 426.472L668.605 426.709L668.071 427.779L666.17 427.185L664.566 427.897L661.18 427.185L659.22 427.66L657.913 427.422L654.468 428.967L651.736 429.561L649.657 430.986L648.231 431.105L646.984 429.739L645.915 429.679L644.608 427.957L644.43 428.491L644.073 427.482L644.251 425.224L643.36 422.67L644.43 421.957L644.489 419.047L642.529 415.483L641.103 412.275V412.216L638.965 407.286L640.628 405.385L641.816 406.454L642.291 408.058L643.776 408.355L645.796 409.068L647.518 408.771L650.488 406.81L651.142 392.733L651.973 393.327L653.755 396.95L653.399 399.267L654.052 400.633L656.428 400.217L658.092 398.494L659.695 397.366L660.586 395.524L662.25 394.693L663.616 395.109L665.101 396.178L667.774 396.356L669.912 395.524L670.269 394.336L670.981 392.495L672.763 392.198L673.833 390.772L675.021 388.218L678.109 385.367L682.921 382.575H684.228L685.831 383.229L686.96 382.753L688.683 383.169ZM676.624 414.77L677.278 413.582L679.119 412.988L679.773 411.741L680.901 409.899L679.891 408.711L678.585 407.523L676.981 408.355L675.139 409.84L673.239 412.216L675.436 415.186L676.624 414.77Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1120.4 454.271L1119.93 455.815L1123.25 454.271L1122.96 455.875L1121.71 457.478L1119.21 459.201L1115 461.993L1112.21 463.537L1111.85 465.319L1109.47 465.379L1105.73 466.804L1102.94 469.24L1098.07 473.041L1094.33 474.704L1091.95 475.774L1089.22 475.714L1088.33 474.467L1085.3 474.229L1085.89 472.804L1089.75 470.071L1096.52 466.329L1099.08 465.616L1102.4 464.191L1106.56 462.23L1109.95 460.27L1113.51 457.478L1115.35 456.528L1117.43 454.39L1120.88 452.667L1120.4 454.271Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1137.63 436.154L1137.39 440.193L1139.11 437.58L1139.89 438.649L1138.46 441.5L1140.18 442.748L1142.08 443.045L1144.88 441.619L1146.18 442.035L1143.09 445.421L1140.6 447.618L1138.28 447.559L1136.62 448.688L1135.73 450.351L1134.78 451.004L1132.05 453.083L1128.54 455.637L1124.98 457.182L1125.27 456.172L1124.38 455.637L1128.48 452.549L1129.02 450.41L1126.76 448.925L1127.83 447.559L1130.98 446.252L1133.47 443.282L1134.96 440.847L1135.31 438.293L1135.79 437.639L1135.25 436.035L1134.84 432.709L1135.07 429.977L1136.38 429.68L1136.92 431.818L1138.82 432.768L1137.63 436.154Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M389.128 497.93L392.692 506.009H395.662L397.444 506.128L397.147 507.553L395.246 508.682L393.821 508.563L391.979 508.266L389.485 507.197L386.277 506.662L381.822 504.643L378.02 502.742L372.199 498.643L374.932 499.415L380.04 501.851L384.376 503.158L385.089 501.494L384.911 499L386.93 497.455L389.128 497.93Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M364.955 385.011L365.49 385.961L364.777 389.941L361.451 391.783L362.401 398.138L361.926 399.386L363.114 400.871L361.154 403.247L359.609 406.811L359.075 410.315L360.084 413.998L358.837 417.919L361.748 424.512L362.698 425.225L363.53 428.729L362.579 432.412L363.411 435.62L361.629 438.115L362.579 441.56L364.539 445.302L363.054 446.668L363.173 450.054L363.648 453.915L365.609 458.548L364.599 459.32L366.797 463.657L368.638 465.082L368.163 466.686L369.826 467.399L370.658 468.824L369.588 469.537L370.658 471.735L371.311 476.665L370.895 479.873L371.964 481.774L371.905 484.09L370.301 485.753L372.143 489.614L373.687 490.981L375.528 490.743L376.657 493.475L378.736 495.614L385.923 496.089L388.834 496.683H386.28L385.27 497.574L383.25 498.881L384.26 502.267L383.132 502.326L379.389 501.197L374.934 498.643L370.42 496.564L368.519 494.248L368.341 492.109L365.846 489.614L362.876 483.318L362.757 479.754L364.777 476.903L359.847 475.774L361.451 472.507L360.263 466.27L364.124 467.577L363.054 459.796L360.678 458.786L361.272 463.478L359.193 462.944L358.302 457.598L357.114 450.589L357.768 447.975L355.808 444.292L354.382 440.015L355.689 439.837L356.045 433.719L356.758 427.601L356.817 421.958L354.857 416.196L355.214 413.048L353.966 408.355L355.035 403.722L354.501 396.356V388.397L354.56 379.903L353.669 373.666L352.422 368.26L354.085 367.31L354.738 365.35L356.639 367.963L357.352 370.696L359.253 372.299L358.599 375.982L360.797 380.259L362.639 385.546L364.955 385.011Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M603.8 105.415L602.137 104.524L600.296 102.92L597.623 103.692L595.484 103.395L596.969 102.386L599.345 97.0395L603.206 95.4951L605.582 95.6139L606.117 96.8613L605.582 100.188L604.87 101.554H603.147L603.8 105.415Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M562.46 156.856L561.154 157.806L559.49 157.272L557.887 157.687L558.421 154.717L558.243 152.401L556.817 152.044L556.164 150.619L556.461 148.124L557.768 146.758L558.065 145.213L558.778 142.956V141.352L558.243 139.986L558.124 138.679L559.253 137.729L560.56 137.194L561.272 139.036H563.054L563.589 138.561L565.43 138.679L566.203 140.58L564.777 141.59L564.599 144.56L564.124 145.095L563.945 146.936L562.579 147.233L563.767 149.49L562.817 151.985L563.886 153.114L563.411 154.123L562.223 155.549L562.46 156.856Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1003.56 105.593L1011.7 112.127L1006.41 110.939L1008.61 116.285L1014.31 120.087L1016.09 122.7L1012.23 120.443L1012.29 123.354L1009.5 120.205L1007.24 116.582L1003.92 112.602L1002.49 109.751L998.69 104.88L993.938 101.257L989.899 96.2672L991.028 94.604L988.414 92.9409L989.186 92.4062L992.097 94.7822L996.195 98.2869L999.284 101.91L1003.56 105.593Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M650.193 92.5253L644.966 92.5847L641.461 92.1689L641.877 90.6245L645.619 89.4365L648.648 90.0899L649.955 90.6245L649.836 91.6343L650.193 92.5253Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M919.749 28.8489L916.244 28.9083L910.957 28.5519L910.363 28.3737L910.779 27.1857L913.274 26.8887L918.264 28.0767L919.749 28.8489Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M927.232 23.2056L926.579 24.3936L922.48 24.156L916.362 22.968L915.293 22.0176L920.223 22.4334L927.232 23.2056Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M912.088 21.7804L913.929 24.0376L905.435 23.9188L902.702 24.6316L895.277 22.6714L893.258 20.6518L895.337 20.1172L901.396 20.236L912.088 21.7804Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M723.967 36.6296L722.66 36.8672L714.641 36.4514L713.275 35.0852L708.583 34.2536L707.395 32.531L709.474 31.8776L708.523 30.2144L711.731 27.6008L709.355 27.2444L713.335 24.5714L711.85 23.2052L715.889 21.6608L722.007 19.76L728.957 19.2254L731.927 18.1562L735.907 17.7998L738.401 18.9284L737.629 19.8194L730.858 21.3044L724.977 22.6706L719.809 25.5218L718.146 28.4918L716.186 31.4618L718.027 34.016L723.967 36.6296Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M987.05 137.432L986.219 136.779L985.09 134.818L986.575 134.759L984.259 130.304L981.467 127.096L983.189 125.79L987.288 126.443L986.932 122.76L985.268 118.721L985.447 117.355L984.674 113.969L980.576 115.098L979.031 116.523H974.517L970.953 113.078L965.607 110.405L959.667 109.217L955.984 105.653L953.311 103.396L951.054 101.792L946.48 98.1091L942.916 96.8023L937.808 95.6737L934.125 95.7925L931.096 96.4459L930.086 98.2873L932.284 99.1189L933.769 101.139L932.996 102.327L933.115 106.188L934.244 107.851L931.63 110.167L927.235 108.742L923.908 109.098L921.592 107.851L919.572 107.435L916.958 110.049L913.454 110.643L911.315 111.593L907.276 110.999H904.544L901.633 109.098L897.713 107.376L894.505 106.841L891.119 107.316L888.743 108.029L883.694 106.485L881.556 103.752L877.576 102.802L874.725 102.327L870.567 100.842L869.795 104.643L872.171 106.782L870.745 109.395L865.993 108.445L863.023 108.326L860.172 106.603L857.083 106.544L853.935 105.415L850.43 107.138L846.451 110.286L843.659 110.94L842.649 111.237L840.035 108.979L836.471 109.514L834.511 107.91L832.135 107.197L829.7 105.059L827.74 104.406L824.057 105.356L819.067 103.277L818.414 105.178L807.544 95.9113L802.554 93.1195L803.029 91.9315L797.564 95.3767L794.951 95.5549L794.297 93.5947L790.08 92.3473L787.526 93.2383L784.912 89.4961L779.507 88.7239L777.665 90.2089L771.191 91.5751L770.181 92.4661L760.083 93.7135L759.251 94.9609L762.281 97.4557L759.905 98.4061L760.796 99.3565L758.717 101.139L764.3 103.693L764.182 105.415L760.024 105.237L759.548 106.366L755.212 104.465L750.638 104.524L748.025 106.069L744.104 104.584L736.976 102.03L732.462 102.148L727.651 106.128L728.007 108.801L724.443 106.663L723.136 110.761L724.205 111.474L723.196 114.325L726.344 116.82L728.482 116.701L731.036 119.196L731.155 121.097L732.818 121.75L731.987 123.948L729.254 124.542L727.116 128.403L730.68 132.027L730.918 134.521L735.254 138.976L733.769 140.521L733.412 141.471L731.987 141.174L729.433 138.917L728.542 138.798L726.403 137.907L725.156 136.363L722.126 135.591L720.404 136.185L719.691 135.472L715.177 133.63L710.603 133.036L707.87 132.383L707.633 132.858L703.118 129.651L699.436 128.225L696.406 126.027L698.545 125.433L700.445 122.344L698.485 120.859L702.584 119.315L702.346 118.483L699.792 119.077L699.554 117.474L700.861 116.404L703.712 116.167L703.891 114.919L702.821 112.84L703.594 110.94L703.356 109.811L698.782 108.623L697.06 108.682L694.921 106.96L692.783 107.554L688.803 106.247L688.744 105.534L687.377 103.93L685.061 103.752L684.586 102.624L685.12 101.851L682.863 99.7723L679.952 100.129L679.061 99.9505L678.467 100.782L677.398 100.663L676.21 98.2873L675.319 97.0993L675.794 96.7429L678.111 96.8617L679.061 96.0895L678.052 95.1391L676.032 94.4857V93.8323L674.785 93.1789L672.527 90.8029L672.943 89.8525L672.29 88.1299L669.439 87.2983L668.013 87.7141L667.478 86.8231L664.33 85.9321L663.083 83.7937L662.489 82.0711L661.004 81.2989L661.954 80.1703L660.529 76.8439L662.073 74.8243L661.538 74.2303L664.211 72.2701L661.004 70.6069L665.756 66.2113L667.775 64.1917L668.31 62.4691L663.914 60.1525L664.449 57.8953L661.538 55.4005L662.548 52.5493L658.687 48.8071L660.41 46.3123L656.074 44.1145L655.836 41.8573L657.737 41.5603L661.538 40.3129L663.736 39.1843L668.31 41.0851L675.26 41.8573L685.774 45.5401L688.209 47.0845L689.1 49.2823L686.902 51.0049L683.041 51.8959L671.042 49.4011L669.32 49.8169L674.131 52.2523L674.725 53.7967L675.854 57.2419L679.477 58.2517L681.734 59.1427L681.616 57.4795L679.596 56.0539L680.843 54.7471L687.734 56.8855L689.635 56.0539L687.08 53.5591L691.892 50.3515L694.327 50.5297L697.06 51.6583L697.713 49.4011L694.921 47.4409L695.396 45.4807L692.842 43.4611L700.148 44.5303L702.287 46.3123L699.257 46.7281L699.97 48.5695L702.406 49.6981L705.97 48.9853L705.732 46.9063L710.306 45.3025L717.671 42.5701L719.572 42.6889L718.087 44.6491L721.295 45.0055L722.542 43.8769L727.116 43.8175L730.086 42.4513L733.888 44.4115L735.551 42.2731L731.987 40.4317L732.7 39.3625L740.422 40.3129L744.342 41.3227L755.39 45.0055L756.044 43.3423L752.539 41.6197L752.064 40.9663L748.916 40.6099L748.797 39.1249L746.005 36.6301L745.352 35.6203L747.906 32.8285L747.55 29.9773L748.856 29.3833L755.628 30.2149L757.351 31.9375L756.816 34.4323L759.014 35.4421L761.271 37.6399L763.528 42.0355L767.508 43.9957L767.805 46.1935L765.726 50.8267L768.874 51.3019L769.171 50.1139L771.428 49.2823L771.131 47.6785L772.26 46.0747L769.646 44.2333L769.409 42.0949L766.558 41.8573L764.835 40.0753L764.597 36.8677L759.727 34.3135L762.518 32.2345L760.321 30.0367L761.449 29.9773L763.944 31.6405L765.191 34.6699L768.161 35.2639L765.429 33.0067L768.458 31.7593L773.27 31.5811L778.972 33.3631L774.874 30.8089L771.963 27.5419L775.468 26.9479L781.111 27.0667L785.744 26.6509L782.417 25.1065L783.19 23.1463L785.684 23.0275L788.595 21.6019L794.119 21.1861L794 20.3545L799.525 20.1169L802.079 20.7703L805.286 19.2259L809.444 19.2853L808.553 17.9785L809.088 16.7905L812.771 15.6025L817.701 16.5529L815.622 17.2657L821.206 17.6815L823.641 19.1071L824.77 18.3943L831.244 18.4537L838.135 19.8793L841.402 20.9485L842.887 22.4929L841.461 23.3839L837.541 25.0471L836.887 25.9381L840.214 26.3539L844.49 27.1261L845.916 26.5321L849.361 28.4923L849.48 27.7201L852.569 27.2449L860.647 27.7201L862.904 29.1457L873.24 29.6209L870.389 27.3043L876.032 27.8389L879.655 27.7795L885.536 29.3833L889.1 31.3435L889.337 32.6503L895.337 35.1451L900.683 36.3925L898.901 33.1255L904.484 34.4917L907.454 33.6601L913.276 34.6105L913.87 33.7789L918.384 34.1947L912.8 31.2841L914.048 29.9773L938.045 31.9969L942.738 33.8383L952.42 36.2143L961.211 35.6203L966.736 36.1549L970.656 37.4617L973.685 39.7783L978.022 40.6693L980.338 40.0159L984.496 39.9565L990.02 40.5505L994.119 40.1941L1002.61 43.0453L1004.1 42.0355L999.049 40.0159L997.98 38.5903L1007.07 39.4813L1011.82 39.3031L1021.21 40.7881L1026.85 42.2137L1046.57 55.3411L1045.38 56.8261L1041.7 56.5885L1046.57 58.3705L1051.97 61.1623L1054.47 62.0533L1056.73 63.4789L1057.32 64.3699L1051.38 63.6571L1047.46 66.2113L1045.68 66.6271L1044.73 69.0625L1043.54 71.2009L1044.55 72.8047L1037.72 70.3693L1034.1 73.1017L1031.3 71.7949L1030.47 73.3393L1026.31 72.8047L1028.16 75.1213L1028.81 78.5665L1030.53 79.9921L1034.57 80.7643L1039.98 85.9321L1037.54 86.1103L1039.56 89.0803L1042.35 90.6247L1039.38 92.4661L1042.59 96.6241L1039.2 97.5151L1041.88 101.198L1040.87 104.643L1037.48 102.089L1031.24 96.8023L1021.62 88.7239L1017.76 83.7937L1017.82 81.6553L1016.16 79.9921L1019.54 79.2199L1019.42 74.7649L1019.84 71.2009L1021.32 68.4091L1017.4 63.5383L1014.61 63.8353L1016.51 66.6865L1014.37 70.4881L1007.07 66.2113L1001.66 67.3993V73.2205L1006.24 75.3589L1001.19 76.3093L997.386 76.6657L994.832 74.1115L990.08 73.5769L988.595 75.2995L979.625 74.7055L971.785 75.7153L969.706 82.6651L966.736 91.0999L971.606 91.5751L974.992 93.8323L978.437 94.6045L978.675 92.8225L982.001 93.0601L989.605 97.0399L992.396 100.129L993.228 103.812L996.495 108.207L999.643 114.088L999.049 119.493L999.821 122.047L998.633 126.443L997.386 130.779L996.851 132.977L994.119 135.175L992.278 135.234L989.189 133.393L986.753 136.185L987.05 137.432Z"
                    fill="#00587F"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <g clip-path="url(#clip1)">
                    <path
                      d="M827.897 42.8369C826.197 39.9043 823.179 38.1127 819.823 38.0442C819.679 38.0413 819.535 38.0413 819.392 38.0442C816.035 38.1127 813.017 39.9043 811.318 42.8369C809.581 45.8344 809.533 49.435 811.191 52.4686L818.134 65.1772C818.137 65.1829 818.14 65.1885 818.143 65.1941C818.449 65.725 818.996 66.042 819.607 66.042C820.219 66.042 820.766 65.725 821.071 65.1941C821.074 65.1885 821.078 65.1829 821.081 65.1772L828.024 52.4686C829.681 49.435 829.634 45.8344 827.897 42.8369ZM819.607 50.7295C817.436 50.7295 815.67 48.9632 815.67 46.792C815.67 44.6209 817.436 42.8545 819.607 42.8545C821.778 42.8545 823.545 44.6209 823.545 46.792C823.545 48.9632 821.778 50.7295 819.607 50.7295Z"
                      fill="#E5F7FF"
                    />
                  </g>
                  <g clip-path="url(#clip2)">
                    <path
                      d="M788.155 111.582C786.455 108.649 783.437 106.858 780.08 106.789C779.937 106.786 779.793 106.786 779.65 106.789C776.293 106.858 773.275 108.649 771.576 111.582C769.839 114.58 769.791 118.18 771.448 121.214L778.392 133.922C778.395 133.928 778.398 133.934 778.401 133.939C778.707 134.47 779.254 134.787 779.865 134.787C780.476 134.787 781.024 134.47 781.329 133.939C781.332 133.934 781.335 133.928 781.338 133.922L788.282 121.214C789.939 118.18 789.892 114.58 788.155 111.582ZM779.865 119.475C777.694 119.475 775.928 117.708 775.928 115.537C775.928 113.366 777.694 111.6 779.865 111.6C782.036 111.6 783.803 113.366 783.803 115.537C783.803 117.708 782.036 119.475 779.865 119.475Z"
                      fill="#E5F7FF"
                    />
                  </g>
                  <g clip-path="url(#clip3)">
                    <path
                      d="M847.233 199.662C845.533 196.729 842.515 194.938 839.159 194.869C839.015 194.866 838.871 194.866 838.728 194.869C835.371 194.938 832.353 196.729 830.654 199.662C828.917 202.66 828.869 206.26 830.527 209.294L837.47 222.002C837.473 222.008 837.476 222.014 837.479 222.019C837.785 222.55 838.332 222.867 838.943 222.867C839.554 222.867 840.102 222.55 840.407 222.019C840.41 222.014 840.414 222.008 840.417 222.002L847.36 209.294C849.017 206.26 848.97 202.66 847.233 199.662ZM838.943 207.555C836.772 207.555 835.006 205.788 835.006 203.617C835.006 201.446 836.772 199.68 838.943 199.68C841.114 199.68 842.881 201.446 842.881 203.617C842.881 205.788 841.114 207.555 838.943 207.555Z"
                      fill="#E5F7FF"
                    />
                  </g>
                  <g clip-path="url(#clip4)">
                    <path
                      d="M1030.91 376.894C1029.21 373.962 1026.19 372.17 1022.83 372.102C1022.69 372.099 1022.55 372.099 1022.4 372.102C1019.05 372.17 1016.03 373.962 1014.33 376.894C1012.59 379.892 1012.54 383.493 1014.2 386.526L1021.15 399.235C1021.15 399.24 1021.15 399.246 1021.16 399.252C1021.46 399.783 1022.01 400.1 1022.62 400.1C1023.23 400.1 1023.78 399.783 1024.08 399.252C1024.09 399.246 1024.09 399.24 1024.09 399.235L1031.04 386.526C1032.69 383.493 1032.65 379.892 1030.91 376.894ZM1022.62 384.787C1020.45 384.787 1018.68 383.021 1018.68 380.85C1018.68 378.678 1020.45 376.912 1022.62 376.912C1024.79 376.912 1026.56 378.678 1026.56 380.85C1026.56 383.021 1024.79 384.787 1022.62 384.787Z"
                      fill="#E5F7FF"
                    />
                  </g>
                  <path
                    d="M812.059 13.9391L801.307 15.0083L800.535 11.3849L801.842 11.0879L803.683 11.2661L811.168 12.8105L812.059 13.9391Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M691.892 7.99923L689.338 8.29623L687.615 8.53383V8.94963L685.477 9.36543L682.804 8.77143L683.457 7.93983L678.824 7.88043L682.566 7.40523H685.655L686.546 8.05863L687.318 7.46463L688.982 7.04883L692.427 7.58343L691.892 7.99923Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M798.99 12.3352L794.772 12.6916L787.822 11.9194L783.011 10.9096L779.091 9.00877L775.586 8.53357L778.794 6.81097L782.476 6.27637L788.179 7.46437L796.317 9.95917L798.99 12.3352Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M580.099 132.917L581.287 134.343L586.93 136.066L588.059 135.234L591.504 136.957L595.009 136.481L595.246 138.679L592.336 141.174L588.415 142.006L588.118 143.253L586.218 145.332L585.03 148.421L586.218 150.619L584.436 152.282L583.723 154.777L581.347 155.549L579.149 158.459L575.11 158.519L572.14 158.459L570.12 159.766L568.873 161.192L567.328 160.895L566.2 159.588L565.368 157.45L562.458 156.856L562.22 155.549L563.408 154.123L563.883 153.113L562.814 151.985L563.764 149.49L562.576 147.233L563.943 146.936L564.121 145.094L564.596 144.56L564.774 141.59L566.2 140.58L565.428 138.679L563.586 138.56L563.052 139.036H561.27L560.557 137.194L559.25 137.729L558.121 138.679L558.418 136.006L557.23 134.402L561.626 131.67L565.309 132.323H569.407L572.615 132.977L575.169 132.739L580.099 132.917Z"
                    fill="#00587F"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M615.206 137.67L614.315 140.58L612.889 139.808L612.117 137.313L612.652 135.888L614.553 134.462L615.206 137.67Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M602.555 110.108L603.208 110.405L604.04 110.345L605.466 111.296L609.742 112.009L608.317 114.503L608.079 117.176L607.307 117.83L605.941 117.473L606.06 118.424L603.921 120.503V122.225L605.347 121.631L606.416 123.235L606.357 124.304L607.248 125.73L606.238 126.859L607.129 129.769L608.792 130.244L608.495 131.848L605.822 133.987L599.763 132.977L595.368 134.224L595.011 136.481L591.507 136.957L588.061 135.234L586.933 136.066L581.29 134.343L580.102 132.917L581.706 130.66L582.3 123.176L579.27 119.255L577.072 117.355L572.558 115.929L572.32 113.197L576.181 112.424L581.112 113.375L580.221 109.157L583.012 110.761L589.784 107.91L590.675 104.881L593.17 104.108L593.645 105.415L594.952 105.475L596.377 106.96L598.456 108.682L599.941 108.385L602.555 110.108Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M70.5654 225.522L69.912 226.176L69.1992 225.641L69.5556 224.572L69.318 223.146L69.615 222.73L70.3278 222.136L70.2684 221.364L70.506 221.008L70.7436 221.067L71.8722 221.721L72.4068 222.077L72.8226 222.552L73.3572 223.918L73.2384 224.097L71.7534 224.928L70.5654 225.522Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M70.15 219.582L68.962 219.819L68.6056 219.047L68.3086 218.75V218.513L68.7244 218.156L69.7936 218.513L70.5064 219.107L70.15 219.582Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M68.3704 217.562L68.1922 217.978L66.4102 217.859L66.7666 217.384L68.3704 217.562Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M65.5766 216.968L65.339 217.206L65.1014 217.147L63.9728 217.028L63.7946 216.137L63.6758 216.018L64.6856 215.483L64.9232 215.721L65.5766 216.968Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M60.5897 214.474L60.1145 214.83L59.1641 214.177L59.4017 213.88L59.9957 213.523L60.7679 213.583L60.5897 214.474Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M320.465 115.751L316.841 116.939L314.05 118.424L311.317 120.028L311.02 120.562L314.406 119.79L315.653 121.038L318.386 120.147L321.296 118.899L324.504 117.652L322.663 119.612L324.148 120.087L325.633 121.513L328.662 120.681L331.691 120.384L331.87 121.453L332.761 121.572L333.473 121.691L334.364 123.176L331.573 123.532H331.513L329.315 123.117L326.642 123.829L324.445 124.186L321.653 126.621L319.871 127.987L320.108 128.403L323.375 125.968H323.791L320.999 128.878L319.277 131.492L317.792 133.63L317.435 135.472L316.96 136.363L316.604 137.373L316.663 139.333L316.841 139.63L317.911 139.57L318.861 139.155L319.693 138.679L321.653 136.838L322.722 134.343L322.663 132.027L323.494 130.423L325.039 128.581L326.286 127.275L327.89 126.384L327.652 127.631L328.959 125.79L329.731 125.433L330.741 124.008L332.998 124.78L334.661 126.205L334.186 127.928L333.236 129.651L330.979 131.136L330.741 132.086H331.335L333.889 130.482L334.84 130.839L334.543 133.036L334.127 134.581L331.929 136.66L330.741 137.967L329.137 139.392L330.741 140.164L332.226 140.402L334.602 139.867L336.8 138.858L338.582 138.323L341.314 137.254L344.759 134.997L344.819 134.64L344.997 133.512L346.601 133.036L348.917 133.215L351.293 133.512L354.026 132.264L354.382 130.779L354.263 130.245L358.303 127.631L359.906 126.978L364.54 126.918H370.064L370.717 126.027L371.727 125.849L373.212 125.255L374.875 123.532L376.776 120.622L380.043 117.83L380.696 118.78L382.894 118.186L383.845 119.256L382.122 124.305L383.429 126.443L383.548 127.69L379.746 129.472L376.182 130.779L372.618 131.908L370.242 134.165L369.47 134.997L368.757 137.016L369.173 138.976L370.42 139.095L370.539 137.729L371.192 138.561L370.598 139.63L368.341 140.224L366.856 140.164L364.361 140.818L362.995 140.996L361.154 141.174L358.184 142.303L362.995 141.59L363.649 142.303L358.956 143.431H356.996L357.233 142.956L355.986 144.025L356.818 144.204L355.333 146.936L352.184 149.847L352.244 148.837L351.59 148.659L350.878 147.708V149.787L351.472 150.441L351.115 151.866L349.69 153.351L347.017 156.381L346.779 156.262L348.502 153.648L347.314 152.223L347.908 149.015L346.779 150.678V153.114L344.878 152.52L346.66 153.708L345.769 157.331L346.601 157.628V158.935L346.007 162.736L343.274 165.528L339.651 166.657L337.037 168.914L335.374 169.152L333.355 170.577L332.582 171.825L328.484 174.319L326.227 176.161L324.148 178.418L323.019 181.091V183.764L323.375 187.031L324.266 189.704L323.969 191.367L324.742 195.763L324.148 198.376L323.791 199.861L322.603 202.178L321.534 202.653L319.99 202.178L319.752 200.515L318.683 199.624L317.495 196.357L316.544 193.446L316.307 191.961L317.495 189.407L317.02 187.328L315.178 184.12L314.05 183.526L310.426 185.308L309.892 185.071L308.704 183.289L306.922 182.338L303.12 182.873L300.388 182.398L297.833 182.695L296.348 183.289L296.705 184.299L296.289 185.843L296.764 186.615L296.051 187.09L294.982 186.556L293.616 187.269L291.299 187.15L289.339 185.13L286.429 185.605L284.29 184.714L282.211 185.011L279.241 185.902L275.618 188.694L271.994 190.357L269.797 192.139L268.668 193.862L268.074 196.535L267.836 198.317L268.193 199.624L266.886 199.743L264.748 198.911L262.431 197.723L261.896 195.941L261.778 193.268L260.352 191.13L259.817 188.872L258.867 186.259L256.966 184.714L254.293 184.833L251.442 187.803L249.066 186.675L247.7 185.546L247.462 183.408L246.987 181.447L245.561 179.784L244.314 178.537L243.542 177.171H237.958L237.483 178.774H234.929H228.514L222.039 176.101L217.881 174.26L218.416 173.488L214.198 173.904L210.456 174.201L210.634 172.3L209.387 170.102L208.08 169.627L208.139 168.558L206.417 168.32L205.704 167.31L202.853 166.954L202.318 166.3L202.793 164.221L201.308 160.42L201.011 155.133L201.546 154.242L200.774 152.995L199.883 149.787L200.952 146.698L200.417 144.619L202.734 141.471L204.397 138.264L205.051 135.353L208.318 131.789L210.694 128.403L213.07 125.017L215.624 119.968L216.693 116.82L216.931 115.098L217.762 114.325L221.207 115.632L220.613 119.137L221.92 118.127L223.405 115.098L224.356 112.068H232.731H241.463H244.314H253.283H262.015H270.806H279.657H289.636H299.734H305.793L306.565 110.643H307.575L307.04 112.662L307.634 113.256L309.595 113.494L312.327 114.088L314.644 115.216L317.257 114.741L320.465 115.751Z"
                    fill="#00587F"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M163.352 82.546L159.194 83.9122L158.719 82.9618L160.085 81.2986L163.887 80.0512L165.966 79.5166L167.51 79.7542V80.8828L163.352 82.546Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M140.184 72.6857L137.868 73.2203L136.858 72.5669L136.383 71.6165L139.769 71.0225L141.551 71.3789L140.184 72.6857Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M140.896 59.3799L141.609 59.9739L143.688 59.6769L144.638 60.5679L146.598 60.9837L145.886 61.3995L142.975 62.1123L141.965 61.3401L141.787 60.7461L139.233 60.9243L139.055 60.6273L140.896 59.3799Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M243.542 39.7781L228.929 51.8958L207.783 71.3195L210.278 71.4384L211.941 72.3887L212.238 73.9331L212.416 76.1903L216.931 74.2301L220.792 73.1015L220.435 74.943L220.91 76.3685L221.861 77.9723L221.207 80.4672L220.376 84.5658L223.108 86.823L221.207 89.0802L218.178 90.8027L217.822 89.496L216.337 88.3079L218.297 85.2192L217.346 82.3085L218.95 78.9822L216.515 78.7445L212.297 78.6852L210.04 77.616L208.08 73.9925L206.12 73.3391L202.734 72.0918L198.695 72.3887L195.131 70.785L193.527 69.2999L189.785 70.0127L187.706 72.4481L185.983 72.6857L182.063 73.3985L178.38 74.5865L174.578 75.3587L176.479 73.2798L181.469 69.8345L185.508 68.7654L185.746 67.9338L180.162 69.8345L175.766 72.1511L169.114 74.646L169.232 76.3685L163.886 78.8633L159.313 80.3483L155.392 81.477L153.016 83.0213L146.72 84.8628L144.047 86.526L139.176 88.0703L137.572 87.8327L133.889 88.7832L129.731 90.0305L126.108 91.2185L120.168 92.2878L120.406 91.6343L125.276 89.9712L129.197 88.8425L134.305 86.8823L138.166 86.526L141.136 85.041L147.314 82.9025L148.68 82.1898L152.066 80.9423L155.511 78.2693L159.194 76.1903L154.858 77.2595L154.679 76.6062L151.769 77.913L152.006 76.131L149.868 77.3783L150.818 75.6558L146.482 77.0219H144.819L147.017 74.943L148.977 73.6362L148.739 72.3887L144.463 73.1015L144.106 71.4384L143.334 70.6068L145.71 68.6465L145.472 67.1615L148.977 65.2014L153.551 63.2411L156.699 61.5185L159.134 61.281L160.204 61.8155L164.421 60.1524L165.906 60.4494L169.232 59.3801L170.717 57.8358L170.064 57.2418L173.628 55.935L171.965 55.9944L168.282 56.7071L166.559 57.4794L165.49 56.7071L161.392 57.123L158.659 56.2914L159.372 54.9251L158.778 53.0244L164.243 51.5988L172.084 49.995H174.163L171.608 51.6581L177.073 51.5394L177.786 49.4604L176.42 48.213L176.895 46.5498L176.479 45.1835L174.519 44.1737L178.38 42.4511L182.835 42.3324L188.062 40.9068L190.913 39.3624L195.606 37.818L198.457 37.4616L205.11 36.036L206.951 36.2736L213.129 34.6104L215.743 35.2638L215.446 36.6894L217.406 36.0954L221.148 36.2736L220.019 36.9864L222.93 37.521L225.841 37.224L229.523 38.1744L233.8 38.5308L235.107 38.8871L239.027 38.412L241.463 39.3624L243.542 39.7781Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M402.316 289.496L403.207 287.832L403.504 286.11L404.098 284.506L402.851 282.249L402.673 279.635L404.514 276.368L405.643 276.784L408.078 277.675L411.583 280.883L412.058 282.427L410.038 285.932L408.969 288.723L407.662 290.208L406.059 290.446L405.583 289.377L404.811 289.258L403.801 290.268L402.316 289.496Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M352.184 250.885L351.887 250.767L351.59 250.47L351.649 250.113L351.768 250.291L352.006 250.529L352.184 250.826V250.885Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M376.716 228.848H376.598L376.776 228.61H376.953L376.835 228.788L376.716 228.848Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.4542 352.638L16.276 352.875L16.1572 353.054L16.0384 353.113L15.8008 352.935L15.9196 352.816H16.0978L16.1572 352.697L16.4542 352.638Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.3753 352.637L20.0788 352.696L20.0195 352.578L20.2567 352.519L20.3753 352.637Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M380.576 233.006L380.932 233.185L380.814 233.363H380.695L380.279 233.422L380.16 233.363V233.066L380.338 233.006L380.398 232.828H380.517L380.576 233.006Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M380.576 230.809H380.695L380.813 230.927L380.873 231.165L380.813 231.343L380.695 231.403L380.635 231.284L380.457 231.165V230.868L380.576 230.809Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M750.876 198.198L751.054 198.258L751.173 198.198L751.41 198.614L751.351 198.733L751.41 199.267V199.683L751.292 199.921L751.232 199.683L750.876 199.208L750.935 198.97L750.816 198.555V198.317L750.876 198.198Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M344.757 217.621L344.52 217.918L344.401 218.215L344.044 218.393H343.747L343.688 218.334L343.45 218.453L343.153 218.512L342.797 218.393L342.559 218.453L342.5 218.156L342.678 218.037L342.797 217.859L343.035 217.74L343.213 217.502H343.45L343.629 217.384L343.747 217.562L344.044 217.681L344.341 217.562L344.757 216.968H344.935V217.087L344.757 217.621Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M344.876 216.611L344.758 216.255L345.114 216.077L345.291 216.255V216.374L345.114 216.433L344.876 216.611Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M345.113 212.751L345.231 212.691L345.528 212.869H345.766L346.004 212.929L346.182 213.048V213.226L346.063 213.285L345.766 213.048H345.528L345.469 212.988L345.172 213.107L344.875 212.988V212.929L344.994 212.632L345.113 212.751Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M342.796 211.682L342.677 211.919V212.335L342.618 212.573L342.38 212.751L342.261 212.988L342.024 213.167L341.608 213.345L341.548 213.464L341.43 213.345L341.489 213.226L341.727 213.167L341.845 213.048V212.929L342.083 212.87L342.202 212.632L342.439 212.573L342.618 212.335L342.499 212.157H342.261L342.142 212.038L342.38 211.741L342.439 211.682H342.796Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M341.667 211.504L341.727 211.563H341.964L342.202 211.682L341.964 211.92L341.905 211.801H341.786L341.549 211.742L341.311 211.623L341.133 211.266L341.311 211.207L341.549 211.266L341.667 211.504Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M336.206 207.999L336.562 208.415L336.74 208.534L336.918 208.831L336.74 208.771L336.681 208.652L336.503 208.593L336.265 208.355L336.146 208.296L336.027 208.058L336.206 207.999Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M338.403 207.999L338.581 208.355L338.7 208.652V208.89L338.819 209.009L338.938 209.425V209.959L339.057 210.137L339.354 210.256L339.591 210.613V211.088L339.354 210.672V210.553L339.175 210.316L338.819 210.197L338.938 210.078L338.76 209.9V209.722L338.878 209.543L338.819 209.246L338.641 209.009L338.7 208.949L338.522 208.712L338.463 208.355L338.344 208.415L338.403 207.999Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M340.122 207.998L339.944 208.117L339.766 208.057L339.707 207.939L340.063 207.82L340.122 207.998Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M335.253 206.87L335.193 206.811L335.016 206.396H335.134L335.253 206.87Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M341.491 206.573L341.253 206.93H341.016L341.134 206.751L341.194 206.395L341.431 206.217L341.491 206.454V206.573Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M330.502 205.86L330.324 205.919L330.205 206.097L330.027 206.038L330.383 205.801L330.502 205.86Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M330.621 206.276L330.858 206.395L330.977 206.276L331.036 205.979L331.155 205.92L331.274 206.276V206.573L331.215 206.752L331.274 207.108V207.286L331.036 207.761L330.918 207.821L330.68 207.702L330.799 207.524L331.036 207.405L330.977 207.346L330.621 207.583L330.502 207.464L330.739 207.286H330.502L330.383 207.346L330.264 207.227V206.811L330.324 206.692L330.086 206.395V206.276L330.324 206.158L330.383 205.979L330.561 205.92L330.621 205.801L330.977 205.623L331.036 205.861L330.739 206.098L330.621 206.276Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M338.641 205.92L338.701 206.217L338.582 206.157L338.285 206.217L338.047 206.276L337.988 206.157L338.166 206.038L338.404 205.86V205.741L338.166 205.623L338.047 205.266L337.988 204.91L337.75 204.672V204.553L337.453 204.256L337.631 204.078L337.869 204.316V204.613L337.988 204.791L338.047 205.088L338.225 205.385L338.463 205.563L338.522 205.741L338.641 205.92Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M332.522 202.653L332.7 202.772L332.344 202.95L332.166 202.891L332.047 203.01L331.75 202.95L331.869 202.772L332.106 202.653H332.522Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M330.027 202.356L330.265 202.237L330.443 202.415L330.384 202.534L330.443 202.653L330.324 202.891L330.502 203.069L330.621 203.603L330.74 203.782L330.978 204.079L330.859 204.494L330.918 204.851L330.799 205.029L330.621 205.088L330.384 205.326L330.205 205.445H330.027L329.849 205.564H329.671V205.326L329.493 205.207L329.552 204.851L329.374 205.029L329.255 204.97L328.899 204.732L328.72 204.554L328.602 204.376L329.017 204.197L329.314 204.613L329.374 204.257L329.196 204.197L329.136 204.019L329.196 203.841L329.552 203.485L329.671 203.247L329.611 203.188L329.79 202.95V202.653L329.671 202.237L329.73 202.178H329.908L330.027 202.356Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M334.836 200.812L334.895 200.93L335.074 201.168L335.549 201.584L335.846 201.643L335.905 201.703L336.024 201.94L336.202 202.178L336.499 202.415V202.534L336.38 203.009L336.321 203.128V203.306L336.262 203.603L336.143 203.782L336.083 204.197L336.024 204.257L335.905 203.9L335.668 203.722L335.727 203.603L336.024 203.663L336.143 203.544L336.083 203.425L336.143 203.188L336.321 202.95L336.38 202.653V202.475L336.083 202.237L335.846 201.821L335.668 201.703L335.311 201.524L335.133 201.346L334.777 201.227L334.539 201.346L334.777 200.812H334.836Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M329.609 196.357L329.906 196.475H329.966L330.381 196.535L330.5 196.416L330.619 196.475H330.916L331.154 196.357H331.391L331.569 196.238L331.629 196.535L331.569 196.654H331.391H331.154L330.5 196.772H330.322L329.431 197.01L329.015 197.248H328.778L328.659 197.188L328.481 197.01L328.184 196.654L328.54 196.832L328.599 196.951H328.896L329.193 196.832L329.431 196.475L329.253 196.416L329.372 196.238L329.431 196.06L329.609 196.357Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M332.164 195.584L332.639 195.703L332.758 195.643L332.996 195.822L333.53 196.416L333.649 196.772L333.887 196.831L334.303 197.128V197.247L334.184 197.544L334.303 197.96H334.065L333.768 198.198L333.709 198.316L333.53 198.91L333.471 199.445L333.352 199.564L333.174 199.445L333.115 199.207L332.877 199.148L333.055 198.851H333.174L333.471 198.613L333.412 198.376L333.53 198.138V197.96L333.649 197.782V197.425L333.768 197.366L333.887 197.188L333.946 197.01L333.768 196.95L333.471 196.891L333.412 196.713V196.594L333.174 196.475V196.297L332.996 195.881L332.877 195.822L332.699 195.881L332.402 195.822H332.224L331.867 195.584H332.164Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M377.309 230.096L377.25 229.918L377.428 229.977L377.309 230.096Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M378.556 174.853H378.378L378.319 174.913L378.378 175.031L378.141 175.15L378.082 175.09L378.201 175.031H378.26L378.319 174.853L378.497 174.794L378.556 174.853Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M386.99 248.509L386.634 248.391L386.574 248.094V247.618L386.693 247.381L386.812 247.5L386.931 247.856L387.228 248.034L387.287 248.272L386.99 248.509Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M732.521 345.509L731.986 345.45L731.867 345.212V345.034L732.164 345.094L732.58 345.391L732.521 345.509Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M734.719 344.382L734.838 344.976V345.391L734.779 345.51L734.66 345.332L734.422 345.154L734.363 345.035L734.185 344.976L733.828 344.738L733.888 344.679L734.185 344.797L734.363 344.738L734.482 344.5V344.382L734.66 344.322L734.719 344.382Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M731.335 343.787L731.038 343.549L730.86 343.49L730.681 343.371L730.562 343.015L730.622 342.836V342.718L730.741 342.005L730.681 341.945L730.8 341.708L731.097 341.648L731.216 341.827L731.097 342.539L731.157 342.718L731.275 342.955L731.335 343.252L731.454 343.609L731.335 343.787Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M503.593 241.679L503.474 241.857L503.355 241.738V241.56L503.533 241.501L503.593 241.679Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M504.723 241.738L504.604 241.797L504.366 241.738L504.188 241.56L504.129 241.382L504.248 241.144L504.545 240.966H504.782L504.901 241.382L504.842 241.619L504.723 241.738Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M506.8 239.896L506.919 239.956V240.075L507.038 240.193L507.275 240.49H507.394L507.513 240.669L507.632 240.966L507.751 241.084L507.572 241.381L507.394 241.441L507.097 241.381L506.919 241.322L506.741 241.144V241.025L506.622 240.966L506.562 240.728L506.622 240.609V240.431L506.741 240.193L506.622 239.896H506.8Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M508.641 239.896L508.819 239.956L508.878 240.312L508.819 240.55L508.581 240.669L508.344 240.431L508.463 240.193L508.403 240.075L508.641 239.896Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M509.829 236.51L510.007 236.392L510.304 236.51L510.364 236.629V237.045L510.126 237.223L509.948 237.342H509.77L509.473 237.223V236.926L509.591 236.807V236.451L509.651 236.392L509.829 236.51Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M505.08 234.847L505.317 234.788L505.496 234.907H505.733L505.911 235.025L505.971 235.144H505.674L505.258 234.966L505.139 235.025L504.961 235.382L504.783 235.025L504.723 234.966L504.664 234.728L504.842 234.669L505.08 234.847Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M509.711 234.55L509.77 234.61L509.711 234.966L509.592 235.025V234.728L509.473 234.55V234.372L509.414 234.194L509.652 234.016L509.77 234.134L509.711 234.491V234.55Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M502.999 233.778L503.118 233.957L503.178 234.135L502.762 234.313L502.584 234.194L502.465 234.075L502.702 233.838L502.999 233.778Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M502.524 232.709L502.702 232.768V232.887L502.88 233.065L502.761 233.303L502.405 233.481L502.167 233.719L501.752 233.778V233.719V233.422L501.633 233.303V233.184L501.752 233.065H501.87L501.989 232.947L502.405 232.709H502.524Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M355.807 252.37H355.629L355.391 252.192L355.213 252.133L355.035 251.954L354.975 251.836L354.797 251.776L354.678 251.539L354.5 251.36L354.559 251.063L354.856 251.242L354.916 251.539L355.153 251.776L355.569 251.895L355.688 252.073L355.866 252.311L355.807 252.37Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M316.423 224.63L316.602 224.69L316.72 224.452L316.958 224.512H317.255L317.314 224.63L317.196 224.749L317.077 224.69L316.839 224.749L316.72 224.809H316.305L316.423 224.63Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M321.235 223.146L320.82 223.324L320.939 223.146H321.235Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M321.591 223.205L321.531 223.146L322.006 222.968L321.887 223.146L321.591 223.205Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M693.91 164.577L693.97 164.696L694.148 164.934L693.91 164.874H693.732L693.495 164.993L693.316 164.815V164.637L693.495 164.577L693.613 164.637L693.91 164.577Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M692.902 164.875V164.934L692.783 165.053L692.724 165.409L692.664 165.528H692.486L692.367 165.647L692.07 165.766L691.952 165.825L691.595 166.003L691.358 165.944L691.061 166.003L690.882 166.241L690.764 166.063L690.585 166.122H690.467L690.288 165.944L690.051 166.122H689.754L689.457 166.003L689.16 165.944L688.922 165.766L688.744 165.409L688.566 165.231L688.447 164.815L688.328 164.637L688.388 164.459L688.685 164.637L688.922 164.578L689.041 164.4L689.1 164.221L689.279 164.162L689.397 164.221L689.516 164.103H689.635L689.694 164.34L689.991 164.459L690.051 164.578H690.407L690.764 164.281L691.001 164.34L691.179 164.221L691.358 164.281L691.595 164.4L691.714 164.221H691.892L692.07 164.459V164.815L692.249 164.697L692.427 164.815L692.486 164.756L692.902 164.875Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M381.348 238.828L381.645 238.887L381.764 239.184V239.541L381.704 240.016L381.645 240.135L381.526 240.194L381.288 240.313L381.348 240.075L381.288 239.956L381.229 239.541L381.051 239.244V239.065L381.11 238.887V238.709H381.229L381.348 238.828Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M414.257 496.92L414.494 496.86V497.098L414.02 496.92L414.197 496.742L414.316 496.683L414.257 496.92Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M413.84 496.089L413.958 496.207L414.196 496.267L414.255 496.504L414.077 496.563L414.018 496.326L413.899 496.207L413.84 496.089Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M417.522 495.614L417.641 495.673L417.582 495.91L417.404 495.851L417.285 495.673L417.463 495.555L417.522 495.614Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M410.334 495.079V495.198L410.393 495.376L410.156 495.436L409.978 495.376L409.859 495.257L409.681 495.198L409.621 494.96H409.74L409.799 494.842L409.978 494.782L410.096 494.842L409.918 495.02L410.096 495.079L410.275 494.901L410.334 495.079Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M412.057 494.307L411.819 494.188L411.522 494.01L411.047 493.832L411.107 493.594L410.691 493.535L410.513 493.476L410.334 493.238L410.453 493.179L410.928 493.357L411.404 493.594L411.701 493.654L411.938 493.713L412.116 493.535L412.176 493.357L412.295 493.416L412.532 493.297L412.592 493.416H412.889V493.594H413.067L413.601 493.476L413.661 493.594H413.839L414.077 493.535L413.898 493.416L413.839 493.238H414.077L414.433 493.357L414.492 493.594L414.255 493.891L414.314 494.07L414.195 494.188H413.958L413.78 494.664L413.601 494.842L413.423 495.198L413.364 495.376L413.067 495.555L413.007 495.436H412.77V495.614L412.295 495.555L412.235 495.614L412.413 495.852L412.354 495.911L412.235 496.149H411.998L411.819 496.386L411.641 496.446H411.522L411.404 496.267L411.166 496.089V495.97H410.869L411.225 496.208H410.988L410.691 496.03L410.572 495.97L410.334 495.852L410.156 495.733V495.614L410.572 495.733L410.928 495.614L410.631 495.495L410.572 495.436H411.107L411.344 495.495L411.522 495.614V495.495L411.76 495.436L411.819 495.258L411.582 495.139L411.463 494.842L411.522 494.723H411.879L411.998 494.782L412.235 494.723L412.176 494.545H411.701V494.604L411.463 494.723H411.107L410.81 494.545V494.367L411.225 494.485L411.582 494.367H411.76L412.057 494.307L412.295 494.426V494.367L412.057 494.307Z"
                    fill="#DBF4FF"
                  />
                  <path
                    d="M412.057 494.307L411.819 494.188L411.522 494.01L411.047 493.832L411.107 493.594L410.691 493.535L410.513 493.476L410.334 493.238L410.453 493.179L410.928 493.357L411.404 493.594L411.701 493.654L411.938 493.713L412.116 493.535L412.176 493.357L412.295 493.416L412.532 493.297L412.592 493.416H412.889V493.594H413.067L413.601 493.476L413.661 493.594H413.839L414.077 493.535L413.898 493.416L413.839 493.238H414.077L414.433 493.357L414.492 493.594L414.255 493.891L414.314 494.07L414.195 494.188H413.958L413.78 494.664L413.601 494.842L413.423 495.198L413.364 495.376L413.067 495.555L413.007 495.436H412.77V495.614L412.295 495.555L412.235 495.614L412.413 495.852L412.354 495.911L412.235 496.149H411.998L411.819 496.386L411.641 496.446H411.522L411.404 496.267L411.166 496.089V495.97H410.869L411.225 496.208H410.988L410.691 496.03L410.572 495.97L410.334 495.852L410.156 495.733V495.614L410.572 495.733L410.928 495.614L410.631 495.495L410.572 495.436H411.107L411.344 495.495L411.522 495.614V495.495L411.76 495.436L411.819 495.258L411.582 495.139L411.463 494.842L411.522 494.723H411.879L411.998 494.782L412.235 494.723L412.176 494.545H411.701V494.604L411.463 494.723H411.107L410.81 494.545V494.367L411.225 494.485L411.582 494.367H411.76L412.057 494.307ZM412.057 494.307L412.295 494.426V494.367L412.057 494.307Z"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M413.008 493.179H413.186L413.364 493.357L413.186 493.416H413.008V493.179Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M412.413 493.178H412.235L412.176 493L412.413 493.059V493.178Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M411.584 493.059L411.941 493L412.06 493.178L411.881 493.416L411.763 493.356L411.584 493.416L411.406 493.297L411.584 493.178L411.763 493.297L411.822 493.178L411.525 493.119L411.584 493.059Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M415.859 493.119H416.216L416.275 493.059L416.572 493L416.81 493.119L417.047 493.297L417.107 493.475V493.535L416.81 493.594L416.691 493.416L416.572 493.356L416.513 493.535L416.632 493.594L416.691 493.772L416.869 493.653L416.988 493.713L417.047 493.95L417.226 494.01L417.285 493.95L417.582 494.129L417.641 493.891L417.166 493.772L417.226 493.475L417.404 493.356L418.295 493.297L418.711 493.653L418.829 493.713V493.95L418.473 493.891L418.176 493.772L417.82 493.891L417.998 494.01L418.235 494.069L418.77 494.129L418.948 494.188L419.008 494.307L418.889 494.604H418.592L418.532 494.663L418.117 494.723L417.82 494.841L417.998 494.96L417.463 495.198L417.226 495.138L416.929 495.198H416.513L416.156 495.079L415.8 494.841V495.02L415.978 495.138L416.335 495.257L416.513 495.435L416.632 495.376L416.869 495.435L417.107 495.614L416.988 495.673L417.107 495.97H416.988L416.81 495.792L416.572 495.732L416.275 495.97L416.156 495.792L415.978 495.673H415.8L415.503 495.554L415.384 495.614L415.503 495.851H415.681L415.8 495.97L415.681 496.029L416.097 496.386L415.978 496.445L415.741 496.326H415.562L415.384 496.148L415.206 496.089L415.028 496.029L414.968 496.386L415.265 496.445V496.623L415.206 496.742L414.968 496.683L414.909 496.564L414.612 496.445L414.553 496.326H414.434L414.196 496.029L414.374 495.792V495.673L414.137 495.376V495.257L414.434 495.138L414.374 495.02L414.671 494.96L414.612 494.782L414.968 494.544L415.325 494.426L415.562 494.663V494.901L415.741 494.841L415.444 494.485L415.503 494.307L415.147 494.188L414.909 494.01L414.968 493.891L415.206 494.01L415.265 493.713L414.85 493.594L414.909 493.416L415.028 493.475L415.206 493.356H415.384L415.503 493.178L415.325 493H415.562L415.859 493.119Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M412.889 492.882H413.305L413.424 493L413.543 492.882L413.661 492.941L413.78 493.119L413.661 493.179L413.424 493.119L413.186 493L412.711 492.941L412.77 492.822L412.889 492.882Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M408.852 492.228L408.555 492.169L408.614 492.05L408.852 492.228Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M567.627 66.7461L567.865 66.8649H568.043L568.103 66.9837V67.2213L568.221 67.3995L568.162 67.5183L567.806 67.2807L567.687 67.0431L567.568 66.9243L567.449 66.7461H567.627Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M567.803 65.7957L568.278 65.9145L568.397 66.0333L568.338 66.2709L568.278 66.3303L568.041 66.0333L567.744 65.9739L567.625 65.7363L567.803 65.7957Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M567.045 64.9879L567.093 65.0829H567.271V65.2611H567.033L566.914 65.3799L566.558 65.2611L566.439 65.2017L566.32 65.0235L566.617 64.9641L566.677 64.9047L567.008 64.9599L566.855 64.8453L566.974 64.3701L567.271 64.4295L567.449 64.7265V64.7859L567.805 64.9047L567.984 65.2017L568.162 65.3205L568.102 65.6769L567.805 65.4393L567.687 65.3205L567.568 65.2611L567.508 65.1423L567.39 65.0235H567.093L567.045 64.9879Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M569.232 64.6072L569.113 64.4886L569.291 64.3701L569.232 64.6072Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M567.803 64.9045L567.566 64.7857L567.388 64.6075L567.328 64.4293L567.388 64.3699L567.625 64.3105H567.803L568.16 64.5481L568.1 64.6669L568.16 64.7857L568.516 64.9045V65.0233L568.279 65.2015L567.803 64.9045Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M569.113 64.5478L568.935 64.7854L568.756 64.6666H568.578L568.697 64.4884L568.638 64.2508L568.697 64.1914L568.816 64.429L569.113 64.5478Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M568.577 64.5469H568.458L568.34 64.3097L568.399 64.1318L568.518 64.369L568.577 64.5469Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1134.18 278.031L1134.06 278.209L1133.77 278.15V278.031L1134.06 277.794L1134.18 278.031Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1117.43 271.735H1117.67L1117.85 271.854L1117.91 272.092L1117.79 272.151L1117.85 272.27L1117.79 272.389H1117.43L1117.31 272.27V272.151L1117.2 271.973V271.795L1117.43 271.735Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1049.3 261.875L1049.36 262.053H1049.18L1049 262.35L1048.95 262.29L1049.12 261.815L1049.36 261.756L1049.3 261.875Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M379.685 252.371L379.448 252.549L379.329 252.49L379.27 252.193L379.388 251.896L379.567 251.658H379.745L379.804 251.836L379.745 252.252L379.685 252.371Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1069.67 247.025L1069.61 247.263V247.619L1069.56 247.797H1069.38L1069.26 247.619L1069.2 247.322V247.025L1069.56 246.728L1069.61 246.609L1069.67 246.312L1069.79 246.253L1069.85 246.372L1070.09 246.431L1069.97 246.728L1069.67 247.025Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M377.964 233.065H377.786L377.727 232.946L377.845 232.709H377.964L378.023 232.828L377.964 233.065Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M377.545 232.174L377.486 232.352H377.367L377.13 232.234L377.012 232.115L377.19 231.878L377.486 232.115L377.545 232.174Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M382.357 246.015L382.238 245.896L382.001 245.778L381.941 245.659V245.302L382.001 245.184L382.417 244.53L382.595 244.649V245.065L382.535 245.54L382.476 245.778L382.357 246.015Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M376.715 229.503L376.477 229.443L376.596 229.265L376.774 229.205L376.715 229.503Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M833.322 282.249V282.367L833.203 282.308L833.322 282.189V282.249Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1160.56 271.082L1161.15 271.32H1161.03L1160.56 271.082Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M631.956 161.608L631.837 161.786L631.54 161.667L631.243 161.489V161.192L631.184 161.133H631.54L631.778 161.311L631.896 161.43L631.956 161.608Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M631.007 160.954L630.711 160.895V160.776L630.948 160.717L631.185 160.895L631.007 160.954Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1070.69 244.411L1070.63 244.47L1070.51 244.411L1070.45 244.292L1070.75 244.174L1070.86 244.292L1070.69 244.411Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1071.57 241.38H1071.46L1071.28 241.025L1071.34 240.847H1071.51V241.025L1071.63 241.143L1071.57 241.38Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1071.87 240.432L1071.75 240.55L1071.81 240.729H1071.57V240.313L1071.63 240.194L1071.87 240.075L1071.81 240.372L1071.87 240.432Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1070.74 235.976H1070.57L1070.51 235.857H1070.74V235.976Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1069.61 229.441L1069.55 229.323V229.026L1069.73 228.967L1069.85 229.145L1069.61 229.441Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1068.9 226.888L1068.66 226.829V226.65L1068.78 226.591L1068.9 226.71V226.888Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M379.092 234.194L379.211 234.431V234.609L379.092 234.728L378.973 234.669L378.914 234.491L379.092 234.194Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M776.773 374.913L777.011 375.447L776.892 375.804L776.654 376.041L776.714 376.22L776.536 376.398L776.239 376.517H775.942L775.585 376.457L775.526 376.517L775.348 376.338L775.466 376.22L775.526 375.982L775.585 375.566L775.704 375.329L776.001 375.091L776.06 374.972L776.179 374.675L776.417 374.497L776.654 374.556L776.773 374.913Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M795.662 373.664L795.484 373.486L795.722 373.368L795.899 373.309L796.018 373.368L795.959 373.486L795.662 373.664Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1137.63 384.476L1137.51 384.536L1137.39 384.773L1137.15 384.654L1137.27 384.358L1137.33 384.239L1137.51 384.299L1137.63 384.476Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1140.24 379.843L1140.18 379.902L1140.3 380.14H1140.48L1140.72 380.021L1140.66 380.377L1140.54 380.496L1140.48 380.734L1140.18 380.912L1139.94 380.793V380.734L1139.77 380.556L1139.83 380.437L1139.71 380.318L1139.77 380.08L1139.71 379.843H1139.77L1140 379.902L1140.24 379.843Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1138.64 377.289L1138.52 377.586V377.823L1138.4 378.001L1138.58 378.12L1138.7 378.18L1138.76 378.298L1138.7 378.417L1138.88 378.655H1138.76L1138.64 378.952L1138.52 379.071L1138.34 379.011L1138.22 378.833L1138.16 378.714L1137.81 378.655L1137.63 378.358V378.239L1137.57 378.061H1137.75L1137.93 377.942L1138.16 377.764L1138.22 377.586L1137.99 377.467L1137.75 377.526L1137.87 377.289L1138.05 377.229L1138.16 377.289L1138.4 377.11L1138.64 377.289Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1136.62 376.339L1136.44 376.695L1136.38 376.873H1136.56L1136.26 377.17L1136.15 377.289L1136.09 377.17L1136.26 376.933L1136.38 376.636L1136.62 376.339Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1136.62 376.339L1136.5 376.101H1136.74L1136.8 376.339H1136.62Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1128.36 374.913L1128.48 374.973L1128.78 375.507L1128.96 375.685L1129.13 375.626L1129.25 375.448L1129.79 375.745L1129.97 376.042L1130.38 376.398L1130.56 376.636L1130.62 376.814L1130.86 377.052L1130.92 377.17H1131.04L1131.21 377.349L1131.75 377.467L1131.81 377.646V377.883L1131.99 378.121L1132.22 378.18L1132.05 378.477L1132.1 378.596L1132.34 378.893H1132.4L1132.64 379.19L1132.58 379.428L1133 379.546L1133.23 379.843H1133.41L1133.59 379.962L1133.89 380.2L1133.83 380.378H1134.01L1134.24 380.675L1134.6 380.913V381.031L1134.78 381.091L1134.96 381.269V381.388L1135.13 381.744L1135.37 381.982L1135.43 381.922L1135.67 382.279L1135.97 382.338L1136.14 382.516V382.754L1136.2 382.992L1136.26 383.051L1136.14 383.407L1135.73 383.645L1135.67 383.467L1135.49 383.526L1135.31 383.704L1134.96 383.229H1134.72L1134.66 383.11H1134.54L1134.42 383.289L1133.89 382.754H1133.77L1133.53 382.457L1133.59 381.982H1133.41H1133.17L1133 381.863L1132.94 381.744L1132.82 381.685H1132.64V381.507L1132.52 381.21L1132.28 381.269L1131.81 380.972L1131.75 380.853V380.675L1131.57 380.794L1131.21 380.616L1131.15 380.378L1130.92 380.2L1130.8 379.903L1130.5 379.843L1130.62 379.725L1130.44 379.546L1130.26 379.487L1130.09 379.071V378.834L1129.97 378.655H1129.79L1129.67 378.299L1129.73 378.18L1129.31 377.943L1129.13 377.824L1128.9 377.467L1129.08 377.349L1128.96 377.23L1128.84 377.052V376.755L1128.54 376.576V376.22L1128.42 376.042H1128.6L1128.66 375.864L1128.6 375.745H1128.24L1128.12 375.567L1128.42 375.151L1128.24 374.973L1128.36 374.913Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1129.01 375.091L1128.84 375.032L1128.9 374.794L1129.01 375.091Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1127.65 373.665L1127.53 373.784L1127.47 373.546L1127.59 373.428L1127.65 373.665Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1148.2 300.365H1148.08L1148.02 300.188H1148.2V300.365Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1038.13 269.359L1038.01 269.596L1038.07 269.656L1037.95 270.012L1038.01 270.131L1037.72 270.25L1037.6 269.834L1037.78 269.715L1037.66 269.596L1037.84 269.24L1038.01 269.181L1038.13 269.359Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M360.616 229.443L360.438 229.324L360.497 229.205H360.675L360.735 229.265L360.616 229.443Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M369.291 229.145H369.172L368.638 229.323H368.281L368.4 229.205L368.638 229.086L368.875 229.026L369.232 229.086L369.291 229.145Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M363.645 227.72L364.001 227.779H364.358L364.536 227.838L364.892 227.779L365.07 227.838L365.308 227.779L365.427 227.838L365.724 227.779L365.961 227.838H366.14L366.615 227.957V227.838L366.971 227.957L367.031 227.898L367.506 227.957L367.625 228.076H367.743L368.1 228.254L368.219 228.195L368.159 228.611L368.278 228.789L367.743 228.967L367.565 229.205L367.387 229.561L367.209 229.68L367.031 229.739H366.793L366.437 229.799L366.258 229.917L365.843 229.858L365.724 229.739L365.427 229.858L365.249 229.68L364.833 229.799L364.298 229.739L364.12 229.799L363.764 229.858L363.645 229.917L363.526 229.799L363.288 229.739L363.11 229.858L362.754 229.799L362.932 229.383V229.145L363.051 228.908L362.932 228.551L362.813 228.492L362.754 228.254L362.991 228.135L363.11 228.076V227.779L363.348 227.66L363.645 227.72Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M116.006 403.721L115.947 403.662L115.828 403.484L115.887 403.365L116.065 403.484L116.006 403.721Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M122.128 381.09L122.068 381.149L121.891 381.031L122.009 380.912L122.128 381.09Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M118.443 366.419L118.324 366.36L118.443 366.003L118.74 365.766H118.918V365.884L118.799 366.122L118.443 366.419Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M90.1107 365.825L90.5265 365.944L90.7047 366.181V366.36L90.5859 366.419L90.2889 366.36L90.0513 366.003L89.9919 365.884L89.6355 366.003H89.5167L89.1603 365.944L89.0415 365.706L88.8633 365.409V365.231L88.9227 365.112L89.2197 365.053H89.5167L89.8137 365.172L89.9325 365.409L89.9919 365.766L90.1107 365.825Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M88.3252 364.933L88.2066 365.289L87.9102 365.17L87.9695 364.993L88.2659 364.874L88.3252 364.933Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M83.8113 362.379L83.6927 362.438L83.5742 362.26L83.752 362.201L83.8113 362.379Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M82.565 362.617L82.3868 362.736H82.2086L82.0898 362.26L82.2086 362.142L82.6244 362.617H82.565Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M81.9708 361.548L82.0894 361.607V361.904L81.8523 361.785L81.793 361.607L81.9708 361.548Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M98.7832 359.825L98.6055 359.884L98.6647 359.706L98.7832 359.825Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M121.355 338.5H121.177V338.263L121.059 338.085L121.296 338.144L121.355 338.381V338.5Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M119.513 336.421H119.395V336.184L119.513 336.006L119.691 336.124L119.572 336.243L119.513 336.421Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M120.225 335.471V335.649L119.987 335.709H119.631V335.887L119.393 335.828L119.274 335.709L119.215 335.531L119.631 335.293H119.809L119.928 335.412L120.225 335.471Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M116.125 333.926V334.164V334.282H115.947L115.77 334.045L115.947 333.867L116.125 333.926Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M117.553 332.146L117.731 332.205L117.79 332.264L117.434 332.383L117.375 332.205L117.553 332.146Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M115.353 331.789L115.888 331.848L116.066 332.027V332.145L115.828 332.324H115.353L115.294 332.027L115.234 331.789H115.353Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1144.52 342.48L1144.7 342.599L1144.64 342.837H1144.82V342.956H1144.34L1144.16 342.659L1144.28 342.48H1144.52Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1121.77 342.124H1121.89L1122.48 342.599L1122.78 342.777L1123.31 343.193L1123.26 343.371H1123.14L1123.02 343.49L1122.9 343.312H1122.84L1122.72 343.193L1122.66 342.955L1122.42 342.896V342.718L1122.25 342.658L1122.19 342.718H1122.07L1121.53 342.48L1121.41 342.242L1121.59 342.005L1121.77 342.124Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1143.69 341.233L1143.57 341.41L1143.39 341.292V341.173L1143.57 341.055L1143.69 341.233Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1142.32 338.917L1142.38 338.976H1142.56L1142.5 339.214L1142.2 339.333H1142.02L1141.79 339.392L1141.55 339.749L1141.49 339.57L1141.31 339.63L1141.19 339.511V339.333L1141.49 339.273V339.155L1141.67 338.917L1142.08 338.976L1142.32 338.917Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1126.7 337.254L1126.88 337.194L1127.23 337.373L1127.53 337.67L1127.71 337.848H1127.83L1127.95 337.967H1128.06L1128.24 338.145L1128.42 338.085L1128.66 338.145L1128.78 338.264H1129.02L1129.19 338.204L1129.31 338.382L1129.43 338.858L1129.61 339.036V339.333L1129.49 339.452L1129.55 339.63L1129.31 339.511L1129.13 339.63L1128.96 339.57L1128.66 339.392H1128.54L1128.18 339.273L1127.95 339.214L1127.83 339.036L1127.65 338.917L1127.47 338.858L1127.35 338.679L1127.11 338.561L1127.23 338.323L1127.17 338.085V337.848L1127.05 337.788L1126.7 337.67L1126.52 337.729L1126.46 337.61L1126.52 337.432L1126.58 337.254H1126.7Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1129.08 335.233L1129.02 335.352V335.767L1128.9 335.648V335.352L1129.08 335.233Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1127.35 334.164L1127.53 334.699L1127.65 334.936V335.174L1127.71 335.471L1127.59 335.649L1127.35 335.233L1127.29 335.411L1127.11 335.114L1127.17 334.52L1127.23 334.402V334.223L1127.35 334.164Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1122.36 334.283H1122.54L1122.72 334.224L1122.96 334.283L1123.02 334.224H1123.31H1123.79L1123.91 334.402L1124.09 334.461L1124.21 334.64H1124.32L1124.44 334.699L1124.68 334.937V335.293H1124.8L1125.04 335.412L1125.1 335.59V335.946L1125.04 336.006L1124.62 336.125L1124.5 336.184L1124.26 336.125L1124.03 336.006H1123.79L1123.73 335.887L1123.43 335.709H1123.08L1122.78 335.768H1122.48L1122.19 335.709L1122.01 335.59L1121.83 335.649L1121.65 335.412L1121.47 335.293L1121.29 334.818L1121.18 334.58L1121.29 334.461L1121.24 334.343V333.927L1121.29 333.749L1121.65 333.57L1121.89 333.689L1122.13 333.986L1122.19 334.164L1122.36 334.283Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1123.73 332.857L1124.02 333.154L1123.85 333.332L1123.67 333.213V333.154L1123.73 332.857Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1123.73 332.858L1123.61 333.095H1123.55L1123.31 332.917L1123.14 332.977L1123.02 332.917L1122.96 332.798L1123.14 332.739L1123.25 332.62L1123.55 332.68L1123.73 332.858Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1119.81 332.561L1119.87 332.679L1119.99 332.738L1119.87 332.976L1119.63 333.094L1119.45 332.857L1119.81 332.561Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1114.76 331.492L1114.88 331.67L1114.82 331.848L1114.34 331.611L1114.64 331.433L1114.76 331.492Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1116.78 331.966L1116.6 331.847L1116.66 331.669L1116.84 331.491V331.788L1116.9 331.906L1116.78 331.966Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1116.25 330.898L1116.36 330.838H1116.6V330.957L1116.36 331.135L1116.48 331.254V331.432L1116.25 331.67L1116.13 331.729L1115.95 331.67L1115.71 331.432L1115.77 331.076L1115.95 331.017L1116.07 330.779L1116.25 330.72V330.898Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1114.11 330.957L1113.99 331.017L1113.87 331.314L1114.11 331.611L1113.81 331.492V331.373L1113.75 331.195L1113.51 330.957V330.838L1113.75 330.72L1113.81 330.541L1114.05 330.363L1114.22 330.482V330.72L1114.11 330.957Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1121.77 330.66L1121.89 330.779L1121.83 330.898L1121.71 330.838L1121.35 330.541L1121.47 330.304L1121.65 330.244L1121.77 330.363L1121.71 330.541L1121.77 330.66Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1125.63 330.184L1125.87 330.659L1126.22 331.134V331.313L1125.99 331.431V331.728V331.907L1126.05 332.025H1126.17L1126.28 332.204L1126.58 332.441L1126.64 332.738L1126.7 332.916L1126.82 333.035L1126.7 333.154L1126.88 333.332L1126.82 333.392L1126.88 333.689L1126.76 333.807L1126.94 333.986L1127 334.283L1127.12 334.58V334.936L1127.06 334.995L1126.88 334.817L1126.7 334.52V334.342L1126.52 334.104L1126.28 333.926L1126.11 333.748L1125.81 333.392L1125.57 333.213L1125.39 332.679L1125.27 332.085L1125.16 331.669V331.372L1125.1 331.134L1125.33 330.897L1125.27 330.719L1124.98 330.303L1124.92 330.125L1124.98 330.065L1125.21 330.125L1125.33 330.184L1125.51 330.006L1125.63 330.184Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1113.34 330.006L1113.22 329.769L1113.04 329.591H1113.28L1113.34 330.006Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1113.27 329.412L1113.51 329.471L1113.57 329.531L1113.63 329.827H1113.51L1113.39 329.59L1113.27 329.412Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1115.12 329.532L1115.06 329.71H1115.18H1115.47L1115.71 330.126V330.244L1115.83 330.423L1115.89 330.72L1115.77 330.838V331.017L1115.41 330.898L1115.3 330.779H1115.12L1114.88 330.601L1114.82 330.482L1114.76 330.304L1115 330.363L1114.82 329.888L1114.76 329.769L1114.46 329.829L1114.34 329.888H1114.11L1113.93 330.126L1113.69 330.007V329.65L1113.81 329.532H1114.05V329.294L1114.29 328.938L1114.52 328.759L1114.7 328.641L1114.94 328.819L1115.06 329.056L1115 329.472L1115.12 329.532Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1111.61 329.532H1111.55L1111.43 329.056L1111.49 328.878V328.641L1111.61 328.7L1111.67 328.938V329.353L1111.61 329.532Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1113.63 329.234L1113.45 329.353L1113.39 329.294H1113.16L1112.98 329.116L1112.92 328.937L1112.86 328.759L1112.92 328.581L1113.1 328.343L1113.39 328.225L1113.51 328.343L1113.69 328.64V328.997L1113.63 329.234Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1111.85 327.155L1112.09 327.452V327.512L1112.5 327.749L1112.44 327.927L1112.09 328.343V328.521L1111.91 328.581V328.343H1111.79V328.106L1111.67 327.868L1111.49 327.749L1111.43 327.571L1111.49 327.393L1111.61 327.274L1111.73 327.155H1111.85Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1117.97 327.215L1118.15 327.333L1118.03 327.392L1117.73 327.452L1117.67 327.274L1117.79 327.155L1117.97 327.215Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1118.5 327.214L1118.62 327.155L1118.92 327.333L1119.1 327.393L1119.21 327.511L1119.39 327.808L1119.57 327.868L1119.75 328.046V328.224L1120.05 328.284V328.462L1120.22 328.521L1120.4 328.462L1120.46 328.521L1120.7 328.64L1120.76 328.759L1120.94 328.699L1121.12 328.759L1121.17 328.937L1121.41 329.115L1121.59 329.293L1121.83 329.472L1122.42 330.066L1122.24 330.303L1122.42 330.6L1122.48 330.957L1122.3 330.897L1122.13 330.66L1121.71 330.184L1121.47 330.125L1121.17 329.887L1120.82 329.828L1120.76 329.65L1120.4 329.531L1120.11 329.234H1119.99L1119.51 328.878L1119.21 328.699V328.581L1118.98 328.462L1118.86 328.343L1118.74 328.105L1118.5 327.927L1118.44 327.808V327.571L1118.2 327.274L1118.09 327.214V327.036L1118.5 327.214Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1117.61 326.858L1117.73 326.977L1117.85 326.918L1118.02 327.036L1117.97 327.155L1117.79 327.096L1117.61 326.858Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1114.94 326.502H1115.23L1115.12 326.621L1114.94 326.561V326.502Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1117.49 326.502L1117.37 326.799L1117.31 326.68L1117.49 326.502Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1115.89 326.739L1115.59 326.798L1115.47 326.68L1115.65 326.442L1115.83 326.502L1115.89 326.739Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1108.46 326.205L1108.58 326.383L1108.46 326.502L1108.29 326.442L1108.23 326.383L1108.46 326.205Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1109.35 325.077L1109.53 325.195L1109.47 325.374L1109.06 325.492L1108.88 325.314L1109.06 324.958L1109.18 324.898L1109.35 325.077Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1110.37 324.542V324.839L1110.25 324.72V324.601L1110.37 324.542Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1112.09 323.651L1112.27 323.71L1112.5 324.007L1112.68 324.126L1112.86 324.185L1113.04 324.364L1113.51 324.601L1113.75 324.898V325.136L1113.81 325.492L1113.93 325.611L1114.11 325.789H1114.23L1114.29 326.027L1114.7 326.205L1114.94 326.146L1115 326.205V326.383L1114.82 326.443L1114.7 326.621L1114.41 326.502L1113.93 326.264H1113.63L1113.45 326.027L1113.04 325.789L1112.68 325.195L1112.33 324.601L1112.03 324.423L1111.61 324.007V323.71V323.591L1111.79 323.473L1111.97 323.532L1112.09 323.651Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M608.195 297.99H608.076L607.957 298.168H607.838L607.779 297.93L607.66 297.455V297.277L607.898 296.98L608.076 296.92L608.254 296.742L608.492 296.802L608.611 297.039L608.67 297.217L608.611 297.455L608.492 297.633L608.314 297.871L608.195 297.99Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M610.931 292.169L610.871 292.347L610.752 292.407L610.574 292.347V292.169L610.693 292.11V291.931L610.812 291.812L610.99 291.872L610.931 292.169Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M376.714 229.502V229.561L376.477 229.502V229.442L376.714 229.502Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M741.907 334.105L741.729 334.224H741.432L741.195 334.343H740.957V334.224H741.254L741.492 334.165L741.729 333.986H741.848L741.907 334.105Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M741.61 333.926L741.491 333.986H741.254V333.867L741.61 333.926Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M772.436 315.929L772.674 316.167L772.555 316.345L772.436 316.167L772.258 316.048L772.377 315.751L772.436 315.929Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M349.095 215.008H349.511L349.689 215.245H349.511L349.333 215.186L349.036 215.245L348.977 215.067L349.095 215.008Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M347.491 214.948L347.669 215.186L348.025 215.126L347.906 215.245H347.55L347.312 215.126L347.491 214.948Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M348.797 214.592V214.889L348.501 214.77L348.441 214.592L348.501 214.533L348.797 214.592Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.73005 380.08L8.43359 379.902V379.784L8.61147 379.665L8.73005 380.08Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.07031 378.833H7.24851L7.48611 379.011L7.66431 379.071L7.78311 378.833L7.96131 379.011L7.78311 379.189L7.84251 379.308L7.78311 379.427L7.66431 379.368L7.48611 379.189L7.07031 379.071V378.833Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.59254 373.725L6.47355 373.785L6.41406 373.487L6.53304 373.547L6.59254 373.725Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.2048 369.27L8.90834 369.448H8.78976L8.73047 369.388L8.90834 369.092L9.08622 369.151L9.2048 369.27Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M0.830789 357.806L0.771529 357.865L0.59375 357.806L0.65301 357.688H0.830789V357.806Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M381.825 256.944L381.706 257.241L381.528 257.479L381.409 257.538L381.35 257.776L381.469 258.132L381.35 258.192V258.608L381.469 258.786L381.587 258.905L381.469 259.023L381.409 259.202V259.617L381.29 259.677L381.053 259.796L380.756 259.855H380.578L380.281 259.914L379.984 259.855L379.746 259.914L379.568 259.855L379.271 259.974L379.033 259.855H378.677L378.499 259.974L378.32 259.914L378.617 259.796L378.796 259.617L379.033 259.558L379.271 259.38L379.39 259.202L379.746 259.261L379.924 259.023L379.805 258.548L379.924 258.311V258.014V257.895L379.746 257.657L379.568 257.598L379.33 257.538L379.271 257.479L379.508 257.301L380.162 257.241L380.281 257.123H380.934L380.993 257.063L381.706 256.944H381.825Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M383.25 255.044L383.19 255.341L383.012 255.4L382.775 255.579H382.656L382.24 255.816L382.121 255.697L382.299 255.519L382.715 255.222L383.25 255.044Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1187.35 330.838V330.72H1187.41V330.779L1187.35 330.838Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M381.466 248.154L381.406 248.213L381.109 248.035V247.797L381.228 247.619L381.347 247.322H381.585L381.644 247.56L381.585 248.035L381.466 248.154Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M371.901 227.957L371.664 228.075H371.604L371.426 228.194L371.367 228.135L371.426 227.957L371.782 227.897L371.901 227.957Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M370.953 230.571L371.131 230.749L370.477 230.868L370.418 230.571L370.834 230.452L370.953 230.571Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M371.368 228.313L371.25 228.432H370.953V228.313L371.131 228.254L371.368 228.313Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M370.536 228.195L370.774 228.374L370.655 228.492L370.477 228.374H370.18L370.298 228.255L370.536 228.195Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1147.49 375.506L1147.19 375.387L1147.31 375.15L1147.61 375.091L1147.72 375.328L1147.67 375.447L1147.49 375.506Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1146.78 373.25H1146.66L1146.48 373.191L1146.24 372.894L1146.18 372.656V372.419L1146.3 372.3L1146.36 372.062L1146.54 372.003H1146.78L1146.66 372.181V372.478L1147.07 372.775L1146.9 372.953L1146.78 373.25Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1146.78 369.745H1146.95L1147.01 369.864L1146.72 369.923L1146.78 370.101L1147.01 370.22L1147.07 370.398L1147.01 370.636L1146.78 370.695L1146.54 370.517H1146.3L1146.18 370.398L1146 370.279L1146.06 370.042V369.864L1146.18 369.567L1146.36 369.329H1146.66L1146.78 369.388L1146.72 369.626L1146.78 369.745Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1144.99 365.23L1145.35 365.171L1145.41 365.23L1145.53 365.587L1145.65 365.765L1145.71 365.824L1145.47 366.181L1144.99 366.299L1144.82 366.121L1144.76 365.824L1144.58 365.765L1144.34 365.943L1144.28 365.884L1144.4 365.646L1144.64 365.468L1144.88 365.171L1144.99 365.23Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1146.36 362.914L1146.3 362.736H1146.48L1146.36 362.914Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1145.41 361.488L1145.47 361.785V361.904L1145.71 361.963L1145.83 362.26H1146.12V362.498L1146.06 362.557L1145.89 362.379L1145.71 362.32L1145.35 362.439L1145.17 362.379L1145.11 362.26L1145.05 362.023L1145.17 361.726L1145.29 361.548L1145.41 361.488Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1145.94 361.369H1145.88L1145.82 361.191H1145.94V361.369Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1146.06 360.538L1145.95 360.657H1145.59L1145.41 360.717L1145.29 360.598L1145.05 360.538L1144.76 360.301L1144.82 360.182L1145.11 360.063L1145.35 360.004L1145.59 359.826L1145.65 359.647H1145.77L1145.83 359.826V360.182L1146.12 360.42L1146.06 360.538Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1143.27 359.766L1143.39 359.944L1143.75 360.182L1144.16 360.597L1144.22 360.657V360.894L1144.34 361.073L1144.16 361.191L1143.93 361.429V361.31L1143.75 361.251H1143.51L1143.39 361.31V361.429L1143.16 361.548L1142.98 361.488V361.073L1142.92 360.716L1142.98 360.36L1143.04 360.063L1142.92 359.766L1142.56 359.944L1142.44 359.825L1142.38 359.647V359.469L1142.56 359.291V359.053L1142.62 358.875L1142.8 358.815L1143.16 358.994L1143.1 359.112L1143.21 359.409L1143.16 359.528L1143.27 359.766Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1142.92 358.34H1142.74L1142.44 358.162V358.102L1142.56 357.925L1142.68 357.865L1142.97 357.925L1142.92 358.162V358.34Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1142.62 357.746L1142.85 357.568L1142.91 357.628L1142.97 357.806H1142.68L1142.62 357.746Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1146.01 359.29L1145.89 359.231L1145.95 358.518L1145.89 358.34L1145.95 358.043L1146.12 357.568L1146.18 357.271L1146.3 357.627L1146.24 357.805V358.162V358.756L1146.18 359.112L1146.01 359.29Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1145.23 357.331H1144.81L1144.64 357.271V357.153L1145.17 356.737L1145.47 356.618L1145.77 356.559V356.677L1145.59 356.915L1145.47 357.093L1145.23 357.331Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1146.36 356.914V357.033H1146.18L1146.24 356.855L1146.36 356.083V356.023L1146.42 355.311L1146.54 355.37L1146.48 356.142L1146.54 356.32L1146.48 356.617L1146.36 356.914Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1142.62 357.746L1142.08 357.687L1141.73 357.865L1141.67 357.984H1141.55L1141.49 357.628L1141.37 357.568L1141.13 356.974L1141.37 356.499V356.261L1141.31 356.143V355.311L1141.25 355.133V354.836L1141.37 354.658V354.479L1141.49 354.301V354.182L1141.67 354.123L1141.73 354.42L1141.85 354.658L1141.96 354.836L1142.02 355.608L1141.96 356.083V356.143L1142.32 356.083L1142.5 355.905L1142.62 355.43V355.311L1142.8 355.192L1142.97 355.252L1142.91 355.489V356.024L1143.09 356.083V356.38L1142.97 356.44L1143.15 356.677L1143.03 356.796V357.093L1143.15 357.39L1143.09 357.509H1142.91L1142.62 357.746Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1145.11 352.223L1145.35 352.401L1145.29 352.638L1145.11 352.817L1144.99 352.935H1144.64V352.698L1144.7 352.46L1144.81 352.282L1145.11 352.223Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1145.47 351.093L1145.29 351.212L1145.17 351.271V351.39L1145.05 351.45V351.271L1144.93 351.153L1144.88 350.974L1144.93 350.737L1145.05 350.677L1145.29 350.559L1145.35 350.677L1145.41 350.915V350.974L1145.47 351.093Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1142.5 348.598L1142.44 348.539L1142.5 348.242L1142.62 348.361L1142.5 348.598Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.0069 351.45L13.1852 351.509L13.3634 351.569L13.5415 351.687L13.4822 351.866H12.8882L12.7099 351.806L12.5318 351.866L12.4129 351.806L12.1753 351.687L11.9972 351.747L11.8189 351.628L11.7002 351.509L11.3438 351.331L11.4032 351.093L11.6408 350.975H11.8783H12.1753L12.7099 351.212L13.0069 351.272V351.45Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.3343 349.787L10.6907 350.143L10.8095 350.559L10.7501 350.737L10.8095 350.915H10.6313L10.4531 350.797L10.2749 350.915L9.74027 350.975L9.56207 350.797L9.44327 350.559L9.32447 350.5L9.14627 350.321L8.84927 350.084L8.73047 349.965V349.846L8.96807 349.906L9.14627 349.846L9.50267 349.727H9.74027L10.0373 349.668H10.2155L10.3343 349.787Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M357.586 252.431H357.467L357.408 252.134L357.467 251.955L357.408 251.777L357.17 251.718L356.992 251.54L357.052 251.361L357.764 251.718L357.705 251.837V252.074L357.586 252.193V252.431Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M376.775 231.64L376.656 231.699V231.581L376.716 231.521L376.775 231.64Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M375.883 231.105H375.824L375.883 230.986L375.943 231.046L375.883 231.105Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M382.535 241.916V242.035L382.772 241.975L382.654 242.272L382.772 242.391V242.51L382.891 242.629L383.01 243.163L382.832 243.342L382.772 243.104L382.713 243.163L382.357 243.104H382.119L382 242.926L382.357 242.629H382.119L381.881 242.391L381.822 242.094L381.703 241.797L381.881 241.56L382.119 241.619L382.416 241.797L382.535 241.916Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M527.708 192.318L527.53 192.615L527.292 192.912L527.114 192.674H526.877L526.758 192.555L526.877 192.377L527.114 192.436L527.352 192.199L527.53 192.08L527.649 192.139L527.708 192.318Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M535.788 190.951V191.248L535.907 191.486L535.788 191.901L535.847 192.08L535.61 192.317L535.313 192.436L535.194 192.555L534.838 192.436L534.541 192.139L534.422 191.901V191.545L534.778 191.307L534.838 191.01V190.892L535.194 190.951H535.432L535.61 191.01L535.788 190.951Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M529.908 191.427H529.789L529.611 191.308L529.492 191.13L529.552 190.892L529.611 190.714H529.789H529.967L530.264 190.951L530.324 191.13L530.027 191.427H529.908Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M533.532 189.347V189.466L533.175 189.644L532.938 189.941L532.759 190.06V190.298L532.522 190.714L532.462 190.951L532.165 191.308L532.106 191.426H531.987L531.631 191.545L531.571 191.486L531.512 191.248L531.334 191.011L531.274 190.892L531.156 190.714V190.535L530.918 190.179L531.215 190.001L531.393 190.12L531.75 190.001H531.987L532.284 189.882L532.581 189.644V189.526L532.938 189.347H533.294L533.472 189.288L533.532 189.347Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M539.589 191.011L539.411 191.248L539.174 191.308L538.995 191.248H538.758V191.13H538.936L539.292 191.011L539.53 190.833L539.708 190.654L539.768 190.357L539.827 190.179L539.946 189.882L540.124 189.645L540.302 189.288L540.421 188.813L540.54 188.694L540.777 188.635L540.956 188.813L541.015 189.11L540.956 189.407L540.896 189.704V190.001L540.837 190.06L540.659 190.476L540.48 190.654L540.124 190.714L539.708 190.892L539.589 191.011Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M527.948 188.338L528.126 188.278L528.245 188.457L528.364 188.754L528.245 188.932L528.304 189.169L527.948 189.763L527.888 189.704L527.829 189.466L527.591 188.932L527.532 188.754L527.473 188.635L527.591 188.397L527.77 188.278L527.948 188.338Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M542.261 187.149V187.387L542.142 187.684L541.726 187.981L541.429 188.04L541.192 188.337L540.895 188.219V188.159L541.013 187.922V187.684L541.132 187.506L541.31 187.387H541.489L541.667 187.209H541.964L542.023 187.149L542.142 186.852L542.261 186.793L542.38 186.912L542.261 187.149Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M736.678 346.579L736.797 346.757L737.094 346.876V347.054L736.975 347.173L737.035 347.292L736.856 347.648L736.916 347.767L736.738 347.827L736.619 347.648V347.47L736.738 347.351L736.619 346.936L736.559 346.876L736.5 346.757L736.678 346.579Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M769.232 377.883H769.469L769.707 378.002L769.885 378.18V378.358L769.944 378.655L770.123 378.774L770.241 378.893L770.301 379.011L770.182 379.368L770.123 379.605L770.004 379.724L769.766 379.784H769.232L769.113 379.665L768.638 379.427L768.459 379.13V378.952L768.281 378.596L768.341 378.358L768.459 378.239L768.578 378.002H768.638L768.935 377.883H769.232Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M381.941 237.757H381.763L381.645 237.52L381.704 237.401L381.882 237.224L382.06 237.342L382.119 237.52V237.639L381.941 237.757Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M380.872 236.214H381.05V236.333V236.392L380.932 236.452V236.927V237.164L380.813 237.283L380.456 237.461V237.343L380.338 237.224L380.278 236.927V236.63L380.219 236.333V236.155L380.338 235.976L380.516 235.917L380.813 236.095L380.872 236.214Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M381.704 235.977L381.942 236.036L382.239 236.274L381.467 236.452L381.288 236.511L381.051 236.333L381.11 235.977L381.229 235.917L381.17 235.561L381.229 235.442L381.407 235.323L381.585 235.561V235.798L381.704 235.977Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1181.53 371.408L1181.35 371.468L1181.41 371.23L1181.53 371.408Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1177.07 370.458L1177.19 370.577L1177.37 370.636V370.814L1177.07 370.933L1176.77 370.755L1176.48 370.933H1176.3L1176.18 371.111L1176.24 371.29L1176 371.23L1175.94 371.349L1175.7 371.29L1175.64 371.349L1175.41 371.23L1175.58 371.171L1175.7 371.111L1175.82 370.993L1176.06 371.052L1176.24 370.874L1176.36 370.696L1176.65 370.636L1176.95 370.458H1177.07Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1177.6 370.398L1177.49 370.457L1177.37 370.398L1177.49 370.279L1177.6 370.398Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1181.11 366.775L1181.17 367.072L1181.05 367.429L1180.99 367.31L1180.93 367.072H1180.81L1180.87 366.775L1180.99 366.716L1181.11 366.775Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1179.56 365.943H1179.5L1179.45 365.706L1179.56 365.588L1179.8 365.528V365.766L1179.68 365.884L1179.56 365.943Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1178.26 364.458L1178.2 364.696L1178.38 364.815L1178.44 364.993L1178.61 365.231L1178.79 365.29L1178.85 365.468H1178.97L1179.03 365.706L1178.85 366.003L1178.91 366.122L1178.97 366.419L1178.79 366.537V366.834H1178.91L1178.97 367.131L1178.79 367.31L1178.44 367.428L1178.38 367.31L1178.2 367.369L1178.14 367.488L1177.96 367.31L1177.48 367.488L1177.01 367.904L1176.83 367.844L1176.59 367.963L1176.42 367.904L1176.06 367.963L1175.88 367.844L1175.35 367.666L1175.17 367.607L1174.81 367.547L1174.69 367.488L1174.4 367.369L1174.28 366.775L1174.46 366.359H1174.63L1174.81 366.3L1174.87 366.003L1175.05 365.943L1175.11 365.706L1174.99 365.587L1175.35 365.349L1175.58 365.052L1175.64 365.112L1176 364.815H1176.12L1176.65 364.577L1177.01 364.696L1177.19 364.637L1177.48 364.518L1177.84 364.458L1178.02 364.28L1178.26 364.458Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1182 364.576L1181.88 364.635L1182 364.102H1182.24L1182.18 364.339L1182 364.576Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1175.23 363.389L1175.11 363.567L1174.81 363.745V363.567L1175.05 363.33L1175.23 363.389Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1184.08 363.152L1183.96 363.033L1184.02 362.914L1184.32 362.617L1184.5 362.32L1184.32 362.974L1184.08 363.152Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1184.68 360.182L1184.44 360.419L1183.96 361.073L1183.78 361.132L1183.37 361.37L1183.25 361.726L1183.01 361.845L1182.89 362.023L1182.83 362.142L1183.01 362.201L1183.37 362.023L1183.43 361.964L1183.61 361.786L1183.73 361.607L1184.08 361.429L1184.26 361.251L1184.62 361.073V361.251L1184.32 361.667L1184.2 361.726L1184.26 362.083L1184.08 362.261L1183.9 362.083H1183.67L1183.37 362.142L1183.13 362.32L1182.72 362.38H1182.12L1182.42 362.083L1182.18 361.964L1181.82 362.083L1181.59 362.201V362.32L1181.41 362.38L1181.29 362.439L1181.23 362.677L1181.11 362.855L1180.93 362.795V362.677L1180.7 362.617L1180.46 362.736L1180.34 363.033L1180.16 363.152H1179.98V362.974V362.736L1179.86 362.498L1179.92 362.38L1179.86 362.32L1179.51 362.439V362.201L1179.75 362.023H1179.8L1179.75 361.726L1179.92 361.667L1180.22 361.845L1180.58 361.607H1180.7L1180.87 361.429H1180.99L1181.17 361.251V361.132L1181.65 361.073L1182.18 360.895L1182.36 360.835L1182.6 360.895L1182.89 360.776L1183.01 360.538H1183.13L1183.25 360.301L1183.49 360.36L1183.55 360.241L1183.67 360.301L1184.26 360.004L1184.32 360.182L1184.44 360.122L1184.56 360.182L1184.74 360.004L1185.03 359.885L1185.09 359.944L1184.79 360.182H1184.68Z"
                    fill="#DBF4FF"
                    stroke="black"
                    stroke-width="0.1188"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <g clip-path="url(#clip5)">
                    <path
                      d="M276.862 131.99C275.162 129.058 272.144 127.266 268.787 127.198C268.644 127.195 268.5 127.195 268.357 127.198C265 127.266 261.982 129.058 260.283 131.99C258.546 134.988 258.498 138.588 260.155 141.622L267.099 154.331C267.102 154.336 267.105 154.342 267.108 154.347C267.414 154.878 267.961 155.195 268.572 155.195C269.183 155.195 269.731 154.878 270.036 154.347C270.039 154.342 270.042 154.336 270.046 154.331L276.989 141.622C278.646 138.588 278.599 134.988 276.862 131.99ZM268.572 139.883C266.401 139.883 264.635 138.116 264.635 135.945C264.635 133.774 266.401 132.008 268.572 132.008C270.743 132.008 272.51 133.774 272.51 135.945C272.51 138.116 270.743 139.883 268.572 139.883Z"
                      fill="#E5F7FF"
                    />
                  </g>
                  <g clip-path="url(#clip6)">
                    <path
                      d="M616.055 255.997C614.947 254.085 612.979 252.916 610.79 252.872C610.696 252.87 610.602 252.87 610.509 252.872C608.32 252.916 606.351 254.085 605.243 255.997C604.11 257.952 604.079 260.3 605.16 262.279L609.688 270.567C609.69 270.57 609.692 270.574 609.695 270.578C609.894 270.924 610.251 271.131 610.649 271.131C611.048 271.131 611.405 270.924 611.604 270.578C611.606 270.574 611.608 270.57 611.61 270.567L616.138 262.279C617.219 260.3 617.188 257.952 616.055 255.997ZM610.649 261.144C609.233 261.144 608.081 259.992 608.081 258.577C608.081 257.161 609.233 256.009 610.649 256.009C612.065 256.009 613.217 257.161 613.217 258.577C613.217 259.992 612.065 261.144 610.649 261.144Z"
                      fill="#E5F7FF"
                    />
                  </g>
                  <g clip-path="url(#clip7)">
                    <path
                      d="M578.263 140.329C577.416 138.866 575.91 137.973 574.237 137.939C574.165 137.937 574.093 137.937 574.022 137.939C572.348 137.973 570.843 138.866 569.995 140.329C569.129 141.824 569.105 143.619 569.932 145.132L573.394 151.47C573.396 151.473 573.397 151.476 573.399 151.478C573.551 151.743 573.824 151.901 574.129 151.901C574.434 151.901 574.707 151.743 574.859 151.478C574.861 151.476 574.862 151.473 574.864 151.47L578.327 145.132C579.153 143.619 579.129 141.824 578.263 140.329ZM574.129 144.265C573.046 144.265 572.165 143.384 572.165 142.301C572.165 141.218 573.046 140.338 574.129 140.338C575.212 140.338 576.093 141.218 576.093 142.301C576.093 143.384 575.212 144.265 574.129 144.265Z"
                      fill="#E5F7FF"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="1188"
                      height="509.058"
                      fill="white"
                      transform="translate(0 0.217773)"
                    />
                  </clipPath>
                  <clipPath id="clip1">
                    <rect
                      width="28"
                      height="28"
                      fill="white"
                      transform="translate(805.605 38.042)"
                    />
                  </clipPath>
                  <clipPath id="clip2">
                    <rect
                      width="28"
                      height="28"
                      fill="white"
                      transform="translate(765.863 106.787)"
                    />
                  </clipPath>
                  <clipPath id="clip3">
                    <rect
                      width="28"
                      height="28"
                      fill="white"
                      transform="translate(824.941 194.867)"
                    />
                  </clipPath>
                  <clipPath id="clip4">
                    <rect
                      width="28"
                      height="28"
                      fill="white"
                      transform="translate(1008.62 372.1)"
                    />
                  </clipPath>
                  <clipPath id="clip5">
                    <rect
                      width="28"
                      height="28"
                      fill="white"
                      transform="translate(254.57 127.195)"
                    />
                  </clipPath>
                  <clipPath id="clip6">
                    <rect
                      width="18.2604"
                      height="18.2604"
                      fill="white"
                      transform="translate(601.52 252.87)"
                    />
                  </clipPath>
                  <clipPath id="clip7">
                    <rect
                      width="13.9638"
                      height="13.9638"
                      fill="white"
                      transform="translate(567.148 137.938)"
                    />
                  </clipPath>
                </defs>
              </svg>
        
            </div>
            <h6>180 стран</h6>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default M_analitika;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  align-items: center;
  justify-content: space-around;
  p {
    background: #fff;
    width: 148px;
    height: 49px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    font-size: 18px;
    font-weight: 600;
    opacity: 0.6;
    cursor: pointer;
    &:hover {
      opacity: 1;
      transition: all 0.25s;
      box-shadow: 0px -2px 8px rgba(13, 83, 114, 0.15),
        2px 4px 9px rgba(13, 83, 114, 0.15);
      border: 1px solid #1ab9;
    }
    input {
      border: none;
      outline: none;
      height: 100%;
      width: 100%;
    }
  }
`;