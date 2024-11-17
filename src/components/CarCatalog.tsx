import Link from "next/link"
import ProductCard from "./ProductCard"
import { CarItem,CarJson } from "interfaces"

export default async function CarCatalog({carJSON}:{carJSON:CarJson}){
    const carJSONReady=await carJSON
    return (
        <div>
            Explore {carJSONReady.count} models in our catalog
            <div style={{margin:"20px", display:"flex", flexDirection:"row",flexWrap:"wrap", justifyContent:"space-around",
            alignContent:"space-around"
            }}>
                {
                    carJSONReady.data.map((carItem:CarItem)=>(
                    <Link href={`/car/${carItem.id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:pd-4 lg:pd-8 mx-5 my-10">
                        <ProductCard carName={carItem.model} imgSrc={carItem.picture}/>
                    </Link>
                    ))
                }
            </div>
        </div>
    )
}