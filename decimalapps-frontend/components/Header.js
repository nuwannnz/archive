import React from 'react';
import Image from 'next/image';

export default function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const scrolltoHash = (element_id) => {
    const element = document.getElementById(element_id);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };

  return (
    <header className='text-black body-font'>
      <div className='container mx-auto flex flex-wrap p-2 md:flex-row'>
        <a className='flex title-font font-medium text-black mb-4 md:mb-0 pr-4'>
          <Image
            src='/images/logo/logo-centered-updated.svg'
            alt='logo'
            width={200}
            height={60}
            className='w-full'
          />
        </a>
        <button
          className='text-black cursor-pointer text-xl leading-none py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none ml-auto pb-3'
          type='button'
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='black'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`feather ${
              navbarOpen ? 'feather-x' : 'feather-menu'
            }`}
          >
            {navbarOpen ? (
              <>
                <line x1='18' y1='6' x2='6' y2='18' />
                <line x1='6' y1='6' x2='18' y2='18' />
              </>
            ) : (
              <>
                <line x1='3' y1='12' x2='21' y2='12' />
                <line x1='3' y1='6' x2='21' y2='6' />
                <line x1='3' y1='18' x2='21' y2='18' />
              </>
            )}
          </svg>
        </button>
        <div
          className={`md:flex flex-grow items-center ${
            navbarOpen ? 'flex' : 'hidden'
          } transition duration-300 ease-in-out`}
          id='example-navbar-danger'
        >
          <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center md:justify-end font-semibold px-4'>
            <button
              className='mr-6 hover:text-black'
              onClick={() => scrolltoHash('home')}
            >
              Home
            </button>
            <button
              className='mr-6 hover:text-black'
              onClick={() => scrolltoHash('aboutSection')}
            >
              About
            </button>
            <button
              className='mr-6 hover:text-black'
              onClick={() => scrolltoHash('expertiseSection')}
            >
              Expertise
            </button>
            <button
              className='mr-6 hover:text-black'
              onClick={() => scrolltoHash('supportSection')}
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
