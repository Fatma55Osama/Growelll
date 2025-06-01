import React, { useEffect } from 'react'
import styles from './index.module.css'
export default function Chat() {
    useEffect(() => {
        window.botpressWebChat.init({
            botId: "اكتبي-هنا-الـ-botId-بتاعك",
            clientId: "نفس-الـbotId",
            hostUrl: "https://cdn.botpress.cloud/webchat/v1",
            messagingUrl: "https://messaging.botpress.cloud",
            botName: "AI🤖",
            showPoweredBy: false,
            theme: "light",
        });
    }, []);
    return (
        <div className={styles.chatWrapper}>
            {/* ممكن تحطي تعليمات هنا أو زر مخصص لفتح البوت لو حبيتي */}
        </div>
    )
}
