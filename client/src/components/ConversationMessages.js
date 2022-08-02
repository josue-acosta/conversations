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
                        return <MessageBubble key={item.index} direction="outgoing" message={item.body} />
                    } else {
                        return <MessageBubble key={item.index} direction="incoming" message={item.body} />
                    }
                })}
            </ul>
        );
    }
}