import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import type { NextPage } from "next";
import { ReactNode } from "react";
import { DayPicker } from "react-day-picker";
import { v4 as uuid } from "uuid";
import HPopover from "../components/HPopover";
import NfeInput from "../components/nfe/NfeInput";

const NFe: NextPage = () => {
  return (
    <div className=" flex flex-col gap-y-4">
      <h1 className="text-4xl font-bold text-slate-900">Notas fiscais</h1>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-end gap-x-4">
          {/* <button
            className="grid h-8 w-8 place-items-center rounded-full bg-green-200 py-1 px-2 shadow"
            onClick={() => {
              //
              console.log("a");
            }}
          >
            <DocumentPlusIcon className="h-4 w-4" />
          </button> */}
          <HPopover PopoverBtn={<DateSelector date="01-10-22" />}>
            <DayPicker />
          </HPopover>
          <HPopover PopoverBtn={<DateSelector date="30-10-22" />}>
            <DayPicker />
          </HPopover>
        </div>
        <div className="flex flex-col gap-y-2 rounded-xl bg-white p-2 text-sm shadow-xl">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full rounded-md border py-2 px-4 shadow outline-none ring-sky-800 focus:ring-2 focus:ring-offset-2"
          />
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th>Nome</th>
                <th>Numero</th>
                <th>UF</th>
                <th>Total</th>
                <th>Emissao</th>
                <th>Adicionado em</th>
              </tr>
            </thead>
            <tbody>{loopNFeEntry()}</tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <NfeInput />
        </div>
      </div>
    </div>
  );
};
export default NFe;

export const DateSelector = ({ date }: { date: string }): JSX.Element => {
  return (
    <span className="flex select-none items-center gap-x-2 rounded bg-slate-900 bg-opacity-70 py-1 px-4 text-slate-100 shadow-md hover:cursor-pointer">
      <CalendarDaysIcon className="h-5 w-5" />
      {date}
    </span>
  );
};

const loopNFeEntry = () => {
  const entries: ReactNode[] = [];
  for (let i = 0; i < 5; i++)
    entries.push(
      <tr key={uuid()} className="border-b">
        <td className="py-2">Madedeira California</td>
        <td>119275</td>
        <td>MS</td>
        <td>R$ 9.990,66</td>
        <td>17/10/22 14:52</td>
        <td>aproxidamamente 2 horas</td>
      </tr>
    );

  return entries;
};
