import React from  'react'
import {getSession, signIn} from "next-auth/client";

export default function Login() {




    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-5 shadow">
                <div>
                    <img className="mx-auto h-12 w-auto" src="/images/logo.jpg" alt="logo"/>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <button onClick={()=> signIn('google')} className="group relative w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-50 hover:bg-gray-100 border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
                    <img  className="w-6 h-6" alt="Google sign-in"
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />

                    <span className="ml-2">Login With Google</span>
                </button>
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {


    let session=await getSession(ctx)
    if (session!=null){
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props:{},
        };
    }
    return {
        props: {}
    }
}
