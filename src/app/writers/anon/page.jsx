import { getAnonWriterCartoons, getAnonWriterInfo } from "@/lib/data";
import styles from "./anon.module.css";
import Paging from "@/components/Paging/paging";
import CartoonList from "@/components/cartoonsList/cartoonsList";
import Button from 'react-bootstrap/Button';

export const generateMetadata = async ({ searchParams }) => {
  const { nickname } = searchParams;
  const writer = await getAnonWriterInfo(nickname);
  return {
    title: writer.nickname,
    description: "카연갤 작가",
  };
}

const Anon = async ({ searchParams }) => {
  const { nickname, page, prev } = searchParams;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);
  const writer = await getAnonWriterInfo(nickname);
  const { cartoons, count, limit } = await getAnonWriterCartoons(nickname, currentPage);

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
      <div className={styles.nicknameWrapper}>
        <h2>
          <span className={styles.nickname}>{writer.nickname}</span>
          <span>님의 작품</span>
        </h2>
        <span className="text-secondary">총 {writer.count}</span>
      </div>
      {/* <div className={styles.dates}>
        <span>첫 념글: {dateFormat(writer.first_date)}</span>
        <span>최근 활동일: {dateFormat(writer.last_date)}</span>
      </div>
      <hr/>
      <div className={styles.infos}>
        <span>만화 개수: {writer.count}</span>
        <span>개추 총합: {writer.recommend}</span>
        <span>평균 개추: {writer.average}</span>
      </div> */}
      <Button variant="outline-primary" size={"sm"} href={`/series?keyword=${writer.nickname}`}>시리즈 보기</Button>
      <hr/>
      <ul>
        <CartoonList cartoons={cartoons} showWriter={false} />
      </ul>
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={5} />
    </div>
  );
}

export default Anon;