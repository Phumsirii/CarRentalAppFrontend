import Image from 'next/image'
import InteractiveCard from './InteractiveCard'

export default function ProductCard({carName,imgSrc,onCompare}:{carName:string,imgSrc:string,onCompare?:Function}){

    return (
        <InteractiveCard contentName={carName}>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Product Picture'
                fill={true}
                className='object-cover rounded-t-lg'
                />
            </div>
            <div className='w-full h-[20%] text-black align p-[10px] font-bold text-2xl flex items-center justify-center'>
                {carName}
            </div>
            {
                onCompare ? <button className='block h-[9%] text-white text-sm rounded-md bg-black p-1 text-center
                hover:bg-zinc-700 m-2 shadow-sm'
                onClick={(e)=>{e.stopPropagation();e.preventDefault();onCompare(carName)}}
                >
                    Compare
                </button> : ''
            }
        </InteractiveCard>
    );
}