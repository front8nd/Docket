import React, { useState } from "react";

export default function CreateNotes() {
  const [data, setData] = useState({
    id: null,
    title: "",
    note: "",
    date: null,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const cur_Date = new Date();
    console.log(data);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-start">Create Notes</h2>
      <hr></hr>
      <form onSubmit={submitHandler} className="flex flex-col my-8">
        <div className="flex justify-between mt-4">
          <p className="font-bold text-xl">Title:</p>
          <input
            placeholder="Enter Title"
            className="border-2 p-2 rounded-md text-neutral-700 border-neutral-300 w-7/12"
            name="title"
            value={data.title}
            onChange={changeHandler}
          ></input>
        </div>
        <div className="flex justify-between my-4">
          <p className="font-bold text-xl">Note:</p>
          <textarea
            placeholder="Note"
            className="border-2 p-2 rounded-md text-neutral-700 border-neutral-300 w-7/12"
            rows="4"
            name="note"
            value={data.note}
            onChange={changeHandler}
          ></textarea>
        </div>
        <div className="flex justify-end my-8 gap-8">
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white hover:bg-blue-500 border-2 border-transparent  rounded-md shadown-md outline-none w-3/12"
          >
            Create Note
          </button>
        </div>
      </form>
    </div>
  );
}
