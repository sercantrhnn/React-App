import { useState, useEffect } from 'react'
import {FloatButton, Form, Modal, Table, Input, Drawer, Button} from "antd"
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import axios from 'axios';
import './App.css'

function App() {
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [draweropen, setDrawerOpen] = useState(false);
  const [deger,setDeger] = useState("");

  useEffect(()=>{
    loadData();
  },[])

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/products");
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleOk = async(e) => {
    setIsModalOpen(false);
    try {
      const response = await axios.post("http://localhost:8080/products/add", {name, category, brand, price, description});
      const newProduct = response.data;
      setData([...data, newProduct]);
      loadData();
      [setName, setCategory, setCategory, setBrand, setPrice, setDescription].forEach(clear => clear(""));
      form.resetFields();
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDelete = async(record) =>{
    try {
      await axios.delete("http://localhost:8080/products/delete"+record)
      setData(data => (
        data.filter(item => item.id !== record)
      ))
    } catch (error) {
      console.log(error.message);
    }
  }

  const showDrawer = async(record) => {
    setDrawerOpen(true);
    try {
      const response = await axios.get("http://localhost:8080/products/getProduct"+record)
      setUpdateId(record)
      setName(response.data.name)
      setCategory(response.data.category)
      setBrand(response.data.brand)
      setPrice(response.data.price)
      setDescription(response.data.description)
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleUpdate = async() =>{
    try {
      await axios.put("http://localhost:8080/products/update"+updateId,{name,category,brand,price,description})
      setDrawerOpen(false);
      setData(data => (
        data.map(item => (item.id === updateId ? {...item, name,category,brand,price,description} : item))
      ))
    } catch (error) {
      console.log(error.message);
    }
    [setName, setCategory, setCategory, setBrand, setPrice, setDescription].forEach(clear => clear(""));
  }

  const addDeger = async() => {
    try {
      const res =await axios.get("http://localhost:8080/products/getProduct"+deger);
      console.log(res);
    } catch (error) {
      
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_,record) => {
        return (
          <>
            <EditOutlined onClick={()=> showDrawer(record.id)}/>
            <DeleteOutlined onClick={() => handleDelete(record.id)} style={{color:"red", marginLeft:15}}/>
          </>
        )
      }
    }
  ]

 const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  };

  return (
    <>
      <Table style={{width:800}} columns={columns} dataSource={data} bordered loading={loading}/>

      <FloatButton icon={<PlusOutlined />} type='primary' style={{right:66}} onClick={()=>setIsModalOpen(true)}/>

      <Modal title="Add Product" open={isModalOpen} onCancel={()=>setIsModalOpen(false)} onOk={handleOk}>
        <Form {...formItemLayout} form={form}>
          <Form.Item label="Name">
            <Input value={name} onChange={(e) => setName(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Category">
            <Input  value={category} onChange={(e) => setCategory(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Brand">
            <Input value={brand} onChange={(e) => setBrand(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Price">
            <Input value={price} onChange={(e) => setPrice(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Description">
            <Input value={description} onChange={(e) => setDescription(e.target.value)}/>
          </Form.Item>
        </Form>
      </Modal>

      <Drawer width={530} title="Update Product" onClose={()=>setDrawerOpen(false)} open={draweropen}>
        <Form {...formItemLayout} form={form}>
        <Form.Item label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Category">
          <Input  value={category} onChange={(e) => setCategory(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Brand">
          <Input value={brand} onChange={(e) => setBrand(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Price">
          <Input value={price} onChange={(e) => setPrice(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Description">
          <Input value={description} onChange={(e) => setDescription(e.target.value)}/>
        </Form.Item>
        </Form>
        <Button type='primary' onClick={handleUpdate}>Update Product</Button>
      </Drawer>
    </>
  )
}

export default App
