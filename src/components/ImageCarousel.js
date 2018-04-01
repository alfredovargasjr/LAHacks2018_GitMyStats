import React from "react";
import { Carousel } from "react-bootstrap";
import img1 from "../img/slider-images/image01.jpg";
import img2 from "../img/slider-images/image02.jpg";
import img3 from "../img/slider-images/image03.jpg";
import img4 from "../img/slider-images/image04.jpg";

const offset = 50;

const styles = {
	fill: {
		width: "100%",
		backgroundPosition: "center",
		backgroundSize: "cover"
	}
};

class ImageCarousel extends React.Component {
    state = {
    	height: window.innerHeight - offset
    }

    updateDimensions() {
    	let newHeight = window.innerHeight - offset;
    	this.setState({
    		height: newHeight
    	});
    }

    componentDidMount() {
    	this.updateDimensions();
    	window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
    	window.removeEventListener("resize", this.updateDimensions.bind(this));
    }
    render() {
    	return (
    		<Carousel>
    			<Carousel.Item>
    				<div style={{
    					...styles.fill,
    					height: `${this.state.height}px`,
    					backgroundImage: `url(${img1})`
    				}} />
    			</Carousel.Item>

    			<Carousel.Item>
    				<div style={{
    					...styles.fill,
    					height: `${this.state.height}px`,
    					backgroundImage: `url(${img2})`
    				}} />
    			</Carousel.Item>

    			<Carousel.Item>
    				<div style={{
    					...styles.fill,
    					height: `${this.state.height}px`,
    					backgroundImage: `url(${img3})`
    				}} />
    			</Carousel.Item>

    			<Carousel.Item>
    				<div style={{
    					...styles.fill,
    					height: `${this.state.height}px`,
    					backgroundImage: `url(${img4})`
    				}} />
    			</Carousel.Item>

    		</Carousel>
    	);
    }
}

export default ImageCarousel;
