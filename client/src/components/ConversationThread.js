import React, { Component } from 'react';

// component
import ConversationMessages from "./ConversationMessages";

import styles from '../styles/styles.module.css'

export default class ConversationThread extends Component {
    state = {
        newMessage: '',
        conversationProxy: this.props.conversationProxy,
        messages: [],
        loadingState: 'initializing',
        boundConversations: new Set()
    }

    loadMessagesFor = (thisConversation) => {
        if (this.state.conversationProxy === thisConversation) {

            thisConversation.getMessagesCount()
                .then(count => {
                    thisConversation.getMessages(count)
                    .then(messagePaginator => {
                        if (this.state.conversationProxy === thisConversation) {
                            this.setState({ messages: messagePaginator.items, loadingState: 'ready' });
                        }
                    })
                    .catch(err => {
                        console.error("Couldn't fetch messages IMPLEMENT RETRY", err);
                        this.setState({ loadingState: "failed" });
                    });
                })
        }
    };

    componentDidMount = () => {
        if (this.state.conversationProxy) {
            this.loadMessagesFor(this.state.conversationProxy);

            if (!this.state.boundConversations.has(this.state.conversationProxy)) {
                let newConversation = this.state.conversationProxy;
                newConversation.on('messageAdded', m => this.messageAdded(m, newConversation));
                this.setState({ boundConversations: new Set([...this.state.boundConversations, newConversation]) });
            }
        }
    }

    componentDidUpdate = (oldProps, oldState) => {
        if (this.state.conversationProxy !== oldState.conversationProxy) {
            this.loadMessagesFor(this.state.conversationProxy);

            if (!this.state.boundConversations.has(this.state.conversationProxy)) {
                let newConversation = this.state.conversationProxy;
                newConversation.on('messageAdded', m => this.messageAdded(m, newConversation));
                this.setState({ boundConversations: new Set([...this.state.boundConversations, newConversation]) });
            }
        }
    };

    static getDerivedStateFromProps(newProps, oldState) {
        let logic = (oldState.loadingState === 'initializing') || oldState.conversationProxy !== newProps.conversationProxy;
        if (logic) {
            return { loadingState: 'loading messages', conversationProxy: newProps.conversationProxy };
        } else {
            return null;
        }
    }

    messageAdded = (message, targetConversation) => {
        if (targetConversation === this.state.conversationProxy)
            this.setState((prevState, props) => ({
                messages: [...prevState.messages, message]
            }));
    };

    onMessageChanged = event => {
        this.setState({ newMessage: event.target.value });
    };

    sendMessage = event => {
        event.preventDefault();
        const message = this.state.newMessage;
        this.setState({ newMessage: '' });
        this.state.conversationProxy.sendMessage(message);
    };

    render () {
        const { myIdentity } = this.props;
        const { messages } = this.state;

        return (
            <div className={styles.conversationThread}>
                <ConversationMessages
                    identity={myIdentity}
                    messages={messages}
                />

                <form className={styles.form} onSubmit={this.sendMessage} >
                    <input 
                    type="text" 
                    name="message"
                    placeholder="Enter message..." 
                    className={styles.input}
                    onChange={this.onMessageChanged}
                    value={this.state.newMessage} />

                    <input type="submit" value="Submit" className={styles.submit} />
                </form>
            </div>
        )
    }
}