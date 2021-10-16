import React,{useState} from 'react'
import UserStoryView from "./StoryViewModal"
const OtherUsersStory = ({data}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    return (
     <div className="">
        <div onClick={()=>{handleOpen()}}>
          <img
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://launchfulfillment.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg";
            }}
            src={data.imageLink}
            className={` border-white-100 border-4 h-24 w-24  cursor-pointer rounded-full`}
            alt=""
          />
         </div>
         {data&&<UserStoryView data={data} open={open} setOpen={setOpen} handleOpen={handleOpen}/>}
      </div>
    )
}

export default OtherUsersStory
