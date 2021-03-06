import React, { Component } from 'react';
import {Menu, Row, Col, Carousel, Card, Divider, Icon, List, Avatar, Rate} from 'antd'
import '../../css/App.css'
import {browserHistory} from 'react-router';
import axios from "axios";
import Image from './Image';

const { Meta } = Card;
const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class HomePage extends Component {

    state = {
        salesRecommendLoading: false,
        salesRecommend: null,

        rateRecommendLoading: true,
        rateRecommend: null,

        guessRecommendLoading: true,
        guessRecommend: null,
    };

    componentWillMount() {
        let self = this;

        axios.get("/getRecommend", {
            params: {
                recommendBy: "sales"
            }
        })
            .then(function (response) {
                self.setState({
                    salesRecommendLoading: false,
                    salesRecommend: response.data,
                });
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("/getRecommend", {
            params: {
                recommendBy: "rate"
            }
        })
            .then(function (response) {
                self.setState({
                    rateRecommendLoading: false,
                    rateRecommend: response.data,
                })
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("/getRecommend", {
            params: {
                recommendBy: "guess"
            }
        })
            .then(function (response) {
                self.setState({
                    guessRecommendLoading: false,
                    guessRecommend: response.data,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleDirectory = (e) => {
        browserHistory.push({
            pathname: '/dir',
            state: {
                type: e.key,
            }
        });
    };

    render() {
        let self = this;
        const homeBar =
            <div align="center">
                <Menu>
                    <Menu.Item key="concerts" onClick={this.handleDirectory}>演唱会</Menu.Item>
                    <Menu.Item key="musicale" onClick={this.handleDirectory}>音乐会</Menu.Item>
                    <Menu.Item key="shows" onClick={this.handleDirectory}>曲苑杂坛</Menu.Item>
                    <Menu.Item key="dramas" onClick={this.handleDirectory}>话剧歌剧</Menu.Item>
                    <Menu.Item key="sports" onClick={this.handleDirectory}>体育比赛</Menu.Item>
                    <Menu.Item key="dance" onClick={this.handleDirectory}>舞蹈芭蕾</Menu.Item>
                    <Menu.Item key="exhibits" onClick={this.handleDirectory}>休闲展览</Menu.Item>
                    <Menu.Item key="family" onClick={this.handleDirectory}>儿童亲子</Menu.Item>
                </Menu>
            </div>;

        const homeCarousel =
            <div style={{marginTop: 20,}}>
                <Carousel autoplay effect="scrollx" style={{height: '500px'}}>
                    <div><a href="http://localhost:8080/detail/389"><img src="https://img.alicdn.com/tfs/TB1ptM1CDtYBeNjy1XdXXXXyVXa-1200-320.png" alt=""/></a></div>
                    <div><a href="http://localhost:8080/detail/8611"><img src="https://img.alicdn.com/tfs/TB1FxK5GkCWBuNjy0FaXXXUlXXa-1200-320.jpg" alt=""/></a></div>
                    <div><a href="http://localhost:8080/detail/7"><img src="https://img.alicdn.com/tfs/TB1D5HZEf1TBuNjy0FjXXajyXXa-1200-320.jpg" alt=""/></a></div>
                    <div><a href="http://localhost:8080/detail/8612"><img src="https://img.alicdn.com/tfs/TB1YKllDWmWBuNjy1XaXXXCbXXa-1200-320.jpg" alt=""/></a></div>
                </Carousel>
            </div>;

        const RecommendCard = ({item}) => (
            <Card
                hoverable
                style={{width: 200}}
                cover={<Image width={200} showId={item.showId}/>}
            >
                <Meta
                    title={item.title}
                    description={
                        <div>
                            <Icon type="environment"/>&nbsp;
                            <text style={{color: "#777777"}}>{item.address}</text>
                            <br/>
                            <Icon type="calendar"/>&nbsp;
                            <text style={{color: "#777777"}}>{item.starttime + " - " + item.endtime}</text>
                            <br/>
                            <Rate allowHalf disabled value={item.rate / 2}/>
                        </div>
                    }
                />
            </Card>
        );

        const RecommendLine = ({dataSource}) => (
            <div style={{marginTop: 10}}>
                <div>
                    <Row type="flex" justify="space-around">
                        {
                            dataSource !== null && dataSource.length !== 0 ?
                                dataSource.map(function (item) {
                                    return (
                                        <Col span={4}>
                                            <RecommendCard item={item}/>
                                        </Col>
                                    );
                                })
                                :
                                "暂无推荐"
                        }
                    </Row>
                </div>
            </div>
        );


        let RecommendTitle = ({text, onClick}) => (
            <Row>
                <br/>
                <Col>
                    <Divider/>
                    <div>
                        <h2 style={{display: "inline"}}>
                            {text}
                        </h2>
                        {/*<a style={{float: "right"}} onClick={onClick}>*/}
                            {/*更多<Icon type="double-right"/>*/}
                        {/*</a>*/}
                    </div>
                </Col>
                <br/>
            </Row>
        );

        const homeContainer =
            <div>
                <Row>
                    <Col span={3}>
                        {homeBar}
                    </Col>
                    <Col span={1}/>
                    <Col span={18}>
                        {homeCarousel}
                    </Col>
                </Row>
                <Row>
                    <Col span={3}/>
                    <Col span={20}>
                        <RecommendTitle text="当前热门"/>
                        {
                            self.state.salesRecommendLoading ?
                                <Icon type="loading"
                                      style={{
                                          textAlign: "center",
                                          fontSize: 50
                                      }}/>
                                :
                                <RecommendLine dataSource={this.state.salesRecommend}/>
                        }
                        <RecommendTitle text="高分推荐"/>
                        {
                            self.state.rateRecommendLoading ?
                                <Icon type="loading"
                                      style={{
                                          textAlign: "center",
                                          fontSize: 50
                                      }}/>
                                :
                                <RecommendLine dataSource={this.state.rateRecommend}/>
                        }
                        <RecommendTitle text="猜你喜欢"/>
                        {
                            self.state.guessRecommendLoading ?
                                <Icon type="loading"
                                      style={{
                                          textAlign: "center",
                                          fontSize: 50
                                      }}/>
                                :
                                <RecommendLine dataSource={this.state.guessRecommend}/>
                        }
                    </Col>
                </Row>
            </div>;

        return (
            homeContainer
        );
    }
}

export default HomePage;