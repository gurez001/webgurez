import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { OrderMe } from '../../order/OrderMe';
import { Shipping } from '../../shipping/Shipping';
import ShippingDetails from '../../order/assets/ShippingDetails';
import { getOrderDetails, order_shipping_info } from '../../../actions/OrderAction';
import { get_payment_info } from '../../../actions/Paymentaction';
import { LogoutUser } from '../../../actions/UserAction';
import { Account } from '../Account';

const UserDashboard = () => {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };


  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { loading, orders, shiping_info, order_details, error } = useSelector(
    (state) => state.orderDetails
  );
  const { payment_info } = useSelector((state) => state.payment);

  const Logout=()=>{
    dispatch(LogoutUser())
    alert.success("user logout")
    navigate("/")
  }
const Ordershandle=()=>{
  navigate("/orders")
}


  React.useMemo(() => {
    dispatch(getOrderDetails(315));
  }, []);

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      // dispatch(clearErrors());
    }

    dispatch(order_shipping_info(orders && orders.order_info_uuid));

    dispatch(get_payment_info(orders && orders.order_info_uuid));
  }, [dispatch, error, alert, id, orders]);


  return (
   <>
    <div className='dashboard-container'>
      <div className='user-dash-row'>
      <div className="tab-buttons">
        <p
          className={activeTab === 0 ? 'active' : ''}
          onClick={() => handleTabClick(0)}
        >
         Dashboard
        </p>
        <p
          className={activeTab === 1 ? 'active' : ''}
          onClick={() => handleTabClick(1)}
        >
          Orders
        </p>
        <p
          className={activeTab === 2 ? 'active' : ''}
          onClick={() => handleTabClick(2)}
        >
          DownLoads
        </p>
        <p
          className={activeTab === 3 ? 'active' : ''}
          onClick={() => handleTabClick(3)}
        >
          Addresses
        </p>
        <p
          className={activeTab === 4 ? 'active' : ''}
          onClick={() => handleTabClick(4)}
        >
          Account Details
        </p>
        <p
          
          onClick={Logout}
        >
         Logout
        </p>
      </div>
      <div className="tab-content">
        {activeTab === 0 && (
          <div>
                 <p>Hello pawan sharma (not pawan sharma? <span onClick={Logout} style={{color:"#73c631",cursor:"pointer"}}>Log out</span> )</p>
<p>
From your account dashboard you can view your recent <span onClick={Ordershandle} style={{color:"#73c631",cursor:"pointer"}}>orders</span>, manage your shipping and billing addresses, and edit your password and account details.</p>
          </div>
        )}
        {activeTab === 1 && (
          <div>
          <OrderMe/>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <p>No downloads available yet.</p>
          </div>
        )}
         {activeTab === 3 && (
          <div>
             <p style={{paddingBottom:"20px"}}>The following addresses will be used on the checkout page by default.</p>
      <ShippingDetails shiping_info={shiping_info} payment_info={payment_info} />
          </div>
        )}
         {activeTab === 4 && (
          <div>
            <Account/>
          </div>
        )}
      </div>
      </div>
    </div>
   </>
  )
}

export default UserDashboard