"use client";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from "react";

const Search = ({ keyword, label }) => {
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
    if (tempText === "") return false;
    setTempText("");
    router.push(`${pathName}?${delteQueryString()}`);
  }
  
  return (
    <InputGroup className="px-2">
      <FloatingLabel
        controlId="floatingInput"
        label={label}
      >
        <Form.Control
          type="text"
          placeholder={label}
          value={tempText}
          onChange={(e) => setTempText(e.target.value)}
          onKeyDown={() => clearTime()}
          onKeyUp={() => setTime()}
        />
      </FloatingLabel>
      <Button variant="outline-secondary" onClick={() => resetKeyword()}>
        X
      </Button>
    </InputGroup>
  );
}

export default Search;