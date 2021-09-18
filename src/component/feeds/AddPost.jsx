import React from "react";
 
const AddPost = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6 mb-5">
      <div className="p-6">
        {/* add post main phot and name div */}
        <div className="flex space-x-3 items-center">
          <img src="https://image.shutterstock.com/image-photo/sky-cloulds-blackgroundselection-focus-only-260nw-1202241937.jpg" className="h-9 w-9 rounded-full" alt="" />
          <div>
            <h1>Jones Augestine</h1>
            <select class="" title="asa">
              <option selected>Public</option>
              <option>
               Only me
              </option>
             </select>
          </div>
          
        </div>
        <div className="mt-3">
          <div className="flex flex-col">
            <input type="text"  placeholder="title" className="h-4 p-4 m-2 outline-none"/>
            <textarea type="text"  placeholder="Content" className=" p-4 m-2 outline-none resize-none" rows="" />
            <hr />
          </div>
          {/* options */}
          <div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
