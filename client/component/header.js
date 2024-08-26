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
    <nav style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f8f9fa' }}>
      <p style={{ color: 'red', fontWeight: 'bold', cursor: 'pointer' }}>
        Ticketne
      </p>
      <div>
        <ul style={{ listStyleType: 'none', display: 'flex', gap: '15px' }}>
          {links}
        </ul>
      </div>
    </nav>
  );
};
