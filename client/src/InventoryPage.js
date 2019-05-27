import React, {Component} from 'react';
import {Icon, Segment, Button} from "semantic-ui-react";
import Inventory from "./component/Inventory"
import ACMEHeader from "./component/ACMEHeader"
import {getInventory} from "./action/inventory"
import {getCartCount} from "./action/cart"

class InventoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            items: 0
        };
    }

    fetchData() {
        getInventory().then(res => this.setState({cards: res}));
        getCartCount().then(res => this.setState({items: res}));
    }

    handleCheckout = () => {
        this.props.history.push('/checkout');
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
                        <Inventory cards={this.state.cards} items={this.state.items} />
                    </Segment>
                    <Segment clearing>
                        <Button color='red' disabled={!(this.state.items  > 0)} onClick={this.handleCheckout} floated='right'>
                            <Icon name='shopping cart' /> Proceed to Checkout
                        </Button>
                    </Segment>
                </Segment>
            </div>
        );
    }
}

export default InventoryPage