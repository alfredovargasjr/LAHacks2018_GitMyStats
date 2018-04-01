import React from "react";
import Loading from "./Loading";
import Card from "./Card";
import
{
	Col,
	Jumbotron
} from "react-bootstrap";
class TopFive extends React.Component
{
    state = {
    	fetchedTopFive: {}
    }
    componentWillMount()
    {
    	this.callTopFive();
    }
    callTopFive()
    {
    	fetch("https://api.kennydo.com/githubstats/topfive")
    		.then((response) => response.json())
    		.then((fetchedTopFive) =>
    		{
    			if (fetchedTopFive.error !== undefined)
    			{
    				this.setState({ error: fetchedTopFive.error });
    			} else
    			{
    				this.setState({ fetchedTopFive });
    			}
    		})
    		.catch((error) => this.setState({ error }));
    }
    render()
    {
    	const { fetchedTopFive } = this.state;
    	if (fetchedTopFive.data === undefined)
    	{
    		return (<Col xs={12} sm={12}><Loading /></Col>);
    	}
    	return (

    		<Col xs={12} sm={12}>
            	<Jumbotron>
            		<h2><b>Top Five Programmers</b></h2>
            		<p>Show Us What You Got!</p>
            		<ol>
            			{
    						fetchedTopFive.data.map((obj, index) =>
                                <Card
                                    onClick={() => this.props.callAPI(obj.user)}    
    								key={obj.user + obj.score}
                                    title={`${index + 1}. ${obj.user}`}
                                    
    							>
    								<p>Total Score: {obj.totalScore}</p>
    							</Card>

            					/* <li key={obj.user + obj.score}>{`${obj.user}: ${obj.totalScore}`}</li>*/
    						)
            			}
            		</ol>
            	</Jumbotron>
    		</Col>
    	);
    }
}

export default TopFive;
