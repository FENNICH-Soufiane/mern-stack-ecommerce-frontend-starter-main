import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { resetErrAction } from "../../redux/slices/users/globalActions/globalActions";


const ErrorMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    confirmButtonColor: "#ED5951"
  });
  dispatch(resetErrAction());
};

export default ErrorMsg;
