import React from "react";

function BoxResultPlaceholder() {
    return <li className="px-4 mx-2 mt-20 border-2 bg-gray-100 border-gray-300 relative rounded-lg">

        <div className='flex justify-center px-2'>
            <div className='pt-[24px] flex flex-col items-center '>
                <div className=' bg-gray-200 rounded-full flex items-center justify-center w-[95px] h-[95px] md:w-[100px] md:h-[100px] lg:w-[110px] lg:h-[110px]'></div>
                {/* <p className='text-xl pt-1.5'>Home Team</p> */}
                <div className="mt-2 w-24 h-6 rounded-xl bg-gray-200"></div>
            </div>

            <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center'>

                    <div className="mx-4 rounded-lg bg-gray-200 w-20 h-4"></div>


                    {/* <p className='pl-4 text-2xl lg:text-3xl'>Score</p>
                    <p className='mx-2 text-3xl'>-</p>
                    <p className='pr-4 text-2xl lg:text-3xl'>Score</p> */}
                </div>

                <div className="mt-2 rounded-lg bg-gray-200 w-16 h-4"></div>


            </div>
            <div className='pt-[24px] pb-[15px] flex flex-col items-center'>

                <div className='bg-gray-200 w-[95px] h-[95px] rounded-full flex justify-center items-center md:w-[100px] md:h-[100px] lg:w-[110px] lg:h-[110px]'></div>

                <div className="mt-2 w-24 h-6 rounded-xl bg-gray-200"></div>

            </div>
        </div>
    </li>
}

export default BoxResultPlaceholder;
