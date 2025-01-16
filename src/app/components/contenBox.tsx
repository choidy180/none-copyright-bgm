import { PlayerState } from "@/atom/atom";
import { Playing } from "@/atom/playing";
import { useSetAtom } from "jotai";
import Image from "next/image";
import React from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { TbPlayerPlayFilled } from "react-icons/tb";

interface prop {
    content: {
        comment: string;
        file_name: string;
        folder: string;
        game_en: string;
        game_ko: string;
        tag: string;
        dialogue: string;
        thumbnail: string;
        title: string;
    },
    ui: boolean;
}

const ContentBox = (prop:prop) => {
    const setPlayerState = useSetAtom(PlayerState);
    const setPlayingState = useSetAtom(Playing);

    const audioPlay = () => {
        const newPlayerState = {
            "title": `${prop.content.title}`,
            "file_name": `audio/${prop.content['folder']}/${prop.content['file_name']}`,
            "thumbnail": `${prop.content.thumbnail}`,
            "tag": `${prop.content.tag}`,
            "dialogue": `${prop.content.dialogue}`,
            "comment": `${prop.content.comment}`
        }
        setPlayerState(newPlayerState);
        setPlayingState(true);
    }

    const downloadAudio = () => {
        const fileUrl = `audio/${prop.content['folder']}/${prop.content['file_name']}`;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute("download", `${prop.content['file_name']}`); // 다운로드 파일 이름
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // 링크 제거
    }
    return (
        <div className={`w-[324px] flex flex-col justify-start items-start p-[8px] border-[2px] border-solid border-[#7bed9f] transition-all bg-white rounded-[8px] hover:bg-gray-100 ${prop.ui === false && 'w-full'}`}>
            <div className={`w-full flex flex-col justify-start items-start ${prop.ui === false && '!flex-row'}`}>
                <div className={`w-full h-[170px] bg-[#e9e9e9] rounded-[6px] overflow-hidden group ${prop.ui === false && '!w-[280px] !h-[158px]'}`}>
                    <Image
                        src={`${prop.content.thumbnail}`}
                        width={320}
                        height={200}
                        alt="..."
                        className="object-cover"
                    />
                </div>
                <div className={`w-full flex flex-col justify-start items-start ${prop.ui === false && '!w-[calc(100%-300px)] ml-[14px]'}`}>
                    <div className={`w-full flex justify-start items-center ${prop.ui === false && 'w-[calc(100%-200px)]'}`}>
                        <div onClick={()=> audioPlay()} className="mt-[8px] w-[38px] h-[38px] bg-[#f53b57] flex justify-center items-center rounded-full mr-[8px] cursor-pointer">
                            <TbPlayerPlayFilled className="text-white text-[26px]"/>
                        </div>
                        <p className="mt-[10px] w-[calc(100%-70px)] font-medium text-[18px] leading-[20px]">{prop.content.title}</p>
                    </div>
                    <div className={`w-full min-h-[64px] flex flex-wrap justify-start items-start mt-[10px] gap-[8px] ${prop.ui === false && '!min-h-[30px]'}`}>
                        {
                            prop.content.tag && prop.content.tag.split(',').map((content:string, index:number) => (
                                <span 
                                    className={`
                                        text-white text-[16px] rounded-[8px] px-[10px] py-[2px]
                                        bg-[#2ecc71]
                                    `} 
                                    key={`tag-${index}`}
                                >
                                    {content}
                                </span>
                            ))
                        }
                    </div>
                    <div className={`w-full flex flex-col justify-start items-center mt-[20px] ${prop.ui === false && 'mt-[4px] !items-start'}`}>
                        <p className="text-[16px] font-semibold flex justify-start items-center">Comment.. <IoChatbubbleEllipses className="w-[18px] h-[18px] ml-[6px] text-[#3498db]"/></p>
                        <p className={`text-[18px] leading-[20px] mt-[8px] min-h-[100px] ${prop.ui === false && '!mt-[4px] !min-h-0'}`}>{prop.content.comment}</p>
                    </div>
                </div>
            </div>
            <button 
                className={`
                    w-full p-[4px] text-[18px] border-[2px] border-solid border-green-400 
                    rounded-[8px] mt-[20px] bg-white hover:bg-green-300 font-semibold
                    ${prop.ui === false && 'absolute right-[8px] top-[-12px] !w-[100px]'}
                `}
                onClick={downloadAudio}
            >
                다운로드
            </button>
        </div>
    )
}
export default ContentBox;