import { dateFormat, isDateWithin14Days } from "@/lib/common";
import { getApi, getWriterCartoons, getWriterInfo } from "@/lib/data";
import styles from "./writerInfo.module.css";
import Paging from "@/components/Paging/paging";
import Up from "@/components/up/up";
import CartoonList from "@/components/cartoonsList/cartoonsList";

export const generateMetadata = async ({params}) => {
  const { writerId } = params;
  const writer = await getWriterInfo(writerId);
  return {
    title: writer.nickname,
    description: "작가 상세 페이지지롱",
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
 const test = await getApi(writerId);

  return (
    <div className={styles.container}>
      {/* <div>
        [{test.map((te, index) => (
          <div key={te.id}>
            &#123;"id":&nbsp;"{te.id}",&nbsp;"title":&nbsp;"{te.title}"&#125;
            {index < test.length - 1 ? ',' : ''}
          </div>
        ))}]
      </div> */}
      <div className={styles.nicknameWrapper}>
        <h2>
          <span className={styles.nickname}>{writer.nickname}</span>
          <span>님의 작품</span>
        </h2>
        <span className="text-secondary">총 {writer.count}</span>
      </div>
      <div className={styles.infoWrapper}>
        {writer.nickname_history.length > 1 && (
          <div>
            <h4>닉네임 변경 기록</h4>
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
        )}
        {/* <div className={styles.dates}>
          <span>첫 념글: {dateFormat(writer.first_date)}</span>
          <span>최근 활동일: {dateFormat(writer.last_date)}</span>
        </div>
        <div className={styles.infos}>
          <span>개추 총합: {writer.recommend}</span>
          <span>평균 개추: {writer.average}</span>
        </div> */}
      </div>
      <hr/>
      <ul>
        <CartoonList cartoons={cartoons} showWriter={false} />
      </ul>
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={5} />
    </div>
  );
}

export default WriterInfo;