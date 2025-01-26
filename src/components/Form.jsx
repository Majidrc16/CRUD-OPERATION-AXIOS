import React, { useEffect, useState } from "react";
import { PostData } from "../api/PostApi";
import { PutData } from "../api/PostApi";

const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updateDataApi).length === 0;

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // get the update data and add into input field
  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const addPostData = async () => {
    const res = await PostData(addData);
    console.log("res", res);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  // UpdatePostData
  const UpdatePostData = async () => {
    try {
      const res = await PutData(updateDataApi.id, addData);
      if (res.status === 200) {
        setData((prev) => {
          return prev.map((currEle) => {
            return currEle.id === updateDataApi.id ? res.data : currEle;
          });
        });
        setAddData({
          title: "",
          body: "",
        });
        setUpdateDataApi({});
      }
    } catch (err) {
      console.error("error ocuured", err);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      UpdatePostData();
    }
  };

  return (
    <form className="form-container" onSubmit={handleFormSubmit}>
      <label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          placeholder="Add Title"
          name="title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          placeholder="Add Data"
          name="body"
          value={addData.body}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>

      <style>{`
        .form-container {
          display: flex;
          align-items:center;
          gap:10px;
          justify-content:center;
          margin-top:10px;
        }
        label {
          display: flex;
          align-items:center;
          gap:10px;
        }
        input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </form>
  );
};

export default Form;
