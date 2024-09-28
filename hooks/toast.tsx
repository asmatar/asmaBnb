import { toast } from "react-toastify";

const useToast = () => {
  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (type === "error") {
      toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return { showToast };
};

export default useToast;
