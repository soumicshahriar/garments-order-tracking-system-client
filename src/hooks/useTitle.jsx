import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | garments order tracker system`;
  }, [title]);
};

export default useTitle;
