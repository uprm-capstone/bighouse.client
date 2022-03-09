import React, { Component } from 'react'
import Select from 'react-select';
import "./index.css";

export default class DropDownList extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      gender: ''
    }
  }
   
  getOptions(){
    const options = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
    ]
    
    this.setState({selectOptions: options})
  }

  handleChange(e){
   this.setState({gender:e.label})
  }

  componentDidMount(){
      this.getOptions()
  }

  render() {
    console.log(this.state.selectOptions)
    return (
      <div class="dropDown">
        <Select  options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}