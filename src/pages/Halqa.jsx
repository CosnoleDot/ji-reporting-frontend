import React from "react";
import {
  ActivityTable,
  EveningDiary,
  ExpandParty,
  Library,
  MenTable,
} from "../components";
import { OtherActivities } from "../components/OtherActivities";
import { Layout } from "../theme/Layout";
export const Halqa = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center p-4">
        <h2 className="text-2xl">کار کردگی رپورٹ (براے حلقء)</h2>
        <div className="w-full p-4">
          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            <div className="w-full md:pr-0 mb-2">
              <input
                type="text"
                className="w-full border p-2 rounded-lg"
                placeholder="Input 1"
              />
            </div>
            <div className="w-full mb-2">
              <input
                type="text"
                className="w-full border p-2 rounded-lg"
                placeholder="Input 2"
              />
            </div>
          </div>

          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            <div className="w-full md:pr-0 mb-2">
              <input
                type="text"
                className="w-full border p-2 rounded-lg"
                placeholder="Input 1"
              />
            </div>
            <div className="w-full mb-2">
              <input
                type="text"
                className="w-full border p-2 rounded-lg"
                placeholder="Input 2"
              />
            </div>
          </div>
        </div>
        <MenTable />
        <ActivityTable />
        <OtherActivities />
        <ExpandParty />
        <Library />
        <EveningDiary />
      </div>
    </Layout>
  );
};
