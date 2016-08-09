import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { App } from '../../ui/layouts/app';
import { Documents } from '../../ui/pages/documents';
import { Annonces } from '../../ui/pages/annonces';
import { Index } from '../../ui/pages/index';
import { Login } from '../../ui/pages/login';
import { NotFound } from '../../ui/pages/not-found';
import { RecoverPassword } from '../../ui/pages/recover-password';
import { ResetPassword } from '../../ui/pages/reset-password';
import { Signup } from '../../ui/pages/signup';
import { AddAnnonce } from '../../ui/pages/add-annonce';
import  AnnonceItem  from '../../ui/containers/annonce-item-container';
import { MyAnnonces } from '../../ui/pages/my-annonces';
import  NotificationsCategoriesPage  from '../../ui/containers/notifications-categories-page-container';
import { Messages } from '../../ui/pages/messages-page';

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="annonces" component={ Annonces } onEnter={ requireAuth } />
        {/*<IndexRoute name="index" component={ Index } onEnter={ requireAuth } />*/}
        {/* <Route name="documents" path="/documents" component={ Documents } onEnter={ requireAuth } /> */}
        <Route name="annonces" path="/annonces" component={ Annonces } onEnter={ requireAuth } />
        <Route name="annonceItem" path="/annonces/:annonceId" component = { AnnonceItem } onEnter={ requireAuth } />
        <Route name="notification-categories" path="/annonces/categories/:categoryId" component={ NotificationsCategoriesPage } onEnter={requireAuth}/>
        <Route name="my-annonces" path="/my-annonces" component={ MyAnnonces } onEnter={ requireAuth }/>
        <Route name="add-annonce" path="/add-annonce" component={ AddAnnonce } onEnter={ requireAuth } />
        <Route name="messages" path="/messages" component={ Messages } onEnter={requireAuth} />
        <Route name="conversation" path="/messages/conversation/:conversationId" component={ Messages } onEnter={ requireAuth } />
        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
