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
  const temp = cartoons[0];
  console.log(temp);
  console.log(temp['date']);

  return (
    <div>
      {cartoons.map((cartoon) => (
        <div key={cartoon.id}>
          <a href={`https://gall.dcinside.com/board/view/?id=cartoon&no=${cartoon.id}`} target="_blank">{cartoon.title}</a>
          {cartoon.recommend}{cartoon.writer_id}{cartoon.writer_nickname}
        </div>
      ))}
      <Paging page={cartoons.page} perPage={cartoons.perPage} count={cartoons.count} pageBtn={10} handler={null} />
    </div>
  );
}

export default Cartoons;