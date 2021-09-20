import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

import { Navbar, NavbarToggler, Collapse, Nav, NavItem } from "reactstrap";

import Nderfaqja1 from "./pages/Nderfaqja1";
import Nderfaqja2 from "./pages/Nderfaqja2";
import Nderfaqja3 from "./pages/Nderfaqja3";

// API Calls
import AjaxHelper from "./helpers/AjaxHelper/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      posts: null,
      comments: null,
      todos: null,
      loading: true,
      setUsers: (users) => {
        this.setState({
          users: users,
        });
      },
      setPosts: (posts) => {
        this.setState({
          posts: posts,
        });
      },
      setLoading: (loading) => {
        this.setState({
          loading: loading,
        });
      },
      setComments: (comments) => {
        this.setState({
          comments: comments,
        });
      },
      setTodos: (todos) => {
        this.setState({
          todos: todos,
        });
      },
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    const ajaxHelper = new AjaxHelper();
    const { setUsers, setPosts, setLoading, setComments, setTodos } =
      this.state;

    ajaxHelper.getData("/users").then((data) => {
      setUsers(data);
      setLoading(false);
    });

    ajaxHelper.getData("/posts").then((data) => {
      setPosts(data);
    });

    ajaxHelper.getData("/comments").then((data) => {
      setComments(data);
    });

    ajaxHelper.getData("/todos").then((data) => {
      setTodos(data);
    });
  }

  handleCreate(data) {
    const { posts, setPosts } = this.state;
    let dataArray = [data];
    let postsCopy = dataArray.concat(posts);
    setPosts(postsCopy);
  }

  handleEdit(data) {
    const { posts, setPosts } = this.state;
    let postsCopy = [];
    if (posts) {
      posts.forEach((post) => {
        if (post.id === data.id) {
          post = data;
        }
        postsCopy.push(post);
      });
    }
    setPosts(postsCopy);
  }

  handleDelete(data) {
    const { posts, setPosts } = this.state;
    let postsCopy = [];

    postsCopy = posts.filter((post) => {
      return post.id !== data;
    });

    setPosts(postsCopy);
  }

  render() {
    const { users, posts, loading, comments, todos } = this.state;

    return (
      <React.Fragment>
        <Router>
          <div>
            <Navbar color="dark" dark expand="md">
              <NavbarToggler
                onClick={() => {
                  console.log("toggle");
                }}
              />
              <Collapse isOpen={true} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <Link className="text-white mr-2" to="/">
                      Posts
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="text-white" to="/users">
                      Comments
                    </Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>

            <Switch>
              <Route path="/users/:userId">
                <Nderfaqja3
                  props={{
                    posts: posts,
                    comments: comments,
                  }}
                />
              </Route>
              <Route path="/users">
                <Nderfaqja2
                  props={{
                    posts: posts,
                    users: users,
                    comments: comments,
                    todos: todos,
                    loading: loading,
                  }}
                />
              </Route>
              <Route path="/">
                <Nderfaqja1
                  props={{
                    posts: posts,
                    users: users,
                    loading: loading,
                    handleCreate: this.handleCreate,
                    handleEdit: this.handleEdit,
                    handleDelete: this.handleDelete,
                  }}
                />
              </Route>
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
