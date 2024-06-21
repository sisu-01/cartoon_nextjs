import { dateFormat, highlightSearchText, isDateWithin14Days } from "@/lib/common";
import styles from "./cartoonsList.module.css";
import Link from "next/link";
import Up from "../up/up";

const CartoonList = (param) => {
  const { cartoons, showWriter, currentKeyword } = param;

  return cartoons.map((cartoon) => (
    <li className={styles.wrappers} key={cartoon.id}>
      <a href={`https://gall.dcinside.com/board/view/?id=cartoon&no=${cartoon.id}`} target="_blank">
        <div className={styles.thunbnail}>
          <div className={styles.imageBox}>
            <img className={styles.thumbnailImg} src={cartoon.og_image} />
          </div>
        </div>
        <div className={styles.cartoon}>
          <p className={styles.titleArea} style={{paddingRight: `${cartoon.writer_nickname.length+0.5}em`}}>
            {isDateWithin14Days(cartoon.date) && <Up />}
            <span className={styles.title}
              dangerouslySetInnerHTML={{ __html: highlightSearchText(cartoon.title, currentKeyword) }}
            >
              {/* {cartoon.title} */}
            </span>
          </p>
          <div className={styles.info}>
            <span>★{cartoon.recommend}</span>
            <span>{dateFormat(cartoon.date)}</span>
          </div>
        </div>
      </a>
      {showWriter? (
        <div className={styles.writer}>
          {cartoon.writer_id === "a"? (
            <Link href={`/writers/anon?nickname=${cartoon.writer_nickname}`}>{cartoon.writer_nickname}</Link>
          ) : (
            <Link href={`/writers/${cartoon.writer_id}`}>{cartoon.writer_nickname}</Link>
          )}
        </div>
      ) : ("")}
    </li>
  ));
}

export default CartoonList;