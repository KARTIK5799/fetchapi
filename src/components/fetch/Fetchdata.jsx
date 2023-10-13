import React, { useEffect, useState } from 'react';
import './fetchdata.css';

const Fetchdata = () => {
  const [userData, setUserData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Function to filter data based on search query
  const filteredData = userData.filter((user) => {
    const searchValue = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue) ||
      user.address.street.toLowerCase().includes(searchValue) ||
      user.address.suite.toLowerCase().includes(searchValue) ||
      user.address.city.toLowerCase().includes(searchValue) ||
      user.address.zipcode.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="container">
      <h2 className="heading">User Data</h2>
      <input
        type="text"
        placeholder="Search by name, email, or address"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-box"
      />
      <table className="custom-table">
        <thead className="table-head">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {filteredData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
              </td>
              <td>
                {user.id === editId ? (
                  <button onClick={() => setEditId(null)}>Save</button>
                ) : (
                  <button onClick={() => setEditId(user.id)}>Edit</button>
                )}
                <button onClick={() => setEditId(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fetchdata;
