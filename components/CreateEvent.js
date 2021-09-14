import React,{useState,useRef,useEffect} from 'react'
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import Input from "./Input";
import Textarea from "./Textarea";
const momentTimezone = require('moment-timezone')
const moment = require('moment')
import DatePicker from "react-datepicker";
import axios from "axios";

function CreateEvent(){
    const formikRef = useRef();
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endSateTime, setEndDateTime] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const initialValues= {
        summary:'summary ',
        description:' description',
        startDateTime:'',
        endDateTime:'',


    }

    useEffect(()=>{
        if (formikRef.current) {
            formikRef.current.setFieldValue("startDateTime", startDateTime||'');
            if (startDateTime){
                setEndDateTime(moment(startDateTime).add(1,'minute').toDate())
            }

        }

    },[startDateTime])

    useEffect(()=>{
        if (formikRef.current) {
            formikRef.current.setFieldValue("endDateTime", endSateTime||'');
        }

    },[endSateTime])


    const createMeetingSchema = Yup.object().shape({
        summary:Yup.string().required('Enter Summery'),
        description:Yup.string().required('Enter Description'),
        startDateTime:Yup.string().required('Enter Start Date'),
        endDateTime:Yup.string().required('Enter End Date'),
    })

    const values = (e) => {

        const data= {
            summary: e.summary,
            description: e.description,
            start: {
                dateTime: moment(e.startDateTime).format(),
                timeZone: momentTimezone.tz.guess()
            },
            end: {
                dateTime: moment(e.endDateTime).format(),
                timeZone: momentTimezone.tz.guess()
            }

        }
        setLoading(true)

        axios.post(`/api/event`,data,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res=>{
            console.log(res.data)
            setSuccess('Event Created')
            setLoading(false)
            restForm()
            setTimeout(()=>setSuccess(''),5000)
        }).catch(err=>{
            setSuccess('Event Can not Create')
            setTimeout(()=>setError(''),5000)
            setLoading(false)
            console.log(err)
        })
    }


    function restForm(){
        formikRef.current.setFieldValue("summary",'');
        formikRef.current.setFieldValue("description",'');
        formikRef.current.setFieldValue("startDateTime", new Date());
        formikRef.current.setFieldValue("endDateTime",  new Date());
        setStartDateTime(new  Date())
        setEndDateTime(new Date())
    }


    return(<div className="w-full bg-white  shadow  p-5">
        <p className="font-semibold text-xl text-center capitalize">Create event</p>
        {success&&<p className="text-sm font-semibold text-green-500">{success}</p>}
        {error&&<p className="text-sm font-semibold text-red-500">{error}</p>}
        <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            validationSchema={createMeetingSchema}
            onSubmit={values}
        >
            {({errors, touched}) => (
                <Form>

                    <Input name="summary" id="summary" type="text"  errors={errors} touched={touched}   label="Summery"  />

                    <Textarea name="description" id="description"   errors={errors} touched={touched}   label="Description"  />


                    <div>
                        <label className="block mt-3 font-semibold width-fit-content" htmlFor="startDateTime">Start Date Time</label>
                        <DatePicker
                            id="startDateTime"
                            className="w-full pr-10 border-red-500 focus:border-red-500 focus:ring-red-500' :'border-solid border border-green-200 rounded'} form-input block w-full mt-1 text-sm p-2 bg-gray-50  focus:border-primary focus:outline-none rounded focus:border-primary"
                            selected={startDateTime}
                            onChange={setStartDateTime}
                            timeIntervals={15}
                            showTimeSelect
                            minDate={new Date()}
                            dateFormat="MMM dd YYY h:mm aa"
                        />
                        {errors.startDateTime && touched.startDateTime && (<div className="text-sm text-red-500 font-semibold">{errors.startDateTime}</div>)}

                    </div>


                    <div>
                        <label className="block mt-3 font-semibold width-fit-content" htmlFor="endDateTime">End Date Time</label>
                        <DatePicker
                            id="endDateTime"
                            className="w-full pr-10 border-red-500 focus:border-red-500 focus:ring-red-500' :'border-solid border border-green-200 rounded'} form-input block w-full mt-1 text-sm p-2 bg-gray-50  focus:border-primary focus:outline-none rounded focus:border-primary"
                            selected={endSateTime}
                            onChange={setEndDateTime}
                            timeIntervals={15}
                            showTimeSelect
                            minDate={startDateTime}
                            dateFormat="MMM dd YYY h:mm aa"
                        />
                        {errors.endDateTime && touched.endDateTime && (<div className="text-sm text-red-500 font-semibold">{errors.endDateTime}</div>)}

                    </div>



                    <button type="submit" disabled={loading} className={`${!loading&&'hover:text-blue-500 hover:bg-transparent'} focus:outline-none w-full py-2 mt-5 flex justify-center  focus:shadow-outline inline-flex items-center transition ease-in-out duration-150  text-white  focus:border-blue-700  text-sm font-medium  text-center bg-blue-500  leading-5   transition-colors duration-150  border border-blue-500 rounded active:bg-blue-500   focus:outline-none focus:shadow-outline-primary shadow`}>
                        {loading&&   <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="200"
                            height="200"
                            display="block"
                            preserveAspectRatio="xMidYMid"
                            viewBox="0 0 100 100"
                            className="w-5 h-5 mr-2 block text-white"
                        >
                            <circle
                                cx="50"
                                cy="50"
                                r="35"
                                fill="none"
                                stroke="#ddd"
                                strokeDasharray="164.93361431346415 56.97787143782138"
                                strokeWidth="7"
                            >
                                <animateTransform
                                    attributeName="transform"
                                    dur="1s"
                                    keyTimes="0;1"
                                    repeatCount="indefinite"
                                    type="rotate"
                                    values="0 50 50;360 50 50"
                                ></animateTransform>
                            </circle>
                        </svg>}
                        Submit
                    </button>
                </Form>
            )}

        </Formik>


    </div>)
}export default CreateEvent
