import Link from "next/link";
import styles from "./paging.module.css";

/**
 * @param {Number} page 현재 페이지
 * @param {Number} perPage 한 페이지에 표시될 게시글 수
 * @param {Number} count 전체 게시글 수
 * @param {Number} pageBtn 페이징 버튼 수
 * @param {function} handler 클릭 핸들러
 */
const Paging = ({page, perPage, count, pageBtn, pathName}) => {
  const pageGroup = Math.ceil(page / pageBtn);//현재 그룹
  const totalPage = Math.ceil(count / perPage);//전체 페이지 개수
  const totalGroup = Math.ceil(totalPage / pageBtn);//전체 그룹 개수

  const startPage = pageGroup * pageBtn - pageBtn + 1;
  let tempEnd = pageGroup * pageBtn;
  if(tempEnd > totalPage) tempEnd = totalPage;
  const endPage = tempEnd;

  const newArr = [];
  if (pageGroup > 1) {
    newArr.push(<Link key='first' href={`${pathName}?page=${1}`}>first</Link>);
    newArr.push(<Link key='prev' href={`${pathName}?page=${startPage-1}`}>prev</Link>);
  } else {
    newArr.push(<div key='_first'>first</div>);
    newArr.push(<div key='_prev'>prev</div>);
  }
  for (let i = startPage; i <= endPage; i++) {
    if (page === i) {
        newArr.push(<div key={i}>{i}</div>);
    } else {
        newArr.push(<Link key={i} href={`${pathName}?page=${i}`}>{i}</Link>);
    }
  }
  if (pageGroup < totalGroup) {
    newArr.push(<Link key='next' href={`${pathName}?page=${endPage+1}`}>prev</Link>);
    newArr.push(<Link key='last' href={`${pathName}?page=${totalPage}`}>last</Link>);
  } else {
    newArr.push(<div key='_next'>next</div>);
    newArr.push(<div key='_last'>last</div>);
  }
  return (
    <div className={styles.container}>{newArr}</div>
  );
}

export default Paging;