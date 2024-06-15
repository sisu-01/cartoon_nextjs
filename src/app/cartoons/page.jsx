import Paging from "@/components/testPaging/paging";
import { dateFormat, isDateWithin14Days } from "@/lib/common";
import { getCartoons } from "@/lib/data";
import styles from "./cartoons.module.css";
import Link from "next/link";
import Sort from "@/components/sort/sort";

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

const Cartoons = async ({ searchParams }) => {
  const { page, sort, cut } = searchParams;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);
  const currentSort = sort === "rating" ? true : false;
  const currentCut = (Number(cut) > 0 ? Number(cut) : 1);
  
  // API로 가져오기
  // const cartoons = await getCartoons();
  const { cartoons, count, limit } = await getCartoons(currentPage, currentSort, currentCut);

  return (
    <div className={styles.container}>
      <div>
        <Sort checked={currentSort} />
      </div>
      <hr/>
      {cartoons.map((cartoon) => (
        <div className={styles.wrappers} key={cartoon.id}>
          <div className={styles.cartoon}>
            <a href={`https://gall.dcinside.com/board/view/?id=cartoon&no=${cartoon.id}`} target="_blank">
              <div>
                {isDateWithin14Days(cartoon.date) && (
                  <span><b>UP</b></span>
                )}
                <span className={styles.title}>{cartoon.title}</span>
                <div className={styles.info}>
                  <span>{cartoon.recommend}</span>
                  <span>{dateFormat(cartoon.date)}</span>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.writer}>
            {cartoon.writer_id === "a"? (
              <Link href={`/writers/anon?nickname=${cartoon.writer_nickname}`}>{cartoon.writer_nickname}</Link>
            ) : (
              <Link href={`/writers/${cartoon.writer_id}`}>{cartoon.writer_nickname}</Link>
            )}
            
          </div>
        </div>
      ))}
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={10} />
    </div>
  );
}

export default Cartoons;