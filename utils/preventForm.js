import { useEffect } from "react";

const preventForm = (formRef) => {
  // LocalStorage  ya window wali cheejeo ko usefeffect ke andar rakhthe hai beacuse they won't run on server
  const handler = (e) => {
    e.preventDefault();
    const values = Object.values(formRef.current?.values).join("");

    if (values) {
      //    This line will prevent the page from reloading by checking if there is any unsaved data
      e.returnValue = "";
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, []);
};

export default preventForm;
