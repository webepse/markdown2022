import React, { Component } from 'react';
import './App.css'

import { marked } from 'marked';
import DOMPurify from 'dompurify';

import { sampleText } from './sampleText';

class App extends React.Component {
  state = {
    text : sampleText
  }

  componentDidMount() {
    console.log("montage du component")
    const text = localStorage.getItem('myText')
    if(text)
    {
      this.setState({text})
    } else{
      this.setState({text:sampleText})
    }

  }

  componentDidUpdate(){
    console.log('modification du component')
    const text = this.state.text // récup le state après changement
    localStorage.setItem('myText', text)
  }


  handleChange = (event) => {
    // pour faire du destructuring on utlise le même nom de variable que le state
    const text = event.target.value
    this.setState({text}) // sinon text:text
  }

  renderText = text => {
    let text2 = DOMPurify.sanitize(text, {ALLOWED_TAGS: ['b']})
    return marked.parse(text2)
  }

  render() { 
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <textarea
                rows="35"
                className="form-control"
                value={this.state.text}
                onChange={this.handleChange}
              ></textarea>

            </div>
            <div className="col-sm-6">
              <div dangerouslySetInnerHTML={{__html: this.renderText(this.state.text)}}></div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
 
export default App;

