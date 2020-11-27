import React from "react";
import {useDispatch,useSelector} from 'react-redux'
import { useState,useEffect  } from "react";
import { userAction } from "../../action";
// components

export default function CardProfile() {


  return (
    
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src={require("assets/img/meo.jpg")}
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>


          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
              Hoàng Hữu Mạnh
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
           
              Lớp 16tclc3
            </div>
            <div className="mb-2 text-gray-700 mt-10">
        
              Đại học Bách Khoa - Đại học Đà Nẵng
            </div>
            <div className="mb-2 text-gray-700">
              <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
              
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-gray-300 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-gray-800">

                </p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
