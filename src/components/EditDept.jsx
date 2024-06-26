import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { TextField } from "@mui/material";
import Chrome from "@uiw/react-color-chrome";
import { GithubPlacement } from "@uiw/react-color-github";

const EditDept = ({ id, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deptName, setDeptName] = useState("");
  const [hex, setHex] = useState("#4F46E5");
  const [loading, setLoading] = useState(false); // State for loading

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleDepartmentNameChange = async () => {
    setLoading(true); // Set loading to true when API call starts
    let body = {
      name: deptName,
      metadata: {
        bg: hex,
        border: "#B7B6C2",
      },
    };

    try {
      let token = JSON.parse(secureLocalStorage.getItem("token"));

      let renameDept = await axios.put(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/dept/updateDept/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token.session.access_token}`,
          },
        }
      );

      console.log(renameDept);
      setLoading(false); // Set loading back to false after successful response
      closeDialog(); // Close dialog after successful response
    } catch (error) {
      console.log("error occurred at rename department.", error);
      setLoading(false); // Set loading back to false if there's an error
    }
  };

  return (
    <div className="">
      <button onClick={openDialog} className="text-sm">
        Edit
      </button>

      <Dialog
        open={isOpen}
        onClose={closeDialog}
        PaperProps={{
          style: {
            borderRadius: "5px",
          },
        }}
      >
        <DialogTitle>Rename Department</DialogTitle>
        <DialogContent
          style={{
            backgroundColor: "#F7F8FA",
          }}
        >
          <div className="my-2 w-[486px] p-3">
            <p className="text-sm">
              Current department name :{" "}
              <span className="text-lg text-purple-600">
                {name ? name : "No name provided"}
              </span>
            </p>
            {/* <p>id: {id ? id : "No ID provided"}</p> */}
            <p className="">New name :</p>

            <input
              className="w-full border border-gray-300 rounded-md my-2 px-2 py-1"
              type="text"
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
            />

            <span>
              <p className="text-gray-700 my-2">Department Color</p>
              <Chrome
                color={hex}
                style={{ width: "100%", margin: "auto" }}
                placement={GithubPlacement.Right}
                onChange={(color) => {
                  setHex(color.hexa);
                }}
              />
            </span>
          </div>
        </DialogContent>
        <DialogActions sx={{ padding: "10px" }}>
          <button
            className="px-2 py-1 mx-2 rounded-lg shadow-sm border border-gray-300"
            onClick={closeDialog}
            color="primary"
          >
            Close
          </button>
          <button
            className="px-2 py-1 rounded-lg shadow-sm bg-[#5E5ADB] text-white"
            onClick={handleDepartmentNameChange}
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Rename Department"
            )}{" "}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditDept;
