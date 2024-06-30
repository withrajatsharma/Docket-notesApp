import {Link} from "react-router-dom";
import logo from "../../assets/reshot-icon-sticky-notes-MZFEWVHU7A.svg";
import { FaRegHeart } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import ProfileInfo from "../Cards/ProfileInfo";
import axiosInstance from "../../utils/axiosInstance";
import { FiLogOut } from "react-icons/fi";
import { RiAddLargeLine } from "react-icons/ri";


const SideNav = ({getLikedNotes,
    getAllNotes,
    userInfo,
    setAllNotes,
    setUserInfo,
    setLoading,
    setOpenAddEditModal}) => {


        const onLogout = async () => {
            setLoading(true);
            try {
              const response = await axiosInstance.get("/auth/logout");
        
              if (response && response.data.success) {
                setUserInfo(null);
                setAllNotes("");
                navigate("/", { replace: true });
              }
            } catch (error) {
              console.log(`error: ${error}`);
            }
            setLoading(false);
          };




  return (
    <div className=' w-[15vw] h-full overflow-hidden border '>

<Link to={"/"}>
        <div className=" pt-2 -ml-2 flex justify-center items-center">
          <img className="h-20 lg:h-[5vw]" src={logo} alt="" />
          <p className=" -ml-2 lg:text-[1.5vw] text-lg font-bold ">DOCKET</p>
        </div>
      </Link>

      <div className="  flex flex-col py-5 justify-between h-[calc(100%-88px)] ">
      <div className=" w-[90%] mx-auto h-full flex flex-col  pt-1">


      <button
      className="flex w-[100%]  gap-2 items-center text-base hover:bg-textclr  text-white justify-center bg-primary ease-linear  py-3 mb-2 rounded-lg"
      onClick={() => {
        setOpenAddEditModal({ isShow: true, type: "add", data: null });
      }}
    >
      
      <RiAddLargeLine  className="text-xl font-bold" />
         Add Note
      
    </button>

<div className="pl-5 flex flex-col justify-between h-full py-8">
<div className="flex flex-col gap-2 ">


    

    
<button
  className="flex  gap-2 items-center hover:bg-secondary ease-linear  py-2 rounded-lg hover:pl-5 transition-all"
  onClick={() => {
    getAllNotes();
  }}
>
  
      <CgNotes className={`text-xl text-primary`} />
     All Notes
  
</button>
<button
  className="flex  gap-2 items-center hover:bg-secondary ease-linear  py-2 rounded-lg hover:pl-5 transition-all"
  onClick={() => {
     getLikedNotes(); 
  }}
>

      <FaRegHeart className={`text-xl text-primary `} />
      Favourites
    
  
</button>
</div>




<button className='flex  gap-2 items-center hover:bg-secondary ease-linear  py-2 rounded-lg hover:pl-5 transition-all  ' onClick={onLogout}>
<FiLogOut className="text-xl text-primary" />
                Logout
            </button>
</div>


  



</div>
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>

    



    </div>
  )
}

export default SideNav