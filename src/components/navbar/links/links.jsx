import NavLink from "./navLink/navLink";

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
  return (
    <>
      {links.map(link => (
        <NavLink item={link} key={link.title} />
      ))}
    </>
  );
}

export default Links;