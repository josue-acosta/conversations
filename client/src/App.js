
import styles from './styles/styles.module.css'

import ConversationsList from './components/ConversationsList';
import ConversationThread from './components/ConversationThread';

export default function App() {
    return (
        <main className={styles.main}>
            <div className={styles.section}>
                <h1>Conversation List</h1>
                <ConversationsList />
            </div>

            <div className={styles.section}>
                <h1>Message List</h1>
                <ConversationThread />
            </div>
        </main>
    );
}