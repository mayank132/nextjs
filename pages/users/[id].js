import { gql } from "@apollo/client";
import client from "../../helpers/apolloclient";
import Link from "next/link";

export default function SpecificUser({ data }) {
  console.log('all posts',data);
  return (
    <div>


    
      <h1> all posts of {data.user.name}</h1>
        {
          data.user.posts.map((item,key)=>{
            return  <>
            <h2>  {key + 1}  title: {item.title} </h2>

            </> 
           })
        }  
    </div>
  );
}
//get list of all companies:
export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        users {
          id
        }
      }
    `,
  });

  const paths = data.users.map((item) => ({
    params: {
      id: item.id,
    },
  }));

  return { paths, fallback: false };
}

//fetch just one company... you're doing it right
export async function getStaticProps({ params }) {
  const { id } = params;
  console.log('checking id',id)
  const { data } = await client.query({
    query: gql`
    query User($id: ID!)  {
        user(where: { id: $id }) {
          id
          name
          posts{
            title
            id
          }
        
        }
      }
    `,
    variables: { id },
  });
  return {
    props: {
      data: data,
    },
  };
}