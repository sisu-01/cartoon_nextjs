import Search from "@/components/search/search";
import Paging from "@/components/Paging/paging";
import { isDateWithin14Days } from "@/lib/common";
import { getSeries } from "@/lib/data";
import Link from "next/link";
import styles from "./series.module.css";
import Filter from "@/components/filter/filter";

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
  return (
    <div className={styles.container}>
      <Filter currentSort={currentSort} currentCut={currentCut}/>
      <hr />
      {series.map((ser) => (
        <div key={ser.id}>
          <Link href={`/series/${ser.id}`}>
            {isDateWithin14Days(ser.last_update) && (
              <span><b>UP</b></span>
            )}
            {ser.title}
          </Link>
        </div>
      ))}
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={5} />
      <Search keyword={currentKeyword} />
    </div>
  );
}

export default Series;