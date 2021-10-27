
 import People  from "./People"
 
 
const OnlinePoeple = ({conversation}) => {

 

 
  

    return (
        <div className="p-6 mt-3 overscroll-auto ">
            <div className="flex space-y-4 pb-4 flex-col">
            
            {conversation?.map((c,index)=> <People key={index} conv={c}/>)}
             
               
            </div>
        </div>
    )
}

export default OnlinePoeple
