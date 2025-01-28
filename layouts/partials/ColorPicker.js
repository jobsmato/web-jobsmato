import { useLottie } from 'lottie-react'
import React from 'react'
import lottieData from './business-salesman.json'
const ColorPicker = () => {
    const { View, setSpeed, play, setDirection } = useLottie(
        {
            animationData: lottieData,
            loop: false,
            autoplay: false,
        }
    )

    setSpeed(1)

    return (
        <div
            className="absolute color-picker w-80"
            onMouseEnter={() => {
                setDirection(1)
                play()
            }}
            onMouseLeave={() => {
                setDirection(-1)
                play()
            }}
        >
           {View}
        </div>
    )
}

export default ColorPicker
