import React from "react";
import {useDispatch,useSelector} from 'react-redux'
import { useState,useEffect  } from "react";
import { userAction } from "../../action";
import axios from 'axios';
// components

export default function CardSettings() {


  function handleSubmit(e){
    console.log("kjhgfds");
    e.preventDefault();
    if (inputs['newpassword'] !== inputs['re_enter']){
      
        alert("Mật khẩu bạn nhập không khớp!")
    }
    else{
      axios.put('http://127.0.0.1:8000/api/change_pass', {
        username: inputs['username'],
        password: inputs['newpassword']
      })
      .then(function (response) {
        alert("Mật khẩu bạn đã được đổi")
      })
      .catch(function (error) {
        alert("Lỗi:",error)
      });
    }



  }
  const profile = useSelector(state=>state.authentication.user);
  const[inputs,setInputs]=useState({
    username:profile.user.username,
    email:profile.user.email,
    newpassword:'',
    re_enter:'',

  });
  function handleChange(e){
    
    const {name,value} = e.target;
    
    setInputs(inputs=>({...inputs,[name]:value}));
  }
  console.log("hello:",inputs)
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">My account</h6>
            <button
              className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleSubmit}
            >
              Update
              
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Admin Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    value={inputs['username']}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    value={inputs['email']}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    New password
                  </label>
                  <input
                    type="text"
                    name="newpassword"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    value={inputs['newpassword']} onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    New password again
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    name="re_enter"
                    value={inputs['re_enter']} onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            

            <hr className="mt-6 border-b-1 border-gray-400" />



          </form>
        </div>
      </div>
    </>
  );
}
