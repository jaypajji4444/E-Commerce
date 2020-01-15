import React, { Component } from 'react'
import { connect } from "react-redux"
import "../Home/Home.css"
import * as actions from "../../store/actions/index"

class DeleteItem extends Component {
    state = {
        loading: false
    }
    clickHandler = (id) => {
        this.props.onRemoveItem(id)
        setTimeout(()=>{this.props.onInitItem()},500)    
    }


    componentDidMount() {
        this.props.onInitItem()
    }
    
    render() {
        console.log(process.env.PUBLIC_URL)
        console.log(this.props.items)
        let itemList = this.props.items.items.map(item => {
            return (
                <div className="col-lg-4 " key={item.title}>
                    <div className="card text-center shadow-lg p-3 mb-5 bg-white rounded ">
                        <img className="card-img" src={process.env.PUBLIC_URL + "images/" + item.img} alt={item.title} />
                        <div className="card-body">
                            <div className="card-title font-weight-bold" >{item.title}</div>
                            <p>{item.description}</p>
                            <p><b>Price: {item.price}$</b></p>
                            <button className="btn btn-danger" onClick={() => this.clickHandler(item._id)}>RemoveItem</button>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className="container ">
                <div className="row" >
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        items: state.items
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveItem: (id) => dispatch(actions.removeItem(id)),
        onInitItem: () => dispatch(actions.initItem())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeleteItem)
