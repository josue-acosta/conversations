import React, { Component } from 'react';
import { Client as ConversationsClient } from "@twilio/conversations";

import styles from './styles/styles.module.css'

import ConversationsList from './components/ConversationsList';
import ConversationThread from './components/ConversationThread';

const { getToken } = require('./utils/get-token');

export default class App extends Component {
    state = {
        name: "testPineapple",
        token: null,
        statusString: null,
        conversationsReady: false,
        conversations: [],
        selectedConversationSid: null,
        newMessage: ""
    };

    componentDidMount = () => {
        this.mountToken();
        this.setState({ statusString: "Fetching credentials..." });
    };

    mountToken = () => {
        const myToken = getToken()
        this.setState({ token: myToken }, this.initConversations);
    };

    initConversations = async () => {
        const client = new ConversationsClient(this.state.token);

        client.on("stateChanged", (state) => {
            // The client failed to initialize
            if (state === "failed") {
                return;
            }

            // Use the client
            if (state === "initialized") {
                this.setState({ statusString: "Client initialized" });
            }
        });

        client.getSubscribedConversations()
            .then(item => this.setState({
                conversations: item.items
            }))

        // client.on("connectionStateChanged", (state) => {
        //     if (state === "connecting")
        //         this.setState({
        //             statusString: "Connecting to Twilio…",
        //             status: "default"
        //         });
        //     if (state === "connected") {
        //         this.setState({
        //             statusString: "You are connected.",
        //             status: "success"
        //         });
        //     }
        //     if (state === "disconnecting")
        //         this.setState({
        //             statusString: "Disconnecting from Twilio…",
        //             conversationsReady: false,
        //             status: "default"
        //         });
        //     if (state === "disconnected")
        //         this.setState({
        //             statusString: "Disconnected.",
        //             conversationsReady: false,
        //             status: "warning"
        //         });
        //     if (state === "denied")
        //         this.setState({
        //             statusString: "Failed to connect.",
        //             conversationsReady: false,
        //             status: "error"
        //         });
        // });

        client.on("conversationJoined", (conversation) => {
            this.setState({ conversations: [...this.state.conversations, conversation] });
        });

        // client.on("conversationLeft", (thisConversation) => {
        //     this.setState({
        //         conversations: [...this.state.conversations.filter((it) => it !== thisConversation)]
        //     });
        // });

        client.on("tokenAboutToExpire", () => {
            const updatedToken = getToken()
            client.updateToken(updatedToken)
        });
    }

    render() {
        const { conversations, selectedConversationSid, status, statusString } = this.state;

        const selectedConversation = conversations.find((item) => {
            return item.sid === selectedConversationSid
        });

        let conversationContent
        if (selectedConversation) {
            conversationContent = (
                <ConversationThread
                    conversationProxy={selectedConversation}
                    myIdentity={this.state.name}
                />)
        } else if (status !== "success") {
            conversationContent = (
                <p>Please select a conversation</p>
            )
        } else {
            conversationContent = conversationContent = (
                <p>conversationContent = conversationContent</p>);
        }

        return (
            <main className={styles.main}>
                <div className={styles.section}>
                    <h1>Conversation List</h1>
                    <p>{statusString}</p>
                    <ConversationsList
                        conversations={conversations}
                        selectedConversationSid={selectedConversationSid}
                        onConversationClick={(item) => {
                            this.setState({ selectedConversationSid: item });
                        }}
                    />
                </div>

                <div className={styles.section}>
                    <h1>Message List</h1>
                    {conversationContent}
                </div>
            </main>
        );
    }
}