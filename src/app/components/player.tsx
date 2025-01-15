"use client";

import Image from "next/image";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { PlayerState } from "@/atom/atom";
import { Playing } from "@/atom/playing";
import { GoPlus } from "react-icons/go";

const AudioComponent = styled.div`
    .player {
        width: 380px !important;
        height: 60px !important;
        margin-top: 40px;
    }
`

const PlayerComponent = () => {
    const [isWindow, setIsWindow] = useState<boolean>(false);
    const [playerState, setPlayerState] = useAtom(PlayerState);
    const [playingState, setPlayingState] = useAtom(Playing);

    const closeModal = () => {
        setPlayingState(false);
        const nonePlayerState = {
            "title": "",
            "file_name": "",
            "thumbnail": "",
            "tag": "",
            "dialogue": "",
            "comment": ""
        }
        setPlayerState(nonePlayerState);
    }
    useEffect(()=> {
        setIsWindow(true);
    },[]);
    return isWindow && (
        <div 
            className={`
                fixed right-[10px] top-[20vh] w-full max-w-[400px] min-h-[100px] flex flex-col justify-start items-start 
                shadow-lg rounded-[14px] overflow-hidden p-[10px] bg-white
                border-[2px] border-solid border-[#e9e9e9]
                ${playerState.title === "" && "!hidden"}
            `}
        >
            <h4 className="mb-[8px] font-semibold text-[20px] w-full max-w-[calc(100%-40px)]">{playerState.title}</h4>
            <div className="w-full h-[210px] rounded-[10px] overflow-hidden flex justify-center items-center">
                {
                    playerState.thumbnail && 
                    (
                        <Image
                            src={`${playerState.thumbnail}`}
                            width={400}
                            height={210}
                            loading="eager"
                            alt="..."
                            className="object-cover mb-[14px]"
                        />
                    )
                }
            </div>
            {
                playerState.dialogue !== "" &&
                <h4 className="w-full text-center my-[8px]">"{playerState.dialogue}"</h4>
            }
            <div className={`w-full min-h-[64px] flex flex-wrap justify-start items-start mt-[10px] gap-[8px]`}>
                {
                    playerState.tag !== "" && playerState.tag.split(',').map((content:string, index:number) => (
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
            {isWindow && playerState.file_name && (
                <AudioComponent>
                    <ReactPlayer 
                        url={`${playerState.file_name}`} 
                        playing={playingState} 
                        controls
                        volume={0.2}
                        className={'player'}
                    />
                </AudioComponent>
            )}
            <GoPlus onClick={()=> closeModal()} className="absolute right-[6px] top-[6px] rotate-45 text-[34px] cursor-pointer" />
        </div>
    )
}

export default PlayerComponent;