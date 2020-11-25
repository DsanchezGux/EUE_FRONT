import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import classes from './Register.module.scss';

const Register = () => {
    return <div className={classes.main}>Register</div>;
};

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
