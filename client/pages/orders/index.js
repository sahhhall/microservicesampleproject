import React from 'react';

const OrderIndex = ({ orders }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
              Ticket Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr 
              key={order.id} 
              className={
                order.status === 'compelete' 
                  ? 'bg-green-600 border-b' 
                  : 'bg-gray-100 border-b'
              }
            >
              <td className="px-6 py-4 whitespace-no-wrap border-r text-sm leading-5 text-gray-800">
                {order.ticket.title}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800">
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('http://192.168.49.2:30034/api/orders');

  return { orders: data };
};

export default OrderIndex;
