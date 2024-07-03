const X = (param) => {
  const { title, shareUrl, handleClose } = param;
  const xUrl = `https://x.com/intent/post?text=${encodeURIComponent(title+" (출처 : 카연갤북마크)")}&url=${encodeURIComponent(shareUrl)}`;
  const handle = () => {
    handleClose();
    window.open(xUrl, '_blank', 'width=640,height=440');
  }
  return (
    <div>
      <button onClick={handle}>x</button>
    </div>
  );
}

export default X;