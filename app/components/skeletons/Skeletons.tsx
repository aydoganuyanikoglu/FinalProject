const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const CartSkeleton = () => {
  const items = ["item1", "item2", "item3"];

  return (
    <ul className="w-full h-fit flex flex-col gap-2 max-md:gap-1">
      {items.map((item, index) => (
        <li
          key={index}
          className={`${shimmer} relative overflow-hidden cartItems w-full h-[170px] p-2 flex gap-1 border-[1px] border-white rounded-md bg-gray-200 max-md:h-[130px]`}
        >
          <div className="imageContainer w-[170px] h-full bg-gray-600 max-md:w-[130px]"></div>
          <div className="infosContainer h-full flex flex-col justify-between">
            <div className="top">
              <h2 className="w-[100px] h-[24px] rounded-md bg-gray-600"></h2>
              <p className="mt-1 w-[200px] rounded-md h-[16px] bg-gray-600"></p>
              <p className="mt-1 w-[150px] rounded-md h-[16px] bg-gray-600"></p>
            </div>
            <div className="bottom">
              <p className="w-[30px] h-[15px] bg-gray-600"></p>
            </div>
          </div>
          <div className="decreaseIncreaseContainer absolute right-2 bottom-2 w-[55px] h-[30px] flex items-center gap-2 border-[1.5px] bg-gray-600 rounded-md px-2 py-1">
            <div className=""></div>
            <span className="text-[12px]"></span>
            <div></div>
          </div>
        </li>
      ))}
    </ul>
  );
};
