import React from 'react'
import {Field} from "formik";

function Input(props){
    return(
        <div >
            <label className="block mt-3 font-semibold text-sm" htmlFor={props.name}>{props.label}</label>
            <div className="relative w-full">
                <Field name={props.name} id={props.name} type={props.type||'text'}  placehodler={props.placehodler} className={`${props.errors[props.name] && props.touched[props.name]? 'pr-10 border-red-500 focus:border-red-500 focus:ring-red-500' :'border-solid border border-green-200 rounded'} form-input block w-full mt-1 text-sm p-2 bg-gray-50  focus:border-primary focus:outline-none rounded focus:border-primary ${props.className}`} />
               {props.errors[props.name] && props.touched[props.name] && (<div className="h-5 w-5 absolute bottom-1/2 transform translate-y-1/2 right-3 group rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                   <div className="w-max rounded shadow-md absolute top-1/2 transform -translate-y-1/2 -left-1 origin-left -translate-x-full bg-red-200 group-hover:opacity-100 group-hover:max-w-sm  opacity-0  line-clamp-2 z-50 transition-opacity duration-300 ease-in-out">
                       <div className="sm:text-sm text-base text-red-500 font-semibold py-1 px-2">{props.errors[props.name]}</div>
                    </div>
                </div>)}
            </div>
        </div>




    )
}export  default Input

