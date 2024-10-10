import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect, useRef, useState } from "react";
import './App.css'
import { PaginationControl } from "react-bootstrap-pagination-control";
import { ssrImportMetaKey } from "vite/runtime";
import {DNA} from 'react-loader-spinner'

const App = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [skib, setSkib] = useState();
  const [loader, setLoader] = useState(false)
  

  const [data, setData] = useState([]);
  const genderRef = useRef();
  const majorRef = useRef();
  const formRef = useRef()

  useEffect(() => {
    const newSkip = (page - 1) * limit;
    setSkib(newSkip);
  }, [page, limit]);


  useEffect(() => {
    setLoader(true)
    fetch(
      `https://json-api.uz/api/project/11-dars/developers?skip=${skib}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        setLoader(false)
      })
  }, [skib]);

  function btn_filter(e) {
    e.preventDefault();
    setLoader(false)

    let copied = [...data];
    if (genderRef.current.value) {
      copied = copied.filter((value) => {
        // console.log(value);
        return value.gender == genderRef.current.value
      });
    }
    if (majorRef.current.value) {
      copied = copied.filter((value) => {
        return value.major == majorRef.current.value
      });
    }
    if (copied.length === 0) {
      console.log("malumot yuq")
    } else {
      setData(copied);
    }
   
    genderRef.current.value = "Gender"; 
    majorRef.current.value = "Major";

  }
  function add_data(e) {
    e.preventDefault()
    setLimit((add) => add + 10); 
  }
  return (
    <div className="continer py-8">
      
      <form ref={formRef} className="border border-solid border-gray-800 rounded-md mx-auto p-3  max-w-96 flex gap-4 flex-col">
        <select
          ref={genderRef}
          className="border border-solid border-blue-600 rounded-md text-white px-3 py-1 bg-sky-400"
        >
          <option disabled value="Gender">
            Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          ref={majorRef}
          className="border border-solid border-blue-600 rounded-md text-white px-3 py-1 bg-sky-400"
        >
          <option disabled value="Major">
            Major
          </option>
          <option value="Art History">Art History</option>
          <option value="Agricultural Science">Agricultural Science</option>
          <option value="Occupational Therapy">Occupational Therapy</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Ethics">Ethics</option>
          <option value="Neuroscience">Neuroscience</option>
          <option value="Data Science">Data Science</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Mathematics">Mathematics</option>
        </select>
        <button
          onClick={btn_filter}
          className="py-1 bg-blue-600 text-white border-none rounded-md"
        >
          Filter
        </button>
      </form>
      <div className="w-52 mt-10 mx-auto ">
      {
           loader && <DNA height="96"width="96" className="mx-auto" />  
      }
      </div>
      <div className="w-[1200px] mx-auto flex flex-wrap gap-3 mt-20 mb-11">
      
        {data.length > 0 &&
          data.map((developer) => (
            <div
              key={developer.id}
              className="w-52 bg-transparent border border-solid border-blue-500 p-3 rounded-md text-white "
            >
         
              <h1>Name: {developer.fullName}</h1>
              <h1>Major: {developer.major}</h1>
              <h1>Age: {developer.age}</h1>
              <h1>Gender: {developer.gender}</h1>
            </div>
          ))}
          <button onClick={add_data} className="mt-10 max-w-80 py-2 bg-violet-500 text-white rounded-md border-none mx-auto px-24">Ko'proq</button>
      </div>
      
      <PaginationControl
        page={page}
        between={4}
        total={315}
        limit={limit}
        changePage={(page) => {
          setPage(page);
        }}
        ellipsis={1}
      />
    </div>
  );
};
export default App;
