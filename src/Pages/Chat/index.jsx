import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Chat = () => {
    const location = useLocation();

    useEffect(() => {
        const hiddenPaths = [
            "/login",
            "/register",
            "/registeradmin2",
            "/loginadmin",
            "/changpassword",
            "/changdoctorpassword",
        ];

        const currentPath = location.pathname;

        const existingScript = document.getElementById("bGf_9cAK5pkOo2u2IyZxw");

        // لو داخل صفحة ممنوعة، احذف الشات لو موجود
        if (hiddenPaths.includes(currentPath)) {
            if (existingScript) existingScript.remove();
            return;
        }

        // لو مش موجود بالفعل، حمّل السكربت
        if (!existingScript) {
            const script = document.createElement("script");
            script.src = "https://www.chatbase.co/embed.min.js";
            script.id = "bGf_9cAK5pkOo2u2IyZxw";
            script.setAttribute("domain", "www.chatbase.co");
            document.body.appendChild(script);
        }
    }, [location.pathname]);

    return null;
};

export default Chat;