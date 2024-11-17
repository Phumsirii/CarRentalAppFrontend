'use client'
import React from "react";

export default function InteractiveCard({children,contentName}:{children:React.ReactNode,contentName:string}){

    function onCardSelected(){
        alert("You selected "+contentName)
    }

    function onCardMouseAction(event:React.SyntheticEvent){
        if (event.type=='mouseover'){
            event.currentTarget.classList.remove('bg-white')
            event.currentTarget.classList.add('bg-gray-300')
        }
        else{
            event.currentTarget.classList.remove('bg-gray-300')
            event.currentTarget.classList.add('bg-white')
        }
    }

    return (
        <div className='w-full h-[300px] rounded-lg shadow-lg bg-white flex flex-col items-center'
        onMouseOver={(e)=>onCardMouseAction(e)}
        onMouseOut={(e)=>onCardMouseAction(e)}>
           {children}
        </div>
    );
}