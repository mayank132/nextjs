
import Link from "next/link";
import { gql } from "@apollo/client";
import {  useMutation ,useQuery } from '@apollo/client';
import Layout from '../../components/Layout'


export default function Home() {

    return (

        <div className="flex min-h-screen flex-col items-center  p-2"  >
                  
             {/* <Link href="/Login"> login </Link> */}
             <Link href="/users"> users </Link>
             <Link href="/"> home </Link>
         </div>

    )
  }






