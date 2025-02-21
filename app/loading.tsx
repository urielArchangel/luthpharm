import Image from 'next/image'
import React from 'react'
import loading_ from '@/public/loading.gif'

const loading = () => {
  return (
   <section className='w-full left-0 fixed h-[100vh] flex items-center justify-center'>
    <Image className='w-20 h-20 ' unoptimized  src={loading_} alt='loading...'/>
   </section>
  )
}

export default loading