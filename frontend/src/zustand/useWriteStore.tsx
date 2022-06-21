import create, {SetState} from "zustand";
import {devtools} from "zustand/middleware";

const useWriteStore = create(
    devtools(
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