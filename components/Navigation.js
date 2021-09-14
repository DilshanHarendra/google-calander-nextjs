import React from 'react'
import Link from 'next/link'
import { signOut, useSession} from "next-auth/client";
import Avatar from 'react-avatar';
function Navigation(){
    const [session] = useSession();
    console.log(session)

    return(<div className="w-screen bg-gray-900 flex justify-between p-2">
        <Link href="/">
            <img className="h-8 w-12 object-contain" src="/images/logo.jpg" alt="logo"/>
        </Link>

        {session&&<div className="flex items-center">
            <p className="text-white font-semibold mr-2">{session.user.name}</p>
            <button onClick={()=>signOut()} title="logout" className="cursor-pointer">
                {session.user.image?
                    <img className="mx-auto h-8 w-8 rounded-full" src={session.user.image} alt="logo"/>
                    :
                    <Avatar name={session.user.name} size="40px" round />
                }


            </button>
        </div>}


    </div>)
}export default Navigation;
