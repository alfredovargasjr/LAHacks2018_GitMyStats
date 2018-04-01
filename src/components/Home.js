import React from "react";
import {
	Grid,
	Col,
	Row,
	Thumbnail,
	ProgressBar,
	Button,
	Form,
	InputGroup,
	FormControl,
	Jumbotron
} from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";
import { SocialIcon } from "react-social-icons";
import Card from "./Card";
import ColorfulPieChart from "./ColorfulPieChart";

const styles = {
	center: {
		textAlign: "center"
	},
	white: {
		background: "white",
		border: "1px solid #ddd",
		padding: "1em",
		marginBottom: "20px"
	},
	icons: {
		marginRight: "5px"
	},
	socialIcons: {
		marginTop: "5px"
	}
};

const bsColors = ["success", "info", "warning", "danger"];

class Home extends React.Component
{
	state = {
		fetchedObject: { languagesScore: {}, languagesScoreDiff: {}, recentCommit: {}, topContributedRepos: [] },
		fetchedProfile: {},
		error: 0,
		loading: true,
		userName: "",
		flag: false,
		expLevel: this.calcTotalExp(200)
	}

	callAPI()
	{
		fetch(`https://api.kennydo.com/githubstats?user=${this.state.userName}`)
			.then((response) => response.json())
			.then((fetchedObject) =>
			{
				if (fetchedObject.error !== undefined)
				{
					this.setState({ error: fetchedObject.error });
				} else
				{
					this.setState({ fetchedObject });
				}
				return fetch(`https://api.github.com/users/${this.state.userName}`);
			})
			.then((response) => response.json())
			.then((fetchedProfile) =>
			{
				if (fetchedProfile.error !== undefined)
				{
					this.setState({ error: fetchedProfile.error });
				} else
				{
					this.setState({ fetchedProfile, loading: false, flag: true });
				}
			})
			.catch((error) => this.setState({ error }));
	}
	calcTotalExp(maxLevel)
	{
		let points = 0;
		let lvl = 0;
		let exp = [];
		for (lvl = 0; lvl <= maxLevel; lvl++)
		{
			points += Math.floor(lvl + 20);
			exp[lvl] = points;
		}
		return exp;
	}
	render() {
		const { flag, expLevel, loading, error, fetchedObject: { languagesScore, languagesScoreDiff, recentCommit, topContributedRepos } } = this.state;
		// flag = false, start at the home screen
		if (!flag)
		{
			return (
				<Grid style={{ backgroundColor: "lightgrey", padding: "0px", borderRadius: "7px" }}>
					<Col xs={12} sm={12} style={{ backgroundColor: "lightgrey", borderRadius: "7px", paddingLeft: "0px", paddingRight: "0px" }}>
						<Jumbotron style={{
							backgroundColor: "rgb(45, 45, 45)",
							color: "white",
							position: "relative",
							width: "100%"
						}}>
							<h1 style={{ marginBottom: "25px" }}>Git My Stats</h1>
							<p >Powered by the Github API, our customer API, and a data analytic server, this website has all its data pulled from our express server using the GitHub API. The <a href="https://api.kennydo.com/">express server</a> crunches the raw data to get these stats for the user.</p>
							<p><i>Free servers are used at this moment, the cards might take a while to load if the server has slept. Please be patient :)</i></p>
						</Jumbotron>
						<h2 style={{ marginLeft: "15px", align: "center" }}>
							<b>Enter Github Username:</b>
                    	</h2>
					</Col>
					<Col xs={12} sm={8} style={{ backgroundColor: "lightgrey", borderRadius: "7px" }}>
						<Form>
							<InputGroup style={{
								width: "100%", marginBottom: "15px" }} bsSize="large" width={100}>
								<FormControl
									type="text"
									value={this.state.username}
									onKeyPress={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											this.callAPI();
										}
									}}
									onChange={(e) => this.setState({ userName: e.target.value })}
									placeholder="Git Me That Username..." />
							</InputGroup>
						</Form >
					</Col>
					<Col xs={4} sm={4}>
						<Button bsStyle="primary" bsSize="large" style={{ marginBottom: "10px" }}
							onClick={() => {
								this.callAPI();
							}}>Enter</Button>
					</Col>
				</Grid>
			);
		}
		// destructor of json fetchedProfile
		const { fetchedProfile: { avatar_url, name, bio, company, email, location, login, html_url, } } = this.state;
		let totalPoints = 0;
		Object.keys(languagesScore).forEach((key) =>
		{
			totalPoints += languagesScore[key];
		});
		let level = 0;
		for (let lvl = 0; lvl < expLevel.length; lvl++)
		{
			if (totalPoints < expLevel[lvl])
			{
				level = lvl;
				break;
			}
			level = expLevel.length;
		}
		console.log(totalPoints);
		console.log();
		const value = ((totalPoints - expLevel[level - 1]) / (expLevel[level] - expLevel[level - 1])) * 100;
		// const expLevel = this.calcTotalExp(75);
		// Display window of profile with stats
		return (
			<Grid>
				{/* textbox for the prompt username profile */}
				<Row style={{ padding: "15px", align: "center" }}>
					<Col xs={8} sm={10}>
						<Form>
							<InputGroup style={{
								width: "100%", marginBottom: "15px" }} bsSize="large" width={100}>
								<FormControl
									type="text"
									value={this.state.userName}
									onKeyPress={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											this.callAPI();
										}
									}}
									onChange={(e) => this.setState({ userName: e.target.value })} placeholder="Git Me That Username..." />
							</InputGroup>
						</Form >
					</Col>
					<Col xs={4} sm={2}>
						<Button bsStyle="primary" bsSize="large"
							onClick={() => {
								this.callAPI();
							}}>Enter</Button>
					</Col>
				</Row>
				{/* The profile information, display info if not null */}
				<Col xs={12} sm={4}>
					<Thumbnail src={avatar_url} alt={""}>
						<h2 style={styles.center}>{name}</h2>
						<h4 style={{ textAlign: "center", fontSize: "20px", fontStyle: "normal", fontWeight: "300", lineHeight: "24px", color: "grey" }}><i>{login}</i></h4>
						{
							bio !== null && <div>
								<h4>Bio</h4>
								<p>{bio}</p>
							</div>
						}
						{
							company !== null && <div>
								<h4>Company</h4>
								<p>{company}</p>
							</div>
						}
						{
							location !== null && <div>
								<h4>Location</h4>
								<p>{location}</p>
							</div>
						}
					</Thumbnail>
					{/* fitness bar */}
					{/* <h2 style={{ padding: "0px", marginBottom: "5px" }}>Programming Fitness:</h2> */}
					<Card
						loading={loading}
						error={error}
						title={"Programming Fitness:"}
					>
						<p>Level: {level}</p>
						<ProgressBar>
							<ProgressBar now={value} />
						</ProgressBar>
					</Card>
					<div style={styles.white}>
						<dl>
							<dt>Impressed? Get in touch</dt>
							<dd><a href={`mailto:${email}`} title="Click to send me an email">{email}</a><br/></dd>
						</dl>
						<div style={styles.socialIcons}>
							{email !== null && <SocialIcon style={styles.icons} url={`mailto:${email}`} network="email" title="Click to send me an email" />}
							{login !== null && <SocialIcon style={styles.icons} url={html_url} title="Come see my projects" />}
						</div>
					</div>

				</Col>
				{/* Display the user skills with progress bats for profile */}
				<Col xs={12} sm={8}>
					<Col xs={12} sm={12}>
						<Card
							loading={loading}
							error={error}
							title={"Skills Progress"}
						>
							{
								Object.keys(languagesScore).map((key, index) =>
								{
									let level = 0;
									for (let lvl = 0; lvl < expLevel.length; lvl++)
									{
										if (languagesScore[key] < expLevel[lvl])
										{
											level = lvl;
											break;
										}
										level = expLevel.length;
									}
									const diff = (languagesScoreDiff[key] / expLevel[level]) * 100;
									const value = ((languagesScore[key] - languagesScoreDiff[key]) / expLevel[level]) * 100;
									return (
										<div key={index + key}>
											<p>{key}<b>{` Level: ${level}`}</b></p>
											<p>Gain: <b>{` +${languagesScoreDiff[key]}`}</b></p>
											<ProgressBar>
												<ProgressBar striped bsStyle={bsColors[index % bsColors.length]} now={value} />
												<ProgressBar striped bsStyle={bsColors[index - 1 % bsColors.length]} now={diff} />
											</ProgressBar>
										</div>
									);
								})
							}
							<i>{"Please don't take this as an accurate representation of the users skills, but rather as an analysis of data from their GitHub Profile :)"}</i>
						</Card>

					</Col>
					<Col xs={12} sm={6}>
						<Card
							loading={loading}
							error={error}
							title={"Skills Distribution Chart"}
						>
							<ColorfulPieChart data={
								Object.keys(languagesScore).map((key) => {
									let newObj = {};
									newObj.name = key;
									newObj.value = languagesScore[key];
									return newObj;
								})
							}/>

						</Card>

					</Col>

					<Col xs={12} sm={6}>
						<Card
							loading={loading}
							error={error}
							title={"Latest Commit"}
						>
							<p>{"I made a recent commit on Repository "}<a href={recentCommit.url}>{recentCommit.name}</a>{` on ${new Date(recentCommit.pushedAt).toDateString()}`}</p>

						</Card>

					</Col>

					<Col xs={12} sm={6}>
						<Card
							loading={loading}
							error={error}
							title={"My Top 5 Repositories By Commits"}
						>
							{
								topContributedRepos.map(({ node }, index) => {
									if (index < 5) {
										return (
											<p><a href={node.url}>{node.name}</a>{` has ${node.defaultBranchRef.target.history.totalCount} commits by me.`}</p>
										);
									}
									return; // eslint-disable-line array-callback-return, consistent-return
								})
							}
							<LinkContainer to="/projects">
								<a><i>See all my Projects</i></a>
							</LinkContainer>
						</Card>

					</Col>
				</Col>
			</Grid>
		);
	}
}

export default Home;
