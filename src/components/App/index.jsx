import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from '../Header';
import MainPageContainer from '../../containers/MainPage';
import PostPage from '../PostPage';
import './style.css';

function App() {
    return (
        <Router>
            <div className="wraper">
                <Header />
                <Switch>
                    <Redirect exact from='/' to='/main-page/1' />
                    <Route path='/main-page/:pageId' component={MainPageContainer} />
                    <Route path='/post-page/:postId' component={PostPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
