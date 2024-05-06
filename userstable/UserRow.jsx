import React from "react";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";

const _logger = debug.extend("work");

function UserRow(props) {
  _logger(props, "THESE ARE USER ROW PROPS");
  const aUser = props.user;

  const onDeleteClick = (e) => {
    e.preventDefault();
    props.onHandleonDeactivateUser(aUser);
  };

  const onEditClick = () => {
    props.onHandleonActivateUser(aUser);
  };

  return (
    <tr className="list-bg-headers .row-target">
      <td>{aUser.firstName}</td>
      <td>{aUser.lastName}</td>
      <td>{aUser.email}</td>
      <td className="text-center">{aUser.status}</td>
      <td className="text-end">
        <Dropdown>
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            className="user-table-button"
          >
            options
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={onEditClick}>
              <FontAwesomeIcon icon={faPenSquare} className="me-2" />
              Activate
            </Dropdown.Item>
            <Dropdown.Item onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faTrash} className="me-2" />
              Inactivate
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}

UserRow.propTypes = {
  onHandleonDeactivateUser: PropTypes.func.isRequired,
  onHandleonActivateUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    avatrUrl: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
};

export default UserRow;
