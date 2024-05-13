import Link from "next/link";
import Links from "./links/links";

const Navbar = () => {
  return (
    <div>
      <Link href="/">Home</Link>
      <Links />
    </div>
  );
}

export default Navbar;