"use client";

import Pagination from 'react-bootstrap/Pagination';
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from 'react';

/**
 * @param {Number} page 현재 페이지
 * @param {Number} perPage 한 페이지에 표시될 게시글 수
 * @param {Number} count 전체 게시글 수
 * @param {Number} pageBtn 페이징 버튼 수
 * @param {Function} onClick 콜백?
 */
const Paging = ({page, perPage, count, pageBtn, onClick}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const pageGroup = Math.ceil(page / pageBtn);//현재 그룹
  const totalPage = Math.ceil(count / perPage);//전체 페이지 개수
  const totalGroup = Math.ceil(totalPage / pageBtn);//전체 그룹 개수

  const startPage = pageGroup * pageBtn - pageBtn + 1;
  let tempEnd = pageGroup * pageBtn;
  if(tempEnd > totalPage) tempEnd = totalPage;
  const endPage = tempEnd;

  const createQueryString = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", value);
 
      return params.toString();
    },
    [searchParams]
  );

  const newArr = [];
  if (pageGroup > 1) {
    if (onClick) {
      newArr.push(<Pagination.First className={styles.link} key='first' onClick={() => onClick(1)} />);
      newArr.push(<Pagination.Prev className={styles.link} key='prev' onClick={() => onClick(startPage - 1)} />);
    } else {
      newArr.push(<Pagination.First key='first' href={`${pathName}?${createQueryString(1)}`} />);
      newArr.push(<Pagination.Prev key='prev' href={`${pathName}?${createQueryString(startPage - 1)}`} />);
    }
  } else {
    newArr.push(<Pagination.First key='_first' disabled />);
    newArr.push(<Pagination.Prev key='_prev' disabled />);
  }
  for (let i = startPage; i <= endPage; i++) {
    if (page === i) {
      newArr.push(<Pagination.Item key={i} active >{i}</Pagination.Item>);
    } else {
      if (onClick) {
        newArr.push(<Pagination.Item key={i} className={styles.link} onClick={() => onClick(i)}>{i}</Pagination.Item>);
      } else {
        newArr.push(<Pagination.Item key={i} href={`${pathName}?${createQueryString(i)}`}>{i}</Pagination.Item>);
      }
    }
  }
  if (pageGroup < totalGroup) {
    if (onClick) {
      newArr.push(<Pagination.Next className={styles.link} key='next' onClick={() => onClick(endPage + 1)} />);
      newArr.push(<Pagination.Last className={styles.link} key='last' onClick={() => onClick(totalPage)} />);
    } else {
      newArr.push(<Pagination.Next key='next' href={`${pathName}?${createQueryString(endPage + 1)}`} />);
      newArr.push(<Pagination.Last key='last' href={`${pathName}?${createQueryString(totalPage)}`} />);
    }
  } else {
    newArr.push(<Pagination.Next key='_next' disabled />);
    newArr.push(<Pagination.Last key='_last' disabled />);
  }
  return (
    <Pagination className="my-5 justify-content-center">{newArr}</Pagination>
  );
}

export default Paging;