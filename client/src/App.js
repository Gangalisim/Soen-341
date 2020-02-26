import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  //server folder: npm run dev 
  //client folder: npm start

  state = {
    selectedFile: null,
    title: '',
    body:'',
    posts: []
  }

  componentDidMount = () => {
    this.getBlogPost;
  }


  fileSelectedHandler = event => {
    //console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({posts: data})
        console.log("Data has been received!");
      })
      .catch(() => {
        alert("Error retrieving data!");
      });

  }

  fileUploadHander = () => {
    const fd = new FormData();
    fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    axios.post('')
      .then(res => {
        console.log(res);
      })
  }

  displayBlogPost = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => {
      <div key={index}>
        <h3>{post.title}</h3>
          <p>{post.body}</p>
      </div>
    });

  }

  //JSX
  render() {
    return (
      <div className="App">
        <h2>Welcome to Memestagram</h2>
        <form onSubmit = {this.submit}>
          <div className = "form-input"></div>
          <div className = "form-input"></div>
          <button>Submit</button>
        </form>

        <input type="file" onChange={this.fileSelectedHandler}/> 
        <button onClick = {this.fileUploadHander}>Upload</button>

        <div className="blog">
        {this.displayBlogPost(this.state.posts)}
        </div>
      </div>


    );
  }
}

export default App;
