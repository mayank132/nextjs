import React from 'react';
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
`

const Check = () => {

    const { loading, error, data } = useQuery(GET_USER, {
        variables: { id: "clglv6ho50000w0dw8wcr7uu0" },
      });
    return data
}

export {Check}

