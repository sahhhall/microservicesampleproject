import Link from "next/link";

const LandingPage = ({ currentUser, tickets }) => {
  console.log(tickets, "tickets");

  const ticketList = tickets?.map((ticket) => (
    <tr key={ticket.id} className="border-b border-gray-200">
      <td className="px-4 py-2">{ticket.title}</td>
      <td className="px-4 py-2">${ticket.price}</td>
      <td className="px-4 py-2">
        <Link href="/tickets/[ticketid]" as={`/tickets/${ticket.id}`}>
          <button className="bg-black text-white px-4 py-2 rounded-md">
            View
          </button>
        </Link>
      </td>
    </tr>
  ));
  return currentUser ? (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Tickets</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2 font-medium text-gray-700">
              Title
            </th>
            <th className="text-left px-4 py-2 font-medium text-gray-700">
              Price
            </th>
            <th className="text-left px-4 py-2 font-medium text-gray-700">
              Link
            </th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  ) : (
    <div className="text-center p-6">Please log in to view the tickets.</div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  // console.log("client",client,"client")
  const { data } = await client.get("http://192.168.49.2:30033/api/tickets");
  return { tickets: data };
  // console.log("context", context);
  // const client = buildClient(context);
  // try {
  //   const { data } = await client.get("/api/users/currentuser");
  //   return data;
  // } catch (err) {
  //   return {};
  // }
};

export default LandingPage;
