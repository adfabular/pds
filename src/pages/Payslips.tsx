import { DataTable } from "primereact/datatable";
import useAppStore from "../store";
import { Column } from "primereact/column";
import { Button, Tooltip } from "antd";
import { BsCloudDownload } from "react-icons/bs";
import { IPayrollFinSummary } from "../models";
import { useState, useEffect } from "react";
import { GetListOfRecords } from "../api";
import axios from "axios";
const isDev = import.meta.env.DEV;
const prodApi = import.meta.env.VITE_PROD_API;
const devApi = import.meta.env.VITE_DEV_API;
function Payslips() {
  const store = useAppStore();
  const [payrollList, setPayrollList] = useState<
    IPayrollFinSummary[] | undefined
  >();

  const handlePrint = async (x: IPayrollFinSummary) => {
    let url = isDev ? devApi : prodApi;
    url = url + "downloadreport";

    try {
      await axios
        .get(url, {
          params: {
            reportName: "payslip.rpt",
            Id: x.Id,
          },
          responseType: "blob",
        })
        .then((res) => {
          let newBlob = new Blob([res.data], {
            type: "application/pdf",
          });

          const data = window.URL.createObjectURL(newBlob);

          const a = document.createElement("a");

          a.setAttribute("href", data);
          a.setAttribute("target", "_blank");

          a.click();
        });
    } catch (error: any) {
      let errorString = error.response.data;
      errorString = JSON.parse(await error.response.data.text());
      return { Status: 0, Message: errorString.Message };
    }
  };
  const actionBodyTemplate = (data: any) => {
    return (
      <Tooltip title="Download">
        <Button
          type="ghost"
          icon={<BsCloudDownload />}
          onClick={() => handlePrint(data)}
        />
      </Tooltip>
    );
  };
  const handleGetPayrollList = async () => {
    const res = await GetListOfRecords({
      sp: "udp_GetPayrollPerEmp",
      parameters: {
        EmployeeId: store.EmployeeId,
      },
    });
    if (res) {
      setPayrollList(res);
    }
  };
  useEffect(() => {
    handleGetPayrollList();
  }, []);
  return (
    <div className="cardBackGround max-w-xl mx-auto">
      <div className="font-bold text-center">Payroll List</div>
      <div className="mt-2">
        <DataTable
          dataKey="Id"
          value={payrollList}
          // tableStyle={{ minWidth: "50rem" }}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          filterDisplay="row"
          emptyMessage="No Data"
          stripedRows
          size="small"
        >
          <Column
            field="action"
            header="Action"
            body={(data: any) => actionBodyTemplate(data)}
          ></Column>
          <Column
            field="PayrollPeriod"
            header="Payroll Period"
            filter
            filterMatchMode="contains"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="DateCovered"
            header="Date Covered"
            filter
            filterMatchMode="contains"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column field="NetPay" header="Net Pay"></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default Payslips;
