import Paging from "@/components/paging/paging";
import { getCartoons } from "@/lib/data";

export const metadata = {
  title: 'Cartoons',
  description: '만화들이지롱',
}

// API로 가져오기
// const getCartoons = async () => {
//   const res = await fetch("http://localhost:4000/api/cartoon");

//   if (!res.ok) {
//     throw new Error("err");
//   }
//   return res.json();
// }

const Cartoons = async () => {
  // API로 가져오기
  // const cartoons = await getCartoons();
  const cartoons = await getCartoons();
  console.log('tq');
  console.log(cartoons);

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