import React, { useEffect, useState } from "react";
import debug from "sabio-debug";
import usersService from "services/usersService";
import toastr from "toastr";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./usertable.css";
import UserRow from "./UserRow";

const _logger = debug.extend("work");

function UserTable() {
  const [userArray, setUserArray] = useState({
    userList: [],
    userComponent: [],
  });

  const [paginateData, setPaginateData] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    _logger("Firing UseEffect");
    getUsers(paginateData.currentPage);
  }, [paginateData.currentPage]);

  const getUsers = (page) => {
    const index = page - 1;
    usersService.getAll(index, 10).then(onGetUserSuccess).catch(onGetUserError);
  };

  const onGetUserSuccess = (data) => {
    _logger("user", data, "this is your data");
    let user = data.item.pagedItems;
    let totalItems = data.item.totalCount;
    let userTotalPages = Math.ceil(totalItems / 10);
    setUserArray((preState) => {
      const newUser = { ...preState };
      newUser.userList = user;
      newUser.userComponent = user.map(mapUsers);
      return newUser;
    });
    setPaginateData((prevState) => {
      let newState = { ...prevState };
      newState.totalPages = userTotalPages;
      return newState;
    });
  };

  const handlePageChange = (page) => {
    setPaginateData((prevState) => {
      let newState = { ...prevState };
      newState.currentPage = page;
      return newState;
    });
  };

  const prevPage = () => {
    handlePageChange(paginateData.currentPage - 1);
  };

  const nextPage = () => {
    handlePageChange(paginateData.currentPage + 1);
  };

  const mapUsers = (aUser) => {
    return (
      <UserRow
        user={aUser}
        key={aUser.id}
        onHandleonDeactivateUser={onDeactivateUser}
        onHandleonActivateUser={onActivateUser}
      ></UserRow>
    );
  };

  const onGetUserError = (err) => {
    _logger(err, "this is an error");
    toastr.error("Error occurred when retrieving user");
  };

  const onDeactivateUser = (aUser) => {
    _logger("AUSER DEACTIVATE", aUser);
    usersService
      .updateStatus(aUser.id, 2)
      .then(onDeactivateUserSuccess)
      .catch(onDeactivateUsererror);
  };

  const onDeactivateUserSuccess = (response) => {
    toastr.success("User was deactivated");
    _logger(response);
    getUsers(paginateData.currentPage);
  };

  const onDeactivateUsererror = (err) => {
    _logger(err);
    toastr.error("Error occurred when trying to deactivate user");
  };

  const onActivateUser = (aUser) => {
    usersService
      .updateStatus(aUser.id, 1)
      .then(onActivateUserSuccess)
      .catch(onActivateUsererror);
  };

  const onActivateUserSuccess = (response) => {
    toastr.success("User was made Activate");
    _logger(response);
    getUsers(paginateData.currentPage);
  };

  const onActivateUsererror = (err) => {
    _logger(err);
    toastr.error("Error occurred when trying to deactivate user");
  };

  const onOverviewClick = () => {
    navigate(`/overview`);
  };

  return (
    <React.Fragment>
      <div className="main-user-container">
        <section className="org-table-header">
          <h1 className="text-center"> User Information </h1>
        </section>
        <div className="user-table-container">
          <Table className="table table-hover mt-3 shadow-lg">
            <thead>
              <tr className="bg-headers">
                <th className="name-table-list" scope="col">
                  First Name
                </th>
                <th className="name-table-list" scope="col">
                  Last Name
                </th>
                <th className="table-header" scope="col">
                  Email
                </th>
                <th className="table-user" scope="col">
                  Status
                </th>
                <th className="table-user" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-body">{userArray.userComponent}</tbody>
          </Table>
        </div>
        <div className="user-pagination">
          <button
            className="user-pagination-btn-right"
            onClick={prevPage}
            disabled={paginateData.currentPage === 1}
          >
            ←
          </button>
          <span>{paginateData.currentPage}</span> -{" "}
          <span>{paginateData.totalPages}</span>
          <button
            className="user-pagination-btn-left"
            onClick={nextPage}
            disabled={paginateData.currentPage === paginateData.totalPages}
          >
            →
          </button>
        </div>
        <button
          type="button"
          className="user-table-button btn-sm"
          onClick={onOverviewClick}
        >
          Back to Overview
        </button>
      </div>
    </React.Fragment>
  );
}

export default UserTable;
