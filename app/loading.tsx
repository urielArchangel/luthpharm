import Image from 'next/image'
import React from 'react'
import loading_ from '@/public/loading.gif'

const loading = () => {
  return (
   <section className='w-full fixed h-[100vh] flex items-center justify-center'>
    <Image className='w-w0 h-w0 ' src={loading_} alt='loading...'/>
   </section>
  )
}

export default loading