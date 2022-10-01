import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import store from "./store/store";
import { fetchUser } from "./store/userSlice.js";

import ProtectedRoute from "./components/utils/ProtectedRoute";
import Temp from "./components/utils/Temp";
import Notfound from "./components/utils/Notfound";

import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Routes/Home";

import Login from "./components/Routes/User/Login";
import Register from "./components/Routes/User/Register.js";
import ForgotPassword from "./components/Routes/User/ForgotPassword.js";
import ResetPassword from "./components/Routes/User/ResetPassword.js";

import Products from "./components/Routes/Products";
import ProductDetails from "./components/Routes/ProductDetails/ProductDetails";

import Cart from "./components/Routes/Cart/Cart.js";
import Shipping from "./components/Routes/Cart/Shipping.js";
import Checkout from "./components/Routes/Cart/Checkout/Checkout";
import OrderPlaced from "./components/Routes/Cart/Checkout/OrderPlaced";

function App() {
  useEffect(() => {
    store.dispatch(fetchUser());
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:query" component={Products} />
        <Route exact path="/product/:productId" component={ProductDetails} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/checkout" component={Checkout} />
        <ProtectedRoute exact path="/order/success" component={OrderPlaced} />

        <Route exact path="/temp-link" component={Temp} />
        <Route exact path="*" component={Notfound} />
      </Switch>
      <Footer />
    </>
  );
}
export default App;
