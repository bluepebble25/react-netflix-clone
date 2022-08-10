import { useEffect } from "react";

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      console.log(ref.current);
      // ref.current가 없거나
      // ref가 부착된 엘리먼트의 하위에 event.target(현재 클릭하고 있는 대상)이 포함된다면 return
      if(!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
  
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    }
  }, [ref, handler]);
};

export default useOnClickOutside;