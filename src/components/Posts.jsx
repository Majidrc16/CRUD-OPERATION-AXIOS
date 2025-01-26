import React, { useState, useEffect } from "react";
import { getPost, deletePost } from "../api/PostApi";
import Form from "./Form";
import "./Post.css";

const Post = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

  // Fetch posts from API
  const getPostData = async () => {
    try {
      const res = await getPost();
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  // function to delete Post
  const handleDelete = async (id) => {
    try {
      const response = await deletePost(id);
      if (response.status === 200) {
        const newUpdatedPosts = data.filter((currPost) => {
          return currPost.id !== id;
        });
        setData(newUpdatedPosts);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdatePost = (currEle) => setUpdateDataApi(currEle);

  return (
    <div>
      <section>
        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>
      <section className="section-post">
        {data.map((currEle) => {
          const { id, body, title } = currEle;
          return (
            <div className="post-box" key={id}>
              <p className="post-title">Title: {title}</p>
              <p className="post-body">Body: {body}</p>
              <button onClick={() => handleUpdatePost(currEle)}>Edit</button>
              <button onClick={() => handleDelete(id)}>Delete</button>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Post;
