import React from "react";
import style from '../style/Main.module.css' ;
import { AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {useNavigate} from "react-router-dom";


interface Props {
    onClick : any;
    columnDefs : any;
    rowData : Array<any>;
}

const MainPageView :React.FC<Props> = ({
    onClick,
    columnDefs,
    rowData,
}) => {
    let navigate = useNavigate();

    return (
        <div className={style.main_div}>
            <button type="button" className="btn btn-white btn-outline-primary" onClick={onClick}>
                글쓰기
            </button>

            {/*    aggrid    */}
            <div className="ag-theme-alpine" id={style.ag_grid}>
                <AgGridReact
                    headerHeight={40}
                    columnDefs={columnDefs}
                    rowData={rowData}

                    // 행 클릭 시, 해당 게시물로 이동
                    onRowClicked = {(e) => {
                        navigate(`/posts/${e.data.id}`);
                    }}
                >
                </AgGridReact>
            </div>
        </div>
    )
}

export default MainPageView;