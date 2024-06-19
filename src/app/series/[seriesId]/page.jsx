import Paging from "@/components/testPaging/paging";
import { getSeriesInfo, getSeriesList } from "@/lib/data";
import styles from "./seriesCartoons.module.css";
import { dateFormat, isDateWithin14Days } from "@/lib/common";
import Link from "next/link";

export const generateMetadata = async ({params}) => {
  const { seriesId } = params;
  const series = await getSeriesInfo(seriesId);
  return {
    title: series.title,
    description: "슉 슈슉 시",
  };
}

const SeriesPage = async ({ params, searchParams }) => {
  const { seriesId } = params;
  const { page } = searchParams;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);
  const series = await getSeriesInfo(seriesId);
  const { cartoons, count, limit } = await getSeriesList(seriesId, currentPage);

  const createWriterUrl = () => {
    let url;
    if (series.writer_id === "a") {
      url = `/writers/anon?nickname=${series.writer_nickname}`;
    } else {
      url = `/writers/${series.writer_id}`;
    }
    return url;
  }

  return (
    <div className={styles.container}>
      <div>
        <h1>{series.title}</h1>
        <h2>
          <Link href={createWriterUrl()}>{series.writer_nickname}{series.writer_id !== "a" && "💛"}</Link>
        </h2>
        <span>작가 이름을 눌러 상세 페이지도 확인해보세요</span>
      </div>
      <hr/>
      <div>
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
          </div>
        ))}
        <Paging page={currentPage} perPage={limit} count={count} pageBtn={5} />
      </div>
    </div>
  );
}

export default SeriesPage;