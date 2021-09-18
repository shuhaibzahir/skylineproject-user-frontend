
 import People  from "./People"
const OnlinePoeple = ({chattingUser}) => {
    let peopleData =[{name:"Anagha s Anand",image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"},
    {name:"Joshmin Praksh",image:"https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"},
    {name:"shantha s Anand",image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"},
    {name:"ramani s Anand",image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"},
    {name:"janaki s Anand",image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"}

]
    return (
        <div className="p-6 mt-3 overscroll-auto ">
            <div className="flex space-y-4 pb-4 flex-col">
            
            {peopleData.map((onePerson)=> <People chattingUser={chattingUser} imageUrl={onePerson.image} profileName={onePerson.name}/>)}
             
               
            </div>
        </div>
    )
}

export default OnlinePoeple
