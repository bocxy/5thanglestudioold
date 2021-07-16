import React from 'react';
import {ConnectedRouter} from 'connected-react-router'
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import configureStore, {history} from './store';// //
import './firebase/firebase';
import App from './containers/App';
import { ApolloProvider } from "react-apollo";
import client from './services/grapgql/client';
import AppAuth from './contextProvider/authprovider'
export const store = configureStore(); 
const MainApp = () =>
  // <div style={{margin:"auto"}}>
    <ApolloProvider client={client}>
    <AppAuth >
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch >
          <Route  path="/" component={App}/>
          <Route />
        </Switch> 
      </ConnectedRouter>
    </Provider>
    </AppAuth>
  </ApolloProvider>
  // </div>
  
export default MainApp;