import Paging from "@/components/testPaging/paging";
import { isDateWithin14Days } from "@/lib/common";
import { getSeries } from "@/lib/data";
import Link from "next/link";

export const metadata = {
  title: "Series",
  description: "시리즈지롱",
}

const Series = async ({ searchParams }) => {
  const { page } = searchParams;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);
  
  const { series, count, limit } = await getSeries(currentPage);
  /*
  {
  _id: new ObjectId('666028821cb0d276547c7a17'),
  id: 687124,
  title: 'ㅇㅎ) 남성향에선 행복할 수 없는 여마왕 -아라크네편',
  writer_id: 'bongddu',
  writer_nickname: '실짱님',
  count: 2,
  last_update: '2024-05-05 21:08:37',
  average: 213
  }
   */
  return (
    <div>
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
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={10} pathName={`/series`} />
    </div>
  );
}

export default Series;