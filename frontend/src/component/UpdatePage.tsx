import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import UpdatePageView from "./UpdatePageView";
import usePostStore from "../zustand/usePostStore";


const UpdatePage = () => {

    const {id} = useParams();
    let navigate = useNavigate();

    // 기존 값 가져오기 위해 Hook - useState() 이용
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 수정하기 위해 zustand 사용
    const updateTitle: string = usePostStore((state) => state.title);
    const setUpdateTitle = usePostStore((state) => state.setTitle);

    const updateContent: string = usePostStore((state) => state.content);
    const setUpdateContent = usePostStore((state) => state.setContent);


    // 수정 버튼 클릭 이벤트
    const updateOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let date = new Date();

        // 제목 및 내용이 입력되어 있지 않으면 막기
        if (updateTitle === '' || updateContent === '') {
            Swal.fire(
                '',
                '내용 입력해주세요.',
                'warning'
            )
        } else {
            axios({
                url: `http://localhost:8080/posts/update/${id}`,
                method: 'put',
                data: {
                    "id": id,
                    "title": updateTitle,
                    "content": updateContent,
                    "date": date.toLocaleDateString()
                }
            }).then((res: any) => {
                Swal.fire(
                    '',
                    '수정 완료!',
                    'success'
                )
                setTimeout(() => {
                    navigate(`/posts/${id}`);
                }, 2000)
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    // 수정한 content set해주기
    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        var contents: string = e.target.value;
        contents = contents.replace(/(\n|\r\n)/g, '<br>');      // 줄띄기하면 <br>로 저장되게
        setUpdateContent(contents);
    }

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.target.value);
    }

    // 수정하기 위해 기존 값 가져오기
    useEffect(() => {
        axios({
            url: `http://localhost:8080/posts/update/${id}`,
            method: 'get'
        }).then((res: any) => {
            setTitle(res.data.title);
            setContent(res.data.content);
        }).catch((error) => {
            console.log(error)
        })
    }, [id])


    const updatePageViewProps = {
        title,
        content,
        updateOnClick,
        onChangeContent,
        onChangeTitle
    }

    return <UpdatePageView {...updatePageViewProps}/>;

}

export default UpdatePage;