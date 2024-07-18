// SnackBar.js
import React from "react";

const SnackBar = ({ message }) => {
  return (
    <div className="fixed bg-black text-white shadow-2xl rounded-md p-2 left-1/2 top-8 text-sm animate-slide-snackbar text-[12px] min-w-28 text-center">
      {message}
    </div>
  );
};

export default SnackBar;
