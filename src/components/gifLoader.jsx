import React from 'react'
import './NavBar.css'
export default function gifLoader() {
  return (
    <div>
       <div className="w-60 h-80 p-4 rounded-2xl bg-gray-200 animate-pulse flex flex-col gap-4">
      <div className="w-full h-40 bg-gray-300 rounded-xl shimmer"></div>
      <div className="w-3/4 h-4 bg-gray-300 rounded-md shimmer"></div>
      <div className="w-1/2 h-4 bg-gray-300 rounded-md shimmer"></div>
      <div className="w-full h-8 bg-gray-300 rounded-lg shimmer mt-auto"></div>
    </div>
    </div>
  )
}
