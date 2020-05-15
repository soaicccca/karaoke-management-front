import { userConstants } from "../constants";
import { userService } from "../api";
import { history } from "../store";

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
  getMe,
  add,
  update,
  getById,
};

function getMe() {
  return (dispatch) => {
    dispatch(request());

    userService.getMe().then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.GETME_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GETME_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GETME_FAILURE, error };
  }
}

function login(user) {
  return (dispatch) => {
    dispatch(request({ user }));

    userService.login(user).then(
      (data) => {
        dispatch(success(data));
        dispatch(requestGetMe());

        userService.getMe().then(
          (user) => {
            dispatch(successGetMe(user));
          },
          (error) => {
            dispatch(failureGetMe(error));
            //dispatch(alertActions.error(error.toString()));
          }
        );
        history.push({ pathname: "/", state: 200 });
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(data) {
    return { type: userConstants.LOGIN_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }

  function requestGetMe() {
    return { type: userConstants.GETME_REQUEST };
  }
  function successGetMe(user) {
    return { type: userConstants.GETME_SUCCESS, user };
  }
  function failureGetMe(error) {
    return { type: userConstants.GETME_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  history.push("/login");
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success(user));
        history.push({ pathname: "/", state: 200 });
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function add(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.add(user).then(
      (user) => {
        dispatch(success(user));
        history.push({ pathname: "/users", state: 200 });
        //window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.ADD_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.ADD_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.ADD_FAILURE, error };
  }
}

function getAll() {
  return async (dispatch) => {
    dispatch(request());

    await userService.getAll().then(
      (users) => {
        dispatch(success(users));
        console.log(users);
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await userService.getById(id).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.GETBYID_REQUEST, id };
  }
  function success(user) {
    return { type: userConstants.GETBYID_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GETBYID_FAILURE, error };
  }
}

function update(id, user, image) {
  return async (dispatch) => {
    dispatch(request(id));
    await userService.update(id, user, image).then(
      (id) => {
        dispatch(success(id));
        //window.location.reload();
        history.push("/users");
        //dispatch(alertActions.success("Add new post successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(id) {
    return { type: userConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      (id) => {
        dispatch(success(id));
        window.location.reload();
      },
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
