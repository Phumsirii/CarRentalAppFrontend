"use client"
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LocationDateReserve from '@/components/LocationDateReserve'
import { Dayjs } from 'dayjs';
import { UseDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { ReservationItem } from '../../../interfaces';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { addReservation } from '@/redux/features/cartSlice';

export default function Reservations(){

    const urlParams=useSearchParams()
    const cid=urlParams.get('id')
    const model=urlParams.get('model')

    const dispatch=useDispatch<AppDispatch>()

    const makeReservation=()=>{
        if (cid && model && pickupDate && pickupLocation && returnDate && returnLocation){
            const item:ReservationItem={
                carId:cid,
                carModel:model,
                numOfDays: returnDate.diff(pickupDate,'day'),
                pickUpDate: dayjs(pickupDate).format('YYYY/MM/DD'),
                pickUpLocation:pickupLocation,
                returnDate: dayjs(returnDate).format('YYYY/MM/DD'),
                returnLocation:returnLocation
            }
            dispatch(addReservation(item))
        }
    }

    const [pickupDate,setPickupDate]=useState<Dayjs|null>(null)
    const [pickupLocation,setPickupLocation]=useState<string>('BKK')
    const [returnDate,setReturnDate]=useState<Dayjs|null>(null)
    const [returnLocation,setReturnLocation]=useState<string>('BKK')

    return(
        <main className='w-[100%] flex flex-col items-center space-y-4'> 
            <div className='text-xl font-bold'>
                New Reservation
            </div>
            <div className='text-xl font-bold'>
                {model}
            </div>
            <div className='w-fit space-y-2'>
                <div className='text-md text-left text-gray-200 font-bold'>Pick-Up Date and Location</div>
                <LocationDateReserve onDateChange={(value:Dayjs)=>{setPickupDate(value)}} 
                                    onLocationChange={(value:string)=>{setPickupLocation(value)}}/>
                <div className='text-md text-left text-gray-200 font-bold'>Return Date and Location</div>
                <LocationDateReserve onDateChange={(value:Dayjs)=>{setReturnDate(value)}}
                                    onLocationChange={(value:string)=>{setReturnLocation(value)}}/>
            </div>
            <button className='block rounded-md bg-sky-300 hover:bg-sky-600 px-3 py-2 text-white shadow-sm'
                    onClick={makeReservation}>
                Reserve this car
            </button>
        </main>
    );
}