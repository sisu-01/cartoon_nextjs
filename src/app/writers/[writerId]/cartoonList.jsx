"use client";

import { useEffect, useState } from "react";
import styles from "./writerInfo.module.css";

const CartoonList = ({writerId}) => {
  console.log("CartoonList");
  const [a, setA] = useState(null);

  useEffect(() => {
    getCartoons(writerId);
  }, []);

  const getCartoons = (writerId) => {
    fetch(`http://localhost:3000/api/writers/${writerId}`)
    .then(res => res.json())
    .then(data => {
      const { cartoons, count, limit } = data;
      setA(cartoons);
    })
    .catch(err => {
      throw new Error("err");
    })
  }

  const renderCartoonList = () => {
    if (a) {
      const newArr = [];
      a.map((q) => {
        newArr.push(
          <div key={q.id}>
            {q.title}
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
    <div className={styles.test}>
      {renderCartoonList()}
    </div>
  );
}

export default CartoonList;