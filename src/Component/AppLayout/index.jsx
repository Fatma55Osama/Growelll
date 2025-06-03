// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// function AppLayout({ children }) {
//   const location = useLocation();

//   useEffect(() => {
//     const excludedRoutes = ['/login', '/register', '/change-password', '/error'];

//     if (excludedRoutes.includes(location.pathname)) {
//       const iframe = document.querySelector("iframe[src*='webchat']");
//       if (iframe) iframe.remove();
//       window.botpressWebChat.isInitialized = false;
//     } else {
//       if (!window.botpressWebChat?.isInitialized) {
//         window.botpressWebChat.init({
//           botId: 'اكتبي-الـbotId-بتاعك',
//           clientId: 'نفس-الـbotId',
//           hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
//           messagingUrl: 'https://messaging.botpress.cloud',
//           botName: 'مساعدك 🤖',
//           showPoweredBy: false,
//           theme: 'light',
//         });
//       }
//     }
//   }, [location.pathname]);

//   return <>{children}</>;
// }

// export default AppLayout;
