import { dateFormat } from "@/lib/common";
import { getWriterInfo } from "@/lib/data";
import CartoonList from "./cartoonList";
import styles from "./writerInfo.module.css";

export const metadata = {
  title: 'Writer Info',
  description: '작가 정보',
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
      {writer.id}
      {writer.nickname_history[0].nickname}
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
      {dateFormat(writer.first_date)}
      {dateFormat(writer.last_date)}
      {writer.count}
      {writer.recommend}
      {writer.average}
      <CartoonList writerId={writerId} />
    </div>
  );
}

export default WriterInfo;