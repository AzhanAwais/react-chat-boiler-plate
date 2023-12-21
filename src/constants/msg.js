import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const successMsg = (msg) => toast.success(msg, {
    hideProgressBar: true,
    autoClose: 1500,
    position: "bottom-right"
});

export const errorMsg = (msg) => toast.error(msg, {
    hideProgressBar: true,
    autoClose: 1500,
    position: "bottom-right"
});