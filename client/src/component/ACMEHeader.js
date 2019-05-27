import React, { Component } from "react";
import {Header, Icon, Button} from "semantic-ui-react";
import {getCartCount} from "../action/cart"

class ACMEHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: 0
        };
    }

    fetchData() {
        getCartCount().then(res => this.setState({items: res}));
    }

    componentWillMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                <Header as='h2' floated='left'>
                    <Icon name='shopping basket' />
                    <Header.Content> 
                        ACME Shopping
                        <Header.Subheader>Making your buying experience smoother ....</Header.Subheader>
                    </Header.Content>
                </Header>
                <Header as='h2' floated='right'>
                <Button
                    basic
                    color='red'
                    content='Shopping Cart'
                    icon='shopping cart'
                    label={{ as: 'a', basic: true, color: 'red', pointing: 'left', content: this.state.items }}
                    />
                </Header>
            </div>
        );
    }
}

export default ACMEHeader;