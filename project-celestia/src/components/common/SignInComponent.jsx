import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInComponent() {
  return (
    <div className='flex w-full h-full items-center text-white justify-evenly'>
        <div className="afacad-bold text-9xl">
            Sign In
        </div>
        <div>
            <SignIn/>
        </div>

    </div>
  )
}

export default SignInComponent