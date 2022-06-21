import React from "react";
import style from '../style/Write.module.css';

interface Props {
    onClick : any;
    onChangeContent : any;
    onChangeTitle : any;
}

const WritePage :React.FC<Props> = ({
    onClick,
    onChangeContent,
    onChangeTitle
}) => {

    return(
        <div className={style.write_div}>
            <h3>글 쓰기</h3>
            <input className={style.title} type='text' placeholder='제목' onChange={onChangeTitle}/>
            <br/>
            <textarea className={style.content} rows={18} onChange={onChangeContent}/>
            <br/>
            <button type="button" className="btn btn-white btn-outline-primary mt-2" onClick={onClick}>
                작성
            </button>
        </div>
    )
}

export default WritePage;