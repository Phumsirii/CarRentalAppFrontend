import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Car from "@/db/models/Car";
import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function DashboardPage(){

    const addCar = async (addCarForm:FormData)=>{
        "use server"
        const model=addCarForm.get("model")
        const description=addCarForm.get("desc")
        const picture=addCarForm.get("picture")
        const seats=addCarForm.get("seats")
        const doors=addCarForm.get("doors")
        const largebags=addCarForm.get("largeluggage")
        const smallbags=addCarForm.get("smallluggage")
        const automatic=true
        const dayRate=addCarForm.get("dayRate")
        const carData={
            "model":model,
            "description":description,
            "picture":picture,
            "seats":seats,
            "doors":doors,
            "largebags":largebags,
            "smallbags":smallbags,
            "automatic":automatic,
            "dayRate":dayRate
        }
        try{
            await dbConnect()
            const newCar=await Car.create(carData)
        } catch (error){
            console.error("Error adding car",error)
        }
        revalidateTag("cars")
        redirect("/car")
    }

    const session=await getServerSession(authOptions)
    if (!session || !session.user.token){
        return null
    } 

    const profile = await getUserProfile(session.user.token)
    var createdAt=new Date(profile.data.createdAt)

    return (
        <main className="bg-slate-100 text-black m-5 p-3">
            <div className="text-2xl font-sans font-bold">
                {profile.data.name}
            </div>
            <table className="table-auto border-separate border-spacing-2">
                <tbody>
                    <tr>
                        <td>Email : </td>
                        <td>{profile.data.email}</td>
                    </tr>
                    <tr>
                        <td>Telephone No. : </td>
                        <td>{profile.data.tel}</td>
                    </tr>
                    <tr>
                        <td>Member Since : </td>
                        <td>{createdAt.toString()}</td>
                    </tr>
                </tbody>
            </table>
            {
                (profile.data.role=="admin")?
                <form className="font-sans font-bold" action={addCar}>
                    <div className="text-2xl font-sans font-bold mt-5">
                        Create Car Model
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block pr-4" htmlFor="model"> Model</label>
                        <input type="text" required id="model" name="model" placeholder="Car Model" 
                            className="border-2 border-gray-200 rounded-lg w-full p-2 bg-white focus:outline-none focus:border-gray-400" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block pr-4" htmlFor="desc"> Description</label>
                        <input type="text" required id="desc" name="desc" placeholder="Car Description" 
                            className="border-2 border-gray-200 rounded-lg w-full p-2 bg-white focus:outline-none focus:border-gray-400" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block pr-4" htmlFor="picture"> Picture URL</label>
                        <input type="text" required id="picture" name="picture" placeholder="Car Picture URL" 
                            className="border-2 border-gray-200 rounded-lg w-full p-2 bg-white focus:outline-none focus:border-gray-400" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block pr-4" htmlFor="seats">Seats</label>
                        <input type="number" required id="seats" name="seats" placeholder="7" 
                            className="border-2 border-gray-200 rounded-lg w-auto p-2 bg-white focus:outline-none focus:border-gray-400" 
                            min={1} max={50}/>
                        <label className="w-auto block pr-4 ml-5" htmlFor="doors">Doors</label>
                        <input type="number" required id="doors" name="doors" placeholder="5" 
                            className="border-2 border-gray-200 rounded-lg w-auto p-2 bg-white focus:outline-none focus:border-gray-400" 
                            min={1} max={5}/>
                        <input type="checkbox" id="automatic" name="automatic" className="ml-5 mr-2" /><span>Automatic</span>
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block pr-4" htmlFor="largeluggage">Large Luggage</label>
                        <input type="number" required id="largeluggage" name="largeluggage" placeholder="2" 
                            className="border-2 border-gray-200 rounded-lg w-auto p-2 bg-white focus:outline-none focus:border-gray-400" 
                            min={0} max={50}/>
                        <label className="w-auto block pr-4 ml-5" htmlFor="smallluggage">Small Luggage</label>
                        <input type="number" required id="smallluggage" name="smallluggage" placeholder="4" 
                            className="border-2 border-gray-200 rounded-lg w-auto p-2 bg-white focus:outline-none focus:border-gray-400" 
                            min={0} max={50}/>
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block pr-4" htmlFor="dayRate">Fare Rate</label>
                        <input type="text" required id="dayRate" name="dayRate" placeholder="Daily Rate (Insurance included)" 
                            className="border-2 border-gray-200 rounded-lg w-full p-2 bg-white focus:outline-none focus:border-gray-400" />
                    </div>
                    <button type="submit" className="bg-sky-300 hover:bg-sky-600 font-sans font-bold text-xl text-white p-2
                            rounded-lg">
                        Create
                    </button>
                </form>
                :null
            }
        </main>
    );
}