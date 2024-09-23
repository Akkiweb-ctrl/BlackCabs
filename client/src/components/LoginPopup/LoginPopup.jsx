import React, { useState } from "react";
import styles from "./LoginPopup.module.css";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loggedIn } from "../../store/atoms/login";
import { url } from "../../store/atoms/url";
import * as Yup from 'yup'

const LoginPopup = ({ setShowLogin, loginState, setLoginState }) => {
  const setHasLoggedIn = useSetRecoilState(loggedIn);
  const apiUrl = useRecoilValue(url);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errors,setErrors] = useState();

  const loginValidationSchema = Yup.object({
    email : Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string()
    .required("Password is required")

  })

  const registerValidationSchema = Yup.object({
    name:Yup.string().min(2,"Name must be atleast 2 characters long").required("Name is required"),
    email : Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string()
    .matches(/[!@#$%^&*()<>?";:{}|]/,"Password must contain atleast one symbol")
    .matches(/[0-9]/,"Password must contain atleast one number")
    .matches(/[a-z]/,"Password must contain atleast one lowercase character")
    .matches(/[A-Z]/,"Password must contain atleast one uppercase character")
    .min(8,"Password must be atleast 8 characters long")
    .required("Password is required"),
    checked : Yup.boolean().oneOf([true],"You must accept the terms and conditions")
  })

  const login =async()=>{
    const res = await fetch(`${apiUrl}api/user/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    if (res.ok) {
      setShowLogin(false);
      setHasLoggedIn(true);
      setErrors({})
    }
    else if(res.status===403){
      // console.log(data);
      // console.log(res);
      let newErrors = {}
      newErrors["password"]=data;
      setErrors(newErrors)

    }
    else{
      console.log(res)
      alert(res)
    }
  }

  const register = async() =>{
    const res = await fetch(`${apiUrl}api/user/register`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ name,email, password }),
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    if (res.ok) {
      // console.log(data);
      // console.log(res);
      setShowLogin(false);
      setHasLoggedIn(true);
      setErrors({})
    }
    else if(res.status===403){
      // console.log(data);
      // console.log(res);
      let newErrors = {}
      newErrors["email"]=data;
      setErrors(newErrors)

    }
    else{
      console.log(res)
      alert(res)
    }
  }
  const handleOnClick = async () => {
    if (loginState) {
      try{
        await loginValidationSchema.validate({email, password},{abortEarly:false})
        login()
        setErrors({})
      }catch(error){
        let newErrors = {}
        error.inner.forEach((err)=>{
          newErrors[err.path]=err.message;
          setErrors(newErrors)
        })
      }      
    }
    else{
      try{
        console.log(checked)
        await registerValidationSchema.validate({name,email, password,checked},{abortEarly:false})
        register()
        setErrors({})
      }catch(error){
        let newErrors = {}
        error.inner.forEach((err)=>{
          newErrors[err.path]=err.message;
          setErrors(newErrors)
        })
      }     
    }
  };
  return (
    <div
      className={`h-lvh w-full flex justify-center items-center absolute z-10 ${styles["login-popup"]} `}
    >
      <form className="bg-white min-w-80 p-8 w-1/4 border-1 rounded shadow-lg fixed ">
        <div className=" flex justify-between mb-4 items-center">
          <h3 className="text-lg font-bold">
            {loginState ? "Login" : "Sign Up"}{" "}
          </h3>
          <p
            className="text-lg font-bold cursor-pointer"
            onClick={() => {
              setShowLogin(false);
            }}
          >
            <RxCross1 />
          </p>
        </div>
        {!loginState ? (<>
          <input
            className="w-full  p-2 border-2 border-gray-300 rounded"
            type="text"
            placeholder="Your Full Name"
            onChange={(ev) => setName(ev.target.value)}
            required
          />
          {errors && errors.name && <p className="text-red-600 text-sm text-center">{errors.name}</p>}
          </>
        ) : (
          <></>
        )}
        <input
          className="w-full mt-4 p-2 border-2 border-gray-300 rounded"
          type="text"
          placeholder="Your email"
          onChange={(ev) => setEmail(ev.target.value)}
          required
        />
        {errors && errors.email && <p className="text-red-600 text-sm text-center">{errors.email}</p>}
        <input
          className="w-full mt-4 p-2  border-2 border-gray-300 rounded"
          type="password"
          placeholder="Password"
          onChange={(ev) => setPassword(ev.target.value)}
          required
        />
          {errors && errors.password && <p className="text-red-600 text-sm text-center">{errors.password}</p>}

        <Link to={"/home"}>
          <button
            type="button"
            className="p-2 border-1 rounded w-full bg-white font-bold border-black my-4"
            onClick={handleOnClick}
          >
            {loginState ? "Login" : "Sign Up"}
          </button>
        </Link>
        {!loginState && <div className="flex flex-col items-start mb-4">
          <input className="mb-1 cursor-pointer" type="checkbox" onChange={(ev)=>setChecked(ev.target.checked)} required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
          {errors && errors.checked && <p className="text-red-600 text-sm text-center">{errors.checked}</p>}

        </div>}
        <div className="flex justify-start gap-x-1">
          <p>
            {loginState ? "Create new account?" : "Already have an account?"}
          </p>
          <p
            className="font-bold cursor-pointer"
            onClick={() => setLoginState(!loginState)}
          >
            Click here
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
