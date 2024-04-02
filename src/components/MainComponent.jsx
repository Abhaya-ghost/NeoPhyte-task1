import React, { useEffect, useRef, useState } from 'react'
import store from '../assets/store.jpg'
import BayTile from './BayTile';

const MainComponent = () => {
    const [isDrawing, setIsDrawing] = useState(false)
    const [startCoordinates, setStartCoordinates] = useState({});
    const [endCoordinates, setEndCoordinates] = useState({});
    const [boxes, setBoxes] = useState([]);
    const imageRef = useRef(null);

    const handleMouseDown = (e) => {
        e.preventDefault();
        if (isDrawing) {
            return;
        }
        const x = e.clientX;
        const y = e.clientY;

        setStartCoordinates({ x, y });
        setIsDrawing(true);
    }

    const handleMouseMove = (e) => {
        e.preventDefault()
        if (!isDrawing) {
            return;
        }

        let x = e.clientX;
        let y = e.clientY;

        if (isDrawing) {
            setEndCoordinates({ x, y })
        }
    }

    const handleMouseUp = () => {
        if (isDrawing) {
            setIsDrawing(false);
            const box = {
                x: Math.min(startCoordinates.x, endCoordinates.x),
                y: Math.min(startCoordinates.y, endCoordinates.y),
                width: Math.abs(endCoordinates.x - startCoordinates.x),
                height: Math.abs(endCoordinates.y - startCoordinates.y),
            }
            setBoxes((prevBoxes) => [...prevBoxes, box])
        }
    }

    const handleDelete = (id) =>{
        setBoxes((prevBoxes) => prevBoxes.filter((box, index) => index !== id));
    }

    return (
        <div className='flex flex-row'>
            <div className="bg-white h-[42rem] w-screen overflow-hidden flex flex-row justify-center items-center">
                <div className="flex justify-center overflow-hidden flex-1 h-[40rem] border border-white"
                    onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
                    <img src={store} alt="Image" className='max-h-[97vh]' ref={imageRef} />
                    {boxes.map((rect, index) => (
                        <div key={index} className='absolute border-2 border-white cursor-not-allowed' id={index} style={{
                            left: rect.x,
                            top: rect.y,
                            width: rect.width,
                            height: rect.height,
                        }}>
                            <span className='relative text-white -top-7 left-1'>{index + 1}</span>
                        </div>
                    ))}
                    {isDrawing && (
                        <div className='absolute border-2 border-blue-500' style={{
                            left: Math.min(startCoordinates.x, endCoordinates.x),
                            top: Math.min(startCoordinates.y, endCoordinates.y),
                            width: Math.abs(endCoordinates.x - startCoordinates.x),
                            height: Math.abs(endCoordinates.y - startCoordinates.y),
                        }} />
                    )}
                </div>
            </div>
            <div className="container flex-none w-[25rem]">
                {boxes.map((bay, index) => (
                    <BayTile key={index} ind={index} bay={bay} handleDelete={handleDelete}/>
                ))}
            </div>
        </div>
    );
}

export default MainComponent