import { NavLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import AuthProviders from './AuthProviders';

const Header = () => {

    const session = {};
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
                    session ? (
                        <>
                        User photo
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