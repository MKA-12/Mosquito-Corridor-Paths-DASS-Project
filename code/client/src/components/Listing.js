import React,{Component} from 'react';
import axios from 'axios';

class Listing extends Component{
    constructor(props){
        super(props);
        this.state = {
            ItemName:'',
            ItemQuantity:'',
            Added_items:[],
            id:null
        }
        this.handle_add_Submit=this.handle_add_Submit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handle_delete_Submit=this.handle_delete_Submit.bind(this);
    }

    componentDidMount(){
        this.handle_view_Submit();
    };

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handle_add_Submit(event){
        const added_item={
            ItemName:this.state.ItemName,
            ItemQuantity:this.state.ItemQuantity
        };

        axios({
            url:'http://localhost:5000/api/items',
            method:'POST',
            data: added_item
        })
        .then(()=>{
            console.log("Data added");
            this.handle_view_Submit();
        })
        .catch(()=>{
            console.log("Error");
        });
        event.preventDefault();
    }

    handle_view_Submit(event){
        axios({
            url:'http://localhost:5000/api/items',
            method:'GET'
        })
        .then((response)=>{
            this.setState({Added_items:response.data});
            console.log("Data viewed");
        })
        .catch(()=>{
            console.log("Error");
        });
        // event.preventDefault();
    }

    View_items=()=>{
        const data=this.state.Added_items;
        
        if(!data.length)return null;
        return (
            <div>
            {data.map(function(d, idx){
               return (<li key={idx}>{d.ItemName}</li>)
             })}
            </div>
          );
    }

    handle_delete_Submit=()=>{
        const deleted_item={
            id:this.state.id
        };

        axios({
            url:'http://localhost:5000/api/items/',
            method:'DELETE',
            data:deleted_item
        })
        .then((response)=>{
            console.log("Data deleted");
        })
        .catch(()=>{
            console.log("Error");
        });
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handle_add_Submit}>
                    <input 
                        type="string" 
                        name="ItemName" 
                        placeholder="ItemName" 
                        value={this.state.ItemName} 
                        onChange={this.handleChange} 
                        required>
                    </input>
                    <input 
                        type="number" 
                        name="ItemQuantity" 
                        placeholder="ItemQuantity" 
                        value={this.state.ItemQuantity} 
                        onChange={this.handleChange} 
                        required>
                    </input>
                    <button type="submit">Add Item</button>
                </form>
                {/* <button onClick={this.View_items}>View Items</button> */}
                <form onSubmit={this.handle_delete_Submit}>
                    {/* <input 
                        type="string" 
                        name="ItemName" 
                        placeholder="ItemName" 
                        value={this.state.ItemName} 
                        onChange={this.handleChange} 
                        required>
                    </input> */}
                    <input 
                        type="string" 
                        name="id" 
                        placeholder="id" 
                        value={this.state.id} 
                        onChange={this.handleChange} 
                        required>
                    </input>
                    <button type="submit">Delete Item</button>
                </form>
                <div>
                    {this.state.Added_items.map(function(d, idx){
                    return (<li key={idx}>{"Item:"+d.ItemName},{"Quantity:"+d.ItemQuantity}</li>)
                    })}
                </div>
            </div>
        );
    }
}

export default Listing;