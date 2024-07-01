import Paging from "@/components/Paging/paging";
import { getSeriesInfo, getSeriesList } from "@/lib/data";
import styles from "./seriesCartoons.module.css";
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import CartoonList from "@/components/cartoonsList/cartoonsList";
import Share from "@/components/share/share";

export const generateMetadata = async ({params}) => {
  const { seriesId } = params;
  const { series, cartoon } = await getSeriesInfo(seriesId);
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
      images: [cartoon.og_image],
    }
  };
}

const SeriesPage = async ({ params, searchParams }) => {
  const { seriesId } = params;
  const { page, prev } = searchParams;
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
      <div className="d-flex align-items-center justify-content-between ps-2">
        <Share />
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