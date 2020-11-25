import React from 'react';
import classes from './Home.module.scss';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
const Home = () => {
    return <div className={classes.main}>TS APP REDUX API</div>;
};

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
