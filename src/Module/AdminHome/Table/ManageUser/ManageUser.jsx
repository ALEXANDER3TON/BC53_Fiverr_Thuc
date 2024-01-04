import {
  Box,
  Button,
  IconButton,
  Modal,
  Pagination,
  PaginationItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  deleteUserAPI,
  getListUserPagination,
  getUserAPI,
} from "../../../../APIs/AdminTechnique";

import Search from "./Search";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddUser from "./AddUser/AddUser";
import Swal from "sweetalert2";
import ModalField from "./ModalField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "54%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};
const ManageUser = () => {
  const columns = [
    "Name",
    "Email",
    "Gender",
    "Birthday",
    "Phone",
    "Role",
    "Action",
  ];
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [keyword, setKeyword] = useState("");
  const queryClient = useQueryClient();
  const { data: getListPagination = {} } = useQuery({
    queryKey: ["LIST_USER_PAGINATION", keyword, pageIndex, pageSize],
    queryFn: () => getListUserPagination(keyword, pageIndex, pageSize),
  });
  const { mutate: handleDeleteUser } = useMutation({
    mutationKey: ["DELETE_USER"],
    mutationFn: (userId) => deleteUserAPI(userId),
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["LIST_USER_PAGINATION"]);
    },
  });
  const userPagination = getListPagination?.data;
  const count = Math.ceil(getListPagination?.totalRow / pageSize);
  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };
  // console.log("userPagination", userPagination);
  const [openModal, setOpenModal] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [user, setUser] = useState();
  
  const handleOpenAddUser = () => {
    return setOpenModal(true), setIsAddUser(true);
  };
  const handleOpenEdit = (user) => {
    return setOpenModal(true), setIsEdit(true), setUser(user);
  };
  const handleOpenShowInfo = (userId) => {
    return setOpenModal(true), setIsShowInfo(true), setUser(userId);
  };
  const handleCloseModal = () => {
    return (
      setOpenModal(false),
      setIsAddUser(false),
      setIsEdit(false),
      setIsShowInfo(false)
    );
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button onClick={handleOpenAddUser}>Add User</Button>
        <Search setKeyword={setKeyword} />
      </Box>
      <ModalField
        openModal={openModal}
        isAddUser={isAddUser}
        isEdit={isEdit}
        isShowInfo={isShowInfo}
        handleCloseModal={handleCloseModal}
        user={user}
      />
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => {
                  return (
                    <TableCell key={index}
                      sx={{ textTransform: "uppercase", fontWeight: 600 }}
                    >
                      {column}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {userPagination?.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.gender ? "Nam" : "Nữ"}</TableCell>
                    <TableCell>{item.birthday}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>
                      <Button
                        sx={{ minWidth: 0, padding: 1 }}
                        onClick={() => handleOpenEdit(item)}
                      >
                        <EditNoteIcon />
                      </Button>
                      <Button
                        sx={{ minWidth: 0, padding: 1 }}
                        onClick={() => handleDeleteUser(item.id)}
                      >
                        <DeleteIcon color="error" />
                      </Button>
                      <Button
                        sx={{ minWidth: 0, padding: 1 }}
                        onClick={() => handleOpenShowInfo(item.it)}
                      >
                        <AccountCircleIcon color="success" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}
        >
          <Pagination
            count={count}
            page={pageIndex}
            onChange={handleChangePage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ManageUser;
