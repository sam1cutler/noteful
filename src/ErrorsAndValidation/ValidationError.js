import React from 'react';

export default function ValidationError(props) {
    if (props.message) {
        return (
        <div className="warning">{props.message}</div>
        );
    }

    return <></>
}