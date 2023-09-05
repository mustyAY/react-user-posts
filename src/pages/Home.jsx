import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState();
  async function getUsers() {
    setLoading(true);
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setLoading(false);
    setUsers(data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="user-list">
          {!loading
            ? users.map((user) => (
                <div
                  className="user"
                  key={user.id}
                  onClick={() => navigate(`/${user.id}`)}
                >
                  <div className="user-card">
                    <div className="user-card__container">
                      <h3>{user.name}</h3>
                      <p>
                        <b>Email:</b> {user.email}
                      </p>
                      <p>
                        <b>Phone:</b> {user.phone}
                      </p>
                      <p>
                        <b>Website:</b>
                        {user.website}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : new Array(10).fill(0).map((_, index) => (
                <div className="user" key={index}>
                  <div className="user-card user-card__skeleton"></div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
