import Paging from "@/components/Paging/paging";
import { getSeriesInfo, getSeriesList } from "@/lib/data";
import styles from "./seriesCartoons.module.css";
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import CartoonList from "@/components/cartoonsList/cartoonsList";
import Share from "@/components/share/share";
import { calculateDaysAgo } from "@/lib/common";

export const generateMetadata = async ({params}) => {
  const { seriesId } = params;
  const { series } = await getSeriesInfo(seriesId);
  return {
    title: {
      absolute: series.title,
    },
    description: "카연갤 시리즈",
    openGraph: {
      title: {
        absolute: series.title,
      },
      description: `작가 - ${series.writer_nickname}`,
      url: new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/series/${series.id}`),
      siteName: "카연갤북마크",
      type: "website",
      images: [series.og_image],
    },
    twitter: {
      card: "summary_large_image",
      title: {
        absolute: series.title,
      },
      description: `작가 - ${series.writer_nickname}`,
      images: [series.og_image],
    },
  };
}

const SeriesPage = async ({ params, searchParams }) => {
  const { seriesId } = params;
  const { page, prev } = searchParams;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);
  const { series } = await getSeriesInfo(seriesId);
  const { cartoons, count, limit } = await getSeriesList(seriesId, currentPage);
  const shareArgs = {
    thumb: series.og_image,
    title: series.title,
    desc: `작가 - ${series.writer_nickname}`,
    rcmd: series.average * series.count,
  }

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
      {prev !== undefined && (
        <Button
          variant="secondary"
          className="m-2"
          size={"sm"}
          href={prev}
        >
          목록으로
        </Button>
      )}
      <div className={styles.wrapper}>
        <div className={styles.thumbnail}>
          <img src={series.og_image} alt="" />
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{series.title}</h2>
          <h4>
            <Link href={createWriterUrl()}>{series.writer_nickname}</Link> · 작가
          </h4>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between ps-2">
        <div>
          <Button variant="outline-primary" className="me-1">개추 {Intl.NumberFormat().format(series.average * series.count)}</Button>
          <Button variant="outline-primary">마지막 업데이트 {calculateDaysAgo(series.last_update)}일 전</Button>
        </div>
        <Share shareArgs={shareArgs} />
      </div>
      <hr/>
      <ul>
        <CartoonList cartoons={cartoons} showWriter={false} />
      </ul>
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={5} />
    </div>
  );
}

export default SeriesPage;