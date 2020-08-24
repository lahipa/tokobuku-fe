import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import NotFound404 from "./notFound404";

import Home from "./views/home";
import Login from "./views/login";
import Register from "./views/register";
import SemuaBuku from "./views/allbook";
import BukuBaru from "./views/newbook";
import BestSeller from "./views/bestseller";
import ImportBook from "./views/importbook";
import CookingBook from "./views/cookingbook";
import DetailBuku from "./views/book";
import Checkout from "./views/checkout";

import AdminLogin from "./admin/auth/login";
import AdminDashboard from "./admin/views/dashboard";
import AdminBookList from "./admin/views/books";
//import AdminBookListAdd from "./admin/views/books/addBooks";
import AdminBookCategory from "./admin/views/categories";
import AdminListOrder from "./admin/views/orders";
import AdminOrderDetail from "./admin/views/orders/detail";
import Customers from "./admin/views/userCustomer";
import Admins from "./admin/views/userAdmin";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/semua-buku" component={SemuaBuku} />
          <Route exact path="/rincian-buku/:id" component={DetailBuku} />
          <Route path="/buku-baru" component={BukuBaru} />
          <Route path="/best-seller" component={BestSeller} />
          <Route path="/buku-import" component={ImportBook} />
          <Route path="/buku-memasak" component={CookingBook} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />

          <Route path="/checkout" component={Checkout} />

          <Route exact path="/imcoolmaster" component={AdminLogin} />
          <Route path="/imcoolmaster/dashboard" component={AdminDashboard} />
          <Route path="/imcoolmaster/books-list" component={AdminBookList} />
          {/* <Route
            path="/imcoolmaster/books-list/add"
            component={AdminBookListAdd}
          /> */}
          <Route
            path="/imcoolmaster/books-category"
            component={AdminBookCategory}
          />
          <Route exact path="/imcoolmaster/orders" component={AdminListOrder} />
          <Route
            exact
            path="/imcoolmaster/orders/:id"
            component={AdminOrderDetail}
          />
          <Route path="/imcoolmaster/customers" component={Customers} />
          <Route path="/imcoolmaster/admins" component={Admins} />

          <Route path="/404" component={NotFound404} />
          <Redirect to="/404" />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
