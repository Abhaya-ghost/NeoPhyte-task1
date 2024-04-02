import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-gray-300 h-15">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <a href="#" className="text-black text-xl">Trends-NeoPhyte Test Store</a>
                <div className="flex space-x-4">
                    <button className='w-20 h-10 rounded-md bg-white text-black hover:text-gray-400'>Clear</button>
                    <button className="w-20 h-10 rounded-md bg-white text-black hover:text-gray-400">Undo</button>
                    <button className="w-20 h-10 rounded-md bg-green-400 text-black hover:text-gray-400">Save</button>
                    <button className='w-20 h-10 rounded-md bg-red-400 text-black hover:text-gray-400'>Close</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar