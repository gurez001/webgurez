import React from "react";
import { FaCartArrowDown } from "react-icons/fa6";
import TimeAndDate from "../../layout/time/TimeAndDate";
import { NavLink } from "react-router-dom";
import Currency from "../../layout/currency/Currency";
export const OrderCard = ({ orders }) => {
  console.log(orders);
  return (
    <>
      <div className="order-card-containor">
        <div className="order-card-row">
          {orders &&
            orders.map((item, i) => (
              <div key={i} className="order-card">
                <NavLink to={`/order/${item._id}`}>
                  <div
                    className="order-card-inner-row"
                  >
                    <div className="order-id">
                      <p>
                       
                        <span>Id :- #{item._id}</span>
                      </p>
                    </div>
                    <div className="order-card-status">
                      <p>
                        <span>Status</span>
                        <span>{item.order_info_status}</span>
                      </p>
                      <p>
                        <span>Price</span>
                        <span>
                          <Currency price={item.order_info_total_price} />{" "}
                        </span>
                      </p>
                      <p>
                        <span>Time</span>
                        
                          <TimeAndDate time={item.order_info_created_date} />
                     
                      </p>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};