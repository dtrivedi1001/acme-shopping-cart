import _ from 'lodash'
import React, { Component } from "react";
import { Icon, Card, Image, Input, Segment, Grid, Button, Divider, CardDescription } from 'semantic-ui-react'
import {clearCart} from "../action/cart"
import { withRouter } from "react-router-dom";
import {addItemsToCart} from "../action/cart"
import {removeItemsFromCart} from "../action/cart"


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            cart: ""
        }
    }

    handleCheckout = () => {
        console.log(this.state.email);
        fetch("http://localhost:3100/api/email/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                cart : this.props.cart
            })
        });
        this.props.history.push("/");
        clearCart();
    }

    handleAddToCart = (id) => {
        addItemsToCart(id).then(res => console.log(res));
        window.location.reload();
    }

    handleRemoveFromCart = (id) => {
        removeItemsFromCart(id).then(res => console.log(res));
        window.location.reload();
    }

    totalPrice = (quantity, price) => {
        let itemPrice = (quantity * price).toFixed(2);
        return itemPrice;
    }

    totalBill = () => {
        let bill = 0.00;
        let carts = this.props.cart;
        for (var key in carts)
        {
            let cart = carts[key];
            let itemPrice = (cart.quantity * cart.productId.price).toFixed(2);
            bill = (Number(bill) + Number(itemPrice));
        }
        return bill.toFixed(2);
    }

    render() {
        const carts = this.props.cart;
        return (
            <div>
                <Card.Group>
                    {_.map(carts, cart => (
                        <Card fluid key={cart._id}>
                            <Card.Content>
                                <Image floated='left' size='mini' src={cart.productId.thumbnail} />
                                <Card.Header>{cart.productId.name}</Card.Header>
                                <Card.Meta>{cart.productId.description}</Card.Meta>
                                <Card.Description>
                                <Segment>    
                                <strong>Price : </strong>{cart.quantity} x {cart.productId.price} = {this.totalPrice(cart.quantity, cart.productId.price)}
                                </Segment>
                                <Segment>
                                    <strong>Quantity : </strong>
                                    <Button.Group size='mini'>
                                        <Button positive onClick={() => this.handleAddToCart(cart.productId._id)}>+</Button>
                                        <Button.Or />
                                        <Button onClick={() => this.handleRemoveFromCart(cart.productId._id)}>-</Button>
                                    </Button.Group>
                                </Segment>
                                </Card.Description>
                            </Card.Content>
                        </Card>    
                    ))}
                </Card.Group>
                <Segment placeholder>
                    <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column>
                            <strong>Total Price : </strong>{this.totalBill()}
                            <Divider />
                            <strong>Email : </strong>
                            <Input iconPosition='left' placeholder='Email' onChange={e => this.setState({email: e.target.value})}>
                                <Icon name='at' />
                                <input />
                            </Input>
                        </Grid.Column>

                        <Grid.Column verticalAlign='middle'>
                            <Button color='red' disabled={(this.state.email === "")} onClick={this.handleCheckout}>
                                    <Icon name='shopping cart' /> Checkout
                            </Button>
                        </Grid.Column>
                    </Grid>
                    <Divider vertical>And</Divider>
                </Segment>
            </div>
        );
    }
}
export default withRouter(Cart);