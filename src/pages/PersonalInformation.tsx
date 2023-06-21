import {
  AutoComplete,
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Tooltip,
  notification,
} from "antd";
import useAppStore from "../store";
import { IDependents, IEmployeeInfo } from "../models";
import { useEffect, useState } from "react";
import { GetListOfRecords, PostData } from "../api";
import dayjs from "dayjs";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BsCheckLg, BsPersonSlash } from "react-icons/bs";

const PersonalInformation = () => {
  const store = useAppStore();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [dependents, setDependents] = useState<IDependents[] | undefined>();
  const [citizenship, setCitizenship] = useState<any[]>([]);
  const [religion, setReligion] = useState<any[]>([]);
  const [city, setCity] = useState<any[]>([]);
  const [showCityModal, setShowCityModal] = useState<boolean>(false);
  const [showDependents, setShowDependents] = useState<boolean>(false);
  const [seletedDependent, setSelectedDependent] = useState<
    IDependents | undefined
  >();
  const handleSubmit = async (v: IEmployeeInfo) => {
    const res = await PostData("SaveEmployeeInfo", {
      ...v,
      BirthDate: dayjs(v.BirthDate).format("YYYY-MM-DD"),
    });

    if (res) {
      if (res.status === 1) {
        notification.success({
          message: "Successfully saved!",
          placement: "topRight",
          duration: 3,
        });
      } else {
        notification.error({
          message: res.message,
          placement: "topRight",
          duration: 3,
        });
      }
    }
  };
  const handleGetEmployeeInfo = async () => {
    const res = await GetListOfRecords({
      sp: "udp_GetEmployeeInfo",
      parameters: {
        EmployeeId: store.EmployeeId,
      },
    });
    if (res) {
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
        StreetNo: x.StreetNo,
      });
    }
  };
  const handleInitialized = async () => {
    let res = await GetListOfRecords({
      sp: "udp_GetCitizenship",
      parameters: {},
    });
    if (res) {
      setCitizenship(res);
    }
    res = await GetListOfRecords({
      sp: "udp_GetCityMunicipality",
      parameters: {},
    });
    if (res) {
      setCity(res);
    }
    res = await GetListOfRecords({
      sp: "udp_Religion",
      parameters: {},
    });
    if (res) {
      setReligion(res);
    }
  };
  useEffect(() => {
    handleInitialized();
    handleGetEmployeeInfo();
    handleGetDependents();
  }, []);
  const handleSelectCity = (x: any) => {
    form.setFieldsValue({
      Municipality: x.City,
      Barangay: x.Barangay,
      Province: x.ProvinceDescription,
    });
    setShowCityModal(false);
  };
  const actionBodyTemplate = (data: any) => {
    return (
      <Tooltip title="Select">
        <Button
          type="ghost"
          icon={<BsCheckLg />}
          onClick={() => handleSelectCity(data)}
        />
      </Tooltip>
    );
  };
  const handleEditDependent = (x: IDependents) => {
    setSelectedDependent(x);
    form2.setFieldsValue({
      Relations: x.Relations,
      BDate: dayjs(x.BDate),
      MedicalAid: x.MedicalAid,
      EducAid: x.EducAid,
      LastName: x.LastName,
      FirstName: x.FirstName,
      MiddleName: x.MiddleName,
    });
  };
  const handleDeleteDependent = async (x: IDependents) => {
    store.SetSubmitting(true);
    const res = await PostData("SaveDependent", {
      ID: x.ID,
      Delete: true,
    });
    store.SetSubmitting(false);
    if (res) {
      if (res.status === 1) {
        form2.resetFields();
        setSelectedDependent(undefined);
        notification.success({
          message: "Successfully deleted!",
          placement: "topRight",
          duration: 3,
        });
        handleGetDependents();
      } else {
        notification.error({
          message: res.message,
          placement: "topRight",
          duration: 3,
        });
      }
      handleGetDependents();
    }
  };
  const actionBodyTemplate2 = (data: any) => {
    return (
      <Space>
        <Tooltip title="Edit">
          <Button
            type="ghost"
            icon={<BsCheckLg />}
            onClick={() => handleEditDependent(data)}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Popconfirm
            title="Delete Dependent"
            onConfirm={() => handleDeleteDependent(data)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="ghost"
              icon={<BsPersonSlash />}
              //  onClick={() => handleDeleteDependent(data)}
            />
          </Popconfirm>
        </Tooltip>
      </Space>
    );
  };
  const handleGetDependents = async () => {
    const res = await GetListOfRecords({
      sp: "udp_GetDependents",
      parameters: {
        EmpID: store.EmployeeId,
      },
    });
    if (res) {
      setDependents(res);
    }
  };
  const handleSaveDependent = async (v: IDependents) => {
    store.SetSubmitting(true);
    const res = await PostData("SaveDependent", {
      ...v,
      BDate: dayjs(v.BDate).format("YYYY-MM-DD"),
      EmpID: store.EmployeeId,
      ID: seletedDependent === undefined ? 0 : seletedDependent.ID,
      Delete: false,
    });
    store.SetSubmitting(false);
    if (res) {
      if (res.status === 1) {
        form2.resetFields();
        setSelectedDependent(undefined);
        notification.success({
          message: "Successfully saved!",
          placement: "topRight",
          duration: 3,
        });
        handleGetDependents();
      } else {
        notification.error({
          message: res.message,
          placement: "topRight",
          duration: 3,
        });
      }
      handleGetDependents();
    }
  };
  return (
    <div className="cardBackGround">
      <Form
        form={form}
        layout="vertical"
        scrollToFirstError
        onFinish={handleSubmit}
      >
        <div className="text-center font-bold">Personal Information</div>
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
            <Input autoFocus />
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <Form.Item
            name="Nick"
            label="Nickname"
            rules={[
              {
                max: 50,
              },
            ]}
            normalize={(v) => v.toUpperCase()}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="BirthDate"
            label="Birth date"
            extra="format (MM/DD/YYYY)"
          >
            <DatePicker format="MM/DD/YYYY" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="Gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Gender is required!",
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              optionFilterProp="children"
              filterOption={(input, option) =>
                (
                  option!.children
                    ?.toString()
                    .toLocaleLowerCase() as unknown as string
                ).includes(input.toLocaleLowerCase())
              }
            >
              <Select.Option key="Female" value="Female" title="Female">
                Female
              </Select.Option>
              <Select.Option key="Male" value="Male" title="Male">
                Male
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="CivilStatus"
            label="CivilStatus"
            rules={[
              {
                required: true,
                message: "Civil Status is required!",
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              optionFilterProp="children"
              filterOption={(input, option) =>
                (
                  option!.children
                    ?.toString()
                    .toLocaleLowerCase() as unknown as string
                ).includes(input.toLocaleLowerCase())
              }
            >
              <Select.Option key="Divorced" value="Divorced" title="Divorced">
                Divorced
              </Select.Option>
              <Select.Option key="Married" value="Married" title="Married">
                Married
              </Select.Option>
              <Select.Option
                key="Separated"
                value="Separated"
                title="Separated"
              >
                Separated
              </Select.Option>
              <Select.Option key="Single" value="Single" title="Single">
                Single
              </Select.Option>
              <Select.Option key="Widowed" value="Widowed" title="Widowed">
                Widowed
              </Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <Form.Item
            name="Citizenship"
            label="Citizenship"
            normalize={(v) => v.toUpperCase()}
          >
            <AutoComplete
              options={citizenship}
              allowClear
              filterOption={(inputValue, option) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>
          <Form.Item
            name="BPlace"
            label="Birth place"
            normalize={(v) => v.toUpperCase()}
          >
            <Input />
          </Form.Item>
          <Form.Item name="Religion" label="Religion">
            <AutoComplete
              options={religion}
              allowClear
              filterOption={(inputValue, option) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>
        </div>
        <div className="text-center font-bold">Address</div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <Form.Item
            name="StreetNo"
            label="Street/No."
            rules={[
              {
                required: true,
                message: "Street/No. is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Municipality"
            label={
              <Space>
                <p>City/Municipality</p>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => setShowCityModal(true)}
                >
                  Search
                </Button>
              </Space>
            }
            rules={[
              {
                required: true,
                message: "City/Municipality is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Barangay"
            label="Barangay"
            rules={[
              {
                required: true,
                message: "Barangay is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Province"
            label="Province"
            rules={[
              {
                required: true,
                message: "Province is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <Form.Item name="ZipCode" label="ZipCode">
            <Input />
          </Form.Item>
        </div>
        <div className="text-center font-bold">Contact Information</div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <Form.Item name="TelNo" label="Telephone No.">
            <Input />
          </Form.Item>
          <Form.Item name="MobileNo" label="Mobile No.">
            <Input />
          </Form.Item>
        </div>
        <div className="text-center font-bold">In Case Of Emergency</div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <Form.Item
            name="EmerName"
            label="Name"
            rules={[
              {
                max: 50,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ERelation"
            label="Relation"
            rules={[
              {
                max: 50,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="EAddr"
            label="Address"
            className="col-span-2"
            rules={[
              {
                max: 50,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <Form.Item
            name="ETetlNo"
            label="Contact Nos."
            rules={[
              {
                max: 50,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ESpouse"
            label="Spouse"
            rules={[
              {
                max: 50,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="FatherName"
            label="Father's Name"
            rules={[
              {
                max: 50,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="MotherName"
            label="Mothers's Name"
            rules={[
              {
                max: 50,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="text-center font-bold">Other Information</div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <Form.Item
            name="Height"
            label="Height"
            rules={[
              {
                max: 50,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Weight"
            label="Weight"
            rules={[
              {
                max: 50,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="BloodType"
            label="Blood Type"
            rules={[
              {
                max: 50,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="PRCNo"
            label="PRC No."
            rules={[
              {
                max: 50,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex justify-between">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            type="primary"
            onClick={() => {
              form2.resetFields();
              setShowDependents(true);
            }}
          >
            Dependents
          </Button>
        </div>
      </Form>
      <div className="text-center font-bold">Dependents</div>

      <Drawer
        title="Basic Drawer"
        placement="top"
        closable={true}
        onClose={() => setShowDependents(false)}
        open={showDependents}
        key="1"
        height={600}
      >
        <Form
          form={form2}
          layout="vertical"
          onFinish={handleSaveDependent}
          scrollToFirstError
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
            <Form.Item
              name="LastName"
              label="Lastname"
              rules={[
                {
                  required: true,
                  message: "Lastname is required!",
                },
                {
                  max: 50,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="FirstName"
              label="Firstname"
              rules={[
                {
                  required: true,
                  message: "Firstname is required!",
                },
                {
                  max: 50,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="MiddleName"
              label="Middlename"
              rules={[
                {
                  max: 50,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Relations"
              label="Relation"
              rules={[
                {
                  max: 50,
                },
                {
                  required: true,
                  message: "Relation is required!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
            <Form.Item
              name="BDate"
              label="Birth Date"
              extra="format (MM/DD/YYYY)"
              rules={[
                {
                  required: true,
                  message: "Birth date is required!",
                },
              ]}
            >
              <DatePicker format="MM/DD/YYYY" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="With Medical Aid?"
              name="MedicalAid"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
            <Form.Item
              label="With Educational Aid?"
              name="EducAid"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="mb-2"
            disabled={store.Submitting}
          >
            {seletedDependent === undefined ? "Add" : "Update"}
          </Button>
          {seletedDependent !== undefined && (
            <Button
              type="primary"
              onClick={() => {
                form2.resetFields();
                setSelectedDependent(undefined);
              }}
              className="ml-2"
              disabled={store.Submitting}
            >
              Cancel Edit
            </Button>
          )}
        </Form>
        <div className="mt-2">
          <DataTable
            dataKey="ID"
            value={dependents}
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
              body={(data: any) => actionBodyTemplate2(data)}
            ></Column>
            <Column field="Name" header="Name"></Column>
            <Column field="Relations" header="Relation"></Column>
            <Column field="BDateStr" header="BirthDate"></Column>
            <Column field="MedicalAidStr" header="With Medical Aid?"></Column>
            <Column field="EducAidStr" header="With Educ. Aid?"></Column>
          </DataTable>
        </div>
      </Drawer>
      <Modal
        open={showCityModal}
        onCancel={() => setShowCityModal(false)}
        footer={false}
        width={800}
      >
        <DataTable
          dataKey="Id"
          value={city}
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
            field="City"
            header="City/Municipality"
            filter
            filterMatchMode="contains"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="Barangay"
            header="Barangay"
            filter
            filterMatchMode="contains"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="ProvinceDescription"
            header="Province"
            filter
            filterMatchMode="contains"
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </Modal>
    </div>
  );
};

export default PersonalInformation;
