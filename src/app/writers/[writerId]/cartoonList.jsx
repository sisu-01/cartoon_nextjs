import { getWriterCartoons } from "@/lib/data";
import styles from "./writerInfo.module.css";
import { dateFormat } from "@/lib/common";
import Paging from "@/components/testPaging/paging";

const CartoonList = async ({writerId}) => {
  const { cartoons, count, limit } = await getWriterCartoons(writerId, 1);
  console.log(count, limit);
  return (
    <div className={styles.test}>
      {cartoons.map((cartoon) => (
        <div className={styles.wrappers} key={cartoon.id}>
          <div className={styles.cartoon}>
            <a href={`https://gall.dcinside.com/board/view/?id=cartoon&no=${cartoon.id}`} target="_blank">
              <div>
                <span className={styles.title}>{cartoon.title}</span>
                <div className={styles.info}>
                  <span>{cartoon.recommend}</span>
                  <span>{dateFormat(cartoon.date)}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      ))}
      <Paging page={1} perPage={limit} count={count} pageBtn={10} pathName={`/cartoons`} />
    </div>
  );
}

export default CartoonList;