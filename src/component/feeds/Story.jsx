import React from 'react'

const Story = ({viewd}) => {
    return (
        <div className="">
            <div>
                <img src="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3RvcnklMjBib29rfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" className={`${viewd?"border-white-100 border-4 ":"border-pink border-4 shadow-md"} h-24 w-24  cursor-pointer rounded-full`}  alt="" />
            </div>
        </div>
    )
}

export default Story
