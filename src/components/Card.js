import React from "react";
import Loading from "./Loading";
import {
	Panel
} from "react-bootstrap";
class Card extends React.Component {
	render() {
		const { loading, title, error, onClick } = this.props;
		return (
			<Panel onClick={onClick}>
				<Panel.Heading>
					<Panel.Title componentClass="h3">{title}</Panel.Title>
				</Panel.Heading>
				<Panel.Body>
					{
						loading ? (error !== 0 ? <p>Woops! There was an problem loading this card :(</p> : < Loading height={"50px"} />) : this.props.children
					}
				</Panel.Body>
			</Panel>
		);
	}
}

export default Card;
