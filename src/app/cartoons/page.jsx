import Paging from "@/components/Paging/paging";
import { getCartoons } from "@/lib/data";
import styles from "./cartoons.module.css";
import RandomCartoon from "@/components/random/random";
import Search from "@/components/search/search";
import Filter from "@/components/filter/filter";
import CartoonList from "@/components/cartoonsList/cartoonsList";

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
  const params = await searchParams; // searchParams를 await로 처리
  const { page, sort, cut, keyword } = params;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);
  const currentSort = sort === "rating" ? true : false;
  const currentCut = (Number(cut) > 0 ? Number(cut) : 0);
  const currentKeyword = keyword ? keyword : false;
  // API로 가져오기
  // const cartoons = await getCartoons();
  const { cartoons, count, limit } = await getCartoons(currentPage, currentSort, currentCut, currentKeyword);

  return (
    <div className={styles.container}>
      <div className="d-flex align-items-center justify-content-between ps-2">
        <RandomCartoon />
        <Filter currentSort={currentSort} currentCut={currentCut}/>
      </div>
      <hr/>
      <ul>
        <CartoonList cartoons={cartoons} showWriter={true} currentKeyword={currentKeyword} />
      </ul>
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={5} />
      <Search keyword={currentKeyword} label={"만화 제목 검색"} />
    </div>
  );
}

export default Cartoons;