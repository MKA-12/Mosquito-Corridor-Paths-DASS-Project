import React,{Component} from 'react';
import axios from 'axios';
import { Container, Button, ListGroup, ListGroupItem } from 'reactstrap';

class Listing extends Component{
    state={
        items:[
            {ItemName:'Eggs',ItemQuantity:'12'},
            {ItemName:'Apples',ItemQuantity:'6'}
        ]
    }
    handleSubmit = this.handleSubmit.bind(this);
    handleChange = this.handleChange.bind(this);

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const name = prompt('Enter item name');
        const quantity = prompt('Enter item quantity');
        // const {
        //     ItemName,
        //     ItemQuantity
        // } = this.state.items;
        const here_item={
            ItemName:name,
            ItemQuantity: quantity
        };

        axios.post("http://localhost:5000/api/items", {here_item
                // Item: {
                //     ItemName: name,
                //     ItemQuantity: quantity
                // }
            }).then(response => {
                // console.log("login result", response);
                // if(response.data.logged_in){
                    console.log("Yayyy",response.data);
                    // this.props.handleSuccessfulAuthorization(response.data);
                // }
            })
            // .catch(error => {
            //     console.log("login error", error);
            // });
            .catch(error => {
                if (!error.response) {
                    // network error
                    this.errorStatus = 'Error: Network Error';
                } else {
                    this.errorStatus = error.response.data.message;
                }
              });
        // console.log("Submitted");
        event.preventDefault();
    }
    render (){
        const{items}=this.state;
        return(
            <Container>
                {/* <Button color="dark" onClick={()=>{
                    const name = prompt('Enter item name');
                    const quantity = prompt('Enter item quantity');
                    if(name && quantity){
                        this.setState(state=>({
                            items: [...state.items,{ItemName:name,ItemQuantity:quantity}]
                        }));
                }}}
                >
                Add Item</Button> */}
                <Button color="dark" onClick={this.handleSubmit}>Add Item</Button>
                <Button color="dark" onClick={()=>{
                    const name = prompt('Enter item name');
                    const quantity = prompt('Enter item quantity');
                    if(name){
                    this.setState(state=>({
                        items: state.items.filter(item=>item.ItemName!=name)
                    }));
                }}}
                >
                Delete Item</Button>

                <ListGroup>
                    {items.map(({ItemName,ItemQuantity})=>(
                        <ListGroupItem>
                            {ItemName},
                            {ItemQuantity}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

export default Listing;