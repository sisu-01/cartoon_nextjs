import Search from "@/components/search/search";
import Paging from "@/components/Paging/paging";
import { isDateWithin14Days } from "@/lib/common";
import { getSeries } from "@/lib/data";
import Link from "next/link";
import styles from "./series.module.css";
import Filter from "@/components/filter/filter";
import Up from "@/components/up/up";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

  const temp = "https://dcimg2.dcinside.co.kr/viewimage.php?id=2ebcc232eadd36&no=24b0d769e1d32ca73fe980fa11d028315d554368bac55d95d5bf54b6a4812c0858cd3f65d2f076af45bfb883f3c073d9cdcb4ba78890d3a6c1f8d393478b9ec7f5";

  return (
    <div className={styles.container}>
      <Filter currentSort={currentSort} currentCut={currentCut}/>
      <hr />
      <Container>
        <Row>
          {series.map((ser) => (
            <Col
              key={ser.id}
              xs={6}
              sm={4}
              md={2}
              className="mt-4"
            >
              <Link href={`/series/${ser.id}?prev=${prev_url}`} className={styles.link}>
                <div className={styles.thunbnail}>
                  <div className={styles.imageBox}>
                    <img className={styles.thumbnailImg} src={temp} alt="" />
                  </div>
                </div>
              </Link>
              <div className="mt-2">
                <Link href={`/series/${ser.id}?prev=${prev_url}`} className={styles.link}>
                    <span className={styles.title}>
                      {isDateWithin14Days(ser.last_update) && <Up />}
                      {ser.title}
                    </span>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={5} />
      <Search keyword={currentKeyword} label={"시리즈 제목 검색"} />
    </div>
  );
}

export default Series;