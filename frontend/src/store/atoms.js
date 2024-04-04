import { atom ,selector} from "recoil";
import axios from "axios";
const videoAtom = atom({
    key : "videoAtom",
    default : selector({
        key : 'videoAtom/sel',
        get : async () =>{
                const res = await axios.get('http://localhost:3000/meditation/getMed');
                return res.data.data;
            }
        })
})

const sleepVideoAtom = atom({
    key : "sleepVideoAtom",
    default : selector({
        key : 'sleepVideoAtom/sel',
        get : async () =>{
                const res = await axios.get('http://localhost:3000/sleep/getSleep');
                return res.data.data;
            }
        })
})


export {videoAtom ,sleepVideoAtom};

