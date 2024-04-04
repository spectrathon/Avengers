import {useState,useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from '../PagesBoilerPlate/Logo.jsx';
import Contact from "../components/forms/Contact.jsx";
import MenuIcon from '@mui/icons-material/Menu';
import { SignInButton , SignedIn , SignedOut , UserButton } from "@clerk/clerk-react";
function Navbar() {
  const loc = useLocation();
  //form button
  const [contactForm, setContactForm] = useState({click:false,color:'black',bg:'#f3f4f6',formD:'none'});
  function toggleCF(){
    setContactForm((obj) => {
      return {click :!obj.click, color:'#064E3B', bg:'rgb(223 183 239)', formD: obj.click ? 'none' : 'block'}
    })
  }
  //Navigate hook and styles
  const navigate = useNavigate();
  const font_Classes = "sans-serif text-md font-bold capitalize tracking-tight ";
  const link_hover_Classes = loc.pathname === '/' ? "hover:bg-zinc-100 text-white hover:text-black" : "hover:bg-zinc-900 hover:text-white";

  //Responsive width
  const [Dstate,setDstate] = useState(window.innerWidth<=750 ? "phone" : "wide");
  useEffect(()=>{
    function responsiveNavbar(){
      if(window.innerWidth <= 750){
        setDstate("phone");
      }else{
        setDstate("wide");
      }
    };

    window.addEventListener('resize',responsiveNavbar);

    return () => {
      window.removeEventListener('resize', responsiveNavbar);
    };

  },[]);

  //Responsive list
  const [listD,setListD] = useState(false);
  function resnav(){
    setListD(!listD);
  }
  
 //scroll nav hide
 const [navbarD,setNavbarD] = useState("flex");
 const [scrollPos,setScrollPos] = useState(window.scrollY);
 useEffect(()=>{
  function handleScroll(){
    if(scrollPos < window.scrollY){
      setNavbarD("none")
      setScrollPos(window.scrollY);
    }else{
      setNavbarD("flex")
    }
  };

  window.addEventListener('scroll',handleScroll);

  return ()=>{
    window.removeEventListener('scroll',handleScroll)
  };

 },[]);

  return (
    <header style={{display:navbarD}} className={`flex justify-between w-full px-3 py-4 fixed z-[999]`}>
      <SignedOut>
        <Logo /> 
      </SignedOut>
      <SignedIn>
        <span className={`flex  px-2 py-2  cursor-pointer `}>
          <span className={`border-2 rounded-full border-purple-600`}>          
            <UserButton/>
          </span>
        </span>
      </SignedIn>
      {Dstate == "wide" && (
        <div className="links">
          {["Home", "Meditation", "Yoga", "Sleep" ,"PersonalAssistant"].map((item, index) =>
            <a key={index} onClick={() => { navigate(`/${item === "Home" ? "" : item}`) }} className={`px-3 py-3 mx-2 rounded-sm cursor-pointer ${font_Classes} ${link_hover_Classes}`}>{item}</a>
          )}
          <SignedOut>
            <SignInButton className={`px-3 py-3 mx-2 rounded-sm cursor-pointer inline-block ${font_Classes} ${link_hover_Classes} ml-20  contact-button`}/>
          </SignedOut>
          <button style={contactForm.click ? { color: contactForm.color, backgroundColor: contactForm.bg } : {}} onClick={toggleCF} className={`px-3 py-3 mx-2 rounded-sm cursor-pointer inline-block ${font_Classes} ${link_hover_Classes} contact-button`} >
            Contact
          </button>
          <Contact display={contactForm.formD} />
        </div>
      )}
      {Dstate == "phone" && (
        <div>
          <span onClick={resnav} className="absolute -ml-10 z-[999]"> < MenuIcon sx={{ fontSize : 40}} /> </span>
          <div style={{display: listD ? 'block' : 'none' }} className=" absolute bg-gray-200 rounded-md h-80 w-64 -ml-64 mt-10 z-[99] text-center">
            <div className="flex flex-col justify-center items-center">
             {["Home", "Meditation", "Yoga", "Sleep","PersonalAssistant","Contact"].map((item, index) =>
               <a key={index} onClick={() => { navigate(`/${item === "Home" ? "" : item}`); resnav(); }} className={`px-3 py-3 mb-4 w-40 ${item == "Home" ? "mt-4" : ''} rounded-sm cursor-pointer ${font_Classes} ${link_hover_Classes}`}>{item}</a>
              )}
          </div>
          </div>
        </div>
      )}
    </header>
  );
  
}

export default Navbar
