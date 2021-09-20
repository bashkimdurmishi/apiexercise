import React, { Component } from "react";
import { Container, Table } from "reactstrap";

import { Link } from "react-router-dom";

class Nderfaqja2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const { users, posts, comments, todos } = this.props.props;
    const tableRows = [];

    let userPostsIds = [];
    let userPostNr = 0;
    let userCommentNr = 0;
    let userTodoNr = 0;

    if (users) {
      users.forEach((user, index) => {
        if (posts) {
          posts.forEach((post) => {
            if (post.userId === user.id) {
              userPostsIds.push(post.id);
              userPostNr++;
            }
          });
        }

        if (comments) {
          userPostsIds.forEach((id) => {
            comments.forEach((comment) => {
              if (comment.postId === id && user.email === comment.email) {
                userCommentNr++;
              }
            });
          });
        }

        if (todos) {
          todos.forEach((todo) => {
            if (todo.completed && todo.userId === user.id) {
              userTodoNr++;
            }
          });
        }

        tableRows.push(
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.company.name}</td>
            <td>
              <Link to={`/users/${user.id}`}>{userPostNr}</Link>
            </td>
            <td>{userCommentNr}</td>
            <td>{userTodoNr}</td>
          </tr>
        );

        userPostsIds = [];
        userPostNr = 0;
        userCommentNr = 0;
        userTodoNr = 0;
      });

      return tableRows;
    }

    return null;
  }

  renderTable() {
    const { users, loading } = this.props.props;

    return (
      <Table dark responsive>
        <thead>
          <tr>
            <th>NR</th>
            <th>Name</th>
            <th>Username</th>
            <th>E-Mail</th>
            <th>Company Name</th>
            <th>Nr Posts</th>
            <th>Nr Comments</th>
            <th>Nr Todos</th>
          </tr>
        </thead>
        <tbody>
          {loading && this.renderLoading()}
          {!loading && !users && this.renderNoData()}
          {users && this.renderData()}
        </tbody>
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

export default Nderfaqja2;
