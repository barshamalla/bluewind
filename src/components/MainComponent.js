import React, { Component } from 'react';
import { actions } from 'react-redux-form';
import Directory from './Directory Component';
import SuiteInfo from './SuiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from'./ContactComponent';
import About from './AboutComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchSuites, fetchComments, fetchPromotions } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
      suites: state.suites,
      comments: state.comments,
      partners: state.partners,
      promotions: state.promotions
  };
};
const mapDispatchToProps = {
  postComment: (suiteId, rating, author, text) => (postComment(suiteId, rating, author, text)),
  fetchSuites: () => (fetchSuites()),
  resetFeedbackForm: () => (actions.reset('feedbackForm')),
  fetchComments: () => (fetchComments()),
  fetchPromotions: () => (fetchPromotions())
};

class Main extends Component {
    componentDidMount(){
      this.props.fetchSuites();
      this.props.fetchComments();
      this.props.fetchPromotions();
    }
  
  render() {
    const HomePage = () => {
      return (
          <Home
              suite={this.props.suites.suites.filter(suite => suite.featured)[0]}
              suitesLoading={this.props.suites.isLoading}
              suitesErrMess={this.props.suites.errMess}
              promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
              promotionLoading={this.props.promotions.isLoading}
              promotionErrMess={this.props.promotions.errMess}
              partner={this.props.partners.filter(partner => partner.featured)[0]}
          />
      );
  };

  const SuiteWithId = ({match}) => {
      return (
          <SuiteInfo 
              suite={this.props.suites.suites.filter(suite => suite.id === +match.params.suiteId)[0]} 
              isLoading={this.props.suites.isLoading}
              errMess={this.props.suites.errMess}
              comments={this.props.comments.comments.filter(comment => comment.suiteId === +match.params.suiteId)}
              commentsErrMess={this.props.comments.errMess}
              postComment={this.props.postComment}
          />
      );
  };   

      return (
          <div >
             
              <Header/>
              <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/directory' render={() => <Directory suites={this.props.suites} />} />
                            <Route path='/directory/:suiteId' component={SuiteWithId} />
                           <Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} /> } />
                            <Route exact path='/aboutus' render={() => <About partners={this.props.partners} /> } />
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                      
              <Footer/>
          </div>
      );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
