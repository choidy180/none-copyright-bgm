"use client";

import { useState } from "react";
import ContentBox from "./components/contenBox";
import LoadData from "../app/json/main_data.json";

interface prop {
    comment: string;
    file_name: string;
    folder: string;
    game_en: string;
    game_ko: string;
    tag: string;
    thumbnail: string;
    title: string;
}

export default function Home() {
    const [theme, setTheme] = useState<boolean>(true);
    return (
        <div className="w-full flex flex-col justify-start items-center p-[20px]">
            <h4 className="mt-[100px] text-[34px] font-bold en">Copyright-free BGM</h4>
            <input 
                type="text" 
                placeholder="음악을 검색해보세요" 
                className="
                    w-[calc(100%-20px)] max-w-[1000px] outline-none
                    px-[20px] py-[10px] rounded-[8px]
                    border-[2px] border-solid border-[#1dd1a1] 
                    focus-within:border-[#1dd1a1] active:border-[#1dd1a1]
                "
            />
            <div className="mt-[20px] flex justify-center items-center w-[calc(100%-20px)] max-w-[1000px] h-[36px] text-[24px] font-semibold">
                <div className={`bg-[#7bed9f] w-[50%] h-[36px] rounded-[4px] absolute transition-all left-0 translate-x-[100%] ${theme && '!translate-x-0'}`}/>
                <div className="w-full flex justify-center items-center">
                    <span className="cursor-pointer" onClick={()=> setTheme(true)}>테마별</span>
                </div>
                <div className="w-full flex justify-center items-center">
                    <span className="cursor-pointer" onClick={()=> setTheme(false)}>게임별</span>
                </div>
            </div>

            {
                LoadData.list[0].split(',').map((gameTitle:string, index:number)=>(
                    <div key={index} className="w-[calc(100%-20px)] max-w-[1000px] mb-[80px]">
                        <h4 className="text-[22px] font-semibold mt-[40px] mb-[10.5px]">{gameTitle}</h4>
                        <div className="w-full flex flex-wrap justify-start items-center gap-[14px]">
                            {
                                LoadData.data.filter((item:prop)=> item.title !== "" && gameTitle === item.game_ko).map((content, index) => (
                                    <ContentBox key={index} content={content}/>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
