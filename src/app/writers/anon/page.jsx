import { dateFormat, isDateWithin14Days } from "@/lib/common";
import { getAnonWriterCartoons, getAnonWriterInfo } from "@/lib/data";
import styles from "./anon.module.css";
import Paging from "@/components/Paging/paging";

export const generateMetadata = async ({ searchParams }) => {
  const { nickname } = searchParams;
  const writer = await getAnonWriterInfo(nickname);
  return {
    title: writer.nickname,
    description: "작가 상세 페이지지롱",
  };
}

const Anon = async ({ searchParams }) => {
  const { nickname, page } = searchParams;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);
  const writer = await getAnonWriterInfo(nickname);
  const { cartoons, count, limit } = await getAnonWriterCartoons(nickname, currentPage);

  return (
    <div className={styles.container}>
      <div>
        <h1>{writer.nickname}</h1>
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
      <div>
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
        <Paging page={currentPage} perPage={limit} count={count} pageBtn={10} />
      </div>
    </div>
  );
}

export default Anon;