import '../styles/globals.css'
import '../styles/globals.css'
import '../styles/main.css'
import BaseLayout from "../layout/BaseLayout";
import { Provider,useSession } from 'next-auth/client'
import React from 'react'
import "react-datepicker/dist/react-datepicker.css";
function MyApp({ Component, pageProps }) {
  return (
      <Provider
          options={{
            clientMaxAge: 60*15,
            keepAlive: 60*15
          }}
          session={pageProps.session} >
       <Wrapper>
         <BaseLayout>
           <Component {...pageProps} />
         </BaseLayout>
       </Wrapper>
      </Provider>
  )
}
function Wrapper(props){
  const [session, loading] = useSession()
    if (loading){
    return (
        <div>
          session loading....
        </div>
    )
  }else{
    return (<div>
      {props.children}
    </div>)
  }

}






export default MyApp
