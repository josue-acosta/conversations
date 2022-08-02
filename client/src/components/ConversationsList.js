import React, { Component } from 'react';

import styles from '../styles/styles.module.css'

export default class ConversationsList extends Component {
    render() {
        const { conversations, selectedConversationSid, onConversationClick } = this.props;

        return (
            <ul className={styles.conversationsList}>
                {conversations.map(item => (
                    <li 
                        key={item.sid}
                        onClick={() => onConversationClick(item.sid)}
                        className={selectedConversationSid === item.sid ? styles.selectedConversation : ''}
                    >
                        {item.friendlyName || item.sid}
                    </li>
                ))}
            </ul>
        );
    }
}