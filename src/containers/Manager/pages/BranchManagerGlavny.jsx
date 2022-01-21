import React, { Component, useEffect, useState } from "react";
import BranchManagerSidebar from "./BanchManagerSidebar";
import userpic from "../../../assets/icon/LogoAsia.jpg";
import M_glavny_table from "./M_glavny_table";
import Axios from "../../../utils/axios";
import { useSelector } from "react-redux";
import "../../../style/css/notarius.css";
import plus from "../../../assets/icon/plus.svg";
import Loader from "react-js-loader";
import Swal from "sweetalert2";
import TablePagination from "@material-ui/core/TablePagination";
const BranchManagerGlavny = () => {
  const selector = useSelector((state) => state.payload.payload.data);
  const [note, setNote] = useState([]);
  const [words, setWords] = useState();
  const [items, setItems] = useState([]);
  const counts = new Date().getUTCMilliseconds();
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState("");
const [rowsPerPage, setRowsPerPage] = useState(10);
const [page, setPage] = useState(0);
const [count, setCount] = useState();
const [amount ,setAmount] = useState('')
const [pageChange,setPageChange] = useState()
const [prev, setPrev] = useState("");
  const addCard = () => {
    setItems([
      ...items,
      {
        id: counts,
        description: words,
      },
    ]);
  };
  const saveCard = async (id) => {
    let data = items.find((items) => items.id === id);
    let newData = items.filter((item) => item.id !== id);
    setItems(newData);
    try {
      const res = await Axios.post(`/company/note/`, {
        text: data.description,
      });
    } catch (error) {
    }
    fetchNote();
  };

  const deleteCard = (index) => {
    const filteredData = items.filter((item) => item.id != index);
    setItems(filteredData);
  };
  const inputHandler = (e, index) => {
    let filteredWords = items.find((item) => item.id == index);
    filteredWords.description = e.target.value;
  };

  const fetchNote = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/company/note/");
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setNote(results);
        setLoading(false);

      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const deleteFetchedCard = async (id) => {
    Swal.fire({
      icon: "warning",
      text: "Вы уверены, что хотите удалить?",
      showCancelButton: true,
      showConfirmButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await Axios.delete(`/company/note/${id}/`);
          const { status } = res;
          if (status === 204) {
            fetchNote();
          }
        } catch (error) {}
      }
    });
  };
  useEffect(() => {
    fetchNote();
  }, []);
  return (
    <React.Fragment>
      <BranchManagerSidebar />
      <div>
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">Клиентский ввод</h1>
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
        <M_glavny_table />
        <div className="n_glavny">
          <h1>Примечания</h1>
          <div className="zametki">
            <div
              onClick={addCard}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              className="paper"
            >
              <img src={plus} alt="plus" />
            </div>
            {items.map((data, index) => {
              const { description, id } = data;
              return (
                <div onBlur={() => saveCard(id)} key={id} className="paper">
                  <span onClick={() => deleteCard(id)}>x</span>
                  <h1>Заметка {index + 1}</h1>
                  <textarea onChange={(e) => inputHandler(e, id)}></textarea>
                  {/* <p onClick={saveCard} className="saveButton">сохранит</p> */}
                </div>
              );
            })}
            {note?.map((data, index) => {
              const { id, text } = data;
              return (
                <div key={id} className="paper">
                  <span onClick={() => deleteFetchedCard(id)}>x</span>
                  <h1>Заметка {index + 1}</h1>
                  <p style={{ textAlign: "justify" }}>{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BranchManagerGlavny;
