import React, { Component, useState, useEffect, useRef } from "react";
import NotariusSidebar from "../NotariusSidebar";
import "../../../style/css/notarius.css";
import userpic from "../../../assets/icon/userpic.svg";
import plus from "../../../assets/icon/plus.svg";
import Loader from "react-js-loader";
import Axios from "../../../utils/axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
const N_glavny = () => {
  const [items, setItems] = useState([]);
  //   const [tempNote, setTempNote] = useState([]);
  const [value, setValue] = useState();
  const [note, setNote] = useState([]);
  const [words, setWords] = useState();
  console.log(words);
  const [loading, setLoading] = useState(false);
  let [count, setCount] = useState(0);
  const counts = new Date().getUTCMilliseconds();
  const inputRef = useRef();
  const selector = useSelector((state) => state);
  const { payload } = selector?.payload;
  const { first_name, last_name } = payload?.data;
  //   const handleWords = (data, id) => {
  //     const data = items.filter((item) => item.id !== id);
  //     setItems(data);
  //   };
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
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    fetchNote();
  };
  console.log(items);
  const deleteCard = (index) => {
    console.log(index);
    const filteredData = items.filter((item) => item.id != index);
    setItems(filteredData);
  };

  const inputHandler = (e, index) => {
    let filteredWords = items.find((item) => item.id == index);
    filteredWords.description = e.target.value;
    // handleWords(data, index);
    console.log(filteredWords, index);
  };

  const fetchNote = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/company/note/");
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setNote(results);
      }
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
        } catch (error) {
          console.log(error);
        }
        //   Swal.fire(
        //     'Deleted!',
        //     'Your file has been deleted.',
        //     'success'
        //   )
      }
    });
    console.log(id);
  };
  useEffect(() => {
    fetchNote();
  }, []);
  return (
    <React.Fragment>
      <NotariusSidebar />
      <div>
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">Главное</h1>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>
                {first_name} {last_name}
              </h1>
              <h2>Нотариус</h2>
            </div>
          </div>
        </div>
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

            {loading ? (
              <Loader
                type="spinner-circle"
                bgColor={"#fff"}
                color={"black"}
                size={70}
              />
            ) : (
              note.map((data, index) => {
                const { id, text } = data;
                return (
                  <div key={id} className="paper">
                    <span onClick={() => deleteFetchedCard(id)}>x</span>
                    <h1>Заметка {index + 1}</h1>
                    <p style={{ textAlign: "justify" }}>{text}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default N_glavny;
