import React from 'react'

const moment = require('moment')


function SingleEvent({event}){

    return( <div className="bg-white mb-5 p-5 shadow">
                <p className="text-xl font-semibold truncate">{event.summary}</p>
                <div className="ml-1">
                    <p className="text-sm font-semibold">From
                        <span className="italic  pl-2 pr-4">{moment.utc(event.start.dateTime).local().format('MMMM DD,YYYY hh:mm A')}</span>
                        To
                        <span className="italic pl-2">{moment.utc(event.end.dateTime).local().format('MMMM DD,YYYY hh:mm A')}</span>
                    </p>

                    <p className="text-gray-500">{event.description}</p>
                    <a href={event.htmlLink} target="_blank" className="text-blue-600 underline block mb-3">View More</a>
                    <span className="px-4 bg-yellow-100 rounded-full text-yellow-600 mr-2">{event.eventType}</span>
                    <span className="px-4 bg-purple-100 rounded-full text-purple-600 mr-2">{event.kind}</span>
                    {event.status=='confirmed'&&    <span className="px-4 bg-green-100 rounded-full text-green-600">{event.status}</span>}


                </div>
        </div>
            )
}export default SingleEvent;
