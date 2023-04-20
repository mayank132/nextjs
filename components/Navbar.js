import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useEffect ,useState} from "react";
import client from '../helpers/apolloclient'
import Router from 'next/router'


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

const Navbar = () => {

    const [user,setUser] = useState()

  const getUserData = async(id) => {

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
      })

      return data
  };

  useEffect(() => {
    // Perform localStorage action

    const id = localStorage.getItem("userId");

    if(id){
        const data = getUserData(id);

        data.then((user)=>{
          console.log('user',user)
          setUser(user.user)
        })
    }



    // setUser(data.user)
  }, []);

  console.log("in navigation");

  return <div>
    
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">  Blog website  </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        {/* <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li> */}
  
      </ul>
      <form class="d-flex">
<h3  className="me-4" >
{
        user && user.name
      }
</h3>   

{
    user && <button type="button" class="btn btn-warning " onClick={()=>{
        localStorage.removeItem('userToken')
        localStorage.removeItem('userId')
        Router.reload()
}} > logout </button>
}
      
      </form>
    </div>
  </div>
</nav>
     </div>;
};

export default Navbar;
