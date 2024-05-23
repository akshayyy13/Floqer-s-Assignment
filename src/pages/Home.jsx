import React from 'react'
import NavHead from '../components/NavHead'
import MainTable from '../components/MainTable'

const Home = () => {
  return (
    <div className=' bg-richblack-900 min-h-screen animate'>
        <NavHead/>
        <div className='  flex flex-col'>
        <MainTable/>
        </div>
    </div>
  )
}

export default Home
