import { toast } from "react-toastify";

function useToast(text, position, length) {
    toast.info(text
        , {
            position: position,
            hideProgressBar: true,
            pauseOnHover: true,
            autoClose: length
        })
}
export default useToast;
