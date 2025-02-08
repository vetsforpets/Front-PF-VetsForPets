import React from 'react'
import Link from "next/link"
const IndexRegister = () => {
  return (
    <div className='max-w-16'>
        <div>
            <Link href={"/petform"}>
            <p>Usuario dueño de mascota</p>
            </Link> 
        </div>
        <div>
            <Link href={"/vetform"}>
            <p>Usuario dueño de mascota</p>
            </Link> 
        </div>

    </div>
  )
}

export default IndexRegister