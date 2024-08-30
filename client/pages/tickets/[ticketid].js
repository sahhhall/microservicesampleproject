import useRequest from "../../hooks/user-request";
import Router from "next/router";
const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: "http://192.168.49.2:30034/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });
  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price : {ticket.price}</h4>
      {errors}
      <button
        onClick={() => doRequest()}
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        Purchase
      </button>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketid } = context.query;
  const { data } = await client.get(
    `http://192.168.49.2:30033/api/tickets/${ticketid}`
  );

  return { ticket: data };
};

export default TicketShow;
