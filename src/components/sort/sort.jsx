"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react';

const Sort = ({ checked }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      params.delete("page");
 
      return params.toString();
    },
    [searchParams]
  );
  const delteQueryString = useCallback(
    (name) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      params.delete("page");
 
      return params.toString();
    },
    [searchParams]
  )

  const handle = () => {
    if (!checked) {
      router.push(`${pathName}?${createQueryString("sort", "rating")}`);
    } else {
      router.push(`${pathName}?${delteQueryString("sort")}`);
    }
  }

  return (
    <button onClick={() => handle()}>{checked? '개추순 해제' : '누르면 개추순'}</button>
  );
}

export default Sort;