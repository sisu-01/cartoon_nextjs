import Paging from "@/components/paging/paging";

export const metadata = {
  title: 'Cartoons',
  description: '만화들이지롱',
}

const getCartoons = async () => {
  const res = await fetch("http://localhost:4000/api/cartoon");

  if (!res.ok) {
    throw new Error("err");
  }
  return res.json();
}

const test = (ss) => {
  console.log(ss);
}

const Cartoons = async () => {
  const cartoons = await getCartoons();

  return (
    <div>
      {cartoons.list.map((cartoon) => (
        <div>
          {cartoon.title}
        </div>
      ))}
      <Paging page={cartoons.page} perPage={cartoons.perPage} count={cartoons.count} pageBtn={10} handler={null} />
    </div>
  );
}

export default Cartoons;