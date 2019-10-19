import React, { Component } from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import BaseView from '../../../../src/views/BaseView'
import Modal from "react-responsive-modal"
import {
    IconButton,
    Icon,
    Tooltip,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    CardHeader,
    Typography
} from '@material-ui/core'
// import "./styles.scss"
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
    button: {
        marginRight: '5px'
    }
})


class MultipleItems extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            index: "",
            elements: null,
            slides: [
                {
                    img: "https://dummyimage.com/600x400/000/fff"
                },
                {
                    img: "https://dummyimage.com/600x400/000/B22222"
                },
                {
                    img: "https://dummyimage.com/600x400/000/7CFC00"
                },
            ],

        };
    }

    onOpenModal = e => {
        e.preventDefault();
        this.setState({ open: true, index: e.target.dataset.index });
        console.log(e.target.dataset.index);
    }

    onCloseModal = () => {
        this.setState({ open: false });
    }

    slideClicked = e => {
        e.preventDefault();
        console.log(e.type);
    }

    render() {
        // const { open } = this.state
        const open = true
        const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
            <button
                {...props}
                className={
                    "slick-prev slick-arrow" +
                    (currentSlide === 0 ? " slick-disabled" : "")
                }
                aria-hidden="true"
                aria-disabled={currentSlide === 0 ? true : false}
                type="button"
            >
                Previous
            </button>
        );
        const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
            <button
                {...props}
                className={
                    "slick-next slick-arrow" +
                    (currentSlide === slideCount - 1 ? " slick-disabled" : "")
                }
                aria-hidden="true"
                aria-disabled={currentSlide === slideCount - 1 ? true : false}
                type="button"
            >
                Next
            </button>
        );

        const settings = {
            arrows: true,
            centerMode: true,
            edgeFriction: 1,
            infinite: false,
            swipeToSlide: true,
            variableWidth: true,
            accessibility: true,
            prevArrow: <SlickArrowLeft />,
            nextArrow: <SlickArrowRight />,
            focusOnSelect: true,
            draggable: true

            // afterChange: this.nextClick
        };

        return (
            <div className="slides">
                <h2> Multiple items </h2>
                <Slider {...settings}>
                    {this.state.slides.map((slide, index) => {
                        return (
                            <div key={index}>
                                <img src={slide.img} data-index={index} />
                                <p>Slide {index}</p>
                            </div>
                        );
                    })}
                </Slider>
                {/* <Modal open={open} onClose={this.onCloseModal} center>
                    <h2>Simple centered modal {this.state.index}</h2>
                </Modal> */}
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(MultipleItems))
