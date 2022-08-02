import React, { Component } from 'react';

// component
import ConversationMessages from "./ConversationMessages";

import styles from '../styles/styles.module.css'

export default class ConversationThread extends Component {
    render () {
        const identity = "miSystema"
        const messages = [
            {
                index: 1,
                author: "+15150000000",
                body: "Incoming...lorem ipsum momento mori"
            },
            {
                index: 2,
                author: "miSystema",
                body: "Outgoing...lorem ipsum momento mori"
            },
            {
                index: 3,
                author: "+15150000000",
                body: "Incoming...lorem ipsum momento mori"
            }
        ]

        return (
            <div>
                <ConversationMessages
                    identity={identity}
                    messages={messages}
                />

                <form className={styles.form}>
                    <input type="text" name="message" placeholder="Enter message..." className={styles.input} />
                    <input type="submit" value="Submit" className={styles.submit} />
                </form>
            </div>
        )
    }
}