// export const Button = ({ children, handleClick }: { children: React.ReactNode; handleClick: () => void }) => {
//   return (
//     <button className="text-white bg-red-500 hover:bg-red-700 focus:outline" onClick={handleClick}>
//       {children}
//     </button>
//   );
// };

export const Button = ({ children, handleClick }: { children: React.ReactNode; handleClick: () => void }) => {
  return (
    <button
      className="text-white bg-red-500 hover:bg-red-700 focus:outline  font-medium rounded-md px-1 py-2 mx-1 my-2"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
