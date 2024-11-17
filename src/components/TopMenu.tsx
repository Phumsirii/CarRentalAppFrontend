import styles from './topmenu.module.css'
import Link from 'next/link';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function TopMenu(){

    const session = await getServerSession(authOptions);

    return (
        <div className={styles.menuContainer}>
            <Image src={'/img/logo.jpg'} className={styles.logoimg} alt='logo' width={0} height={0} sizes='100vh'/>
            <TopMenuItem title='Home' pageRef='/'/>
            <TopMenuItem title='Select Car' pageRef='/car'/>
            <TopMenuItem title='Reservations' pageRef='/reservations'/>
            <TopMenuItem title='About' pageRef='/about'/>
            <div className='flex flex-row h-full right-0 absolute'>
                <TopMenuItem title='Cart' pageRef='/cart'/>
                {
                    session ?<Link className='flex items-center right-0 h-full px-3 bg-sky-300 text-xl font-sans font-bold hover:bg-sky-600 rounded-md' href="/api/auth/signin">
                        Sign Out of {session.user?.name}
                    </Link>
                    :<Link className='flex items-center right-0 h-full px-3 bg-sky-300 text-xl font-sans font-bold hover:bg-sky-600 rounded-md' href="/api/auth/signin">
                        Sign In
                    </Link>
                }
            </div>
        </div>
    );
}