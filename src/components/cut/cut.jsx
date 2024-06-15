"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react';

const Cut = ({checked}) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  
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

  const handler = (value) => {
    if (value === 0 || value < 0) {
      router.push(`${pathName}?${delteQueryString}`);
    } else {
      router.push(`${pathName}?${createQueryString(value)}`);
    }
  }

  return (
    <div>
      <select
        onChange={(
          {target: {value}}) => handler(Number(value)
        )}
        value={checked}
      >
        <option value={0}>0</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={250}>250</option>
        <option value={500}>500</option>
        <option value={1000}>1000</option>
      </select>
      <span className='input-group-text'>최소 개추 수</span>
    </div>
  );
}

export default Cut;