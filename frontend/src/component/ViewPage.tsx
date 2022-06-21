import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ViewPageView from "./ViewPageView";
import usePostStore from "../zustand/usePostStore";


const ViewPage = () => {
    // 게시물 id
    const {id} = useParams();
    let navigate = useNavigate();

    // 어떠한 형태로 꺼내올지 정하는 함수를 전달해, 그에 맞는 state를 가져옴
    const title = usePostStore((state) => state.title);
    const setTitle = usePostStore((state) => state.setTitle);
    const content = usePostStore((state) => state.content);
    const setContent = usePostStore((state) => state.setContent);
    const date = usePostStore((state) => state.date);
    const setDate = usePostStore((state) => state.setDate);
    const viewCnt = usePostStore((state) => state.viewCnt);
    const setViewCnt = usePostStore((state) => state.setViewCnt);

    // 추천 수
    const [recommendCnt, setRecommendCnt] = useState(0);

    // 게시물 삭제
    const deleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        Swal.fire({
            title: '',
            text: "게시물 삭제하시겠습니까?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/posts/${id}`)
                    .then((res) => {
                        Swal.fire(
                            '',
                            '삭제 완료되었습니다.',
                            'success'
                        )
                        setTimeout(function () {
                            navigate("/");
                        }, 2000)
                    })
            }
        })
    }

    // 게시물 수정
    const updateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate(`/posts/update/${id}`);
    }

    // 목록으로 돌아가기 버튼
    const backClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/");
    }

    // 추천 버튼 클릭 이벤트
    const recommendClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
            axios({
                url: `http://localhost:8080/posts/${id}`,
                method: 'put'
            }).then((res:any) => {
                setRecommendCnt(res.data);
            }).catch((error) => {
                console.log(error);
            })

    }

    // 게시물 id에 해당하는 게시물 data 가져오기
    useEffect(() => {
        axios({
            url: `http://localhost:8080/posts/${id}`,
            method: 'get'
        }).then((res:any) => {
            // 가져온 데이터 set
            setTitle(res.data.title);
            setContent(res.data.content);
            setDate(res.data.date);
            setViewCnt(res.data.viewCnt);
            setRecommendCnt(res.data.recommendCnt);
        }).catch((error) => {
            console.log(error)
        })
    }, [id])

    const viewPageViewProps = {
        title,
        date,
        updateClick,
        deleteClick,
        content,
        backClick,
        viewCnt,
        recommendClick,
        recommendCnt
    }

    return <ViewPageView {...viewPageViewProps} />;
}

export default ViewPage;