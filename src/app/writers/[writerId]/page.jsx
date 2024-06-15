import { dateFormat, isDateWithin14Days } from "@/lib/common";
import { getWriterCartoons, getWriterInfo } from "@/lib/data";
import styles from "./writerInfo.module.css";
import Paging from "@/components/testPaging/paging";

export const generateMetadata = async ({params}) => {
  const { writerId } = params;
  const writer = await getWriterInfo(writerId);
  return {
    title: writer.nickname_history[0].nickname,
    description: "슉 슈슉 시",
  };
}

const WriterInfo = async ({ params, searchParams }) => {
  const { writerId } = params;
  const { page } = searchParams;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);
  const writer = await getWriterInfo(writerId);
  /*
  _id: new ObjectId('665c7b1103272be39860dc31'),
  id: 'mmilk5566',
  nickname_history: [
      {
      _id: new ObjectId('665dd7a094dad8038f8b96af'),
      nickname: '기밀',
      date: 2024-05-16T15:19:21.000Z
      }
  ],
  first_date: 2024-05-16T15:19:21.000Z,
  last_date: 2024-05-16T15:19:21.000Z,
  count: 1,
  recommend: 50,
  average: 50
  */
 const { cartoons, count, limit } = await getWriterCartoons(writerId, currentPage);

  return (
    <div>
      <div>
        <h1>{writer.nickname_history[0].nickname}</h1>
        id: {writer.id}
      </div>
      <hr/>
      <div>
        <span><h3>닉네임 변경 기록</h3></span>
        <table>
          <thead>
            <tr>
              <th>nickname</th>
              <th>since</th>
            </tr>
          </thead>
          <tbody>
            {writer.nickname_history.map((history) => (
              <tr key={history._id}>
                <td>{history.nickname}</td>
                <td>{dateFormat(history.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr/>
      <div className={styles.dates}>
        <span>첫 념글: {dateFormat(writer.first_date)}</span>
        <span>최근 활동일: {dateFormat(writer.last_date)}</span>
      </div>
      <hr/>
      <div className={styles.infos}>
        <span>만화 개수: {writer.count}</span>
        <span>개추 총합: {writer.recommend}</span>
        <span>평균 개추: {writer.average}</span>
      </div>
      <hr/>
      <div className={styles.container}>
        {cartoons.map(cartoon => (
          <div key={cartoon.id} className={styles.cartoon}>
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
        ))}
        <Paging page={currentPage} perPage={limit} count={count} pageBtn={10} pathName={`/writers/${writerId}`} />
      </div>
    </div>
  );
}

export default WriterInfo;