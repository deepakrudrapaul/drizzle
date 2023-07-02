import { footerLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type ColumnProps = {
  title:string,
  links: string[]
}

const FooterColumn = ({title, links}: ColumnProps) => {
  return (
    <div className='footer_column'>
      <h4 className='font-semibold'>{title}</h4>
      <ul className='flex flex-col gap-2 font-normal'>
          {
            links.map((link ) => <Link href={'/'} key={link}>{link}</Link>)
          }
      </ul>
    </div>
  )
}
const Footer = () => {
  return (
    <footer className='flextStart footer'>
      <div className='flex flex-col gap-12 w-full'>
        <div className='flex items-start flex-col'>
            <Image alt='Drizzle' src='/logo-blue.png' width={100} height={40} />
            <p className='text-start text-sm font-normal mt-5 max-w-xs'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
            </p>
        </div>

        <div className='flex flex-wrap gap-12'>
          <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links} />

          <FooterColumn title={footerLinks[0].title} links={footerLinks[1].links} />

          <FooterColumn title={footerLinks[0].title} links={footerLinks[1].links} />

          <FooterColumn title={footerLinks[0].title} links={footerLinks[1].links} />
        </div>
      </div>

      <div className='flexBetween footer_copyright mt-10'>
        <p>@2023 Drizzle. All rights reserved</p>
        <p className='text-gray'>
          <span className='text-black font-semibold'>9,899</span> Projects Submitted
        </p>
      </div>
    </footer>
  )
}

export default Footer;