import React, { useState } from "react";
import Logo from "./Logo";
import * as Yup from 'yup'

const Footer = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [mob,setMob] = useState("")
  const [msg,setMsg] = useState("")
  const [errors,setErrors] = useState("")

  const validationSchema = Yup.object({
    name:Yup.string().min(2,"Name must be atleast 2 characters long").required("Name is required"),
    email : Yup.string().required("Email is required").email("Invalid email format"),
    mob: Yup.string()
    // .min(10,"Invalid mobile number")
    .required("Number is required"),
    msg : Yup.string().required("Message is required")
  })

  const sendMessage = async()=>{
    fetch("https://formspree.io/f/xyzgalnr", {
      method: "POST",
      body: new FormData(e.target),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Message sent");
          e.target.reset();
        } else {
          // console.log(response)
          alert("Failed to send message");
        }
      })
      .catch((err) => {
        alert("Failed to send message");
        console.log(err);
      });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(e.target)
    try{
        await validationSchema.validate({name,email,mob,msg},{abortEarly:false})
        // login()
        sendMessage()
        setErrors({})
      }catch(error){
        console.log(error)
        let newErrors = {}
        error.inner.forEach((err)=>{
          newErrors[err.path]=err.message;
          setErrors(newErrors)
        })
      }     
    
  };

  return (
    <div className="mt-4 w-full border-t-2 ">
      <div className="flex justify-evenly mb-0 m-4 flex-wrap">
        <div className="">
          <Logo></Logo>
        </div>
        <div className="">
          <p className="font-bold mb-2 text-lg">Important Links</p>
          <ul>
            <li className="cursor-pointer mb-1">Privacy policy</li>
            <li className="cursor-pointer mb-1">Terms and Conditions</li>
            <li className="cursor-pointer mb-1">Refund policy</li>
          </ul>
        </div>
        <div className="flex flex-col items-center mt-8 md:mt-0">
          <p className="font-bold text-lg mb-4">Get in Touch</p>
          <form onSubmit={handleSubmit} method="POST" className="flex justify-around flex-wrap">
            <div className="w-5/12">
              <input
                className={`w-full mb-4 p-2 border-2  rounded ${errors&&errors.name?"border-red-600":"border-gray-300"}`}
                type="text"
                placeholder="Full Name"
                name="name"
                onChange={(ev)=>setName(ev.target.value)}
                required
              />
              <input
                className={`w-full mb-4 p-2 border-2  rounded ${errors&&errors.mob?"border-red-600":"border-gray-300"}`}
                type="text"
                placeholder="Mobile number"
                name="number"
                required
                onChange={(ev)=>setMob(ev.target.value)}
              />
              <input
                className={`w-full p-2 border-2  rounded ${errors&&errors.email?"border-red-600":"border-gray-300"}`}
                type="email"
                placeholder="Email"
                name="email"
                required
                onChange={(ev)=>setEmail(ev.target.value)}
              />
            </div>
            <div className="w-5/12">
            
              <textarea
                className={`w-full mb-3 p-2 border-2 h-28 rounded ${errors&&errors.msg?"border-red-600":"border-gray-300"}`}
                type="text"
                placeholder="Message"
                name="msg"
                required
                onChange={(ev)=>setMsg(ev.target.value)}
                />
              <input
                className="w-full p-2 border-2 bg-black text-white font-bold rounded"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
