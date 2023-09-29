import { GridContent, ProCard, StatisticCard } from '@ant-design/pro-components';
import { Col, Row, theme, Divider, Image, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Line, Pie, LineConfig, PieConfig } from '@ant-design/plots';

const { Statistic } = StatisticCard;
const { Text, Title } = Typography;

const DemoLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('/chart/line/visit')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config: LineConfig = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };

  return <Line {...config} />;
};

const DemoPie = () => {
  const data = [
    {
      type: 'PC-浏览器',
      value: 2123,
    },
    {
      type: '微信-小程序',
      value: 1323,
    },
    {
      type: '微信-浏览器',
      value: 987,
    },
    {
      type: 'Android-应用',
      value: 345,
    },
    {
      type: '其他',
      value: 20,
    },
  ];
  const config: PieConfig = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    legend: {
      position: 'bottom',
      flipPage: false,
      itemWidth: 150,
      reversed: false,
      itemMarginBottom: 16,
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

const Home: React.FC = () => {
  const { token } = theme.useToken();
  // const { initialState } = useModel('@@initialState');
  return (
    <GridContent>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <ProCard style={{ backgroundColor: token['blue-6'] }}>
            <br />
            <Title style={{ color: token.colorWhite }} level={4}>欢迎使用Letga !</Title>
            <Text style={{ color: token.colorWhite }}>Letga 是基于 GoFrame + AntDesign 的中后台管理系统，系统集成了通用的中后台基础功能模块，是一款高性能、易扩展、高颜值的企业级开源系统。</Text>
            <br />
            <Text style={{ color: token.colorWhite }}>在使用中遇到问题，可以查看「使用帮助」，或者在「Letga社区」寻求帮助</Text>
            <br /><br />
          </ProCard>
        </Col>
        <Col span={24}>
          <Divider></Divider>
        </Col>
        <Col span={8}>
          <ProCard gutter={8} direction="column" split="horizontal">
            <StatisticCard
              statistic={{
                title: '昨日请求数',
                value: 234,
                description: (
                  <Statistic
                    title="较本月平均"
                    value="8.04%"
                    trend="down"
                  />
                ),
              }}
            />
            <StatisticCard
              statistic={{
                title: '近7天请求',
                value: 234,
                description: (
                  <Statistic title="较近月平均" value="8.04%" trend="up" />
                ),
              }}
            />
            <StatisticCard
              statistic={{
                title: '本月请求数',
                value: 234,
                description: (
                  <Statistic title="较上月平均" value="8.04%" trend="up" />
                ),
              }}
            />
          </ProCard>
        </Col>
        <Col span={16}>
          <ProCard title="流量统计 - demo"
            headerBordered
          >
            <DemoLine />
          </ProCard>
        </Col>
        <Col span={24}>
          <Divider></Divider>
        </Col>
        <Col span={8}>
          <ProCard title="客户端 - demo" headerBordered>
            <DemoPie />
          </ProCard>
        </Col>
        <Col span={16}>
          <ProCard title="用户分布 - demo"
            headerBordered
          >
            <div style={{ width: '100%', height: 400, textAlign: 'center' }}><Image src="/map_china.png" height={400} /></div>
          </ProCard>
        </Col>
        <Col span={24}>
          <Divider></Divider>
        </Col>
      </Row>
    </GridContent>
  )
  // return (
  //   <PageContainer
  //     prefixCls='prefix'
  //     pageHeaderRender={() => <></>}
  //   >
  //     <Row gutter={[24, 24]}>
  //       <Col span={24}>
  //         <ProCard style={{ backgroundColor: token['blue-6'] }}>
  //           <br/>
  //           <Title style={{ color: token.colorWhite }} level={4}>欢迎使用Letga !</Title>
  //           <Text style={{ color: token.colorWhite }}>Letga 是基于 GoFrame + AntDesign 的中后台管理系统，系统集成了通用的中后台基础功能模块，是一款高性能、易扩展、高颜值的企业级开源系统。</Text>
  //           <br/>
  //           <Text style={{ color: token.colorWhite }}>在使用中遇到问题，可以查看「使用帮助」，或者在「Letga社区」寻求帮助</Text>
  //           <br/><br/>
  //         </ProCard>
  //       </Col>
  //       <Col span={24}>
  //         <Divider></Divider>
  //       </Col>
  //       <Col span={8}>
  //         <ProCard gutter={8} direction="column" split="horizontal">
  //           <StatisticCard
  //             statistic={{
  //               title: '昨日请求数',
  //               value: 234,
  //               description: (
  //                 <Statistic
  //                   title="较本月平均"
  //                   value="8.04%"
  //                   trend="down"
  //                 />
  //               ),
  //             }}
  //           />
  //           <StatisticCard
  //             statistic={{
  //               title: '近7天请求',
  //               value: 234,
  //               description: (
  //                 <Statistic title="较近月平均" value="8.04%" trend="up" />
  //               ),
  //             }}
  //           />
  //           <StatisticCard
  //             statistic={{
  //               title: '本月请求数',
  //               value: 234,
  //               description: (
  //                 <Statistic title="较上月平均" value="8.04%" trend="up" />
  //               ),
  //             }}
  //           />
  //         </ProCard>
  //       </Col>
  //       <Col span={16}>
  //         <ProCard title="流量统计 - demo"
  //           headerBordered
  //         >
  //           <DemoLine />
  //         </ProCard>
  //       </Col>
  //       <Col span={24}>
  //         <Divider></Divider>
  //       </Col>
  //       <Col span={8}>
  //         <ProCard title="客户端 - demo" headerBordered>
  //           <DemoPie />
  //         </ProCard>
  //       </Col>
  //       <Col span={16}>
  //         <ProCard title="用户分布 - demo"
  //           headerBordered
  //         >
  //           <div style={{width:'100%', height: 400, textAlign: 'center'}}><Image src="/map_china.png" height={400} /></div>
  //         </ProCard>
  //       </Col>
  //       <Col span={24}>
  //         <Divider></Divider>
  //       </Col>
  //     </Row>
  //   </PageContainer>
  // );
};

export default Home;
