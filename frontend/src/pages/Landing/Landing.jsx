import React from 'react'
import logo from "../../assets/reshot-icon-sticky-notes-MZFEWVHU7A.svg"
import gyn from "/Group 16.svg"
import btmImg2 from "/btmimg2.png"
import btmImg4 from "/btmimg4.png"
import btmImg5 from "/btmimg5.png"
import {Link, useNavigate} from "react-router-dom"
import axiosInstance from '../../utils/axiosInstance'
import {motion} from "framer-motion"

const Landing = ({setLoading,setUserInfo}) => {

  const navigate = useNavigate();

  const handleTryDemo = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get("/auth/demo");

      if (response.data && response.data.success) {
        setUserInfo(response.data.user);
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log(`error occured in landing.jsx ${error}`);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      } else {
        console.log("an unexpected error occurred");
      }
    }

    setLoading(false);
  };


  return (
    <main className=' w-full px-5 sm:px-8 overflow-hidden h-screen relative '>

     <motion.nav  
      initial={{y:"-100%"}}
      animate={{y:0}}
      className=' w-full pt-2 flex justify-between items-center '> 

        <div className='-ml-2 sm:ml-0 flex items-center'>
          <img className='h-16' src={logo} alt="" />
          <p className=' -ml-1 sm:ml-0 sm:text-xl text-lg font-bold '>DOCKET</p>
        </div>

        <div className='flex gap-4 items-center justify-between'>
          <Link to={"/signup"} className='hidden sm:block whitespace-nowrap'>Sign up</Link>
          <Link to={"/login"} className='btn-primary px-5 flex justify-center items-center' >Login</Link>
        </div>

      </motion.nav>

     

      <motion.section
      initial={{y: "-100%"}}
      animate={{y: 0}}
      className='text-center sm:mt-0 mt-5'>
        <img className=' mx-auto w-full md:w-[80%] lg:w-[60%]' src={gyn} alt="" />
        <p className=' mt-3 sm:mt-6 lg:w-[70%] text-sm md:text-base text-primary sm:pl-10 sm:mx-auto'>Docket is your new home for ideas, records, tasks and lists. No more bloated files for taking notes. Don't have much time on your hands? Docket takes care of lots of things for you, so you can enjoy efficient note-taking without hassle.</p>
      </motion.section>

      <section className=' w-fit mx-auto mt-10 sm:mt-8 '>
          <div className='flex justify-between  gap-5 sm:gap-10 items-center pl-5 pr-2 py-1 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
              <p className=' text-primary  whitespace-nowrap text-sm md:text-base'>Don't wanna register ?</p>
                <button onClick={handleTryDemo} className="btn-primary text-sm md:text-base  whitespace-nowrap px-2 sm:px-5 rounded-lg w-fit">
          Try Demo
        </button>
          </div>
      </section>
     
        <section className='sm:hidden flex pt-5 justify-center opacity-75  items-center '>
        <img className='' src={btmImg4} alt="" />
        </section>



      <div className=' hidden    w-full sm:flex opacity-75 items-end justify-between -z-10 absolute -bottom-5 left-0'>
        <img className=' h-[40vw] -rotate-[7deg] -bottom-5 relative md:h-[30vw]  ' src={btmImg5} alt="" />
        <img className='hidden md:block h-[25vw] ' src={btmImg4} alt="" />
        <img className='  h-[40vw]  md:h-[30vw]' src={btmImg2} alt="" />
      
      </div>

    </main>
    
  )
}

export default Landing