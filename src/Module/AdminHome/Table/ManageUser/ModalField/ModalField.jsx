import { Box, Modal } from "@mui/material";
import React from "react";
import AddUser from "../AddUser/AddUser";
import EditUser from "../EditUser";

const ModalField = ({
  openModal,
  isAddUser,
  isEdit,
  isShowInfo,
  handleCloseModal,
  user,
}) => {
  
  return (
    <Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            padding: 3,
            width: "63%",
          }}
        >
          {isAddUser ? <AddUser /> : isEdit && <EditUser user={user} />}
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalField;
