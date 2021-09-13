import React from "react";
import Header from "../components/Header";

function BaseLayout(props){
    return(<div className="bg-gray-50 h-screen w-screen overflow-hidden">
        <Header/>
        <div className="container mx-auto">
            {props.children}
        </div>
    </div>)
}export default BaseLayout
