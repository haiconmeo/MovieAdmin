import React, { useState,useEffect  } from "react";
import { Link, useLocation } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { userAction } from "../../action";

export default function Login() {
  const[inputs,setInputs]=useState({
    username:'',
    password:''
  });
  const [submitted, setSubmitted] = useState(false);
  const {username,password} =inputs;
  const loggingIn = useSelector(state=>state.authentication.loggingIn);
  const fail_login = useSelector(state=>state.authentication.fail_login);
  const dispatch =useDispatch();
  const location =useLocation();
  useEffect(()=>{
    dispatch(userAction.logout());
  },[]);
  function handleChange(e){
    
    const {name,value} = e.target;
    setInputs(inputs=>({...inputs,[name]:value}));
  }
  function handleSubmit(e){
    console.log("kjhgfds");
    e.preventDefault();
    setSubmitted(true);
    if (username && password){
      // const { from } = location.state || { from: { pathname: "/" } };
      
      dispatch(userAction.login(username, password));
      
    }

  }
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  <small>Login </small>
                </div>
                <form name="form" onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input name="username" value={username} onChange={handleChange}
                      type="username"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="username"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input name="password" value={password} onChange={handleChange}
                      type="password"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-gray-700">
                        Rememberme
                      </span>
                    </label>
                  </div>
                  {fail_login && <span style={{color:"red",textAlign:'center'}}>Lỗi rồi định hack à</span>}
                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>







          </div>
        </div>
      </div>
    </>
  );
}
