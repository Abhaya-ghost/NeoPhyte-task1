import React, { useEffect, useRef, useState } from 'react'
import store from '../assets/store.jpg'
import BayTile from './BayTile';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CustomButton from './CustomButton';

const MainComponent = () => {
    const [isDrawing, setIsDrawing] = useState(false)
    const [startCoordinates, setStartCoordinates] = useState({});
    const [endCoordinates, setEndCoordinates] = useState({});
    const [boxes, setBoxes] = useState([]);
    const [annotate, setAnnotate] = useState(false)
    const imageRef = useRef(null);

    const handleAnnotation = () => {
        setAnnotate(prevState => !prevState);
    }

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

    const handleDelete = (id) => {
        setBoxes((prevBoxes) => prevBoxes.filter((box, index) => index !== id));
    }

    const handleSave = () => {
        console.log("Clicked Save", boxes);
    };

    const handleUndo = () => {
        if (boxes.length > 0) {
          // const newRectangles = [...rectangles];
          const newBoxProps = [...boxes];
          // newRectangles.pop(); // Remove the last object
          newBoxProps.pop(); // Remove the last object
          // setRectangles(newRectangles);
          setBoxes(newBoxProps);
          // setBayId(bayId - 1);
        }
      };

      const handleClear = () => {
        setBoxes([]);
        // setBayId(0);
      };

    return (
        <>
            <nav className="bg-gray-300 h-15">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <a href="#" className="text-black text-xl">Trends-NeoPhyte Test Store</a>
                    <div className="flex space-x-4">
                        <CustomButton handleButton={handleAnnotation} title={annotate ? 'Stop' : 'Annotate'} />
                        <CustomButton handleButton={handleClear} title={'Clear'} />
                        <CustomButton handleButton={handleUndo} title={'Undo'} />
                        <CustomButton handleButton={handleSave} title={'Save'} />
                        <CustomButton handleButton={null} title={'Close'} />
                    </div>
                </div>
            </nav>
            <div className='flex flex-row'>
                <div className="bg-white h-[42rem] w-screen overflow-hidden flex flex-row justify-center items-center">
                    <TransformWrapper>
                        <TransformComponent>
                            <div className="flex justify-center overflow-hidden flex-1 h-[40rem] border border-white"
                                onMouseDown={annotate ? handleMouseDown : null} onMouseMove={annotate ? handleMouseMove : null} onMouseLeave={annotate ? handleMouseUp : null} onMouseUp={annotate ? handleMouseUp : null}>
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
                                {annotate && isDrawing && (
                                    <div className='absolute border-2 border-blue-500' style={{
                                        left: Math.min(startCoordinates.x, endCoordinates.x),
                                        top: Math.min(startCoordinates.y, endCoordinates.y),
                                        width: Math.abs(endCoordinates.x - startCoordinates.x),
                                        height: Math.abs(endCoordinates.y - startCoordinates.y),
                                    }} />
                                )}
                            </div>
                        </TransformComponent>
                    </TransformWrapper>
                </div>
                <div className="container flex-none w-[25rem]">
                    {boxes.map((bay, index) => (
                        <BayTile key={index} ind={index} bay={bay} handleDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default MainComponent