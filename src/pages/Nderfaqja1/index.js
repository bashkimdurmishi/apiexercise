import React, { Component } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

import AjaxHelper from "../../helpers/AjaxHelper/index";

const ajaxHelper = new AjaxHelper();

class Nderfaqja1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      toggleModal: () => {
        this.setState({
          isModalOpen: !this.state.isModalOpen,
          postId: null,
          userId: null,
          postTitle: "",
          postBody: "",
        });
      },
      modalMode: null,
      setModalMode: (mode) => {
        this.setState({
          modalMode: mode,
        });
      },
      modalTitle: null,
      setModalTitle: (title) => {
        this.setState({
          modalTitle: title,
        });
      },
      postId: null,
      userId: null,
      postTitle: "",
      postBody: "",
      setPostId: (postId) => {
        this.setState({
          postId: postId,
        });
      },
      setUserId: (userId) => {
        this.setState({
          userId: userId,
        });
      },
      setPostTitle: (postTitle) => {
        this.setState({
          postTitle: postTitle,
        });
      },
      setPostBody: (postBody) => {
        this.setState({
          postBody: postBody,
        });
      },
    };
  }

  renderModal() {
    const { handleEdit, handleCreate } = this.props.props;
    const {
      isModalOpen,
      toggleModal,
      modalTitle,
      modalMode,
      postId,
      userId,
      postTitle,
      postBody,
    } = this.state;
    return (
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalBody>
          <label>Post Title</label>
          <Input
            type="text"
            placeholder="Post Title"
            value={postTitle}
            onChange={(e) => {
              this.setState({
                postTitle: e.target.value,
              });
            }}
          ></Input>
          <label>Post Body</label>
          <Input
            type="textarea"
            rows={4}
            placeholder="Post Body"
            value={postBody}
            onChange={(e) => {
              this.setState({
                postBody: e.target.value,
              });
            }}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              if (modalMode === "edit") {
                if (postTitle && postBody) {
                  ajaxHelper
                    .putData(`/posts/${postId}`, {
                      id: postId,
                      title: postTitle,
                      body: postBody,
                      userId: userId,
                    })
                    .then((data) => {
                      handleEdit(data);
                      toggleModal();
                    });
                } else alert("Inputs can't be left empty");
              }

              if (modalMode === "create") {
                if (postTitle && postBody) {
                  ajaxHelper
                    .postData(`/posts/`, {
                      title: postTitle,
                      body: postBody,
                      userId: 1,
                    })
                    .then((data) => {
                      handleCreate(data);
                      toggleModal();
                    });
                } else alert("Inputs can't be left empty");
              }
            }}
          >
            Save
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Back
          </Button>
        </ModalFooter>
      </Modal>
    );
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
    const { users, posts, handleDelete } = this.props.props;
    const {
      setPostId,
      setUserId,
      setPostTitle,
      setPostBody,
      toggleModal,
      setModalTitle,
      setModalMode,
    } = this.state;
    const tableRows = [];

    if (posts) {
      posts.forEach((post, index) => {
        users.forEach((user) => {
          if (post.userId === user.id) {
            tableRows.push(
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{post.title}</td>
                <td>{user.company.name}</td>
                <td>{post.body}</td>
                <td style={{ width: "250px" }}>
                  <Button
                    className="mx-2"
                    color={"primary"}
                    onClick={() => {
                      setModalTitle("Edit Post");
                      setModalMode("edit");
                      toggleModal();
                      setPostId(post.id);
                      setUserId(user.id);
                      setPostTitle(post.title);
                      setPostBody(post.body);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color={"danger"}
                    onClick={() => {
                      ajaxHelper
                        .deleteData(`/posts/${post.id}`)
                        .then((data) => {
                          handleDelete(post.id);
                        });
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          }
        });
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
            <th>Post Title</th>
            <th>Company Name</th>
            <th>Post Body</th>
            <th className="text-center">Action</th>
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
    const { setModalTitle, setModalMode, toggleModal } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <Container className="px-5 py-3" fluid>
            {this.renderModal()}
            <Button
              onClick={() => {
                setModalTitle("Create Post");
                setModalMode("create");
                toggleModal();
              }}
              className="mb-3"
              color={"success"}
            >
              Create a Post
            </Button>
            {this.renderTable()}
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Nderfaqja1;
