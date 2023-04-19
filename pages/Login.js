import React from "react";
import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";

const GET_USER = gql`
  query User($id: ID!) {
    user(where: { id: $id }) {
      id
      name
      posts {
        title
        id
      }
    }
  }
`;

export { GET_USER };

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: "clglv6ho50000w0dw8wcr7uu0" },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  console.log("data", data);

  const updateUser = async (e) => {
    e.preventDefault();
    console.log("getting email and password", email, password);

    const { data } = await client.query({
      query: gql`
        query {
         mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
           updateUser(where: $where, data: $data) {
             id
             name
           }
         }
         
        }
         `,
      variables: {
        where: {
          id: "clghu0ns6000cw0ssq57maelr",
        },
        data: {
          email: "changed123@gmail.com",
          name: "king",
        },
      },
    });
  };

  return (
    <div>
      in login
      <h2>
        {/* <Link href="/users">See the list of all users</Link> */}

        <form>
          <label for="first"> email </label>
          <input
            type="text"
            id="first"
            value={email}
            name="first"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label for="first"> password </label>
          <input
            type="text"
            id="first"
            value={password}
            name="first"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={(e) => updateUser(e)}>
            Submit
          </button>
        </form>
      </h2>
    </div>
  );
};

export default Login;
