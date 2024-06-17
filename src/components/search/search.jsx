"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from "react";
import styles from "./search.module.css";

const Search = ({ keyword }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [tempText, setTempText] = useState(keyword || "");

  //작가 검색 시간 체크
  let searchTimer;
  const searchIntervalTime = 500; // 0.5초

  const createQueryString = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("keyword", value);
      params.delete("page");
 
      return params.toString();
    },
    [searchParams]
  );
  const delteQueryString = useCallback(
    () => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("keyword");
      params.delete("page");
 
      return params.toString();
    },
    [searchParams]
  )

  const clearTime = () => {
    clearTimeout(searchTimer);
  }
  const setTime = () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        handler(tempText);
      }, searchIntervalTime);
  }

  const handler = (keyword) => {
    if (keyword === "") {
      router.push(`${pathName}?${delteQueryString()}`);
    } else {
      router.push(`${pathName}?${createQueryString(keyword)}`);
    }
  }

  const resetKeyword = () => {
    setTempText("");
    router.push(`${pathName}?${delteQueryString()}`);
  }
  
  return (
    <div className={styles.container}>
      <input
        type="text"
        name=""
        id=""
        value={tempText}
        onChange={(e) => setTempText(e.target.value)}
        onKeyDown={() => clearTime()}
        onKeyUp={() => setTime()}
      />
      <button onClick={() => resetKeyword()}>X</button>
    </div>
  );
}

export default Search;