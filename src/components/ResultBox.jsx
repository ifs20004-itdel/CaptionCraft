import { useState } from "react"

const ResultBox = (
    { 
        data,
        handleClose
    }
  ) =>{
    const [isCopied, setIsCopied] = useState(false)
    const handleCopy = async() =>{
        await navigator.clipboard.writeText(data)
        console.log("caption has been successfully copied")
        setIsCopied(true)
    }
      
      return( 
            <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" className="flex overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-8 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow-xl ">
                        <div className="flex items-center justify-between p-4 border-b-2">
                            <h3 className="text-base md:text-xl font-semibold font-poppins text-gray-900 ">
                                Caption
                            </h3>
                            <button onClick={handleClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="static-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-5 m-2 md:m-8 space-y-4 bg-slate-100 rounded-xl md:rounded-3xl shadow-lg ">
                            <p className="font-poppins text-sm md:text-base text-gray-500 md:p-4">
                                {data}
                            </p>
                        </div>
                        <div className="flex items-center p-4 border-t-2 border-gray-200 rounded-b">
                            <button data-modal-hide="static-modal" type="button" className="mx-4 py-1 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100" onClick={handleCopy}>
                                {
                                    isCopied ? 
                                    "Copied" : "Copy"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
      )
  }
  
  export default ResultBox