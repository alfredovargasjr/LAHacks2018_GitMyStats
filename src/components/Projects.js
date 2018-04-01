import React from "react";
import ProjectContainer from "./ProjectContainer";
import Loading from "./Loading";
import ProjectFiles from "../projects.json";
import {
	Grid,
	Row
} from "react-bootstrap";
import {
	graphql
} from "react-apollo";
import gql from "graphql-tag";

class Projects extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFinished: false,
			loadMore: false
		};
		this.handleScroll = this.handleScroll.bind(this);
	}

	handleScroll() {
		const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
		const body = document.body;
		const html = document.documentElement;
		const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
		const windowBottom = windowHeight + window.pageYOffset + 20;

		const { loading, loadMoreEntries } = this.props;
		const { isFinished } = this.state;
		if (windowBottom >= docHeight && !loading && !isFinished) {
			this.setState({
				loadMore: true
			});
			loadMoreEntries()
				.then(({ data }) =>
					this.setState({
						isFinished: data.user.repositories.edges.length < 9,
						loadMore: false
					}));
		}
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	render() {
		const { loading, repositories } = this.props;
		const { loadMore } = this.state;
		return (
			<Grid>
				<Row>
					{
						repositories.map(({
							node
						}, index) => {
							const data = [{ name: "Watchers", value: node.watchers.totalCount }, { name: "Favorites", value: node.stargazers.totalCount }, { name: "Forks", value: node.forkCount }];
							return ([
								<ProjectContainer key={node.id} projectJSON={ProjectFiles[node.name]} node={node} data={data} />,
								<Row key={`${node.id}1`} style={{ display: (index + 1) % 3 === 0 ? "block" : "none", margin: 0 }}/>
							]
							);
						})
					}
					{(loading || loadMore) && <Loading />}
				</Row>
			</Grid>
		);
	}
}

const initialQuery = gql`
query Projects($cursor: String) { 
  user(login: "mrdokenny") {
    repositories (first: 9, after: $cursor, isFork: false, orderBy: {field:STARGAZERS, direction: DESC}) @connection(key: "repositories") {
      edges {
				cursor
        node {
          name
          id
          description
          url
          licenseInfo {
            name
          }
          languages (first: 3) {
            edges {
              node {
                id
                name
              }
            }
          }
          watchers {
            totalCount
          }
          stargazers {
            totalCount
          }
          forkCount
        }
      }
    }
  }
}`;

const ProjectsWithData = graphql(initialQuery, {
	options: {
		notifyOnNetworkStatusChange: false
	},
	props(props) {
		const { data: { loading, user, fetchMore } } = props;
		return {
			loading,
			repositories: !loading ? user.repositories.edges : [],
			loadMoreEntries: () =>
				fetchMore({
					variables: {
						cursor: user.repositories.edges[user.repositories.edges.length - 1].cursor
					},
					updateQuery: (previousResult, { fetchMoreResult }) => {
						const oldRepos = previousResult.user.repositories.edges;
						const newRepos = fetchMoreResult.user.repositories.edges;
						const combined = [...oldRepos, ...newRepos];
						// Note to self: This has to be the same JSON structure as the query
						return {
							...previousResult,
							user: {
								repositories: {
									edges: combined
								}
							}
						};
					}
				})
		};
	}

})(Projects);

export default ProjectsWithData;
