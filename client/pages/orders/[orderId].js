import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import useRequest from "../../hooks/user-request";
const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: 'http://192.168.49.2:30035/api/payments',
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders')
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }

  return (
    <div>
      <h1>Time left to pay: {timeLeft} seconds</h1>
      {timeLeft > 0 && (
        <StripeCheckout
          token={({ id }) => doRequest({ token: id })}
          stripeKey="pk_test_51PtMVm08YiCAVigwVXMRYGyzNWGBpFNYrQibRggTEmaS6n7zcMJjI9Si80XmBwfgCObPNO0rmFUth0bi8nwFV0nS00dsL4pw9N"
          amount={order.ticket.price}
          email={currentUser.email}
        />
      )}
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(
    `http://192.168.49.2:30034/api/orders/${orderId}`
  );

  return { order: data };
};

export default OrderShow;
