import { useEffect } from "react";
import instance from "../api/instrance";
import { useState } from "react";
import { Layout } from "../theme/Layout";
import { useNavigate } from "react-router-dom";

export const UserRequests = () => {
  const data1 = [
    { name: "John Doe", date: "2023-11-01", requestFrom: "halqa" },
    { name: "Jane Smith", date: "2023-11-02", requestFrom: "maqam" },
    { name: "Alice Johnson", date: "2023-11-03", requestFrom: "halqa" },
    { name: "Bob Williams", date: "2023-11-04", requestFrom: "maqam" },
    { name: "Eva Davis", date: "2023-11-05", requestFrom: "maqam" },
  ];
  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    instance
      .get("/user/user-requests", {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      })
      .then((res) => {
        const response = res?.data?.data;
        setData(response);
      });
  }, []);
  console.log(data);
  const handleAction = (id, data) => {
    instance
      .patch(`/user/user-requests/${id}`, data, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Layout>
      <div className="p-8 sm:p-2 xs:p-1 xs:overflow-hidden">
        <div className="flex bg-blue text-white justify-start gap-4 items-center font-bold  text p-4 text-3xl">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <svg
              class="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
          </div>
          <span>User Requests</span>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-md  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Area
                </th>
                <th scope="col" class="px-6 py-3">
                  Type
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {data && data?.length > 0 ? (
              <tbody>
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {item.userAreaId.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {item.userAreaType}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap space-x-2">
                      <button
                        className="text-blue hover:text-blue-900"
                        onClick={() =>
                          handleAction(item?.req_id, { status: "accepted" })
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="text- hover:text-red-900"
                        onClick={() =>
                          handleAction(item?.req_id, { status: "rejected" })
                        }
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={2}></td>

                  <td className="py-8">
                    <span className="lg:text-base text-sm pr-0 flex justify-center">
                      No Requests Found !
                    </span>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </Layout>
  );
};
