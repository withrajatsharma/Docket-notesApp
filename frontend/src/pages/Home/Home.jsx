import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import NoteCard from "../../components/Cards/NoteCard.jsx";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes.jsx";
import Modal from "react-modal";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import Toast from "../../components/ToastMessages/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard.jsx";
import notesImg from "../../assets/list-empty-state.svg";
import noDataImg from "../../assets/undraw_taking_notes_re_bnaf.svg";
import { UserContext } from "../../context/UserContext.jsx";

const Home = ({userInfo,setUserInfo}) => {


  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [isSearch, setIsSearch] = useState(false);
  const [allNotes, setAllNotes] = useState("");
  const navigate = useNavigate();


  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShow: true, data: noteDetails, type: "edit" });
  };

  const handleDelete = async (noteData) => {
    try {
      const response = await axiosInstance.delete(
        `/note/delete-note/${noteData._id}`
      );

      // console.log(response)

      if (response.data && response.data.success) {
        // console.log(response.data);
        showToastMessage("Note deleted successfully", "delete");

        getAllNotes();
        // onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("an unexpected error has occured", error);
      }
    }
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };
  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

 

  const getAllNotes = async () => {

    try {

      const response = await axiosInstance.get("/note/get-all-notes");

      if (response.data && response.data.notes) {
        // console.log(response.data.notes);
        setAllNotes(response.data.notes);
        // navigate("/dashboard")
      }
      else{
        navigate("/login",{replace:true});

      }
    } catch (error) {
      
      navigate("/login",{replace:true});
      console.log("an unexpected error has occured");
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/note/search-note", {
        params: { query },
      });

      if (response.data) {
        console.log(response.data);
        setIsSearch(true);
        setAllNotes(response.data.matchingNotes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateIsPinned = async (noteData) => {
    try {
      const response = await axiosInstance.put(
        `/note/update-pinned/${noteData._id}`,
        {
          isPinned: !noteData.isPinned,
        }
      );

      // console.log(response)

      if (response.data && response.data.success) {
        // console.log(response.data);
        showToastMessage("Note update successfully");

        getAllNotes();
        // onClose();
      }
    } catch (error) {
      // if(error.response && error.response.data && error.response.data.message){
      console.log("an unexpected error has occured", error);
      // }
    }
  };

  const handleClearSearch = async () => {
    setIsSearch(false);
    getAllNotes();
  };


 useEffect(() => {
   
    getAllNotes();
    
  },[]);

  
  

  return (
    <>
      <Navbar
      setAllNotes={setAllNotes}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="w-[95vw] mx-auto">
        {allNotes?.length > 0 ? (
          <div className=" grid grid-cols-3 gap-4 mt-8">
            {allNotes?.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => {
                  handleEdit(item);
                }}
                onDelete={() => {
                  handleDelete(item);
                }}
                onPinNote={() => {
                  updateIsPinned(item);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? noDataImg : notesImg}
            message={
              isSearch
                ? "oops! no notes found matching your search."
                : `Start creating your first note! Click the 'ADD' button to jot down your thoughts, ideas and reminders. Let's get started!`
            }
          />
        )}
      </div>

      <button
        className=" w-16 h-16 items-center flex justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShow: true, type: "add", data: null });
        }}
      >
        <MdAdd className=" text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2",
          },
        }}
        contentLabel=""
        className=" w-[40%] max-h-[75%] bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          getAllNotes={getAllNotes}
          onClose={() => {
            setOpenAddEditModal({ isShow: false, type: "add", data: null });
          }}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
