import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import classes from './Login.module.scss';

const Login = () => {
    return <div className={classes.main}>Login</div>;
};

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
