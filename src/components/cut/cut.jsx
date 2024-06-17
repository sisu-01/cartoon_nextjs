"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react';
import styles from "./cut.module.css";

const Cut = ({checked}) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const options = [0, 50, 100, 250, 500, 1000];
  
  const createQueryString = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("cut", value);
      params.delete("page");
 
      return params.toString();
    },
    [searchParams]
  );
  const delteQueryString = useCallback(
    () => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("cut");
      params.delete("page");
 
      return params.toString();
    },
    [searchParams]
  )

  const handler = (e) => {
    const { value } = e.target;
    if (value === "etc") {
      const userInput = prompt("추천컷을 숫자로 입력해주세요.");
      if (userInput !== null) {
        if (isNaN(userInput) || userInput === "") {
          alert("숫자만 입력해주세요.");
        } else {
          router.push(`${pathName}?${createQueryString(userInput)}`);
        }
      }
    } else {
      const cut = Number(value);
      if (cut === 0 || cut < 0) {
        router.push(`${pathName}?${delteQueryString()}`);
      } else {
        router.push(`${pathName}?${createQueryString(cut)}`);
      }
    }
  }

  return (
    <div className={styles.container}>
      <select onChange={handler} value={checked} className={styles.select}>
        {options.includes(checked) ? null : (
          <option value={checked}>{checked}</option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        <option value="etc">
          기타
        </option>
      </select>
      <span className={styles.label}>최소 개추 수</span>
    </div>
  );
}

export default Cut;
