import Paging from "@/components/testPaging/paging";
import { dateFormat, isDateWithin14Days } from "@/lib/common";
import { getCartoons } from "@/lib/data";
import styles from "./cartoons.module.css";
import Link from "next/link";
import Sort from "@/components/sort/sort";
import Cut from "@/components/cut/cut";
import RandomCartoon from "@/components/random/random";
import Search from "@/components/search/search";

export const metadata = {
  title: 'Cartoons',
  description: '만화들이지롱',
}

const Cartoons = async ({ searchParams }) => {
  const { page, sort, cut, keyword } = searchParams;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);
  const currentSort = sort === "rating" ? true : false;
  const currentCut = (Number(cut) > 0 ? Number(cut) : 0);
  const currentKeyword = keyword ? keyword : false;

  const { cartoons, count, limit } = await getCartoons(currentPage, currentSort, currentCut, currentKeyword);

  return (
    <div className={styles.container}>
      <RandomCartoon />
      <div className={styles.controls}>
        <Sort checked={currentSort} />
        <Cut checked={currentCut} />
      </div>
      <hr/>
      <ul className={styles.cartoonList}>
        {cartoons.map((cartoon) => (
          <li className={styles.wrapper} key={cartoon.id}>
            <a href={`https://gall.dcinside.com/board/view/?id=cartoon&no=${cartoon.id}`} target="_blank">
              <div className={styles.thumbnail}>
                <img className={styles.thumbnailImg} src={cartoon.og_image} alt={cartoon.title} />
              </div>
              <div className={styles.cartoon}>
                <div>
                  <span className={styles.title}>{cartoon.title}</span>
                  {isDateWithin14Days(cartoon.date) && (
                    <span className={styles.newTag}>UP</span>
                  )}
                  <div className={styles.info}>
                    <span className={styles.recommend}>{cartoon.recommend}</span>
                    <span className={styles.date}>{dateFormat(cartoon.date)}</span>
                  </div>
                </div>
              </div>
            </a>
            <div className={styles.writer}>
              {cartoon.writer_id === "a" ? (
                <Link href={`/writers/anon?nickname=${cartoon.writer_nickname}`}>{cartoon.writer_nickname}</Link>
              ) : (
                <Link href={`/writers/${cartoon.writer_id}`}>{cartoon.writer_nickname}</Link>
              )}
            </div>
          </li>
        ))}
      </ul>
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={5} />
      <Search keyword={currentKeyword} />
    </div>
  );
}

export default Cartoons;
