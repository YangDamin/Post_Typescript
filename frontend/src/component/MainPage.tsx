import React, {useEffect, useState} from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import axios from "axios";
import MainPageView from "./MainPageView";
import {BoardData} from "../type/app";


const MainPage = () => {

    // AGGrid
    const [dataList, setDataList] = useState<any[]>([]);       // 게시물 data, state의 type을 지정할 땐 Generics안에 타입을 지정해준다.
    const columnDefs = [
        {headerName: '제목', field: "title", width: 700, filter: 'agTextColumnFilter', floatingFilter : true},
        {headerName: '작성 날짜', field: "date", width: 200, sort: 'desc'},
        {headerName: '조회수', field: "viewCnt", width: 150},
        {headerName: '추천', field: "recommendCnt", width: 100}
    ]

    // 글쓰기 버튼 큻릭 시 이벤트
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        window.location.href = "/posts/write";
    }

    const rowData = dataList.map((data: BoardData) => {
        return {
            title: data.title,
            date: data.date,
            id: data.id,
            viewCnt : data.viewCnt,
            recommendCnt : data.recommendCnt
        }
    })

    const mainPageViewProps = {
        onClick,
        columnDefs,
        rowData
    };

    useEffect(() => {
        axios({
            url: "http://localhost:8080",
            method: "get"
        }).then((res:any) => {
            setDataList(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return <MainPageView {...mainPageViewProps}/>;
}

export default MainPage;