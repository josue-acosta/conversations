import React, { Component } from "react";

import styles from '../styles/styles.module.css'

export default class MessageBubble extends Component {
    render() {
        const { message, direction } = this.props

        return (
            <li className={ direction === 'incoming' ? styles.incoming : styles.outgoing }>{message}</li>
        )
    }
}