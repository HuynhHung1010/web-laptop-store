import React from 'react'
import PropTypes from 'prop-types'

const Grid = props => {

    const style = {
        gap: props.gap ? `${props.gap}px` : '0'
    }

    const col = props.col ? `grid-col-${props.col}` : '0';
    const mdCol = props.mdCol ? `grid-col-md-${props.mdCol}` : '0';
    const smCol = props.smCol ? `grid-col-sm-${props.smCol}` : '0';


    return (
        <div className={`grid ${col} ${mdCol} ${smCol}`} style={style}>
            {props.children}
        </div>
    )
}

Grid.propTypes = {
    col: PropTypes.number.isRequired,
    mdCol: PropTypes.number,
    smCol: PropTypes.number,
    gap: PropTypes.number

}

export default Grid
