import React, { Component } from 'react';
import './ErrorBoundary.css';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {      
            return (
              <h2>Could not display {this.props.section} content.</h2>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

ErrorBoundary.propTypes = {
    section: PropTypes.string
}