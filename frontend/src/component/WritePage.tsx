import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import WritePageView from "./WritePageView";
import {useNavigate} from "react-router-dom";
import usePostStore from "../zustand/usePostStore";


const WritePage = () => {
    let navigate = useNavigate();

    const title:string = usePostStore((state) => state.title);
    const setTitle = usePostStore((state) => state.setTitle);

    const content:string = usePostStore((state) => state.content);
    const setContent = usePostStore((state) => state.setContent);


    // 작성 버튼 event
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // 작성 날짜
        let date = new Date();

        // 제목 및 내용이 입력되어 있지 않으면 막기
        if(title === '' || content === ''){
            Swal.fire(
                '',
                '내용 입력해주세요.',
                'warning'
            )
        } else {
            axios({
                url: 'http://localhost:8080/posts',
                method: "post",
                data: {
                    "title": title,
                    "content": content,
                    "date" : date.toLocaleDateString()
                }
            }).then((res) => {
                Swal.fire(
                    '',
                    '작성 완료!',
                    'success'
                )
                setTimeout( () => {
                    navigate("/");
                }, 2000)
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    // 작성한 content set
    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        var contents : string = e.target.value;
        contents = contents.replace(/(\n|\r\n)/g, '<br>');      // 줄띄기하면 <br>로 저장되게
        setContent(contents);
    }

    // 작성한 title set
    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const writePageViewProps = {
        onClick,
        onChangeContent,
        onChangeTitle
    };

    return <WritePageView {...writePageViewProps} />;
}

export default WritePage;