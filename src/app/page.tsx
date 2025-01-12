"use client";

import { useState } from "react";
import ContentBox from "./components/contenBox";
import LoadData from "../app/json/main_data.json";
import { PiCardsBold, PiListFill } from "react-icons/pi";

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
    const [theme, setTheme] = useState<number>(0);
    const [keyword, setKeyword] = useState<string>('');
    const [ui, setUi] = useState<boolean>(true);
    return (
        <div className="w-full flex flex-col justify-start items-center p-[20px]">
            <h4 className="mt-[100px] text-[34px] font-bold en mb-[80px]">Copyright-free BGM</h4>
            <input 
                type="text" 
                placeholder={`${theme === 0 ? '게임제목으로 검색해보세요':''}${theme === 1 ? '음악제목으로 검색해보세요':''}${theme === 2 ? '테마명으로 검색해보세요':''}`} 
                className="
                    w-[calc(100%-20px)] max-w-[1000px] outline-none
                    px-[20px] py-[10px] rounded-[8px]
                    border-[2px] border-solid border-[#1dd1a1] 
                    focus-within:border-[#1dd1a1] active:border-[#1dd1a1]
                "
                value={keyword}
                onChange={(event)=> setKeyword(event?.target.value)}
            />
            <div className="mt-[20px] p-[8px] flex justify-center items-center w-[calc(100%-20px)] rounded-[8px] max-w-[1000px] h-[58px] text-[24px] font-semibold border-[3px] border-solid border-[#7bed9f]">
                <div 
                    className={`
                        bg-[#7bed9f] w-[calc(33.3333%-4px)] !h-[40px] rounded-[8px]
                        absolute transition-all left-0 translate-x-[6px]
                        ${theme === 0 && '!translate-x-[8px]'}
                        ${theme === 1 && '!translate-x-[calc(100%+6px)]'}
                        ${theme === 2 && '!translate-x-[calc(200%+4px)]'}
                    `}
                />
                <div className="w-full flex justify-center items-center cursor-pointer" onClick={()=> setTheme(0)}>
                    <span>게임별</span>
                </div>
                <div className="w-full flex justify-center items-center cursor-pointer" onClick={()=> setTheme(1)}>
                    <span>이름별</span>
                </div>
                <div className="w-full flex justify-center items-center cursor-pointer" onClick={()=> setTheme(2)}>
                    <span>테마별</span>
                </div>
            </div>
            <div 
                className={`
                    w-[calc(100%-20px)] max-w-[1000px] flex justify-center items-center 
                    mt-[10px] text-[24px] p-[8px] rounded-[8px]
                    border-[3px] border-solid border-[#7bed9f]
                `}
            >
                <div 
                    className={`
                        bg-[#7bed9f] w-[calc(50%-8px)] h-[40px] rounded-[4px] 
                        absolute transition-all left-0 translate-x-[100%] font-bold
                        ${ui === true && '!translate-x-[8px]'}
                        ${ui === false && '!translate-x-[calc(100%+8px)]'}
                    `}
                />
                <div className="w-full flex justify-center items-center h-[40px] cursor-pointer" onClick={()=> setUi(true)}>
                    <p className="flex justify-center items-center font-bold">카드UI <PiCardsBold /></p>
                </div>
                <div className="w-full flex justify-center items-center h-[40px] cursor-pointer" onClick={()=> setUi(false)}>
                    <p className="flex justify-center items-center font-bold">리스트UI <PiListFill /></p>
                </div>
            </div>

            {
                theme === 0 && LoadData.list[0].split(',').filter((title:string) => title.includes(keyword)).map((gameTitle:string, index:number)=>(
                    <div key={index} className="w-[calc(100%-20px)] max-w-[1000px] mb-[80px]">
                        <h4 className="text-[22px] font-semibold mt-[40px] mb-[10.5px]">{gameTitle}</h4>
                        <div className={`w-full flex flex-wrap justify-start items-center gap-[14px] ${ui === false && 'flex-col'}`}>
                            {
                                LoadData.data.filter((item:prop)=> item.title !== "" && gameTitle === item.game_ko).map((content, index) => (
                                    <ContentBox ui={ui} key={index} content={content}/>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
            {
                <div className={`w-[calc(100%-20px)] max-w-[1000px] mb-[80px] ${theme !== 1 && '!hidden'}`}>
                    <div className={`w-full flex flex-wrap justify-start items-center gap-[14px] mt-[40px]  ${ui === false && 'flex-col'}`}>
                        {
                            LoadData.data.filter((item:prop)=> item.title !== "" && item.title.includes(keyword)).sort((a:prop, b:prop) => a.title.localeCompare(b.title, 'ko')).map((content:prop, index:number) => (
                                <ContentBox ui={ui} key={index} content={content}/>
                            ))
                        }
                    </div>
                </div>
            }
            {
                <div className={`w-[calc(100%-20px)] max-w-[1000px] min-h-screen mb-[80px] ${theme !== 2 && '!hidden'}`}>
                </div>
            }
        </div>
    );
}
