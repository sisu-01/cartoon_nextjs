import Paging from "@/components/Paging/paging";
import { dateFormat, highlightSearchText, isDateWithin14Days } from "@/lib/common";
import { getCartoons } from "@/lib/data";
import styles from "./cartoons.module.css";
import Link from "next/link";
import Sort from "@/components/sort/sort";
import Cut from "@/components/cut/cut";
import RandomCartoon from "@/components/random/random";
import Search from "@/components/search/search";
import Filter from "@/components/filter/filter";
import Up from "@/components/up/up";

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
  const { page, sort, cut, keyword } = searchParams;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);
  const currentSort = sort === "rating" ? true : false;
  const currentCut = (Number(cut) > 0 ? Number(cut) : 0);
  const currentKeyword = keyword ? keyword : false;
  // API로 가져오기
  // const cartoons = await getCartoons();
  const { cartoons, count, limit } = await getCartoons(currentPage, currentSort, currentCut, currentKeyword);

  const render = () => {
    return cartoons.map((cartoon) => (
      <li className={styles.wrappers} key={cartoon.id}>
        <a href={`https://gall.dcinside.com/board/view/?id=cartoon&no=${cartoon.id}`} target="_blank">
          <div className={styles.thunbnail}>
            <div className={styles.imageBox}>
              <img className={styles.thumbnailImg} src={cartoon.og_image} />
            </div>
          </div>
          <div className={styles.cartoon}>
            <p className={styles.titleArea} style={{paddingRight: `${cartoon.writer_nickname.length+0.5}em`}}>
              {isDateWithin14Days(cartoon.date) && <Up />}
              <span className={styles.title}
                dangerouslySetInnerHTML={{ __html: highlightSearchText(cartoon.title, currentKeyword) }}
              >
                {/* {cartoon.title} */}
              </span>
            </p>
            <div className={styles.info}>
              <span>★{cartoon.recommend}</span>
              <span>{dateFormat(cartoon.date)}</span>
            </div>
          </div>
        </a>
        <div className={styles.writer}>
          {cartoon.writer_id === "a"? (
            <Link href={`/writers/anon?nickname=${cartoon.writer_nickname}`}>{cartoon.writer_nickname}</Link>
          ) : (
            <Link href={`/writers/${cartoon.writer_id}`}>{cartoon.writer_nickname}</Link>
          )}
          
        </div>
      </li>
    ));
  }

  return (
    <div className={styles.container}>
      <div className="d-flex align-items-center justify-content-between">
        <RandomCartoon />
        <Filter currentSort={currentSort} currentCut={currentCut}/>
      </div>
      <hr/>
      <ul>
        {render()}
      </ul>
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={5} />
      <Search keyword={currentKeyword} />
    </div>
  );
}

export default Cartoons;