import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import "../Styles/Home.css"
import {Col, Card, Row, Statistic } from 'antd';

function Home() {
    const [data,setData] = useState([])
    const [productData, setProductData] = useState([])

    useEffect(()=> {
      loadData();
  },[data,productData])

  const loadData = async () => {
      try {
          const response = await axios.get("http://localhost:3001/compaines")
          const res = await axios.get("http://localhost:3001/products")
          setProductData(res.data)
          setData(response.data)
      } catch (error) {
          console.log(error.message);
      }
  }

const lastAddData = data.slice(-3)
const sortedProducts = productData.sort((a, b) => b.amount - a.amount);
const topProducts = sortedProducts.slice(0, 3);

  return (
    <>
     <Header/>
      <div className="home">
        <div className="datacard revenueCard">
        <Row gutter={16}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Recently added Companies"
                  value={lastAddData.map((item)=>item.name)}
                  precision={2}
                  valueStyle={{
                    color: '#3f8600',
                  }}
                  
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Most Expensive Products"
                  value={topProducts.map((item)=>item.name)}
                  precision={2}
                  valueStyle={{
                    color: '#3f8600',
                  }}
                />
              </Card>
            </Col>
          </Row>
        </div>
        <div className="datacard customerCard">
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Number of companies in the system" value={data.length} />
            </Col>
            <Col span={12}>
              <Statistic title="Number of product in the system" value={productData.length}/>
            </Col>
          </Row>
        </div>
        <div className="datacard categoryCard">
        </div>
      </div>
    </>
  
  )
}

export default Home;
