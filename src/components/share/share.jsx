"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import styles from "./share.module.css";
import Kakao from "./kakao/kakao";

const Share = ({ shareArgs, anon }) => {
  let pathname = usePathname();
  if (anon) {
    pathname += `?nickname=${anon}`;
  }

  let shareUrl = "";
  if (typeof window !== "undefined") {
    shareUrl = window.location.protocol+"//"+window.location.host+pathname;
  }
  shareArgs['path'] = pathname.substring(1);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  
  const handle = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShow(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        공유하기
      </Button>

      <Modal size="sm" show={show} onHide={handleClose} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>공유하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Kakao shareArgs={shareArgs} />
          </div>
          <div className={styles.div} onClick={handle}>
            <span className={styles.btn}>
              복사
            </span>
            <span className={styles.url}>
              {shareUrl}
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Share;