import React from 'react';
import NotariusSidebar from '../NotariusStudent';

import userpic from  "../../../assets/icon/userpic.svg"
import pdf from  "../../../assets/icons/pdf.svg"
import down_doc from  "../../../assets/icons/down_doc.svg"
import check from  "../../../assets/icons/check.svg"
import folder from  "../../../assets/icons/folder.svg"

const N_doc_single = () => {
    return ( 
        <React.Fragment>
            <NotariusSidebar/>
            <div>
                <div className="up_nav n_up">
                    <div className="single_h1">
                        <h1 className="link_h1">Документы </h1> <h3> {" > "}Сардорбек Максудов</h3>
                    </div>
                    <div className="user_info">
                        <img src={userpic} alt="" />
                        <div>
                            <h1>Sevara Ibragimova</h1>
                            <h2>Нотариус</h2>
                        </div>
                    </div>
                </div>
                <div className="doc_perevodi">
                    <div className="doc_1">
                        <h1>Оригинал документов:</h1>
                        <a href="#" className="form_doc"><img src={pdf} alt="" /><p> Паспорт </p><img src={down_doc} alt="" /></a>
                        <a href="#" className="form_doc"><img src={pdf} alt="" /><p> Диплом/Аттестат </p><img src={down_doc} alt="" /></a>
                        <a href="#" className="form_doc"><img src={pdf} alt="" /><p> Свидет. о рождении </p><img src={down_doc} alt="" /></a>
                        <a href="#" className="form_doc"><img src={pdf} alt="" /><p> 3х4 фото 8шт. </p><img src={down_doc} alt="" /></a>
                        <a href="#" className="form_doc"><img src={pdf} alt="" /><p> Паспорт матери </p><img src={down_doc} alt="" /></a>
                        <a href="#" className="form_doc"><img src={pdf} alt="" /><p> Свид. о браке </p><img src={down_doc} alt="" /></a>
                        <a href="#" className="form_doc"><img src={pdf} alt="" /><p> Договор с компанией </p><img src={down_doc} alt="" /></a>
                        <a href="#" className="form_doc"><img src={pdf} alt="" /><p> 063 мед. справка </p><img src={down_doc} alt="" /></a>
                        <a href="#" className="form_doc"><img src={pdf} alt="" /><p> 086 мед. справка </p><img src={down_doc} alt="" /></a>
                        <a href="#" className="form_doc"><img src={pdf} alt="" /><p> Справка о ВИЧ </p><img src={down_doc} alt="" /></a>
                    </div>
                    <div className="doc_2">
                        <h1>Перевод документов:</h1>
                        <div className="form_doc"><img src={pdf} alt="" /> <p> Паспорт </p> <img src={check} alt="" /></div>
                        <div className="form_doc"><img src={pdf} alt="" /> <p> Диплом/Аттестат </p> <img src={check} alt="" /></div> 
                        <label htmlFor="drop1" className="form_down"><img src={folder} alt="" /><input type="file" name="" id="drop1" /> <p>Drop your files here or <span>choose file</span></p></label>
                        <label htmlFor="drop2" className="form_down"><img src={folder} alt="" /><input type="file" name="" id="drop2" /> <p>Drop your files here or <span>choose file</span></p></label>
                        <label htmlFor="drop3" className="n_btn"><input type="file" name="" id="drop3" />Загрузить перевод</label>
                        <label htmlFor="drop4" className="n_btn"><input type="file" name="" id="drop4" />Загрузить перевод</label>
                        <label htmlFor="drop5" className="n_btn"><input type="file" name="" id="drop5" />Загрузить перевод</label>
                        <label htmlFor="drop6" className="n_btn"><input type="file" name="" id="drop6" />Загрузить перевод</label>
                        <label htmlFor="drop7" className="n_btn"><input type="file" name="" id="drop7" />Загрузить перевод</label>
                        <label htmlFor="drop8" className="n_btn"><input type="file" name="" id="drop8" />Загрузить перевод</label>
                    </div>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default N_doc_single;