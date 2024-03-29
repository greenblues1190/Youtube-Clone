import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from './views/VideoDetailPage/VideoDetailPage';
import VideoEditPage from './views/VideoEditPage/VideoEditPage';
import SubscriptionPage from './views/SubscriptionPage/SubscriptionPage';
import ProfilePage from './views/ProfilePage/ProfilePage';
import SettingsPage from './views/SettingsPage/SettingsPage';
import SearchPage from './views/SearchPage/SearchPage';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div className="pt-16 flex justify-center" >
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
          <Route exact path="/editVideo/:videoId" component={Auth(VideoEditPage, true)} />
          <Route exact path="/subscription" component={Auth(SubscriptionPage, true)} />
          <Route exact path="/profile/:userId" component={Auth(ProfilePage, null)} />
          <Route exact path="/settings" component={Auth(SettingsPage, true)} />
          <Route exact path="/search" component={Auth(SearchPage, null)} />
          <Route component={Auth(NotFoundPage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
