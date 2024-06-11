import Paging from "@/components/testPaging/paging";
import { dateFormat } from "@/lib/common";
import { getWriters } from "@/lib/data";
import Link from "next/link";

export const metadata = {
  title: 'Writers',
  description: '작가들이지롱',
}

const Writers = async ({ searchParams }) => {
  const { page } = searchParams;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);

  const { writers, count, limit } = await getWriters(currentPage);
  
  return (
    <div>
      {writers.map((writer) => (
        <div key={writer._id}>
          {writer.id === "a"? (
            <Link href={`/writers/anon?nickname=${writer.nickname}`}>{writer.nickname}</Link>
          ) : (
            <span>
              <Link href={`/writers/${writer.id}`}>{writer.nickname_history[0].nickname}</Link>
            </span>
          )
          }
          {writer.recommend}{writer.writer_id}{writer.writer_nickname}{dateFormat(writer.first_date)}
        </div>
      ))}
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={10} pathName={`/writers`} />
    </div>
  );
}

export default Writers;