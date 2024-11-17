import getCar from "@/libs/getCar"
import Image from "next/image"
import Link from "next/link"

export default async function CarDetailPage({params}:{params:{cid:string}}){

    /* Mock data */
    // const mockCarData=new Map()
    // mockCarData.set("001",{
    //     carName:"Rolls-Royce Boat Tail",
    //     imgSrc:"/img/Boat Tail.jpg"
    // })
    // mockCarData.set("002",{
    //     carName:"Rolls-Royce Phantom",
    //     imgSrc:"/img/RRPhantom.jpg"
    // })
    // mockCarData.set("003",{
    //     carName:"Rolls-Royce Cullinan",
    //     imgSrc:"/img/cullinan.jpg"
    // })
    // mockCarData.set("004",{
    //     carName:"Rolls-Royce Ghost",
    //     imgSrc:"/img/Ghost.jpg"
    // })
    // mockCarData.set("005",{
    //     carName:"Rolls-Royce Dawn",
    //     imgSrc:"/img/Dawn.jpg"
    // })
    // mockCarData.set("006",{
    //     carName:"Rolls-Royce Wraith",
    //     imgSrc:"/img/Wraith.jpg"
    // })
    // mockCarData.set("007",{
    //     carName:"Rolls-Royce Spectre",
    //     imgSrc:"/img/Spectre.jpg"
    // })
    // mockCarData.set("008",{
    //     carName:"Toyota Century",
    //     imgSrc:"/img/Century.avif"
    // })
    // mockCarData.set("009",{
    //     carName:"Toyota Century SUV",
    //     imgSrc:"/img/Century SUV.jpg"
    // })
    // mockCarData.set("010",{
    //     carName:"Lexus LM350h",
    //     imgSrc:"/img/LM350h.jpg"
    // })

    const carDetail=await getCar(params.cid)

    return (
        <main className="text-center p-5 font-sans">
            <h1 className="text-3xl font-bold">Car Model : {carDetail.data.model}</h1>
            <div className="flex flex-row my-10">
                <Image src={carDetail.data.picture} alt={carDetail.data.model} width={400} height={300}
                sizes="100vw" className="rounded-lg w-[30%] h-auto object-contain" />
                <div className="flex flex-col w-full text-left">
                    <div className="text-md mx-10 text-2xl font-bold w-full my-3">
                        {carDetail.data.description}
                    </div>
                    <div className="text-md mx-10 text-2xl font-bold w-full my-3">
                        Number of Doors : {carDetail.data.doors}
                    </div>
                    <div className="text-md mx-10 text-2xl font-bold w-full my-3">
                        Number of Seats : {carDetail.data.seats}
                    </div>
                    <div className="text-md mx-10 text-2xl font-bold w-full my-3">
                        Large Bags : {carDetail.data.largebags}
                    </div>
                    <div className="text-md mx-10 text-2xl font-bold w-full my-3">
                        Small Bags : {carDetail.data.smallbags}
                    </div>
                    <div className="text-md mx-10 text-2xl font-bold w-full my-3">
                        {carDetail.data.automatic?  "Automatic":"Manual"}
                    </div>
                    <div className="text-md mx-10 text-2xl font-bold w-full my-3">
                        Daily rental rate : ฿ {carDetail.data.dayRate} 
                    </div>
                    <Link href={`/reservations?id=${params.cid}&model=${carDetail.data.model}`}>
                        <button className='block rounded-md bg-sky-300 hover:bg-sky-600 px-3 py-2 text-white shadow-sm'>
                            Make Reservation
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    )
}



/* used to generate cache before navigating to another static page */
export async function generateStaticParams(){
    return [{cid:"001"},{cid:"002"},{cid:"003"},{cid:"004"},{cid:"005"},{cid:"006"},{cid:"007"},{cid:"008"},{cid:"009"},{cid:"010"}]
}