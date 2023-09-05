import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Posts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();
  const [searchId, setSearchId] = useState(id);

  async function getPosts(userId) {
    setLoading(true);
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`
    );
    setLoading(false);
    setPosts(data);
  }

  function onSearch() {
    getPosts(searchId);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="post__search">
        <button onClick={() => navigate("/")}>← Back</button>
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input
            type="number"
            value={searchId}
            min={1}
            max={10}
            onChange={(event) => setSearchId(event.target.value)}
            onKeyPress={(event) => event.key === "Enter" && onSearch()}
          />
          <button onClick={() => onSearch()}>Enter</button>
        </div>
      </div>
      {!loading
        ? posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post__title">{post.title}</div>
              <p className="post__body">{post.body}</p>
            </div>
          ))
        : new Array(10).fill(0).map((_, index) => (
            <div className="post" key={index}>
              <div className="post__title">
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>
          ))}
    </>
  );
};

export default Posts;
