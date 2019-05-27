import React, {Component} from 'react';
import {Icon, Segment, Button} from "semantic-ui-react";
import ACMEHeader from "./component/ACMEHeader"
import Cart from "./component/Cart"
import {getCart} from "./action/cart"

class CheckoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        };
    }

    handleReturnBack = () => {
        this.props.history.push('/');
    }

    fetchData() {
        getCart().then(res => this.setState({cart: res}));
    }

    componentWillMount() {
        this.fetchData();
    }

    render() {
        return (
            <div className="App">
                <Segment raised>
                    <Segment clearing>
                        <ACMEHeader />
                    </Segment>
                    <Segment clearing>
                        <Cart cart={this.state.cart} />
                    </Segment>
                    <Segment clearing>
                        <Button color='red' onClick={this.handleReturnBack} floated='right'>
                            <Icon name='shopping basket' /> Return back to Inventory
                        </Button>
                    </Segment>
                </Segment>
            </div>
        );
    }
}

export default CheckoutPage