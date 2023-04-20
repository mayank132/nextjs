
import Link from "next/link";
import { gql } from "@apollo/client";
import {  useMutation ,useQuery } from '@apollo/client';
import { useEffect,useState } from "react";


export default function Home() {

   const [state, setstate] = useState('');

    useEffect(()=>{

        console.log('in home')
            const id =  localStorage.getItem('userId')
            if(id){
                setstate(id)
            }

    },[])

    return (

        <div className="flex min-h-screen flex-col items-center  p-2"  >
                  
             {/* <Link href="/Login"> login </Link> */}
             <Link href={`/users/${state}`}> see all your posts </Link>

        
         </div>

    )
  }






