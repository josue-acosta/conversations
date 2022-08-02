import React, { Component } from "react";

import MessageBubble from "./MessageBubble";

import styles from '../styles/styles.module.css'

export default class ConversationMessages extends Component {
    render() {
        const { messages, identity } = this.props

        return (
            <ul className={styles.conversationMessage}>
                {messages.map(item => {
                    if (item.author === identity) {
                        return <MessageBubble 
                        key={item.state.index}
                        direction="outgoing"
                        message={item.state.body}
                        timestamp={item.state.timestamp}
                        />
                    } else {
                        return <MessageBubble 
                        key={item.state.index}
                        direction="incoming"
                        message={item.state.body}
                        timestamp={item.state.timestamp}
                        />
                    }
                })}
            </ul>
        );
    }
}