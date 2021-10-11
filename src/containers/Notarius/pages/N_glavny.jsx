import React, { Component } from 'react';
import NotariusSidebar from '../NotariusStudent';
import "../../../style/css/notarius.css"
import userpic from  "../../../assets/icon/userpic.svg"

const N_glavny = () => {
    return ( 
        <React.Fragment>
            <NotariusSidebar/>
            <div>
                <div className="up_nav n_up">
                    <div>
                        <h1 className="link_h1">Главное</h1>
                    </div>
                    <div className="user_info">
                        <img src={userpic} alt="" />
                        <div>
                            <h1>Sevara Ibragimova</h1>
                            <h2>Нотариус</h2>
                        </div>
                    </div>
                    
                </div>
                <div className="n_glavny">
                    <h1>Примечания</h1>
                    <div className="zametki">
                        <div className="paper">
                            <h1>Заметка 1</h1>
                            <p>Не забудьте выложить каждый документ в базу данных</p>
                        </div>
                        <div className="paper">
                            <h1>Заметка 2</h1>
                            <p>Не забудьте выложить каждый документ в базу данных Не забудьте выложить каждый документ в базу данных</p>
                        </div>
                        <div className="paper">
                            <h1>Заметка 3</h1>
                            <p>Не забудьте выложить каждый документ в базу данных</p>
                        </div>
                        <div className="paper">
                            <h1>Заметка 4</h1>
                            <p>Не забудьте выложить каждый документ в базу данных</p>
                        </div>
                        <div className="paper">
                            <h1>Заметка 5</h1>
                            <p>Не забудьте выложить каждый документ в базу данных</p>
                        </div>
                        <div className="paper">
                            <h1>Заметка 6</h1>
                            <p>Не забудьте выложить каждый документ в базу данных</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default N_glavny;