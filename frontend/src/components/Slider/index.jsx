import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import 'boxicons'


const Slider = props => {

    const data = props.data
    const control = props.control;


    const timeOut = props.timeOut ? props.timeOut : 3000


    const [activeSlide, setActiveSlide] = useState(0);


    //tránh bị re-render
    const nextSlide = useCallback(() => {
        // dataLength = 4
        //activeSlide : 0,1,2,3
        const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1
        setActiveSlide(index)
    }, [activeSlide, data])

    const prevSlide = () => {
        const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1
        setActiveSlide(index)
    }

    useEffect(() => {
        if (props.auto) {
            const slideAuto = setInterval(() => {
                nextSlide()
            }, timeOut);

            return () => {
                clearInterval(slideAuto)
            }
        }
    }, [nextSlide, timeOut, props])






    return (
        <div className="slider">
            {
                data.map((item, index) => (
                    <div key={index} className={`slider__item ${index === activeSlide ? 'active' : ''}`} style={{
                        backgroundImage: `url("${item.img}")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',  ///cho hình lấy hết khung
                    }} >
                        < div className="slider__item__info">
                            <div className="slider__item__info__title">
                                <span>{item.title}</span>
                            </div>
                            <div className="slider__item__info__btn">
                                <Link to={item.path}>
                                    <button>Xem chi tiết</button>
                                </Link>
                            </div>
                        </div>

                    </div>

                ))
            }

            {
                control ? (
                    <div className="slider__control">
                        <div className="slider__control__item btn-slide" onClick={prevSlide}>
                            <box-icon name='left-arrow-alt'></box-icon>
                        </div>

                        <div className="slider__control__item">
                            <div className="index">
                                {activeSlide + 1}/{data.length}
                            </div>
                        </div>

                        <div className="slider__control__item btn-slide" onClick={nextSlide}>
                            <box-icon name='right-arrow-alt'></box-icon>
                        </div>

                    </div>
                ) : null
            }
        </div >
    )
}




Slider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number,
}


export default Slider
