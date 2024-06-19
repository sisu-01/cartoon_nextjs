import Link from "next/link";
import Links from "./links/links";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link href="/">Home</Link>
        <Links />
      </div>
    </header>
  );
}

export default Navbar;