import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {store} from './store';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// import 'react-bootstrap/dist/css/bootstrap.min.css';
toast.configure();
ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<>wait a minute</>}>
    <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/landing" exact component={Landing} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/index" exact component={Index} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/auth" />
    </Switch>
  </BrowserRouter>
    </Suspense>
  </Provider>
  ,
  document.getElementById("root")
);
serviceWorker.unregister();