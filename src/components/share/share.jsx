"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import styles from "./share.module.css";

const Share = ({ anon }) => {
  const pathname = usePathname();
  let shareUrl = "";
  if (typeof window !== "undefined") {
    shareUrl = window.location.protocol+"//"+window.location.host+pathname;
  }
  if (anon) {
    shareUrl += `?nickname=${anon}`;
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  
  const handle = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShow(false);
      alert('클립보드에 복사되었습니다.');
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
            카톡 x 페이스북
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