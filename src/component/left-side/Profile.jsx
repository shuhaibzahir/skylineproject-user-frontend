import React from 'react'
import {IoMdPhotos} from "react-icons/io"
import {MdVideoLibrary} from "react-icons/md"
import {GoVerified} from "react-icons/go"
const Profile = () => {
    let profieImageClass = "h-20 transform  md:m-1 hover:scale-125 duration-300 ease-in-out w-20 m-2 cursor-pointer"
    return (
        <div className="bg-white shadow-md p-6 mt-4  rounded-2xl">
                     {/* this is top div */}
                     <div className="flex items-center ">
                        <img src="https://yt3.ggpht.com/ytc/AKedOLTIbYSBxZvTQV8isj_TFE3KkXyyLBTxfdAypcfiqQ=s900-c-k-c0x00ffffff-no-rj" className="h-16 rounded-full" alt="" />
                        <div className="flex flex-col w-full ml-4">
                            <div className="flex items-center space-x-2">
                            <h1 className="text-dark text-lg inline">shuhaib zahir </h1>
                            <GoVerified size="1.4rem" color="green" />
                            </div>
                            
                            <div className="flex space-x-6 mt-2 capitalize text-center ">
                                {/* follow items */}
                                <div className="">
                                    <h1 className="text-dark-gray  ">post</h1>
                                    <p className="text-dark font-bold">30</p>
                                </div>
                                <div>
                                    <h1 className="text-dark-gray  ">follow</h1>
                                    <p className="text-dark font-bold">2560</p>
                                </div>
                                <div>
                                    <h1 className="text-dark-gray ">following</h1>
                                    <p className="text-dark font-bold">175</p>
                                </div>
                                {/* follow items end */}
                            </div>
                        </div>
                     </div>
                     <hr className="m-3"/>
                      {/* bottom div */}
                      <div className=" px-3 md:px-1">
                      <div className="flex items-center mb-4 justify-start space-x-3 text-dark text-lg">
                            <p>photos</p>
                            <IoMdPhotos size="1.5rem" />
                            <MdVideoLibrary size="1.5rem"/>
                        </div>
                        <div className="flex flex-wrap justify-around items-center">
                            <img src="https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className={profieImageClass} alt="" />
                            <img src="https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className={profieImageClass} alt="" />
                            <img src="https://www.wallpaperuse.com/wallp/57-570065_m.jpg" className="h-20 w-20 m-2" alt="" />
                            <img src="https://buildings.honeywell.com/content/dam/hbtbt/en/images/horizontal/street-view-buildings-2880x1440.jpg" className={profieImageClass} alt="" />
                            <img src="https://cdn.britannica.com/73/114973-050-2DC46083/Midtown-Manhattan-Empire-State-Building-New-York.jpg" className={profieImageClass} alt="" />
                            <img src="https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"className={profieImageClass} alt="" />
                            <img src="https://www.ul.com/sites/g/files/qbfpbp251/files/styles/hero_boxed_width/public/2020-07/glass-building-2400x1600.jpg?itok=0WE2lWhl " className={profieImageClass} alt="" />
                            <img src="https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className={profieImageClass} alt="" />
                            <img src="https://images.adsttc.com/media/images/5da5/56f8/3312/fd3f/6a00/0052/newsletter/1-O_Mbuildings_PhotoByBruceDamonte.jpg?1571116781" className={profieImageClass} alt="" />

                        </div>
                        <button className="bg-pink hover:bg-dark-white hover:text-dark duration-300 h-10 text-white text-center my-3 hover:shadow-md rounded-full w-full">Show more</button>
                      </div>
                 </div>
    )
}

export default Profile
