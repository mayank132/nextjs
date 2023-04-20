import React from "react";
import { useState ,useEffect } from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from 'next/router'

// Define mutation
const AUTHENTICATE_WITH_PASSWORD = gql`
mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
  authenticateUserWithPassword(email: $email, password: $password) {
    ... on UserAuthenticationWithPasswordSuccess {
      sessionToken
      item {
        id
        name
        isAdmin
      }
    }
    ... on UserAuthenticationWithPasswordFailure {
      message
    }
  }
}
`;

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


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()


  const [mutateFunction, { data, loading, error }] = useMutation(
    AUTHENTICATE_WITH_PASSWORD,
    {
      refetchQueries: [
        // {query: GET_USER}, // DocumentNode object parsed with gql
        // "User", // Query name
        // GET_USER,
      ],

    }
  );

  // const { loading, error, data } = useQuery(GET_USER, {
  //   variables: { id: "clglv6ho50000w0dw8wcr7uu0" },
  // });

  // if (loading) return null;
  if (error) return `Error! ${error}`;

  console.log("loggedIn", data,error);

  if(data?.authenticateUserWithPassword.message){
          return alert('invalid credentials')
  }

  if(data?.authenticateUserWithPassword.item){
            localStorage.setItem('userToken',data.authenticateUserWithPassword.sessionToken)
            localStorage.setItem('userId',data.authenticateUserWithPassword.item.id)
              
           return router.reload()

  }

  const updateUser = async (e) => {
    e.preventDefault();
    console.log("getting email and password", email, password);



    mutateFunction({
      variables: {
        email:email,
        password:password
      },
    });

  };

  return (
    <div>

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
