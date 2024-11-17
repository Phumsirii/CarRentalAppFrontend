export default async function getCars(){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars`, {
        cache: "no-cache",
        next:{tags:["cars"]}
    });    
    if (!response.ok){
        throw new Error("Failed to fetch cars")
    }
    const res =await response.json()
    return res
}