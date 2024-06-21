import Link from "next/link";
import styles from "./links.module.css";
import { usePathname } from "next/navigation";
import Nav from 'react-bootstrap/Nav';

const links = [
  {
    title: "Cartoons",
    path: "/cartoons",
  },
  {
    title: "Writers",
    path: "/writers",
  },
  {
    title: "Series",
    path: "/series",
  },
]

const Links = () => {
  const pathName = usePathname();
  return (
    <>
      {links.map(link => (
        <Nav.Link key={link.title} href={link.path} className={` ${pathName === link.path && styles.active} `}>
          {link.title}
        </Nav.Link>
        // <Link href={link.path} className={` ${pathName === link.path && styles.active} `}>
        //   {link.title}
        // </Link>
      ))}
    </>
  );
}

export default Links;