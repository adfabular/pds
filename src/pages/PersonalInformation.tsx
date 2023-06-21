import { Form, Input } from "antd";
import useAppStore from "../store";
import { IEmployeeInfo } from "../models";
import { useState, useEffect } from "react";
import { GetListOfRecords } from "../api";
import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs";

const PersonalInformation = () => {
  const [EmployeeInfo, setEmployeeInfo] = useState<IEmployeeInfo | undefined>();
  const store = useAppStore();
  const [form] = Form.useForm();
  const handleSubmit = async (v: IEmployeeInfo) => {};
  const handleGetEmployeeInfo = async () => {
    const res = await GetListOfRecords({
      sp: "udp_GetEmployeeInfo",
      parameters: {
        EmployeeId: store.EmployeeId,
      },
    });
    if (res) {
      setEmployeeInfo(res[0]);
      const x: IEmployeeInfo = res[0];

      form.setFieldsValue({
        EmployeeID: x.EmployeeID,
        LName: x.LName,
        FName: x.FName,
        MName: x.MName,
        Nick: x.Nick,
        Barangay: x.Barangay,
        Address: x.Address,
        Province: x.Province,
        Municipality: x.Municipality,
        ZipCode: x.ZipCode,
        Citizenship: x.Citizenship,
        CivilStatus: x.CivilStatus,
        Gender: x.Gender,
        BirthDate: dayjs(x.BirthDate),
        BPlace: x.BPlace,
        TelNo: x.TelNo,
        MobileNo: x.MobileNo,
        Religion: x.Religion,
        EmerName: x.EmerName,
        ERelation: x.ERelation,
        EAddr: x.EAddr,
        ETetlNo: x.ETetlNo,
        ESpouse: x.ESpouse,
        FatherName: x.FatherName,
        MotherName: x.MotherName,
        BloodType: x.BloodType,
        Height: x.Height,
        Weight: x.Weight,
        PRCNo: x.PRCNo,
      });
    }
  };
  useEffect(() => {
    handleGetEmployeeInfo();
  }, []);
  return (
    <div className="cardBackGround">
      <Form
        form={form}
        layout="vertical"
        scrollToFirstError
        onFinish={handleSubmit}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <Form.Item name="EmployeeID" label="Employee Id">
            <Input readOnly className="font-bold" />
          </Form.Item>
          <Form.Item
            name="LName"
            label="Lastname"
            rules={[
              {
                required: true,
                message: "Lastname is required!",
              },
              {
                max: 150,
              },
            ]}
            normalize={(v) => v.toUpperCase()}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="FName"
            label="Firstname"
            rules={[
              {
                required: true,
                message: "Firstname is required!",
              },
              {
                max: 150,
              },
            ]}
            normalize={(v) => v.toUpperCase()}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="MName"
            label="Middlename"
            rules={[
              {
                required: true,
                message: "Middlename is required!",
              },
              {
                max: 150,
              },
            ]}
            normalize={(v) => v.toUpperCase()}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default PersonalInformation;
