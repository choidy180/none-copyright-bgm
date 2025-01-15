"use client";

import Image from "next/image";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { PlayerState } from "@/atom/atom";

const AudioComponent = styled.div`
    .player {
        width: 380px !important;
        height: 60px !important;
    }
`

const PlayerComponent = () => {
    const [isWindow, setIsWindow] = useState<boolean>(false);
    const [playerState, setPlayerState] = useAtom(PlayerState);
    useEffect(()=> {
        setIsWindow(true);
    },[]);
    return (
        <div className="fixed right-[10px] top-[20vh] w-full max-w-[400px] min-h-[100px] flex flex-col justify-start items-center shadow-lg rounded-[14px] overflow-hidden p-[10px] bg-white">
            <div className="w-full h-[210px] rounded-[10px] overflow-hidden flex justify-center items-center">
                <Image
                    src={`${playerState.thumbnail}`}
                    width={400}
                    height={210}
                    alt="..."
                    className="object-cover"
                />
                <div className="w-full h-full absolute left-0 top-0 bg-black/40"/>
            </div>
            <h4 className="my-[14px] font-semibold text-[20px]" onClick={()=> console.log(playerState)}>{playerState.title}</h4>
            {isWindow&&(
                <AudioComponent>
                    <ReactPlayer 
                        url={`audio/lostark/[로스트아크] 반추의 공간 ｜ BGM.mp3`} 
                        playing={false} 
                        controls
                        className={'player'}
                        onPlay={()=> alert(123)}
                    />
                </AudioComponent>
            )}
        </div>
    )
}

export default PlayerComponent;