import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { MdDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  create,
  deleteNote,
  fetch,
  NotesData,
  update,
} from "../redux/NotesSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Loading from "./Loading";
export default function ViewNotes() {
  //Redux data
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const data = useSelector((state) => state.Notes.data);
  const allCards = useSelector((state) => state.Notes);
  const [loading, setLoading] = useState(false);
  // Data
  const [formData, setFromData] = useState({
    id: "",
    title: "",
    content: "",
    date: "",
    color: "",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (editCard) {
      setUpdatedData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFromData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle new card
  const [createNew, setCreateNew] = useState(false);
  const [editCard, setEditCard] = useState(null);

  //On Card Delete, remember last card color to show the animation
  const [lastKnownColor, setLastKnownColor] = useState("");

  useEffect(() => {
    if (data.color !== "") {
      setCreateNew(true);
      setLastKnownColor(data.color);
    } else {
      const timer = setTimeout(() => {
        setCreateNew(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [data.color]);

  //Edit Card

  const handleEditCard = (id) => {
    setEditCard(id);
    // find card id to fill updated card
    const card = allCards.AllCards.find((c) => c._id === id);
    setUpdatedData({ title: card.title, content: card.content });
  };

  // reset new card
  const resetNewCard = () => {
    dispatch(
      NotesData({ id: "", title: "", content: "", date: "", color: "" })
    );
    setFromData({
      id: "",
      title: "",
      content: "",
      date: "",
      color: "",
    });
  };

  //Reset old card
  const resetOldCard = () => {
    setEditCard(null);
  };

  // Set Date and Time
  const formatDate = () => {
    const date = new Date();

    // Format date
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    let dateString = date.toLocaleDateString("en-US", dateOptions);

    // Format time
    const timeOptions = { hour: "numeric", minute: "numeric" };
    let timeString = date.toLocaleTimeString("en-US", timeOptions);

    // Combine date and time
    return `${dateString} ${timeString}`;
  };

  // Date and Time for server data
  const formatDateTime = (serverDateString) => {
    const date = new Date(serverDateString);

    // Format date
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate;
  };

  // Fetch Data on render

  useEffect(() => {
    dispatch(fetch(userData.userData.user._id));
  }, [dispatch]);

  // // Create New Card
  const submitHandler = async (e) => {
    e.preventDefault();
    const formattedDate = formatDate();

    const newNote = {
      userId: userData.userData.user._id,
      title: formData.title,
      content: formData.content,
      date: formattedDate,
      color: data.color,
    };
    await dispatch(create(newNote));
    await dispatch(fetch(userData.userData.user._id));
    await dispatch(
      NotesData({ id: "", title: "", content: "", date: "", color: "" })
    );
    setFromData({ id: "", title: "", content: "", date: "", color: "" });
  };

  // Delete Data

  const deleteCard = async (id) => {
    await dispatch(
      deleteNote({
        id: id,
        userId: userData.userData.user._id,
      })
    );
    await dispatch(fetch(userData.userData.user._id));
  };

  // Update Data
  const [updatedData, setUpdatedData] = useState({});
  const updateCard = async (id) => {
    await dispatch(
      update({
        userId: userData.userData.user._id,
        id: id,
        ...updatedData,
      })
    );
    setEditCard(null);
  };

  // Search Features
  const searchQuery = useSelector((state) => state.Notes.search);
  const [filteredCards, setFilteredCards] = useState([]);
  useEffect(() => {
    if (searchQuery !== "") {
      const filteredResults = allCards.AllCards.filter((e) =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCards(filteredResults);
    } else setFilteredCards(allCards.AllCards);
  }, [searchQuery, allCards]);

  return (
    <div className="sm:ml-[100px] ml-[80px] py-8 px-2 sm:p-8 ">
      <h2 className="text-3xl font-bold text-start mt-1">
        All Your Notes at One Place
      </h2>
      {allCards.loading === true ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
          {createNew && (
            <form
              onSubmit={submitHandler}
              className={`${
                data.color || lastKnownColor
              } shadow-lg rounded-2xl min-h-52 h-auto  p-4 relative ${
                data.color !== ""
                  ? "animate-slide-in"
                  : "animate-bounce-out-bck"
              }`}
            >
              <input
                className="font-bold mb-2 text-sm w-full bg-transparent outline-none placeholder:text-gray-800"
                placeholder="Enter Title here!"
                name="title"
                value={formData.title}
                onChange={changeHandler}
                required
              ></input>
              <textarea
                rows={3}
                placeholder="Enter content here"
                className="w-full bg-transparent resize-none placeholder:text-gray-800 outline-none"
                name="content"
                value={formData.content}
                onChange={changeHandler}
                required
              ></textarea>
              <p className="absolute bottom-3">{formatDate()}</p>
              <span
                onClick={resetNewCard}
                className="absolute bottom-3 right-12 flex gap-4 flex-col"
              >
                <i className="bg-white rounded-full text-black p-2 hover:bg-black hover:text-white cursor-pointer">
                  <RxCross1 size={18} />
                </i>
              </span>
              <button className="absolute bottom-3 right-2 flex gap-4 flex-col">
                <i className="bg-white rounded-full text-black p-2 hover:bg-black hover:text-white cursor-pointer">
                  <MdDone type="submit" size={18} />
                </i>
              </button>
            </form>
          )}
          {filteredCards.length !== 0 ? (
            filteredCards.map((e) => (
              <div
                key={e._id}
                className={`${e.color} shadow-lg rounded-2xl min-h-52 h-auto  p-4 relative grid-cols-subgrid`}
              >
                {editCard === e._id ? (
                  <div>
                    <input
                      name="title"
                      value={updatedData.title}
                      onChange={changeHandler}
                      className="font-bold mb-2 text-sm outline-none border-none bg-transparent"
                    />
                    <textarea
                      name="content"
                      value={updatedData.content}
                      onChange={changeHandler}
                      className="w-full bg-transparent resize-none placeholder:text-gray-800 outline-none"
                    />
                    <p className="absolute bottom-3">
                      {formatDateTime(e.date)}
                    </p>
                    <button
                      onClick={() => deleteCard(e._id)}
                      className="absolute bottom-3 right-[5.5rem] flex gap-4 flex-col"
                    >
                      <i className="bg-white rounded-full text-black p-2 hover:bg-black hover:text-white cursor-pointer">
                        <AiOutlineDelete size={18} />
                      </i>
                    </button>
                    <span
                      onClick={resetOldCard}
                      className="absolute bottom-3 right-12 flex gap-4 flex-col"
                    >
                      <i className="bg-white rounded-full text-black p-2 hover:bg-black hover:text-white cursor-pointer">
                        <RxCross1 size={18} />
                      </i>
                    </span>
                    <button
                      onClick={() => updateCard(e._id)}
                      className="absolute bottom-3 right-2 flex gap-4 flex-col"
                    >
                      <i className="bg-white rounded-full text-black p-2 hover:bg-black hover:text-white cursor-pointer">
                        <MdDone size={18} />
                      </i>
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold mb-2 text-sm">{e.title}</p>
                    <p className="mb-2 text-sm">{e.content}</p>
                    <p className="absolute bottom-3">
                      {formatDateTime(e.date)}
                    </p>
                    <button
                      onClick={() => handleEditCard(e._id)}
                      className="absolute bottom-3 right-3 flex gap-4 flex-col"
                    >
                      <i className="bg-black rounded-full text-white p-2 hover:bg-white hover:text-black cursor-pointer">
                        <MdEdit size={18} />
                      </i>
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div
              className={`bg-blue-600 shadow-lg rounded-2xl min-h-52 h-auto grid-cols-subgrid p-4 relative `}
            >
              <h3 className="font-bold mb-2 text-sm">No Notes Found</h3>
              <p>No Results Found</p>
              <p className="absolute bottom-3">{formatDate()}</p>
              {editCard === true ? (
                <div>
                  <span className="absolute bottom-3 right-[5.5rem] flex gap-4 flex-col">
                    <i className="bg-white rounded-full text-black p-2 hover:bg-black hover:text-white cursor-pointer">
                      <AiOutlineDelete size={18} />
                    </i>
                  </span>
                  <span
                    onClick={resetOldCard}
                    className="absolute bottom-3 right-12 flex gap-4 flex-col"
                  >
                    <i className="bg-white rounded-full text-black p-2 hover:bg-black hover:text-white cursor-pointer">
                      <RxCross1 size={18} />
                    </i>
                  </span>
                  <span className="absolute bottom-3 right-2 flex gap-4 flex-col">
                    <i className="bg-white rounded-full text-black p-2 hover:bg-black hover:text-white cursor-pointer">
                      <MdDone size={18} />
                    </i>
                  </span>
                </div>
              ) : (
                <span
                  onClick={() => {
                    handleEditCard();
                  }}
                  className="absolute bottom-3 right-3 flex gap-4 flex-col"
                >
                  <i className="bg-black rounded-full text-white p-2 hover:bg-white hover:text-black cursor-pointer">
                    <MdEdit size={18} />
                  </i>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
