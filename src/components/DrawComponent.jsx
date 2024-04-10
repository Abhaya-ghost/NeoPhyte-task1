import React from 'react'

const DrawComponent = ({ annotate }) => {
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

    return (
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
    )
}

export default DrawComponent