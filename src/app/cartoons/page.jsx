import Paging from "@/components/testPaging/paging";
import { dateFormat } from "@/lib/common";
import { getCartoons } from "@/lib/data";
import styles from "./cartoons.module.css";
import Link from "next/link";

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

const Cartoons = async ({searchParams}) => {
  const {page} = searchParams;
  const currentPage = Number(page) || 1;
  // API로 가져오기
  // const cartoons = await getCartoons();
  const {cartoons, count, limit} = await getCartoons(currentPage);
  /*
  _id: new ObjectId('665c7bc593ec7947de663e4c'),
  id: 688414,
  title: '한국인들의 이중성 만화',
  date: 2024-05-19T12:30:12.000Z,
  recommend: 91,
  writer_object_id: new ObjectId('665c7b1203272be39860dc5c'),
  writer_id: 'a',
  writer_nickname: '카갤러'
  */
  return (
    <div className={styles.container}>
      {cartoons.map((cartoon) => (
        <div className={styles.wrappers} key={cartoon.id}>
          <div className={styles.cartoon}>
            <a href={`https://gall.dcinside.com/board/view/?id=cartoon&no=${cartoon.id}`} target="_blank">
              <div>
                <span className={styles.title}>{cartoon.title}</span>
                <div className={styles.info}>
                  <span>{cartoon.recommend}</span>
                  <span>{dateFormat(cartoon.date)}</span>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.writer}>
            <Link href={`/writers/${cartoon.writer_id}`}>{cartoon.writer_nickname}</Link>
          </div>
        </div>
      ))}
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={10} pathName={`/cartoons`} />
    </div>
  );
}

export default Cartoons;