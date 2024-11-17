'use client'
import VlogPlayer from "./VlogPlayer"
import { useState } from "react"
import { Rating } from "@mui/material"
import { useWindowListener } from "@/hooks/useWindowListener"

export default function TravelCard(){

    const [isPlaying,setPlaying]=useState(true)
    const [rating, setRating] = useState(0)
    const [pointerPosition,setPointerPosition]=useState({x:0,y:0})

    useWindowListener("pointermove",(e)=>{
        setPointerPosition({x:(e as PointerEvent).clientX,y:(e as PointerEvent).clientY})
    })

    return (
        <div className="w-[80%] shadow-lg mx-[10%] my-10 p-2 rounded-lg bg-gray-200 flex flex-row">
            <VlogPlayer vdoSrc="/video/Rolls-Royce.mov" isPlaying={isPlaying}/>
            <div className="font-bold text-black mx-10 my-3 text-3xl">
                Rolls-Royce Phantom Autumnal Drive
                ({pointerPosition.x},{pointerPosition.y})
                <button className='my-3 block rounded-md bg-sky-300 hover:bg-sky-600 px-3 py-2 text-white shadow-sm'
                    onClick={()=>{setPlaying(!isPlaying)}}>
                    {isPlaying?"Pause":"Play"}
                </button>
                <Rating className="w-full h-[10%]" value={(rating==undefined)?0:rating}
                onChange={(e,newValue)=>{if(newValue) setRating(newValue)}}/>
            </div>
        </div>
    )
}