import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"
import Navi from './component/Navi'
import Home from "./container/Home/Home"
import Cart from "./container/cart/Cart"
import Auth from "./container/auth/Auth"
import Logout from "./container/auth/Logout"
import AddNewItem from "./container/addNewItem/addNewItem";
import DeleteItem from "./container/DeleteItem/DeleteItem"
import { connect } from "react-redux"
import "./App.css"



class App extends Component {
  render() {
    let addNewItem=null
    if(this.props.authData.userEmail==="cool1234@gmail.com"){
      addNewItem=(
        <Switch>
        <Route path="/addItem" exact component={AddNewItem} />
        <Route path="/deleteItem" exact component={DeleteItem} />
        </Switch>
      )
  }
    return (

      <div id="outer">
        <Navi />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/logout" exact component={Logout} />
          {addNewItem} 
        </Switch>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    authData: state.auth
  }
}

export default connect(mapStateToProps)(App)