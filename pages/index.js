import React,{useEffect,useState} from 'react'
import {getSession } from "next-auth/client"
import CreateEvent from "../components/CreateEvent";
import ShowEvents from "../components/ShowEvents";
import axios from "axios";


export default function Home() {



    const [events,setEvents] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        fetchEvents()
    },[])

    function fetchEvents(){
        setLoading(true)
        axios.get('api/event').then(res=>{
            setEvents(res.data.items.sort((a,b)=>new Date(a.start.dateTime)>new Date(b.start.dateTime)?1:-1))
            setLoading(false)
        }).catch(err=>{
            console.log(err)
            setLoading(false)
        })
    }

  return (
    <div className="mt-5 flex items-start md:flex-row flex-cols p-5">
      <div className="md:w-2/5 w-11/12">
      <CreateEvent fetch={()=>fetchEvents()}/>

      </div>
      <div className="md:w-3/5 w-11/12">
          <div className="w-full bg-gray-100  shadow  p-5 md:ml-5" style={{maxHeight:'85vh'}}>
              <p className="font-semibold text-xl mb-3 capitalize">Events</p>
              {loading&& <p>Loading....</p>}
              {!loading&&<ShowEvents events={events}/>}
          </div>
      </div>


    </div>
  )
}
export async function getServerSideProps(ctx) {


  let session=await getSession(ctx)
  if (session==null){
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props:{},
    };
  }
  return {
    props: {}
  }
}
