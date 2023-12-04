import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

const DueDate = () => {
  const [dues, setDues] = useState([]);

  useEffect(() => {
    const getDueDates = async () => {
      try {
        let token = JSON.parse(sessionStorage.getItem("token"));

        const dueDates = await axios.get(
          "https://twokeybackend.onrender.com/file/getLogs/dues/",
          {
            headers: {
              Authorization: `Bearer ${token.session.access_token}`,
            },
          }
        );

        console.log("dueDates", dueDates.data);
        setDues(dueDates.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDueDates();
  }, []);

  const skeletons = [];
  for (let i = 0; i < 4; i++) {
    skeletons.push(
      <div
        key={i}
        className="border shadow p-3 my-2 rounded-lg flex items-center gap-2"
      >
        <Skeleton
          key={i}
          variant="rounded"
          width={24}
          height={24}
          className="mr-2"
        />

        <Skeleton className="w-1/5" height={28} />
        <Skeleton className="w-1/5" height={25} />
        <Skeleton className="w-2/5" height={28} />
      </div>
    );
  }

  const convertSecondsToDaysHours = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);

    let result = "";
    if (days > 0) {
      result += `${days} ${days === 1 ? "day" : "days"}`;
    }

    if (hours > 0) {
      result += ` ${hours} ${hours === 1 ? "hour" : "hours"}`;
    }

    return result.trim();
  };

  return (
    <div className="w-full md:w-3/5">
      <Paper className="h-72 p-4">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold">Due Date</p>
          <b className="rotate-90">...</b>
        </div>
        {dues.length ? (
          dues?.map((due, index) => (
            <div
              key={index}
              className="border shadow p-3 my-2 rounded-lg flex items-center"
            >
              <Tooltip
                title={due.shared_with[0].user_email}
                arrow
                className="mr-2"
              >
                <Avatar
                  src={due.shared_with[0].profile_pic}
                  alt="owner pic"
                  sx={{ width: 25, height: 25 }}
                  variant="rounded"
                />
              </Tooltip>
              <p>
                <strong className="font-semibold">
                  {due.shared_with[0].first_name} {due.shared_with[0].last_name}
                </strong>
                's access to{" "}
                <strong className="font-semibold">{due.file_name}</strong> ends
                in {convertSecondsToDaysHours(due.expiration_time)}.
              </p>
            </div>
          ))
        ) : (
          <div className="h-56 overflow-y-scroll scrollbar-hide">
            {skeletons}
          </div>
        )}
      </Paper>
    </div>
  );
};

export default DueDate;
