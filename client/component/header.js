import Link from "next/link";

export default ({ currentUser }) => {
  const links = [
    !currentUser && {
      label: "Signup",
      href: "http://192.168.49.2:30032/auth/signup",
    },
    !currentUser && {
      label: "Signin",
      href: "http://192.168.49.2:30032/auth/signin",
    },
    currentUser && {
      label: "Signout",
      href: "http://192.168.49.2:30032/auth/signout",
    },
    currentUser && {
      label: "Sell tickets",
      href: "http://192.168.49.2:30032/tickets/new",
    },
    currentUser && {
      label: "My Orders",
      href: "http://192.168.49.2:30032/orders",
    },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link href={href}>
            <p>{label}</p>
          </Link>
        </li>
      );
    });

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "#000000",
      }}
    >
      <p
        style={{
          color: "white",
          letterSpacing: "2.6px",
          fontWeight: "bolder",
          fontSize: "25px",
          cursor: "pointer",
        }}
      >
        Ticketnew
      </p>
      <div>
        <ul
          style={{
            color: "white",
            listStyleType: "none",
            display: "flex",
            gap: "15px",
          }}
        >
          {links}
        </ul>
      </div>
    </nav>
  );
};
