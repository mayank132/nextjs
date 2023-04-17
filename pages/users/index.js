import { gql } from "@apollo/client";
import client from "../../helpers/apolloclient";
import Link from "next/link";


export default function Users({ data }) {
    console.log('seeing',data);
    return (
      <div>
        <h1> List of all companies shown here.</h1>
        {data.map((item) => (
          <p key={item.id}>
            <Link href={`/users/${item.id}`}> 
             {item.name} 
            </Link>
          </p>
        ))}
      </div>
    );
  }
  export async function getStaticProps() {
    const { data } = await client.query({
      query: gql`
        query {
          users {
            name
            id
          }
        }
      `,
    });
  
    return {
      props: {
        data: data.users,
      },
    };
  }