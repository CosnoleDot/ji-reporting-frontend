import { FaCheck, FaTimes } from "react-icons/fa";
import instance from "../../api/instrance";
import { useToastState } from "../../context";
import { useContext, useEffect, useState } from "react";
import { Loader } from "../Loader";
import { FaBell } from "react-icons/fa6";
import moment from "moment";
import { months } from "../../pages/Reports";
import { UIContext } from "../../context/ui";
import { Link } from "react-router-dom";

export const Notifications = ({ userRequests, type }) => {
  const { loading, setLoading } = useContext(UIContext);
  const [activeNoti, setActiveNoti] = useState("all");
  const { dispatch } = useToastState();
  const { getNazim } = useContext(UIContext);
  const { getAllRequests, getAllNotifications } = useContext(UIContext);
  const update = async (id, status) => {
    setLoading(true);
    try {
      const req = await instance.patch(
        `/user/user-requests/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      await getAllRequests();
      getNazim();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  const markRead = async (id) => {
    setLoading(true);
    try {
      const req = await instance.patch(`/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      await getAllNotifications();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      console.log(err);
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  return (
    <div className="overflow-y-scroll">
      {type !== "request" && (
        <div className="flex w-full gap-8 items-center justify-between">
          <Link
            to="#"
            className={`text-[16px] w-full p-2 rounded font-medium leading-[20px] text-center ${
              activeNoti === "all"
                ? "text-heading border-b border-primary"
                : "text-secondaryText"
            }`}
            onClick={() => setActiveNoti("all")}
          >
            All
          </Link>
          <Link
            to="#"
            className={`text-[16px] w-full p-2 rounded font-medium leading-[20px] text-center ${
              activeNoti === "unread"
                ? "text-heading border-b border-primary"
                : "text-secondaryText"
            }`}
            onClick={() => setActiveNoti("unread")}
          >
            Unread
          </Link>
        </div>
      )}
      {type === "request" ? (
        <>
          {userRequests?.length < 1 && (
            <h1 className="p-2">No requests found!</h1>
          )}

          {loading ? (
            <Loader />
          ) : (
            userRequests?.map((req, index) => (
              <div
                key={index}
                className=" border-b-inputBorder hover:bg-slate-300 w-full p-2 flex  items-center lg:items-center justify-between"
              >
                <div className="bg-primary text-white w-[40%] h-full py-2 flex items-center justify-center capitalize">
                  {req?.nazimType}
                </div>
                <div className="flex w-full gap-2 items-center">
                  <div className="flex items-center w-full flex-col justify-start">
                    <div className="flex w-full px-3">
                      <span className="font-inter md:text-[16px] text-md font-medium leading-[16.94px]">
                        {req?.name}
                      </span>
                    </div>
                    <div className="flex w-full px-3">
                      <span className="font-inter md:text-sm text-[12px] text-secondaryText font-normal leading-[16.94px]">
                        <span>{req?.userAreaId?.name}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-end justify-end lg:justify-end gap-3 py-2">
                    <button
                      disabled={loading}
                      onClick={() => update(req?.req_id, "accepted")}
                      className="p-2 bg-slate-200 rounded-lg"
                    >
                      <FaCheck className="w-3 h-3 text-primary" />
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => update(req?.req_id, "rejected")}
                      className="p-2 bg-slate-200 rounded-lg"
                    >
                      <FaTimes className="w-3 h-3 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </>
      ) : (
        <>
          {userRequests?.length < 1 && (
            <h1 className="p-2">No notifications found!</h1>
          )}
          {loading ? (
            <Loader />
          ) : activeNoti == "all" ? (
            userRequests?.map((req, index) => (
              <div key={index} className="  flex flex-col">
                <div className="flex hover:bg-slate-300 items-center justify-between p-4 mb-2">
                  <div className="flex items-center justify-between">
                    <div className="avatar">
                      <div className="w-8 flex items-center justify-center rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <FaBell className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="flex flex-col px-3">
                      <span className="font-semibold">{req?.content}</span>
                      <span>
                        {months[moment(req?.createdAt).month()].title},
                        {moment(req?.createdAt).year()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-end justify-end lg:justify-end gap-3 py-2">
                    <button
                      disabled={loading}
                      onClick={() => markRead(req?._id)}
                      className="p-2 bg-slate-200 rounded-lg"
                    >
                      <FaCheck />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            userRequests
              ?.filter((i) => i?.isRead === false)
              ?.map((req, index) => (
                <div key={index} className="  flex flex-col">
                  <div className="flex hover:bg-slate-300 items-center justify-between p-4 mb-2">
                    <div className="flex items-center justify-between">
                      <div className="avatar">
                        <div className="w-8 flex items-center justify-center rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <FaBell className="w-8 h-8" />
                        </div>
                      </div>
                      <div className="flex flex-col px-3">
                        <span className="font-semibold">{req?.content}</span>
                        <span>
                          {months[moment(req?.createdAt).month()].title},
                          {moment(req?.createdAt).year()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-end justify-end lg:justify-end gap-3 py-2">
                      <button
                        disabled={loading}
                        onClick={() => markRead(req?._id)}
                        className="p-2 bg-slate-200 rounded-lg"
                      >
                        <FaCheck />
                      </button>
                    </div>
                  </div>
                </div>
              ))
          )}
        </>
      )}
    </div>
  );
};
