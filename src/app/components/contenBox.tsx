import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoChatbubbleEllipses, IoPauseSharp } from "react-icons/io5";
import { TbPlayerPlayFilled } from "react-icons/tb";

interface prop {
    content: {
        comment: string;
        file_name: string;
        folder: string;
        game_en: string;
        game_ko: string;
        tag: string;
        thumbnail: string;
        title: string;
    }
}

const ContentBox = (prop:prop) => {
    const [playing, setPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const audioPlay = () => {
        if(audioRef.current){
            audioRef.current.play();
        }
    }
    const audioPause = () => {
        if(audioRef.current){
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }
    useEffect(()=> {
        if(playing){
            audioPlay();
        } else {
            audioPause();
        }
    },[playing]);
    useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = 0.1; // 볼륨을 50%로 설정
        }
      }, []);

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
        <div className="w-[324px] flex flex-col justify-start items-start p-[8px] border-[2px] border-solid border-[#7bed9f] transition-all bg-white rounded-[8px] hover:bg-gray-100">
            <audio className="hidden" ref={audioRef} controls>
                <source src={`audio/${prop.content['folder']}/${prop.content['file_name']}`} type="audio/mp3"/>
            </audio>
            <div className="w-full h-[170px] bg-[#e9e9e9] rounded-[6px] overflow-hidden group">
                <Image
                    src={`${prop.content.thumbnail}`}
                    width={320}
                    height={200}
                    alt="..."
                    className="object-cover"
                />
            </div>
            <div className="w-full flex justify-start items-center">
                {
                    playing === false &&
                    (
                        <div onClick={()=> setPlaying(true)} className="mt-[8px] w-[38px] h-[38px] bg-[#f53b57] flex justify-center items-center rounded-full mr-[8px] cursor-pointer">
                            <TbPlayerPlayFilled className="text-white text-[26px]"/>
                        </div>
                    )
                }
                {
                    playing === true &&
                    (
                        <div onClick={()=> setPlaying(false)} className="mt-[8px] w-[38px] h-[38px] bg-[#3498db] flex justify-center items-center rounded-full mr-[8px] cursor-pointer">
                            <IoPauseSharp className="text-white text-[26px]"/>
                        </div>
                    )
                }
                <p className="mt-[10px] w-[calc(100%-70px)] font-medium text-[18px] leading-[20px]">{prop.content.title}</p>
            </div>
            <div className="w-full min-h-[64px] flex flex-wrap justify-start items-start mt-[10px] gap-[8px]">
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
            <div className="w-full flex flex-col justify-start items-center mt-[20px]">
                <p className="text-[16px] font-semibold flex justify-start items-center">Comment.. <IoChatbubbleEllipses className="w-[18px] h-[18px] ml-[6px] text-[#3498db]"/></p>
                <p className="text-[18px] leading-[20px] mt-[8px] min-h-[100px]">{prop.content.comment}</p>
            </div>
            <button 
                className="
                    w-full p-[4px] text-[18px] border-[2px] border-solid border-green-400 
                    rounded-[8px] mt-[20px] bg-white hover:bg-green-300 font-semibold
                "
                onClick={downloadAudio}
            >
                다운로드
            </button>
        </div>
    )
}
export default ContentBox;