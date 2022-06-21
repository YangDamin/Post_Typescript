import create, {SetState} from "zustand";
import {devtools} from "zustand/middleware";

const useViewStore = create(
    devtools(
        (set:SetState<any>) => ({
            title: '',
            content: '',
            date: '',
            viewCnt: 0,
            setTitle: (t:string) => {
                set({title: t});
            },
            setContent: (c:string) => {
                set({content: c});
            },
            setDate: (d:string) => {
                set({date: d});
            },
            setViewCnt: (c:number) => {
                set({viewCnt: c});
            }
        })
    )
)

export default useViewStore;