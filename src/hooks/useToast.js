import { toast } from "react-toastify";

function useToast(text, position, length, type) {
    toast[type](text,
        {
            position: position,
            hideProgressBar: true,
            pauseOnHover: true,
            autoClose: length
        })
}
export default useToast;
