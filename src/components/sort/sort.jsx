"use client";

import Form from 'react-bootstrap/Form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react';

const Sort = (a) => {
  console.log(a);
  const { checked } = a;
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
  const delteQueryString = useCallback(
    () => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("sort");
      params.delete("page");
 
      return params.toString();
    },
    [searchParams]
  )

  const handle = () => {
    console.log(checked);
    if (!checked) {
      router.push(`${pathName}?${createQueryString("rating")}`);
    } else {
      router.push(`${pathName}?${delteQueryString()}`);
      router.refresh()
    }
  }

  return (
    <Form>
      <Form.Check
        type="switch"
        id="sort"
        onChange={handle}
        checked={checked}
      />
      <label htmlFor="sort">추천순</label>
    </Form>
  );
}

export default Sort;