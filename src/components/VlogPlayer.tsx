'use client'
import { useWindowListener } from "@/hooks/useWindowListener";
import { useRef, useEffect, useState } from "react"

export default function VlogPlayer({vdoSrc,isPlaying}:{vdoSrc:string,isPlaying:boolean}){
    
    const vdoRef=useRef<HTMLVideoElement>(null);

    useEffect(()=>{
        if (isPlaying){
            vdoRef.current?.play()
        }
        else{
            vdoRef.current?.pause()
        }
    },[isPlaying])

    useWindowListener("resize",(e)=>{console.log("Window resized to "+(e.target as Window).innerWidth)})

    return(
        <video className="w-[40%]" src={vdoSrc} ref={vdoRef} controls loop muted/>
    )
}