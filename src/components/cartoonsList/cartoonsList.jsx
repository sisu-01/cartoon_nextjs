"use client";

import { useEffect, useState } from "react";
import styles from "./cartoonsList.module.css";
import Paging from "@/components/Paging/paging";
import { useRouter, useSearchParams } from 'next/navigation'
import { dateFormat, isDateWithin14Days } from "@/lib/common";

const CartoonsList = ({ writerId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;  

  const [cartoons, setCartoons] = useState(null);
  const [count, setCount] = useState(null);
  const [limit, setLimit] = useState(null);

  useEffect(() => {
    getCartoons(writerId, currentPage);
  }, [currentPage]);

  const getCartoons = (writerId, page) => {
    fetch(`/api/writers/${writerId}?page=${page}`)
      .then(res => res.json())
      .then(({ cartoons, count, limit }) => {
        setCartoons(cartoons);
        setCount(count);
        setLimit(limit);
      })
      .catch(err => {
        console.error("Error fetching cartoons:", err);
      })
  }

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    router.push(`?${newParams.toString()}`);
  };

  const renderCartoonList = () => {
    if (!cartoons) {
      return <div>없어용</div>;
    }
    return cartoons.map(cartoon => (
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
    ));
  }

  return (
    <div className={styles.container}>
      {renderCartoonList()}
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={10} onClick={handlePageChange} />
    </div>
  );
}

export default CartoonsList;