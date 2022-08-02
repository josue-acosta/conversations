import React, { Component } from 'react';

import styles from '../styles/styles.module.css'

export default class ConversationsList extends Component {
    render() {
        const conversations = [
            {
                sid: "CHXXXXXXXXXXXX",
                friendlyName: "+15150000000"
            },
            {
                sid: "CHXXXXXXXXXXXX",
                friendlyName: "+15150000001"
            },
            {
                sid: "CHXXXXXXXXXXXX",
                friendlyName: "+15150000002"
            }
        ]

        return (
            <ul className={styles.conversationsList}>
                {conversations.map(item => (
                    <li key={item.sid}>{item.friendlyName}</li>
                ))}
            </ul>
        );
    }
}