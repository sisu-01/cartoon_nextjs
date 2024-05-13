const getCartoons = async () => {
  const res = await fetch("http://localhost:4000/api/cartoon");

  if (!res.ok) {
    throw new Error("err");
  }
  return res.json();
}

const Cartoons = async () => {
  const cartoons = await getCartoons();
  return (
    <div>
      {cartoons.list.map((cartoon) => (
        <div>
          {cartoon.title}
        </div>
      ))}
    </div>
  );
}

export default Cartoons;