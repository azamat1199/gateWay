import React, { useEffect, useState } from "react";
import TablePagination from "@material-ui/core/TablePagination";
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
import Sidebar from "./SidebarConsult";
import "../../../style/css/SidebarUniverstitet.css";
import "../../../style/css/SidebarAgentlar.css";
import "../../../style/css/fakultet.css";
import "../../../style/css/SidebarUniverstitet.css";
import "../../../style/css/fakultet.css";

import "react-datepicker/dist/react-datepicker.css";
import SkeletonLoaderManager from "./assets/skeletonManager/skeleton-manager";
import Loader from "react-js-loader";
const colors = scaleOrdinal(schemeCategory10).range();

const dataPie = require("../../consultantBackoffice/univerBackoffice/json/data2.json");
const dataPie2 = require("../../consultantBackoffice/univerBackoffice/json/data3.json");
const dataComposed = require("../../consultantBackoffice/univerBackoffice/json/dataComposed.json");

const SidebarManager = () => {
  const [dataFirst, setDataFirst] = useState();
  const [data, setData] = useState();
  const [dataComposeds, setDataComposeds] = useState();
  const [data_doxod, setDataDoxod] = useState();
  const [loading, setLoading] = useState(false);
  const [count,setCount] = useState()
  const [second, setSecond] = useState([]);
  const [secondBlock, setSecondBlock] = useState([]);
  const [firstBlock, setFirstBlock] = useState([]);
  const [endDate, setEndDate] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [payment, setPayment] = useState({
    not_paid: "",
    paid: "",
    waiting_confirmation: "",
  });

  const fetchByDay = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/director/statistics/dashboard/third_block/?day=true`
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
        `/company/director/statistics/dashboard/third_block/?week=true`
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
        `/company/director/statistics/dashboard/third_block/?month=true`
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
        `/company/director/statistics/dashboard/third_block/?year=true`
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
        `/company/director/statistics/dashboard/third_block/?date-from=${startDate.toLocaleDateString()}&date-to=${endDate.toLocaleDateString()}`
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
      const res = await Axios.get(
        `/company/director/statistics/dashboard/second_block/`
      );
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
  useEffect(() => {
    setLoading(true);
    let mounted = true;
    Axios.get("company/director/statistics/manager/first_block/").then(
      (res) => {
        if (mounted) {
          setLoading(false);
          setFirstBlock(res.data);
        }
      }
    );
    Axios.get(`company/director/statistics/manager/second_block/?limit=${rowsPerPage}`).then(
      (res) => {
        console.log(res);
        if (mounted) {
          setLoading(false);
          setSecondBlock(res.data);
        }
      }
    );
    return () => {
      mounted = false;
    };
  }, []);

  const handlePageChange = async(e, newPage) => {
    setPage(newPage);
    setLoading(true)
     try {
        const res = await Axios.get(`/applicant/list/?limit=${rowsPerPage}&offset=${newPage*rowsPerPage}`);
        const { status, data ,count } = res;
        const { results } = data;
        if (status == 200) {
          setSecondBlock(data);
        }
        console.log(res);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
  };

  const handleChangeRowsPerPage = async (event) => {
    console.log(rowsPerPage);
    console.log(event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
    }
  return (
    <React.Fragment>
      <Sidebar>
        <div className="asos">
          <div className="up_nav n_up">
            <div>
              <h1 className="link_h1">????????????????</h1>
            </div>
            <div className="user_info">
              <img src={userpic} alt="" />
              <div>
                <h1>
                  {selector.first_name} {selector.last_name}
                </h1>
                <h>
                  {(selector.role == "branch_director" && "???????????????? ??????????????") ||
                    selector.role}
                </h>
              </div>
            </div>
          </div>
          <div className="home m_analitika manager-director">
            <FilterContainer>
              <p onClick={fetchByDay}>????????</p>
              <p onClick={fetchByWeek}>????????????</p>
              <p onClick={fetchByMonth}> ??????????</p>
              <p onClick={fetchByYear}>??????</p>
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
                  placeholderText="????"
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
                  placeholderText="????"
                />
              </p>
            </FilterContainer>
            <div className="block_1">
              {/* card */}
              <div className="card manager-director-text">
                <h4>????????????????</h4>
                <h3>{firstBlock.contract}</h3>
              </div>
              {/* card */}
              <div className="card manager-director-text ">
                <h4>??????????????????????</h4>
                <h3>{firstBlock.completed}</h3>
              </div>
              {/* card */}
              <div className="card manager-director-text">
                <h4>???? ??????????????????????</h4>
                <h3>{firstBlock.rejected}</h3>
              </div>
              {/* card */}
              <div className="card manager-director-text">
                <h4>????-?? ?????????? ????????????</h4>
                <h3>{firstBlock.total_sum}</h3>
              </div>
            </div>
            <div className="SidebarUniverstitet">
              <div className="univerList fakultet" id="scroll_bar">
                <table>
                  <thead>
                    <tr>
                      <th className="firstTD">??</th>
                      <th className="">??????</th>
                      <th>?? ??????????????????????</th>
                      <th>?? ????????????????????</th>
                      <th>?? ??????????????????</th>
                      <th>?? ??????????????????</th>
                      <th>???????????????? ????????????????</th>
                      <th>?? ????????????????????????</th>
                      <th></th>
                      <th>??????????????</th>
                      <th></th>
                      <th>??????????????????????</th>
                      {/* <th>??????????????</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <Loader
                        type="spinner-circle"
                        bgColor={"#FFFFFF"}
                        color={"#FFFFFF"}
                        size={80}
                      />
                    ) : (
                      secondBlock?.map((x, i) => {
                        return (
                          <tr>
                            <td>{i + 1}</td>
                            <td className="firstTD">{x.full_name}</td>
                            <td>{x.applicants.in_register}</td>
                            <td>{x.applicants.in_accountant}</td>
                            <td>{x.applicants.in_manager}</td>
                            <td>{x.applicants.in_notary}</td>
                            <td>{x.applicants.in_checking_translations}</td>
                            <td>{x.applicants.in_university}</td>
                            <td>{}</td>
                            <td>{x?.applicants?.completed}</td>
                            <td>{}</td>
                            <td>{x?.applicants?.rejected}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
                <TablePagination
                  rowsPerPageOptions={[20,40,60]}
                  component="table"
                  count={count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleChangeRowsPerPage}
               />
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </React.Fragment>
  );
};

export default SidebarManager;

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
