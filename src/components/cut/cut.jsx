"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react';

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

  const handler = (value) => {
    if (value === 0 || value < 0) {
      router.push(`${pathName}?${delteQueryString()}`);
    } else {
      router.push(`${pathName}?${createQueryString(value)}`);
    }
  }

  return (
    <div>
      <select onChange={handler} value={checked}>
        {options.includes(checked) ? null : (
          <option value={checked}>{checked}</option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className='input-group-text'>최소 개추 수</span>
    </div>
  );
}

export default Cut;