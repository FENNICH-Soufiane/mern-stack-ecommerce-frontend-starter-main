import Swal from "sweetalert2";

const Sweetalert = ({title, text, icon}) => {
   Swal.fire({
      title,
      text,
      icon
   });
};

export default Sweetalert;