import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersAction, updateOrderAction } from "../../../redux/slices/orders/ordersSlices";
import { useNavigate, useParams } from "react-router-dom";


const UpdateOrders = () => {
  // get id from params
  const { id } = useParams(); 
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  
  const [order, setOrder] = React.useState("" );

  // Fetch the order details on mount
  useEffect(() => {
    dispatch(fetchOrdersAction(id)); // Fetch order details based on the ID
  }, [dispatch, id]);

  // Update state on selection change
  const onChange = (e) => {
    setOrder(e.target.value );
    dispatch(updateOrderAction({ status: e.target.value, id }));
    navigate('/admin');
  };

  return (
    <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
      <div className="flex flex-1 justify-center">
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700">
            Update Order
          </label>
          <select
            id="status"
            name="status"
            onChange={onChange}
            value={order.status} // L'état local reflète la sélection actuelle
            className="mt-1 block w-full rounded-md border-2 border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option disabled selected value="">
              Choose option
            </option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrders;
