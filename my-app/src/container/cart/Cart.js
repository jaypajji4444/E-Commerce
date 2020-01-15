import React, { Component } from 'react'
import * as actions from "../../store/actions/index"
import "./Cart.css"
import { connect } from "react-redux";
class Cart extends Component {

    removeItemHaandler=(id)=>{
        this.props.onRemoveItem(id)
    }

    render() {
    
        let itemsList = this.props.items.addedItems.length ?
        (
            this.props.items.addedItems.map(item => {
            
                return (
                    <tr key={item.title}>
                    <th scope="row" className="border-0">
                    <div className="p-2">
                    <img src={process.env.PUBLIC_URL+"images/"+item.img} alt="" width="70" className="img-fluid rounded shadow-sm" />
                    <div className="ml-3 d-inline-block align-middle">
                    <h5 className="mb-0 text-dark d-inline-block align-middle">{item.title}</h5><span className="text-muted font-weight-normal font-italic d-block">Desc: {item.description}</span>
                    </div>
                    </div>
                    </th>
                    <td className="border-0 align-middle"><strong>{item.price}</strong></td>
                    <td className="border-0 align-middle"><strong>{item.qty}</strong></td>
                    <td className="border-0 align-middle"><button className="btn btn-danger" onClick={()=>this.removeItemHaandler(item._id)}>X</button></td>
                    </tr>
                    
                    
                    )
                    
                    
                })
                ) : null
                
                
                return (
                    
                    <div className="pb-5" id="outer">
                    <div className="container">
                    <div className="row">
                    <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                    <div className="table-responsive">
                    <table className="table">
                    <thead>
                    <tr>
                    <th scope="col" className="border-0 bg-light">
                    <div className="p-2 px-3 text-uppercase">Product</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">Price</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">Quantity</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">Remove</div>
                    </th>
                    </tr>
                    </thead>
                    <tbody>
                    {itemsList}
                    <tr>
                    <th scope="row" >
                    <div className="ml-3 d-inline-block align-middle">
                    <h5 className="mb-0 inline-block">Total</h5><span className="text-dark font-weight-bold  d-block">{this.props.items.addedItems.length?this.props.items.total:null}</span>
                    </div>
                    </th>
                    </tr>
                    </tbody>
                    
                    </table>
                    </div>
                
                    </div>
                    </div>
                    </div>
                    </div>
                    )
                }
            }
            const mapStateToProps = (state) => {
                return {
                    items: state.items
                }
            }

            const mapDispatchToProps=(dispatch)=>{
                return{
                    onRemoveItem:(id)=>dispatch(actions.deleteItem(id))
                }
            }
            
            export default connect(mapStateToProps,mapDispatchToProps)(Cart)
            