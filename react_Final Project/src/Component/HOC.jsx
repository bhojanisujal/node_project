import React, { useContext } from "react";
import { FaGear, FaMagnifyingGlass } from "react-icons/fa6";
import { GoBell } from "react-icons/go";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { MdOutlineColorLens, MdOutlineLogout, MdOutlinePassword } from "react-icons/md";
import { PiCheckSquareOffsetBold, PiKanban } from "react-icons/pi";
import { SiRiotgames, SiRollsroyce } from "react-icons/si";
import { NavLink, useNavigate } from "react-router";
import flag from '../img/images.jpg'
import flag1 from '../img/japan.jpg'
import flag2 from '../img/german.png'
import flag3 from '../img/china.png'
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Context } from "../App";
import { IoAlbumsSharp, IoArrowDownCircleOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BiDollarCircle } from "react-icons/bi";
import { TbPassword } from "react-icons/tb";

const HOC = (Component) => {

  const newComponetnt = () => {
    let profile  = JSON.parse(localStorage.getItem('login'))?.profileImageUri
 let navigate = useNavigate()

    let contexx = useContext(Context)
    const logout = () =>{
     
      localStorage.removeItem('login')
      contexx.setuser(!contexx.user)
    }
    let i = <FaMagnifyingGlass />;

    return (
      <>
        <section className="  ">
          <div id="header" className="position-fixed w-100 top-0 d-flex justify-content-between">

            <div className="logo">
              <a href="">
                Super Admin 3.0
              </a>
            </div>



            <div className="profile d-flex justify-content-between  ">

              <div className="d-flex Search justify-content-between">
                <div className="">
                  <FaMagnifyingGlass />
                  <input type="text" placeholder='Plese Search...' className="bg-transparent ps-2 pe-2 border border-0" />
                  <svg fill="currentColor" height="10" width="18">
                    <path d="m2.298 9.196a1.8 1.8 0 0 1 -.929-.247 1.91 1.91 0 0 1 -.673-.673 1.8 1.8 0 0 1 -.247-.929c0-.338.082-.652.247-.933a1.91 1.91 0 0 1 .673-.673 1.78 1.78 0 0 1 .929-.251h.989v-1.714h-.989a1.8 1.8 0 0 1 -.929-.247 1.92 1.92 0 0 1 -.673-.669c-.165-.281-.247-.592-.247-.933a1.79 1.79 0 0 1 .247-.93c.168-.281.392-.504.673-.669a1.78 1.78 0 0 1 .929-.251 1.79 1.79 0 0 1 .933.251c.281.165.506.388.673.669a1.78 1.78 0 0 1 .251.929v.98h1.713v-.98a1.79 1.79 0 0 1 .247-.929c.168-.281.391-.504.669-.669a1.79 1.79 0 0 1 .933-.251 1.77 1.77 0 0 1 .929.251 1.84 1.84 0 0 1 .669.669 1.76 1.76 0 0 1 .251.929 1.79 1.79 0 0 1 -.251.933c-.165.278-.388.501-.669.669a1.79 1.79 0 0 1 -.929.247h-.98v1.713h.98a1.77 1.77 0 0 1 .929.251 1.9 1.9 0 0 1 .669.673 1.79 1.79 0 0 1 .251.933 1.78 1.78 0 0 1 -.251.929c-.165.281-.388.506-.669.673a1.79 1.79 0 0 1 -.929.247c-.341 0-.652-.082-.933-.247a1.92 1.92 0 0 1 -.669-.673 1.8 1.8 0 0 1 -.247-.929v-.989h-1.712v.989a1.78 1.78 0 0 1 -.251.929 1.91 1.91 0 0 1 -.673.673c-.281.165-.592.247-.933.247zm0-.869c.182 0 .347-.044.494-.132a1.02 1.02 0 0 0 .358-.354.94.94 0 0 0 .136-.494v-.989h-.989a.94.94 0 0 0 -.494.136.99.99 0 0 0 -.354.358c-.088.151-.132.313-.132.494a.96.96 0 0 0 .132.494 1 1 0 0 0 .354.354.96.96 0 0 0 .494.132zm0-5.42h.989v-.98a.92.92 0 0 0 -.136-.494 1.02 1.02 0 0 0 -.358-.354.96.96 0 0 0 -.495-.133.96.96 0 0 0 -.494.132 1 1 0 0 0 -.354.354.95.95 0 0 0 -.132.494.97.97 0 0 0 .132.499 1 1 0 0 0 .354.354.95.95 0 0 0 .494.128zm4.44 0h.98a.97.97 0 0 0 .494-.128 1 1 0 0 0 .354-.354.97.97 0 0 0 .132-.499c0-.182-.044-.347-.132-.494a1.01 1.01 0 0 0 -.354-.354.95.95 0 0 0 -.494-.132.97.97 0 0 0 -.499.132 1 1 0 0 0 -.354.354.97.97 0 0 0 -.128.494v.98zm.98 5.42c.182 0 .347-.044.494-.132a1.01 1.01 0 0 0 .354-.354.96.96 0 0 0 .132-.494c0-.182-.044-.347-.132-.494a1.02 1.02 0 0 0 -.354-.358.95.95 0 0 0 -.494-.136h-.98v.989c0 .179.043.344.128.494a.96.96 0 0 0 .354.354.97.97 0 0 0 .499.132zm-3.562-2.838h1.713v-1.713h-1.713zm8.854-5.02v8.531h-1.078v-8.531zm4.289 0-2.935 3.979-1.717 2.068-.193-1.207 1.26-1.652 2.296-3.188zm-1.072 8.531-2.514-4.16.639-.896 3.158 5.056z"></path>
                  </svg>
                </div>
              </div>
              <div className="icon" >
                <GoBell />
              </div>
              <div className="icon">
                <PiCheckSquareOffsetBold />
              </div>
              <div className="icon">
                <HiOutlineSquares2X2 />
              </div>
              <div className="icon">
                <MdOutlineColorLens />
              </div>
                <div className="icon">
                  <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" className="p-0  border-0 bg-transparent ">
      <img src={flag} width={30} height={30}  className="img-fluid rounded-circle" alt="" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-3" className="d-flex justify-content-evenly"><img src={flag} className="img-fluid rounded-circle" width={20} hiding={20} alt="" />Hindi</Dropdown.Item>
        <Dropdown.Item href="#/action-1" className="d-flex justify-content-evenly"><img src={flag1} className="img-fluid rounded-circle" width={20} hiding={20} alt="" />Japanese  </Dropdown.Item>
        <Dropdown.Item href="#/action-2" className="d-flex justify-content-evenly"><img src={flag2} className="img-fluid rounded-circle" width={20} hiding={20} alt="" />German</Dropdown.Item>
        <Dropdown.Item href="#/action-3" className="d-flex justify-content-evenly"><img src={flag3} className="img-fluid rounded-circle" width={20} hiding={20} alt="" />Chinese</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
                </div>
            
              <div>
                 <Dropdown  autoClose={false}>
      <Dropdown.Toggle variant="success" id="dropdown-basic" className="p-0  border-0 bg-transparent ">
   <img src={profile} className="rounded-3" height={40} width={40} alt="" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item className="  pro  hoc-profile"  ><CgProfile className="me-2  " /> Profile</Dropdown.Item>
        <Dropdown.Item className="  pro  hoc-profile"  ><BiDollarCircle  className="me-2  " />  Billing </Dropdown.Item>
        <Dropdown.Item  className=" pro p-0 hoc-profile" href="#/action-3" >
        
        <Dropdown  autoClose={false} className="Drop-Dropdown">
      <Dropdown.Toggle  className="" style={{backgroundColor: 'transparent'}}>
       
     <div className=" d-inline-block w-100 justify-content-between"><FaGear /> Setting</div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="">
        
        <Dropdown.Item onClick={() =>{navigate('/Setting')}} className="   hoc-profile">  <TbPassword /> Change Password</Dropdown.Item>
        

      </Dropdown.Menu>
    </Dropdown>
         </Dropdown.Item >
        <Dropdown.Item className=" pro  hoc-profile" onClick={logout} ><MdOutlineLogout className="me-2  " /> Log Out</Dropdown.Item>
      
      </Dropdown.Menu>
    </Dropdown>
                
              </div>
            </div>
          </div>
          <div className="des-body d-flex">
            <div id="sidebar" className=" position-sticky start-0 text-start Side-bar  ">

              <br /><span >Dashbord</span>
              <div className="menu">
                <NavLink className='active1'  to="/Dashbord">
                  <div>  <PiKanban /> DashBord </div>
                </NavLink>
                <NavLink className='active1'  to="/Aldum">
                  <div>  <IoAlbumsSharp /> Aldum </div>
                </NavLink>
                <NavLink className='active1'  to="/Roylities">
                  <div><SiRollsroyce /> Roylities </div>
                </NavLink>
                <NavLink className='active1'  to="/Profile">
                  <div><CgProfile /> Profile </div>
                </NavLink>
                 <Dropdown className="down d-block w-100 text-start ">
      <Dropdown.Toggle  className="" style={{backgroundColor: 'transparent'}}>
       
     <div className=" d-inline-block w-100 justify-content-between"><FaGear /> Setting</div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="Setting">
        
        <Dropdown.Item  href="#/action-1">
                  <NavLink className='active1'  to="/Setting">
       Change Password
                </NavLink>
        </Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
                <NavLink  className='active1 ' onClick={logout} to="/">
                  <div><MdOutlineLogout /> Log Out </div>

                </NavLink>
              </div>
            </div>
            <div className="  component">
              <Component />
            </div>
          </div>

        </section>
      </>
    );
  };
  return newComponetnt;
};

export default HOC;
