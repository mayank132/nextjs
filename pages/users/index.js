import { gql } from "@apollo/client";
import client from "../../helpers/apolloclient";
import Link from "next/link";

export default function Users({ data }) {
  console.log("seeing", data);
  return (
    <div>
      <h1> List of all users are here</h1>
      {data.map((item, key) => (
        <>
          <p>
            {" "}
            {key + 1} {item.name}{" "}
          </p>
          <p>
            see all posts <Link href={`/users/${item.id}`}>{item.name}</Link>
          </p>
          <p>
            {" "}
            edit <Link href={`/users/edit/${item.id}`}>{item.name}</Link>
          </p>
        </>
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
