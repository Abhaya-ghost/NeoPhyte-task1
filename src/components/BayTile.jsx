import React from 'react'
import { IoMdSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Dropdown from './Dropdown';

const BayTile = ({ ind, bay, handleDelete}) => {
    return (
        <div className="flex flex-col">
            <div className='flex flex-row mt-10'>
                <div className='border border-gray-400 w-10 rounded-md ml-8 mr-8 text-center content-center'>{ind+1}</div>
                <Dropdown />
                <div className='flex flex-row items-center'>
                    <IoMdSettings className='ml-7 w-6 h-6' color='green' />
                    <MdDelete className='ml-7 w-6 h-6' color='red' onClick={() => handleDelete(ind)}/>
                </div>
            </div>
            <div className="flex flex-row">
                <span className='mr-4'>X: {bay.x}</span>
                <span className='mr-4'>Y: {bay.y}</span>
                <span className='mr-4'>Width: {bay.width}</span>
                <span className='mr-4'>Height: {bay.height}</span>
            </div>
        </div>
    )
}

export default BayTile