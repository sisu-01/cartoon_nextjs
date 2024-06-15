import { dateFormat } from "@/lib/common";
import { getWriterInfo } from "@/lib/data";
import styles from "./writerInfo.module.css";
import CartoonsList from "@/components/cartoonsList/cartoonsList";

export const generateMetadata = async ({params}) => {
  const { writerId } = params;
  const writer = await getWriterInfo(writerId);
  return {
    title: writer.nickname_history[0].nickname,
    description: "슉 슈슉 시",
  };
}

const WriterInfo = async ({ params }) => {
  const { writerId } = params;

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
      <CartoonsList writerId={writerId} />
    </div>
  );
}

export default WriterInfo;