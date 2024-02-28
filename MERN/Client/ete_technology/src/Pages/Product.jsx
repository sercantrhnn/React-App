import {React, useState, useEffect, useRef} from "react";
import {Button, Table, Drawer, Modal, Input, Space} from 'antd';
import axios from "axios";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import "../Styles/Company.css"
import Header from "../Components/Header";
import Highlighter from 'react-highlight-words';

function Product() {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [category, setcategory] = useState("")
    const [amount, setamount] = useState("")
    const [amount_Unit, setamount_Unit] = useState("")
    const [company, setCompany] = useState("")
    const [loading, setloading] = useState(false)
    const [updateId, setUpdateId] = useState("")
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
      };
      const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1677ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });

    const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = async(e) => {
      
        setIsModalOpen(false);
        try {
            const res = await axios.post("http://localhost:3001/createProducts", {name, category, amount, amount_Unit, company})
            const newCompany = res.data
            setData(data => [...data, newCompany]);
            [setName, setcategory, setamount, setamount_Unit, setCompany].forEach(clear => clear(""));
        } catch (error) {
            console.log("hata",error.message);
        }

      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      const showDrawer = async(record) => {
        setDrawerOpen(true);
        try {
            const res = await axios.get("http://localhost:3001/getProducts/"+record)
            console.log(record);
            setUpdateId(record)
            console.log(res);
            setName(res.data.name)
            setcategory(res.data.category)
            setamount(res.data.amount)
            setamount_Unit(res.data.amount_Unit)
            setCompany(res.data.company)
        } catch (error) {
            console.log("hata",error.message);
        }
        
      };
      const onClose = () => {
        setDrawerOpen(false);
      };

      useEffect(()=> {
        loadData();
    },[])

    const loadData = async () => {
        setloading(true)
        try {
            const response = await axios.get("http://localhost:3001/products")
            setData(response.data)
            setloading(false) 
        } catch (error) {
            console.log(error.message);
        }
        
    }

    const handleDelete = async(record) => {
        try {
            await axios.delete("http://localhost:3001/deleteProducts/"+record)
            setData(data =>(
                data.filter(item=>item._id !== record)
            ))
        } catch (error) {
            console.log(error.message);
        } 
    }

    const handleUpdate = async() =>{
        try {
            await axios.put("http://localhost:3001/updateProducts/"+updateId,{name, category, amount, amount_Unit, company})
            setDrawerOpen(false)
            setData(data => (
                data.map(item => (item._id === updateId ? { ...item, name, category, amount, amount_Unit, company } : item))
            ));
            [setName, setcategory, setamount, setamount_Unit, setCompany].forEach(clear => clear(""));
        } catch (error) {
            console.log(error.message);
        }
    }

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            align: "center",
            editTable: true,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Category',
            dataIndex: 'category',
            align: "center",
            editTable: true,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            align: "center",
            editTable: true,
            sorter: (a, b) => a.amount - b.amount
        },
        {
            title: 'Amount Unit',
            dataIndex: 'amount_Unit',
            align: "center",
            editTable: true,
            filters: [
                {
                    text: "TL",
                    value: "TL"
                },
                {
                    text: "USD",
                    value: "USD"
                },
                {
                    text: "EUR",
                    value: "EURS"
                },
            ],
            onFilter: (value, record) => record.amount_Unit.indexOf(value) === 0,
        },
        {
            title: 'Company',
            dataIndex: 'company',
            align: "center",
            editTable: true
        }
        ,
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            render: (_,record) => {
                return (
                    <>
                    <EditOutlined onClick={()=> showDrawer(record._id)}/>
                    <DeleteOutlined onClick={() => handleDelete(record._id)} style={{ color: "red", marginLeft: 15 }} />
                    </>
                )
            }
        }
    ]

  return (
    <>
    <Header/>
        <div className="companyDiv">
        <div className="tableContainer">
        <Table className="companyTable" columns={columns} dataSource={data} bordered loading={loading} /> 
        <div className="addButtonContainer">
         <Button onClick={showModal} type="primary">Company Add</Button>
        </div> 
        <Modal title="Product Add" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <form >
                <div className="inputbox">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="inputbox">
                    <label>Category</label>
                    <input type="text" value={category} onChange={(e) => setcategory(e.target.value)} />
                </div>
                <div className="inputbox">
                    <label>Amount</label>
                    <input type="text" value={amount} onChange={(e) => setamount(e.target.value)} />
                </div>
                <div className="inputbox">
                    <label>Amount Unit</label>
                    <input type="text" value={amount_Unit} onChange={(e) => setamount_Unit(e.target.value)} />
                </div>
                <div className="inputbox">
                    <label>Company</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
            </form>
        </Modal>
        <Drawer title="Update" onClose={onClose} open={drawerOpen}>
            <form>
                <div className="inputbox">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="inputbox">
                    <label>Category</label>
                    <input type="text" value={category} onChange={(e) => setcategory(e.target.value)} />
                </div>
                <div className="inputbox">
                    <label>Amount</label>
                    <input type="text" value={amount} onChange={(e) => setamount(e.target.value)} />
                </div>
                <div className="inputbox">
                    <label>Amount Unit</label>
                    <input type="text" value={amount_Unit} onChange={(e) => setamount_Unit(e.target.value)} />
                </div>
                <div className="inputbox">
                    <label>Company</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                <Button onClick={handleUpdate} type="primary">Update</Button>
            </form>
        </Drawer>
        </div>
        </div>    
    </>
  )
}

export default Product;
