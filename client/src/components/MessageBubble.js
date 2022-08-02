import React, { Component } from "react";

import styles from '../styles/styles.module.css'

export default class MessageBubble extends Component {
    render() {
        const { message, direction, timestamp } = this.props
        const timestampOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }

        return (
            <li className={ direction === 'incoming' ? styles.incoming : styles.outgoing }>
                <span>{message}</span>
                <span className={styles.timestamp}>
                    {timestamp.toLocaleString('en-US', timestampOptions)}
                </span>
            </li>
        )
    }
}