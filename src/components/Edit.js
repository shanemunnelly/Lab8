import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Define a functional component named Edit
export default function Edit(props) {
  // The useParams hook returns an object of key/value pairs of
  // the dynamic params from the current URL that were matched by
  // the <Route path>.
  let { id } = useParams();

  // Update arrays using the React useState()
  // and without the Array objects push() method
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [author, setAuthor] = useState("");

  // useNavigate returns a function that we can use to navigate
  const navigate = useNavigate();

  // useEffect Hook is similar to componentDidMount
  useEffect(() => {
    // Axios is a promise-based web client.
    // Make an HTTP Request with GET method and pass the id as part of the URL.
    axios.get('http://localhost:4000/api/book/' + id)
      .then((response) => {
        // Assign Response data to the arrays using useState.
        setTitle(response.data.title);
        setCover(response.data.cover);
        setAuthor(response.data.author);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []); // Empty dependency array ensures this effect runs once when the component mounts.

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const newBook = {
      id: id,
      title: title,
      cover: cover,
      author: author
    };

    // Axios PUT request to update the book
    axios.put('http://localhost:4000/api/book/' + id, newBook)
      .then((res) => {
        console.log(res.data);
        // Navigate to the 'read' page after successful edit.
        navigate('/read');
      });
  }

  // Render the component
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Add Book Title: </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Add Release Year: </label>
          <input
            type="text"
            className="form-control"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Add Poster Url: </label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Book" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
