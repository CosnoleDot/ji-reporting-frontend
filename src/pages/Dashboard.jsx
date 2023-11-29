import { GeneralLayout } from "../components";

export const Dashboard = () => {
  return (
    <GeneralLayout>
      <div className="relative flex lg:flex-row flex-col gap-3 items-center p-5 justify-center h-[calc(100vh-65.6px-64px)]">
        <div className="min-h-[100px] w-full bg-slate-200 rounded-xl"></div>
        <div className="min-h-[100px] w-full bg-slate-200 rounded-xl"></div>
      </div>
    </GeneralLayout>
  );
};
