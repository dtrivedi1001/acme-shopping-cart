import _ from 'lodash'
import React, { Component, Fragment } from "react";
import { Button, Card, Image, Header, Modal, Icon } from 'semantic-ui-react'
import {addItemsToCart} from "../action/cart"


class Inventory extends Component {
    constructor(props) {
        super(props);
    }

    handleAddToCart = (id) => {
        addItemsToCart(id).then(res => console.log(res));
        window.location.reload();
    }

    render() {
        const cards = this.props.cards;
        return (
            <Card.Group itemsPerRow={3}>
                {_.map(cards, card => (
                    <Card key={card.id}>
                        <Modal trigger={<Image src={card.thumbnail} size='large'/>}>
                        <Modal.Header>{card.title}</Modal.Header>
                            <Modal.Content image>
                            <Image wrapped size='medium' src={card.thumbnail} />
                            <Modal.Description>
                                <Header>{card.title}</Header>
                                <p>{card.description}</p>
                            </Modal.Description>
                            </Modal.Content>
                        </Modal>

                        <Card.Content>
                            <Fragment>
                                <Card.Header>{card.title}</Card.Header>
                                <Card.Description>
                                    <div>
                                        <Header sub>Price</Header>
                                        <span>{card.quantity  > 0 ? "$ " + card.price : "Unavailable"}</span>
                                    </div>
                                </Card.Description>
                            </Fragment>
                        </Card.Content>
                        
                        <Card.Content extra>
                            <Button color='blue' disabled={!(card.quantity  > 0)} onClick={() => this.handleAddToCart(card.id)}>
                                <Icon name='shopping cart' /> Add to Cart
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        );
    }
}
export default Inventory;