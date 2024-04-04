function Logo() {
    const logoStyles = `logo flex -ml-3 -mt-4 px-2 py-2  cursor-pointer`;
    const logoGradients = `bg-gradient-to-r from-yellow-300 to to-pink-100`;
return (
    <div className={logoStyles} >
        <img  src="/med.jpeg" alt="logo" className={`w-12 h-12 mx-3 my-2 p-1 ${logoGradients} rounded-full border `}/>
    </div>
  )
}

export default Logo
