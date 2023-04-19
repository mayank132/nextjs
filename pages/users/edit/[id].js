import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import client from "../../../helpers/apolloclient";
import Link from "next/link";

// Define mutation
const INCREMENT_COUNTER = gql`
  mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      id
      name
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

export default function SpecificUser({ userId }) {
  const [name, setName] = useState("");


  const [mutateFunction, { data: data1, loading, error }] = useMutation(
    INCREMENT_COUNTER,
    {
      refetchQueries: [
        // {query: GET_USER}, // DocumentNode object parsed with gql
        "User", // Query name
        GET_USER,
      ],

    }
  );

  const {
    loading: l1,
    error: l2,
    data,
  } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  // if (l1) return null;
  // if (l2) return `Error! ${l2}`;

  console.log("jjjjjjj", data);

  useEffect(() => {
    console.log("kkkkkkkkkkkkkkkkkkk");

    if (data) {
      console.log("gggg", data);
      setName(data.user.name);
      // setId(data.user.id);
    }
  }, [data]);

  // if (loading) return "Submitting...";

  // console.log("seeing", data1);
  // if (error) return `Submission error! ${error.message}`;

  const updateUser = async (e, id) => {
    console.log("lemon", id);
    e.preventDefault();

    mutateFunction({
      variables: {
        where: {
          id: id,
        },
        data: {
          name: name,
        },
      },
    });


  };

  console.log("in edit user", data);

  return (
    <div>
      <form>
        <label for="first">First name:</label>
        <input
          type="text"
          id="first"
          value={name}
          name="first"
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit" onClick={(e) => updateUser(e, userId)}>
          Submit
        </button>
      </form>
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
  // console.log("checking id", id);
  // const { data } = await client.query({
  //   query: gql`
  //     query User($id: ID!) {
  //       user(where: { id: $id }) {
  //         id
  //         name
  //         posts {
  //           title
  //           id
  //         }
  //       }
  //     }
  //   `,
  //   variables: { id },
  // });
  return {
    props: {
      userId: id,
    },
  };
}
