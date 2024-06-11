import Paging from "@/components/testPaging/paging";
import { getSeriesList } from "@/lib/data";
import styles from "./seriesCartoons.module.css";
import { dateFormat, isDateWithin14Days } from "@/lib/common";
import Link from "next/link";

const SeriesPage = async ({ params, searchParams }) => {
  const { seriesId } = params;

  const { page } = searchParams;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);

  const { cartoons, count, limit } = await getSeriesList(seriesId, currentPage);

  return (
    <div className={styles.container}>
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
          <div className={styles.writer}>
            {cartoon.writer_id === "a"? (
              <Link href={`/writers/anon?nickname=${cartoon.writer_nickname}`}>{cartoon.writer_nickname}</Link>
            ) : (
              <Link href={`/writers/${cartoon.writer_id}`}>{cartoon.writer_nickname}</Link>
            )}
            
          </div>
        </div>
      ))}
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={10} pathName={`/series/${seriesId}`} />
    </div>
  );
}

export default SeriesPage;