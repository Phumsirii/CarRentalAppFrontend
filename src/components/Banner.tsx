'use client'
import { useState } from 'react'
import styles from './banner.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Banner(){

    const covers=['/img/cover.jpg','/img/cover2.webp','/img/cover3.jpg','/img/cover4.jpg','/img/cover5.jpg','/img/cover6.jpg','/img/cover7.webp','/img/cover8.jpeg']
    const [index,setIndex]=useState(0);
    const router=useRouter()

    const {data:session}=useSession()
    console.log(session?.user.token)

    return (
        <div className={styles.banner} onClick={()=>{setIndex((index+1)%covers.length)}}>
            <Image src={covers[index]} 
            alt = 'cover' 
            fill={true}
            priority
            className='object-cover' />
            <div className={styles.bannerText}>
                <h1 className="text-6xl font-bold font-sans">Your Travel Partner</h1>
                <h3 className="text-3xl font-semibold font-sans">Explore Your World With Us</h3>
            </div>

            {
                session? 
                <div className='z-30 absolute top-5 right-10 flex flex-col font-bold items-center'>
                    <div>
                        Hello {session.user?.name}!
                    </div>
                    <div>
                        Welcome to Your Travel Partner
                    </div>
                </div>
                :null
            }

            <button className='bg-white text-black border-black border-2 font-sans font-bold p-2 m-2 rounded z-30 absolute 
            bottom-0 right-0 hover:bg-black hover:text-white' onClick={(e)=>{e.stopPropagation();router.push('/car')}}>
                Select Your Travel Partner NOW
            </button>
        </div>
    );
}