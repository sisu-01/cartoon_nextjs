"use client";

import { useEffect, useState } from "react";
import styles from "./writerInfo.module.css";
import Paging from "@/components/testPaging/paging";
import { useRouter, useSearchParams } from 'next/navigation'
import { dateFormat, isDateWithin14Days } from "@/lib/common";

const CartoonList = ({writerId}) => {
  console.log("CartoonList");
  const searchParams = useSearchParams();
  const apage = searchParams.get('page');
  const currentPage = (Number(apage) > 0 ? Number(apage) : 1);

  const [cartoons, setCartoons] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [count, setCount] = useState(null);
  const [limit, setLimit] = useState(null);

  const router = useRouter();

  useEffect(() => {
    getCartoons(writerId, page);
  }, [page]);

  const getCartoons = (writerId, page) => {
    //페이징 onclick getCartoons를 하던 page state를 하던
    console.log(`/api/writers/${writerId}?page=${page}`);
    fetch(`/api/writers/${writerId}?page=${page}`)
    .then(res => res.json())
    .then(data => {
      const { cartoons, count, limit } = data;
      setCartoons(cartoons);
      setCount(count);
      setLimit(limit);
    })
    .catch(err => {
      throw new Error("err");
    })
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    router.push(`?${newParams.toString()}`);
  };

  const renderCartoonList = () => {
    if (cartoons) {
      const newArr = [];
      cartoons.map((cartoon) => {
        newArr.push(
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
        )
      });
      return newArr;
    } else {
      return (
        <div>
          없어용;
        </div>
      )
    }
  }

  return (
    <div className={styles.container}>
      {renderCartoonList()}
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={10} onClick={handlePageChange} />
    </div>
  );
}

export default CartoonList;