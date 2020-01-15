import React, { Component } from 'react'
import { connect } from "react-redux"
import {Redirect} from "react-router-dom"
import "./auth.css"
import * as actions from '../../store/actions/index'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                validationError: "Email should be valid",
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                validationError: "Password should be of atleast 6 characters",
                touched: false
            }
        },
        isSignup: true
    }


    inputChangedHandler = (event) => {
        
        const newControls = { ...this.state.controls }
        const newControlElement = { ...newControls[event.target.type] }
        newControlElement.value = event.target.value
        newControls[event.target.type] = newControlElement
        this.setState({ controls: newControls })
    }

    submitHandler = () => {
        console.log(this.state)
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
    }

    switchAuthMode = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }



    render() {
        let authRedirect=null
        if(this.props.isAuth){
            authRedirect=<Redirect to="/" />
        }
        return (
            <div className="Auth">
            {authRedirect}
                <div class="form-group" onSubmit={this.submitHandler}>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        placeholder="Enter email"
                        onChange={(event) => { this.inputChangedHandler(event) }} />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" id="exampleInputPassword1"
                        placeholder="Password"
                        onChange={(event) => { this.inputChangedHandler(event) }}
                    />
                </div>
                <button type="submit" class="btn btn-light" onClick={this.submitHandler}>Submit</button>
                <button
                    onClick={this.switchAuthMode}
                    className="btn btn-light">
                    Switch To {this.state.isSignup ? "Login" : "SignUp"}
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        isAuth:state.auth.Authenticated
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        onAuth:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup))
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth)