import { count } from "console"

export interface ReservationItem{
    carId: string
    carModel: string
    numOfDays: number
    pickUpDate: string
    pickUpLocation: string
    returnDate: string
    returnLocation: string
}

export interface CarItem{
    id: string
    model: string
    picture: string
}

export interface CarJson{
    count : number
    data : CarItem[]
}