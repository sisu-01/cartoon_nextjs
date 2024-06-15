"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from 'react';

const sortList = [
  {
    id: "nickname",
    text: "가나다순"
  },
  {
    id: "date",
    text: "첫념글"
  },
  {
    id: "count",
    text: "작품수"
  },
  {
    id: "recommend",
    text: "개추수"
  },
  {
    id: "average",
    text: "개추평균"
  },
]

const SortList = ({ sorting }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sort", value);
      params.delete("page");
 
      return params.toString();
    },
    [searchParams]
  );

  const handler = (value) => {
    router.push(`${pathName}?${createQueryString(value)}`);
  }
  
  return (
    <tr>
      {sortList.map((sort) => (
        <th key={sort.id}>
          <input
            type="radio"
            name="sort"
            id={sort.id}
            value={sort.id}
            checked={sorting === sort.id}
            onChange={({target: {value}}) => handler(value)}
          />
          <label htmlFor={sort.id}>{sort.text}</label>
        </th>
      ))}
    </tr>
  );
}

export default SortList;