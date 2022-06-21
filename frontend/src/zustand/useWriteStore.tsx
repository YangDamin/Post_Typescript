import create, {SetState} from "zustand";
import {devtools} from "zustand/middleware";

const useWriteStore = create(
    devtools(                                   // set 함수 사용해서 상태 변경
        (set:SetState<any>) => ({
            title: '',             // 제목
            content: '',            // 내용
            setTitle: (t : string) => {
                set({title: t});
            },
            setContent: (c : string) => {
                set({content: c});
            }
        })
    )
)

export default useWriteStore;