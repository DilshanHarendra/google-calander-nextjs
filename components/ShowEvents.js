import React from 'react'
import SingleEvent from "./SingleEvent";



function ShowEvents({events}){


    return(
                <div className=" overflow-y-scroll w-full hide-scrollbar"  style={{maxHeight:'75vh'}}>
                    {events.map(event=>(
                        <SingleEvent event={event} key={event.id}/>
                    ))}
                </div>
            )
}export default ShowEvents;
