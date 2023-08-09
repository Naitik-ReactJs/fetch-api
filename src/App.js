import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import Form from "./Form";
import Base64 from "./Base64";

function App() {
  const [controller, setController] = useState(new AbortController()); // Initialize with an AbortController
  const [users, setData] = useState([]);

  const getApiData = async () => {
    controller.abort(); // Abort the previous request
    const newController = new AbortController(); // Create a new controller
    setController(newController); // Update the controller state

    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users", {
        signal: newController.signal,
      });
      setData(response.data);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Previous request was aborted');
      } else {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <div className="container">
      <h3 className="text-center p-5">Get Table data from Api</h3>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit" className="btn btn-primary" onClick={getApiData}>
        fetch data
      </button>
 



      <Form />
      <Base64 />
    </div>
  );
}
export default App;

// Send a POST request
// axios({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }
// });

//     const userToUpdate = {
// {
//     "userId": 1,
//     "id": 1,
//     "title": "tagline",
//     "body": "IT company"
// }
// };
// .put("https://jsonplaceholder.typicode.com/posts/1" ,  userToUpdate )
// .patch("https://jsonplaceholder.typicode.com/posts/1" , {"title" : "naitik"} )
// fetch(url, {
// method: 'PUT',
//  headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(userToUpdate)
// });
