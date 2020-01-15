import React, { Component } from 'react'
import axios from "axios"


class addNewItem extends Component {
    state = {
        seletedFile: null,
        controls: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'title',
                    placeholder: 'title'
                },
                value: '',
                validation: {
                    required: true,
                
                },
                valid: false,
                validationError: "Email should be valid",
                touched: false
            },
            price: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'price'
                },
                value: '',
                validation: {
                    required: true,
                    
                },
                valid: false,
                validationError: "",
                touched: false
            },
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'description'
                },
                value: '',
                validation: {
                    required: true,
                    
                },
                valid: false,
                validationError: "",
                touched: false
            },
            img:{
                value:null
            }

            
        }
    }
    inputChangeHandlerImage = (e) => {
        console.log(e.target.files)
        const newControls={...this.state.controls}
        const newControlELement=newControls.img
        newControlELement.value=e.target.files[0].name
        newControls.img=newControlELement
        this.setState({
            seletedFile: e.target.files[0],
            controls:newControls
        })
    }

    inputChangeHandler=(e)=>{
        console.log(e.target.name)
        const newControls=this.state.controls
        const newControlElement=newControls[e.target.name]
        newControlElement.value=e.target.value
        newControls[e.target.name]=newControlElement
        this.setState({controls:newControls})
    }

    submitHandler=(e)=>{
        console.log(this.state.controls)
    }
    submitHandlerImage = (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append("file", this.state.seletedFile)
        const dataObj={
            title:this.state.controls.title.value,
            description:this.state.controls.description.value,
            price:this.state.controls.price.value,
            img:this.state.controls.img.value
        }
        fd.append("data",JSON.stringify(dataObj))
        axios.post("http://localhost:8080/upload", fd)
            .then(res => {
                console.log(res)
            
            })
            .catch(err => console.log(err))

        

    }
    render() {

        return (
            <div className="container">
                <form onSubmit={this.submitHandlerImage}>
                        <input type="text" className="form-control mb-2" id="email" placeholder="Enter title" name="title" onChange={this.inputChangeHandler} />
                        <input type="text" className="form-control mb-2" placeholder="Enter description" name="description" onChange={this.inputChangeHandler}/>
                        <input type="text" className="form-control mb-2 " placeholder="Enter price" name="price" onChange={this.inputChangeHandler} />
                    <input name="file" type="file" onChange={this.inputChangeHandlerImage} />
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default addNewItem;
