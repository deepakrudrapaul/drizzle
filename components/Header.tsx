import { NavLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import AuthProviders from './AuthProviders';
import { getCurrentUser } from '@/lib/session';
import {signOut} from 'next-auth/react'
import ProfileMenu from './ProfileMenu';

const Header = async () => {

  const session = await getCurrentUser();

  return (
    <nav className='flexBetween navbar'>
        <div className='flex-1 flexStart gap-10'>
            <Link href="/">
                <Image alt='Drizzle' width={115} height={43} src="/logo.svg"/>
            </Link>

            <ul className='xl:flex hidden text-small gap-7'>
                {
                    NavLinks.map((item => (
                        <Link href={item.href} key={item.key}>
                            {item.text}
                        </Link>
                    )))
                }
            </ul>
        </div>

        <div className='flexCenter gap-4'>
                {
                    session?.user ? (
                        <>
                        <ProfileMenu session={session}/>
                        <Link href={'/create-project'}>Share Work</Link>
                        </>

                    ) : (
                        <AuthProviders/>
                    )
                }
        </div>


    </nav>
  )
}

export default Header;