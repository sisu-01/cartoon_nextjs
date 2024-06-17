"use client";

import { useState } from 'react';

const RandomCartoon = () => {
  const [error, setError] = useState(null);

  const handler = async () => {
    try {
      const res = await fetch("/api/cartoons");
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      window.open(`https://gall.dcinside.com/board/view/?id=cartoon&no=${data.id}`, "_blank");
    } catch (err) {
      console.error("Error fetching cartoons:", err);
      setError("Failed to fetch cartoon. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={handler}>🔀랜덤 만화 보기</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default RandomCartoon;
