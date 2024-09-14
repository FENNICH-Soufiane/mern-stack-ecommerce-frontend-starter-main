import Swal from "sweetalert2";

const SuccessMsg = ({ message }) => {
  Swal.fire({
    icon: "success",
    title: "Good job!",
    text: message,
    confirmButtonColor: "#4F46E5"
  });
};

export default SuccessMsg;
