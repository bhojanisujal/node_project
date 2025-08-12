import React from 'react'
import { Link } from 'react-router'

const Sidebarheader = () => {
  return (
   <>

      <div className='d-flex'>
        <section className='Side-bar  bg-dark'>

          <Link to='/'><div>Dashbord</div></Link>
          <Link to='/Aldum'><div>Aldum</div></Link>
          <Link to='/Profile'><div>Profile</div></Link>
          <Link to='/Roylities'><div>Roylities</div></Link>
          <Link to='/Setting'><div>Setting</div></Link>
        </section>
      <section className=' border border-light bg-primary w-100 h-25 p-2'></section>
      </div>
   </>
  )
}

export default Sidebarheader