import React, { Component } from "react";
import { Container, Table } from "reactstrap";
import { withRouter } from "react-router";

class Nderfaqja3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      setUserId: (userId) => {
        this.setState({
          id: userId,
        });
      },
    };
  }

  componentDidMount() {
    const { setUserId } = this.state;
    const id = this.props.match.params.userId;
    setUserId(id);
  }

  renderLoading() {
    return (
      <tr>
        <td className="text-center" colSpan={8}>
          Duke ngarkuar te dhenat...
        </td>
      </tr>
    );
  }

  renderNoData() {
    return (
      <tr>
        <td colSpan={8}>Nuk ka te dhena.</td>
      </tr>
    );
  }

  renderData() {
    const { posts, comments } = this.props.props;
    const { id } = this.state;
    const tableRows = [];

    if (posts) {
      posts.forEach((post) => {
        // eslint-disable-next-line
        if (post.userId == id) {
          if (comments) {
            comments.forEach((comment) => {
              if (comment.postId === post.id) {
                tableRows.push(
                  <tr key={comment.id}>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                    <td>{comment.name}</td>
                    <td>{comment.body}</td>
                  </tr>
                );
              }
            });
          }
        }
      });
    }
    return tableRows;
  }

  renderTable() {
    const { posts } = this.props.props;

    return (
      <Table dark responsive>
        <thead>
          <tr>
            <th>Post Title</th>
            <th>Post Body</th>
            <th>Comment Name</th>
            <th>Comment Body</th>
          </tr>
        </thead>
        <tbody>{posts && this.renderData()}</tbody>
      </Table>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container className="px-5 py-3" fluid>
            {this.renderTable()}
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

// Using with router here so i can get the id param from route
export default withRouter(Nderfaqja3);
