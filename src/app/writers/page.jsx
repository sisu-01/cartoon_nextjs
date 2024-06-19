import SortList from "@/components/sortList/sortList";
import Paging from "@/components/testPaging/paging";
import { dateFormat } from "@/lib/common";
import { getWriters } from "@/lib/data";
import Link from "next/link";
import styles from "./writers.module.css";
import Search from "@/components/search/search";

export const metadata = {
  title: 'Writers',
  description: '작가들이지롱',
}

const Writers = async ({ searchParams }) => {
  const { page, sort, keyword } = searchParams;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);
  const currentSort = sort;
  const currentKeyword = keyword ? keyword : false;

  const { writers, count, limit } = await getWriters(currentPage, currentSort, currentKeyword);
  
  return (
    <div className={styles.container}>
      <span>✅: 고닉입니다.</span>
      <table className={styles.table}>
        <thead>
          <SortList sorting={currentSort} />
        </thead>
        <tbody>
          {writers.map((writer) => (
            <tr key={writer._id}>
              <td>
                {writer.id === "a"? (
                  <Link href={`/writers/anon?nickname=${writer.nickname}`}>{writer.nickname}</Link>
                ) : (
                  <span>
                    <Link href={`/writers/${writer.id}`}>{writer.nickname}✅</Link>
                  </span>
                )}
              </td>
              <td>{dateFormat(writer.first_date)}</td>
              <td>{writer.count}</td>
              <td>{writer.recommend}</td>
              <td>{writer.average}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={5} />
      <Search keyword={currentKeyword}/>
    </div>
  );
}

export default Writers;