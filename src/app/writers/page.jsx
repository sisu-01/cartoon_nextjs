import SortList from "@/components/sortList/sortList";
import Paging from "@/components/Paging/paging";
import { dateFormat } from "@/lib/common";
import { getWriters } from "@/lib/data";
import Link from "next/link";
import styles from "./writers.module.css";
import Search from "@/components/search/search";
import Table from 'react-bootstrap/Table';

export const metadata = {
  title: 'Writers',
  description: '작가들이지롱',
}

const Writers = async ({ searchParams }) => {
  const params = await searchParams; // searchParams를 await로 처리
  const { page, sort, keyword } = params;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);
  const currentSort = sort;
  const currentKeyword = keyword ? keyword : false;

  const { writers, count, limit } = await getWriters(currentPage, currentSort, currentKeyword);

  let prev_url = "/writers?";
  let queryParams = [];
  if (currentSort !== undefined) queryParams.push(`sort=${currentSort}`);
  if (currentKeyword) queryParams.push(`keyword=${currentKeyword}`);
  if (currentPage > 1) queryParams.push(`page=${currentPage}`);
  if (queryParams.length > 0) {
    prev_url += queryParams.join('&');
  }
  prev_url = encodeURIComponent(prev_url);
  
  return (
    <div className={styles.container}>
      {/* <span>✅: 고닉입니다.</span> */}
      <span>라벨을 눌러 정렬할 수 있습니다.</span>
      <Table striped bordered hover size={"sm"}>
        <thead>
          <SortList sorting={currentSort} />
        </thead>
        <tbody>
          {writers.map((writer) => (
            <tr key={writer._id}>
              <td className={styles.nickname}>
                {writer.id === "a"? (
                  <Link href={`/writers/anon?nickname=${writer.nickname}&prev=${prev_url}`}>{writer.nickname}</Link>
                ) : (
                  <Link href={`/writers/${writer.id}?prev=${prev_url}`}>{writer.nickname}</Link>
                )}
              </td>
              <td>{dateFormat(writer.first_date, 'yy.mm.dd')}</td>
              <td>{writer.count}</td>
              <td>{writer.recommend}</td>
              <td>{writer.average}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={5} />
      <Search keyword={currentKeyword} label={"작가 이름 검색"} />
    </div>
  );
}

export default Writers;