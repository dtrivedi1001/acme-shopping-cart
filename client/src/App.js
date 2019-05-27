import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Inventory from "./InventoryPage"
import Checkout from "./CheckoutPage"

const App = () =>
  <Router>
    <div>
      <Route exact path="/" component={Inventory}/>
      <Route path="/checkout" component={Checkout}/>
    </div>
  </Router>

export default App;