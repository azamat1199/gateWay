import React, { Component } from 'react';

// import img 
import russiaFlag from  "../../../assets/icon/russiaFlag.png"  
import usaFlag from     "../../../assets/icon/usaFlag.png"  

// import css
import "../../../style/css/SideStrana.css"
import Sidebar from './SidebarConsult';

const SideStrana = () => {
    return ( 
        <Sidebar>
        <div className="asos">
            <div className="Up_navbar">
                <h4>Cтраны</h4>
                <div>
                    <img src="https://picsum.photos/70" alt="" />
                    <div>
                        <h5>Nargiza Akhmedova</h5>
                        <p>IT Specialist</p>
                    </div>
                </div>
            </div>
        <div className="SideStrana">
            <div className="addNote">
                <input type="text" placeholder="Добавьте заметку сотруднику"/>
            </div>
            <button>Добавить страну</button>
            <div className="blockCountry">
                <h4>Список стран</h4>
                <div className="listCountry">
                    {/*  */}
                    <div>
                        <img src={russiaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                    {/*  */}
                    <div>
                        <img src={usaFlag} alt="" />
                        <p>Испания</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </Sidebar>
    );
}

export default SideStrana;