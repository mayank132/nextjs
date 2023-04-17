import { gql } from "@apollo/client";
import client from "../../helpers/apolloclient";
import Link from "next/link";

export default function Users({ data }) {
  console.log('all posts',data);
  return (
    <div>
      <h1> List of all posts users</h1>

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