import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0; // يعمل على جميع المتصفحات الحديثة
    document.body.scrollTop = 0;           // احتياطي للمتصفحات القديمة
  }, [pathname]);

  return null;
};

export default ScrollToTop;