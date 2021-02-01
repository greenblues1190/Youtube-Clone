import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import EmptyPage from './views/EmptyPage/EmptyPage';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div className="pt-16 flex justify-center " >
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
          <Route exact path="/empty" component={Auth(EmptyPage, null)} />
 
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
