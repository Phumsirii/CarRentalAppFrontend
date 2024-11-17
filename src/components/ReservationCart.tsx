"use client"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import { removeReservation } from "@/redux/features/cartSlice"

export default function ReservationCart(){
    
    const carItems=useAppSelector((state)=>state.cartSlice.carItems)
    const dispatch=useDispatch<AppDispatch>()

    return (
        <main className="text-4xl font-sans font-bold m-5">
            Reservation Cart List
            {
                carItems.map((reservationItem)=>(
                    <div className="bg-white rounded px-5 mx-5 py-2 my-2 font-sans text-black m-2" key={reservationItem.carId}>
                        <div className="text-3xl">Model : {reservationItem.carModel}</div>
                        <div className="text-sm">Pick-up : {reservationItem.pickUpDate}</div>
                        <div className="text-sm">Location : {reservationItem.pickUpLocation}</div>
                        <div className="text-sm">Return : {reservationItem.returnDate}</div>
                        <div className="text-sm">Location : {reservationItem.returnLocation}</div>
                        <div className="text-sm">Duration : {reservationItem.numOfDays}</div>
                        <button className='mt-3 text-sm block rounded-md bg-red-600 hover:bg-red-950 px-2 py-1 text-white shadow-sm'
                            onClick={()=>dispatch(removeReservation(reservationItem))}>
                            Remove from Cart
                        </button>
                    </div>
                ))
            }
        </main>
    )
}