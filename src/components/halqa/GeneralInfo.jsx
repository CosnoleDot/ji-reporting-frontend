import { useEffect, useState } from "react";

export function GeneralInfo({ setMonth, me, area, view, month, newMonth }) {
  const [date, setDate] = useState("");
  useEffect(() => {
    if (me && !view) {
      if (document.getElementById("name")) {
        document.getElementById("name").value = me?.userAreaId?.name;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);
  const setDateFn = () => {
    const date0 = new Date();
    date0.setMonth(date0.getMonth() - 1);
    setDate(`${date0.getFullYear()}-${date0.getMonth() + 1}`);
  };
  useEffect(() => {
    setDateFn();
  }, []);
  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-2">
      <div className="flex justify-start items-center gap-2 w-full p-2">
        <label htmlFor="halqa_name">{`${area} کا نام`}</label>
        <input
          className="border-b-2 border-dashed"
          type="text"
          name="name"
          id="name"
          readOnly
        />
      </div>
      {!newMonth ? (
        <div className="flex justify-start items-center gap-2 w-full p-2">
          <label htmlFor="month">برائے ماہ</label>
          <input
            className="border-b-2 border-dashed"
            type="month"
            name="month"
            id="month"
            readOnly
            value={date}
          />
        </div>
      ) : (
        <div className="flex justify-start items-center gap-2 w-full p-2">
          <label htmlFor="month">برائے ماہ</label>
          <input
            className="border-b-2 border-dashed"
            type="text"
            value={newMonth.split("T")[0]}
            disabled
          />
        </div>
      )}
    </div>
  );
}
