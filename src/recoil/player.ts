import uuid from "react-uuid";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface player {
    img: string;
    file: string;
    playing: boolean;
    title: string;
    dialogue: string;
    tag: string;
    comment: string;
}

export const PlayerState = atom<player>({
    key: `isPlayer/${uuid()}`,
    default: {
        "img": "",
        "file": "",
        "playing": false,
        "title": "",
        "dialogue": "",
        "tag": "",
        "comment": ""
    },
    effects_UNSTABLE:[persistAtom],
})