import React from 'react'
 

import Stories from './Stories'
import AddPost from './AddPost'

const Feeds = ({flex}) => {
    return (
        <div  className={`${flex} min-h-withoutHeader w-full`}>
            
           <div className="p-6 ml-6 w-full  ">
          
            < Stories />
         {/* addpost div */}
              <AddPost />
             
           </div>
         
        </div>
    )
}

export default Feeds
