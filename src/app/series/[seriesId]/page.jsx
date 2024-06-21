import Paging from "@/components/Paging/paging";
import { getSeriesInfo, getSeriesList } from "@/lib/data";
import styles from "./seriesCartoons.module.css";
import { dateFormat, isDateWithin14Days } from "@/lib/common";
import Link from "next/link";
import Up from "@/components/up/up";

export const generateMetadata = async ({params}) => {
  const { seriesId } = params;
  const { series, cartoon } = await getSeriesInfo(seriesId);
  return {
    title: {
      absolute: series.title,
    },
    description: "시리즈 페이지~",
    openGraph: {
      title: {
        absolute: series.title,
      },
      description: `작가 - ${series.writer_nickname}`,
      images: [cartoon.og_image],
    }
  };
}

const SeriesPage = async ({ params, searchParams }) => {
  const { seriesId } = params;
  const { page } = searchParams;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);
  const { series, cartoon } = await getSeriesInfo(seriesId);
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
        <div>
          <img src={cartoon.og_image} alt="" />
        </div>
        <h1>{series.title}</h1>
        <h2>
          <Link href={createWriterUrl()}>{series.writer_nickname}</Link>
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
                  <span className={styles.title}>
                    {cartoon.title}
                    {isDateWithin14Days(cartoon.date) && <Up />}
                  </span>
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