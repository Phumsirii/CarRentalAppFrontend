'use client'
import { useReducer } from "react"
import ProductCard from "./ProductCard"
import Link from 'next/link'
import { useRef, useEffect,useState } from "react"
import getCars from "@/libs/getCars"
import { CarItem,CarJson } from "interfaces"

export default function CarPanel(){

    const [carResponse,setCarResponse] =useState<CarJson|null>(null)

    useEffect(()=>{
        const fetchData=async ()=>{
            const cars=await getCars()
            setCarResponse(cars)
        }
        fetchData()
    },[])

    const countRef=useRef(0); //initiate countRef as 0
    const inputRef=useRef<HTMLInputElement>(null)

    const compareReducer=(compareList:Set<string>,action:{type:string,carName:string})=>{
        switch(action.type){
            case 'add':{
                return new Set(compareList.add(action.carName))
            }
            case 'remove':{
                compareList.delete(action.carName)
                return new Set(compareList)
            }
            default:{
                return compareList
            }
        }
    }

    const [compareList,dispatchCompare]=useReducer(compareReducer,new Set<string>())


    /* Mock data */
    // const mockCarData=[
    //     {
    //         cid:"001",
    //         carName:"Rolls-Royce Boat Tail",
    //         imgSrc:"/img/Boat Tail.jpg"
    //     },
    //     {
    //         cid:"002",
    //         carName:"Rolls-Royce Phantom",
    //         imgSrc:"/img/RRPhantom.jpg"
    //     },
    //     {
    //         cid:"003",
    //         carName:"Rolls-Royce Cullinan",
    //         imgSrc:"/img/cullinan.jpg"
    //     },
    //     {
    //         cid:"004",
    //         carName:"Rolls-Royce Ghost",
    //         imgSrc:"/img/Ghost.jpg"
    //     },
    //     {
    //         cid:"005",
    //         carName:"Rolls-Royce Dawn",
    //         imgSrc:"/img/Dawn.jpg"
    //     },
    //     {
    //         cid:"006",
    //         carName:"Rolls-Royce Wraith",
    //         imgSrc:"/img/Wraith.jpg"
    //     },
    //     {
    //         cid:"007",
    //         carName:"Rolls-Royce Spectre",
    //         imgSrc:"/img/Spectre.jpg"
    //     },
    //     {
    //         cid:"008",
    //         carName:"Toyota Century",
    //         imgSrc:"/img/Century.avif"
    //     },
    //     {
    //         cid:"009",
    //         carName:"Toyota Century SUV",
    //         imgSrc:"/img/Century SUV.jpg"
    //     },
    //     {
    //         cid:"010",
    //         carName:"Lexus LM350h",
    //         imgSrc:"/img/LM350h.jpg"
    //     }
    // ]

    if (!carResponse) return(
        <p>Car Panel is Loading ... </p>
    )


    return (
        <div>
            <div style={{margin:"20px", display:"flex", flexDirection:"row",flexWrap:"wrap", justifyContent:"space-around",
            alignContent:"space-around"
            }}>
                {
                    carResponse.data.map((carItem:CarItem)=>(
                    <Link href={`/car/${carItem.id}`} className="w-1/5 mx-5 my-10">
                        <ProductCard carName={carItem.model} imgSrc={carItem.picture} 
                        onCompare={(car:string)=>dispatchCompare({type:"add",carName:car})}/>
                    </Link>
                    ))
                }
            </div>
            <div className="w-full text-xl font-sans m-4 font-bold text-left">
                Compare List Size : {compareList.size}
            </div>
            {Array.from(compareList).map((car)=><div key={car} onClick={()=>dispatchCompare({type:'remove',carName:car})} className="mx-4 font-semibold text-left">
                {car}
            </div>)}
            <button className='block rounded-md bg-sky-300 hover:bg-sky-600 px-3 py-2 text-white shadow-sm'
                onClick={()=>{countRef.current=countRef.current+1; alert(countRef.current)}}>
                Count with Ref Object
            </button>

            <input type='text' placeholder="Please fill" ref={inputRef} className='border-2 border-gray-300 rounded-md p-2 m-2
            focus:outline-none focus:bg-purple-200'/>

            <button className='block rounded-md bg-sky-300 hover:bg-sky-600 px-3 py-2 text-white shadow-sm'
                onClick={()=>{if(inputRef.current!=null)inputRef.current.focus()}}>
                Focus Input
            </button>
        </div>
    )
}