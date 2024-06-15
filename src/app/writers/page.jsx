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
      <table>
        <thead>
          <tr>
            <th>가나다순</th>
            <th>첫념글</th>
            <th>작품수</th>
            <th>노적개추</th>
            <th>펴균개추</th>
          </tr>
        </thead>
        <tbody>
          {writers.map((writer) => (
            <tr key={writer._id}>
              <td>
                {writer.id === "a"? (
                  <Link href={`/writers/anon?nickname=${writer.nickname}`}>{writer.nickname}</Link>
                ) : (
                  <span>
                    <Link href={`/writers/${writer.id}`}>{writer.nickname_history[0].nickname}</Link>💛
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
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={10} pathName={`/writers`} />
    </div>
  );
}

export default Writers;