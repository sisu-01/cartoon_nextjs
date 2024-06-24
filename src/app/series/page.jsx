import Search from "@/components/search/search";
import Paging from "@/components/Paging/paging";
import { isDateWithin14Days } from "@/lib/common";
import { getSeries } from "@/lib/data";
import Link from "next/link";
import styles from "./series.module.css";
import Filter from "@/components/filter/filter";
import Up from "@/components/up/up";

export const metadata = {
  title: "Series",
  description: "시리즈지롱",
}

const Series = async ({ searchParams }) => {
  const { page, sort, cut, keyword } = searchParams;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);
  const currentSort = sort === "rating" ? true : false;
  const currentCut = (Number(cut) > 0 ? Number(cut) : 0);
  const currentKeyword = keyword ? keyword : false;
  
  const { series, count, limit } = await getSeries(currentPage, currentSort, currentCut, currentKeyword);

  let prev_url = "/series?";
  let queryParams = [];
  if (currentSort !== undefined) queryParams.push(`sort=${currentSort}`);
  if (currentCut) queryParams.push(`sort=rating`);
  if (currentKeyword) queryParams.push(`keyword=${currentKeyword}`);
  if (currentPage > 1) queryParams.push(`page=${currentPage}`);
  if (queryParams.length > 0) {
    prev_url += queryParams.join('&');
  }
  prev_url = encodeURIComponent(prev_url);

  return (
    <div className={styles.container}>
      <Filter currentSort={currentSort} currentCut={currentCut}/>
      <hr />
      {series.map((ser) => (
        <div key={ser.id}>
          <Link href={`/series/${ser.id}?prev=${prev_url}`}>
            {isDateWithin14Days(ser.last_update) && <Up />}
            {ser.title}
          </Link>
        </div>
      ))}
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={5} />
      <Search keyword={currentKeyword} label={"시리즈 제목 검색"} />
    </div>
  );
}

export default Series;