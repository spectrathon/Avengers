import React,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import  Button  from '@mui/material/Button';
function ContactFormPhone({display}) {
  const initData = {name:'', email:'',msg:''};
  const [formData,setFormData] = useState({...initData});
  const handleInputChange = (e) =>{
    setFormData(prevformData => {return {...prevformData,[e.target.name]:e.target.value}});
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(formData.name !== '' && formData.email !== '' && formData.msg !== ''){
      console.log(formData);//post api 
      setFormData(initData);
    }
  }
  const gradientStyles = `bg-gradient-to-r from-yellow-200 to-purple-300`;
  return (
    <div className="flex justify-center items-center h-fit">
    <div style={{display:display}} className={`contact-inner flex flex-end justify-center items-center ${gradientStyles} shadow-2xl rounded-md mt-12 w-72 h-96  `}>
        <div className='flex justify-center flex-col'>
          <form onSubmit={handleSubmit}>
            <Box sx={{width: 500,maxWidth: '100%', marginTop:2, paddingLeft:2, paddingRight:2, textAlign:'center'}}>
              <div className='font-Roboto tracking-tighter text-sm font-bold'>leave a message !</div>
            </Box>
            <Box sx={{width: 500,maxWidth: '100%', marginTop:2, paddingLeft:2, paddingRight:2}}>
              <TextField fullWidth label="Name :"  name='name' value={formData.name} onChange={(e)=>{handleInputChange(e)}} variant='outlined' InputLabelProps={{ style: { fontFamily: '"Helvetica Neue"' }}} InputProps={{ style: { fontFamily:'"Courier New', letterSpacing: -1}}}/>
            </Box>
            <Box sx={{width: 500,maxWidth: '100%', marginTop:2, paddingLeft:2, paddingRight:2}}>
              <TextField fullWidth label="Email :" name='email' value={formData.email} onChange={(e)=>{handleInputChange(e)}} variant='outlined' InputLabelProps={{ style: { fontFamily: '"Helvetica Neue"' }}} InputProps={{ style: { fontFamily:'"Courier New', letterSpacing: -1}}}/>
            </Box>           
            <Box sx={{width: 500,maxWidth: '100%', marginTop:2, paddingLeft:2, paddingRight:2}}>
              <textarea style={{fontFamily:'Courier New',outline:'none', resize:'none', scrollbarWidth:'none'}} name='msg' onChange={(e)=>{handleInputChange(e)}} value={formData.msg} className='pl-1 pr-px pt-1 tracking-tighter text-sm bg-transparent w-full border border-gray-400 border-opacity-75 rounded-md hover:border-zinc-900s focus:outline-blue-600' rows={3}></textarea>
            </Box>

            <Box sx={{width: 500,maxWidth: '100%', marginTop:2, paddingLeft:2, paddingRight:2, textAlign:'center'}}>
              <Button type='submit' variant='outlined' color='secondary' >Send</Button>
            </Box>
            <ContactDetails />
          </form>  
        </div>
    </div>
    </div>
  )
}

const ContactDetails = React.memo(()=>{
  return (<Box sx={{width: 500,maxWidth: '100%', marginTop:2, paddingLeft:2, paddingRight:2, textAlign:'center'}}>
              <div className="text-sm font-Roboto tracking-tighter font-bold">Or email at  codwithlalith@gmail.com</div>
            </Box>)
});

export default ContactFormPhone
