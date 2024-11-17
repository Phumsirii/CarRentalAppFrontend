import CarPanel from "@/components/CarPanel"
import getCars from "@/libs/getCars"
import CarCatalog from "@/components/CarCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"

export default async function Car(){

    const cars = await getCars()

    return (
        <main className="text-center p-5 font-sans">
            <h1 className="text-3xl font-bold">Select Your Travel Partner</h1>
            <Suspense fallback={<p>Loading ... <LinearProgress/> </p>}>
                <CarCatalog carJSON={cars}/>
            </Suspense>
            <hr className="my-10"/>
            <h1 className="text-6xl font-sans font-bold">Try client side Car Panel</h1>
            <CarPanel/>
        </main>
    )
}