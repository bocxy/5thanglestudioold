import React from 'react';
import "./style.css"
import PieCharts from "./chart";
import { ButtonGroup, Button, Chip } from '@material-ui/core';
import { API_URL } from '../../../config/index';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
const axios = require('axios');
const dataselect = [
    { title: 'Source', value: "source" }, { title: 'Event', value: "event" }, { title: 'Sales Person', value: "sales_man" },
    { title: 'City', value: "city" }];

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choosefunnel: "YEAR",
            Revenue: "YEAR",
            source: true,
            event: true,
            sales_man: true,
            city: true,
            selectendDate: null,
            selectstartDate: null,
            Revenue_selectendDate: null,
            Revenue_selectstartDate: null,
            leadchart: null,
            projectChart: null,
            SourceData: null,
            eventData: null,
            sales_manData: null,
            city_data: null,
            leadCount: 0,
            qualifiedLeadCount: 0,
            projectCount: 0,
            types: new Date(),
            types1: new Date(),
            value: [{ title: 'Source', value: "source" }, { title: 'Event', value: "event" }, { title: 'Sales Person', value: "sales_man" },
            { title: 'City', value: "city" }],
        }
    }

    componentDidMount() {
        this.RevenueFetchApi();
        this.FetchApi();
    }

    Handlechoosefunnel = async (val, date) => {
        const { state } = this.state;
        if (val === "CUSTOM") {
            this.setState({ ...state, choosefunnel: val })
        } else {
            this.setState({ ...state, choosefunnel: val, types: date, selectendDate: null, selectstartDate: null }, () => {
                this.FetchApi()
            })

        }
    }
    HandleRevenue = (val, date) => {
        const { state } = this.state;
        if (val === "CUSTOM") {
            this.setState({ ...state, Revenue: val })
        } else {
            this.setState({ ...state, Revenue: val, Revenue_selectendDate: null, types1: date, Revenue_selectstartDate: null }, () => { this.RevenueFetchApi() })

        }
    }
    HandleRadio = (name, val) => {
        this.setState({ [name]: val }, () => {
            this.RevenueFetchApi()
        })

    }
    handleDateChange = async (name, date) => {
        const { selectstartDate, selectendDate } = this.state;
        this.setState({
            ...this.state, [name]: date,
        }, () => {
            if (this.state.selectstartDate !== null && this.state.selectendDate !== null) {
                this.setState({ types: selectstartDate + "/" + selectendDate })
                this.FetchApi();
            }

        })

    };
    handleDateChange1 = async (name, date) => {
        const { Revenue_selectstartDate, Revenue_Revenue_selectendDate } = this.state;
        this.setState({
            ...this.state, [name]: date
        }, () => {
            if (this.state.Revenue_Revenue_selectendDate !== null && this.state.Revenue_selectstartDate !== null) {
                this.setState({ types1: Revenue_selectstartDate + "/" + Revenue_Revenue_selectendDate })
                this.RevenueFetchApi();
            }
        })

    };

    changedselect = (newValue) => {
        debugger
        var b = [{ title: 'Source', value: "source" }, { title: 'Event', value: "event" }, { title: 'Sales Person', value: "sales_man" },
        { title: 'City', value: "city" }];
        const state = this.state;
        const a = newValue.filter((option) => this.state.value.indexOf(option.title) === -1);

        b.map(item => {
            if (newValue.some(data => data.title === item.title)) {
                state[item.value] = true
            } else {
                state[item.value] = false
            }
            return item
        })
        this.setState({
            ...state,
            value: a,
        }, () => {
            this.RevenueFetchApi();
        });

    }
    FetchApi = () => {

        // Leads Funnel fetch api
        const { state, choosefunnel, selectstartDate, selectendDate, } = this.state;
        var month = moment().get('month'),
            year = moment().get('year');
        if (month >= 3) {
            var yearstart = year + '-04-01';
            var yearend = (year + 1) + '-03-31';
        } else {
            var yearstart = (year - 1) + '-04-01';
            var yearend = year + '-03-31';
        }
        let today = moment().format('YYYY-MM-DD');
        let current_month = moment().startOf('month').format('YYYY-MM');
        var Weekstart = moment().startOf('week').format('YYYY-MM-DD');
        axios.post(`${API_URL}/api/v1/dashboard/lead_dashboard`, {
            "category": choosefunnel.toUpperCase(),
            "today": today,
            "month": current_month,
            "week_start_date": Weekstart,
            "year_start_date": yearstart,
            "year_end_date": yearend,
            "custom_start_date": selectstartDate,
            "custom_end_date": selectendDate
        })
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        ...state,
                        leadchart: res.data.info.leadchart,
                        projectChart: res.data.info.projectChart,
                        leadCount: res.data.info.leadcount,
                        qualifiedLeadCount: res.data.info.leadquoteconfirm,
                        projectCount: res.data.info.projectcount
                    })
                } else {
                    this.setState({
                        ...state,
                        leadchart: [],
                        projectChart: [],
                        leadCount: 0,
                        qualifiedLeadCount: 0,
                        projectCount: 0
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    RevenueFetchApi = () => {

        // Revenue fetch api

        const { state, city, Revenue, source, sales_man, event, Revenue_selectendDate, Revenue_selectstartDate } = this.state;
        var month = moment().get('month'),
            year = moment().get('year');
        var yearstart = '';
        var yearend = '';
        if (month >= 3) {
            yearstart = year + '-04-01';
            yearend = (year + 1) + '-03-31';
        } else {
            yearstart = (year - 1) + '-04-01';
            yearend = year + '-03-31';
        }
        let today = moment().format('YYYY-MM-DD');
        let current_month = moment().startOf('month').format('YYYY-MM');
        var Weekstart = moment().startOf('week').format('YYYY-MM-DD');
        axios.post(`${API_URL}/api/v1/dashboard/revenue_dashboard`, {
            "source": source,
            "event": event,
            "city": city,
            "sales_man": sales_man,
            "category": Revenue.toUpperCase(),
            "today": today,
            "month": current_month,
            "week_start_date": Weekstart,
            "year_start_date": yearstart,
            "year_end_date": yearend,
            "custom_start_date": Revenue_selectstartDate,
            "custom_end_date": Revenue_selectendDate
        })
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        ...state,
                        SourceData: res.data.info.source,
                        eventData: res.data.info.event,
                        sales_manData: res.data.info.sales_man,
                        city_data: res.data.info.city,
                    })
                } else {
                    this.setState({
                        ...state,
                        SourceData: [],
                        eventData: [],
                        city_data: []
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    render() {
        const { types, types1, SourceData, eventData, sales_manData, city_data, leadchart, projectChart, choosefunnel, source, event, selectstartDate, selectendDate, Revenue_selectstartDate, Revenue_selectendDate, sales_man, city, Revenue } = this.state;

        // no data identify fun in charts
        const datafilter = (data_filter) => {
            var nodata = [];
            if (data_filter) {
                data_filter.map((val, index) => {
                    if (val.value === 0) {
                        nodata.push(index)
                    }
                })
            }
            return { data_filter, nodata }
        }
        return (
            <div className="main-container">
                <div className="backg-list">
                    <div className="row">
                        <h4 className="text-muteds">Leads Funnel</h4>
                        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">

                            {/* Leads Funnel list of buttons */}
                            <div className="sub-header">
                                <ButtonGroup>
                                    <Button className={choosefunnel === "DAY" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.Handlechoosefunnel("DAY", new Date())}>Today</Button>
                                    <Button className={choosefunnel === "WEEK" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.Handlechoosefunnel("WEEK", new Date())}>Week</Button>
                                    <Button className={choosefunnel === "MONTH" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.Handlechoosefunnel("MONTH", new Date())}>Month</Button>
                                    <Button className={choosefunnel === "YEAR" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.Handlechoosefunnel("YEAR", new Date())}>Year&nbsp;To&nbsp;Date</Button>
                                    <Button className={choosefunnel === "CUSTOM" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.Handlechoosefunnel("CUSTOM", null)}>Custom</Button>
                                </ButtonGroup>
                            </div>
                            {/* end */}

                            {/* Leads Funnel start to end date pickers */}



                            {choosefunnel === "CUSTOM" && <>   <div className="row">
                                <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            size="small"
                                            margin="dense"
                                            format="dd/MM/yyyy" inputVariant={"outlined"}
                                            style={{ width: '100%' }}
                                            label={"Start Date"}
                                            value={selectstartDate}
                                            onChange={(date) => this.handleDateChange("selectstartDate", date)}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            size="small"
                                            margin="dense"
                                            format="dd/MM/yyyy" inputVariant={"outlined"}
                                            style={{ width: '100%' }}
                                            label={"Start Date"}
                                            value={selectendDate}
                                            onChange={(date) => this.handleDateChange("selectendDate", date)}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div></>}
                            {/* end */}

                        </div>
                        {(selectstartDate && selectendDate) ?
                            <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12"><div className="year">{moment(selectstartDate).format('ll')} / {moment(selectendDate).format('ll')}</div></div> :
                            <>{types && <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12"><div className="year">{moment(types).format('ll')}</div></div>}</>}

                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 col-12">
                        <div className="row">
                            <div className="col-sm-12 col-lg-6 col-md-12 col-xs-12 col-12">
                                <div className="backgss">
                                    {/* Leads Funnel cards */}
                                    <div className="row" style={{ marginTop: "7px", padding: "0px 12px" }}>
                                        <div className="col-sm-4 col-lg-4 col-xs-12 col-12">
                                            <div className="jr-cards jr-cards-color-one">
                                                <div className="avatar avatar-one">
                                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAfCAYAAAASsGZ+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTUyQUQwQUQxMjVCMTFFOUFCMjNFNzI1RkMxRkFGMkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTUyQUQwQUMxMjVCMTFFOUFCMjNFNzI1RkMxRkFGMkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RjBBNkM0MkFGM0ExMUU4QkQwNkE1MUE1MTNDOEZBNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RjBBNkM0M0FGM0ExMUU4QkQwNkE1MUE1MTNDOEZBNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsgBbMwAAAK9SURBVHjatNZLSFVBHMfxe4/aw8qgp2aLsJJI6LXUpBZRZFCrwmhREELRJqIHGLWJIiRw0aJoEe1q0RNKahGSlWSRJEUPNAlJyR6k3DSt7Pb92+/A4XDn3Nvj/uEDesY5//nPzJkxnkwmYxlGHHuwAR9Qj3uZdPQyTDAb97ETA5iDu6jNpHOu44Xz9aK5KMR2tbXjOO6gGF34jFORUxCYrrG4gaXIw0e81dS04Ql24wdWYxcOY4YGO+LMYkkkHyOoRl7geVANLqM4+TtOoB39aMRJVIX7BddkEC+RwHfHmGyapuO0fn+uqd2MVpThAh64KjGPcSxFBStRhyZVkECDfq4I/e1B9Loq2YFlGKPfZ+IienAJa9CCSsxCFRqxLVTtQq3To3AlJehEM84F1shirWN9zH6tSfBZK1ap6vP2zN/C17S7XmOr5tev0kZehAmh78q25SLMw14Mq3rbnZPRjAM4ZFu4UFPSqAVPqtyf6FbnfH0X4bB+HViCSToVujWoXpTjSkwL1xExJaWYEtFeFtF2FS1W/niNPtURU6uyn+oDDIZtkOu4iSZVEo4hq85T44imJxxb9NXna22CYYNbp3Ws1DqEw06LXEsy0ZEgppcs1vweDbX1YyNW4IgGE453yMlNk+SNpqJJpYfDvqNXOOPo/8mSWCVTdei5okADcV0VcZ3YqeKLn6QoopKYTuMSR5s9L0VnRBLP04EXVYndH+uxIEVbg3Zej6Nvwk9SoNvOFbd11b5AHZZjk9ZiGioi+o4m8Re+L80Nanf7M+xTgqSOnuqIa8FPMrq7xukKTRdn5U9iwP8YPe3nbIRt+6+e7uf3WUryzW5cS5KT4XT9TQz7lXhpdte/TtegnySRpSS2C4f86cpWEos+/w55mMUkbXb9Wkm3tI3j/zmBva/cktTrH4K8LCSx6PolwAAABNqiUzqfZAAAAABJRU5ErkJggg==" alt="..."></img>
                                                </div>
                                                <div className="price">{this.state.leadCount}</div>
                                                <div className="price-title">Leads</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-lg-4 col-xs-12 col-12">
                                            <div className="jr-cards jr-cards-color-two">
                                                <div className="avatar avatar-two">
                                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0JCQkVFQkYxMjVCMTFFOUFGRDc4MDVEREU3NzkxRDciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0JCQkVFQkUxMjVCMTFFOUFGRDc4MDVEREU3NzkxRDciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMDQ0MzA3MkFGM0ExMUU4QjBBMENDQURDNDQwREVBNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMDQ0MzA3M0FGM0ExMUU4QjBBMENDQURDNDQwREVBNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoGTNhEAAAMaSURBVHjatNdZSFRRHMfxGZ1CyZXU1EwqzHbLaLEHSWi1KOglpUBtfymCeoiSFnqpCHqIIeihIvKhKHowTWkBgxaEtB17KItMA62McsvK6XvoN3AbZsaZqx34MMw9c+//nnv/53/OOD0ejyNAK8IOjMJnHEAc9iEBX3ACtY4wmyvA8QJcwi60YgVuoQ8XcB95uI4peBNWVDNSP6ahBwstxzKRbPlehA6kBbhGQME613n+tgw/fZnqWxxuQMMZ5J2aVokJmIefcMpNfV/msNEGC2qS6Aa69T69eZCK+Q6bLWKQ/n7cQTQSlbUmg+8quWL/R9AxmK6RftLUaUcWajDX8tvI4Qr6ARcVrMOiWcEPoRz1mDXUeWptaZiIEfitG/Vovo7GHL2CpuFIpGxcxkg8wS/LkxnQzZi+w6gbjuKwSfPwKhIC/CYCu9GLa4gcSnGoQb+Kg/W4K8BFsvEUH7E83KCmxL3HC6TrWBLO4zXcg1ysXE9nf6hBo9CJSp8yaOrvPZQiK4RR5CvwnlCCVuG5pWO7Ti61UVvHogsFGkycPv8JuggDSNTBPAVcaaeYY42Sy7RGvMIzPbEKzDA/uo1zlpPMez1uM+BZJeFmjTgF8Vr+ClFn7sSlknZEM2iD5t5em7U8Fz1aDHLQpdUoBlHo9Fakb3ikk7ag2mG/dWsApkQWYrxq8g+0qC/dperSo5PMDTwYQtBoVaqTqPDTH29uxLf2Fuuuwm2p2qi1YacW91YtDn1aEtORgZQIPes0ndyrkYfaVurV1OtzNUpQhndab1O12zC7kJl4aDKuGettZGqxpsVRTFZ2VqskBjrHZHG7WWXc2gMtCGOEcVpTzQrj9ukz29OpGv1X7T5itdcyMyXGPN6DSvG1YQRdqoXd7afvmBKqSbMjVnlyRXvket+ylxvio83B4wB9JWgIUiI93uw9g0lo1Av/rt2B098SrL3TbKzyM683ajdRreLgVMEZpx3IKd+dwxJsUwYHC9qnR1am/zjmL0gyTiMJW5Gvd+tS0WhAFd46bNZYL5P1L9GGFtRqDQ563h8BBgASAtRpZBfVswAAAABJRU5ErkJggg==" alt="...">
                                                    </img>
                                                </div>
                                                <div className="price">{this.state.qualifiedLeadCount}</div>
                                                <div className="price-title">Qualified Leads</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-lg-4 col-xs-12 col-12">
                                            <div className="jr-cards jr-cards-color-three">
                                                <div className="avatar avatar-three">
                                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUI3RUE3QTYxMjVCMTFFOUI3RkJFNTdGNTdGRjI5QzMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUI3RUE3QTUxMjVCMTFFOUI3RkJFNTdGNTdGRjI5QzMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDMEU3RjFERUFGM0ExMUU4QjBCN0Q0N0ZEMDdFQjE5NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDMEU3RjFERkFGM0ExMUU4QjBCN0Q0N0ZEMDdFQjE5NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgizGl0AAALLSURBVHjarJdJaBRBFIZ7FoWgRlzANSDqwe0g5BYDKiqiHtyNoKIeRHBB8KLEBdfkECUg6MH14EFBXAhkCNGIHhQh4kIOQbOYg2KMGhVHRGISvwevpWm6Z6qnuuHjTVW9rr9f9atX04n5q+tbHcc5Crcc86sUTsNST18bVD+6s/yayQRJmAHTIogeguewCK5CJdTAgLQXrMk8MJkkQcSD2D1w3sD/oEQFVfoADhH+H0R0CaYRntI/L1/EptckFb3givovxO5jyqGMh9gbl3CN2t25nBB/IhHDubiE18JDQ9+zuvRT4hAeCu2Gvp/Ujo9D2BU3uXrUvgtzSEcQlexP5HJgaadidoCb6g30NWCv8O7bbSLOJXod06FbTpa4D8Zpu43xG5CKTZjJiuEjPzfDfhgCC3XuUm3vg43y7vEd4xXuN9RJBfS90AhLWM5a+Ktt8Z0obZCtNQFE9KVXuM+kygUIV2q5ncXk7wNeYdKzv7vVt4SoT7oD5YYRt/jaclA0MWmryc34dWLq4bAI34Vtee6pVnvZ0zdbbVXEtKh1l2KTdnTBqADHrZqZp+Czp3+m2qCi0qW2MyDqJswX2ce/YS68gl64Dc1QDBX6XuSMPRKSaL28M/FZpXkgx+McHTvBWIdv/4+WmuAWkNcwUmvsdq3Lcr2FDSF/Evo1giyTL+PnGd/4d9gVstxZOY+DBobDnzzZvk4faDLiHxAf4YlsUCNPBlS76ZAJK5nZCMmS0sh/GhYcKTZFcZTMgYj+RbISNsKJQoR1L5elLYRTEcutV7zFJuJutWMLudlGuFntlkJutlnqX1Kn4YBWNtNjVP4MXrTN6vU6WaOhaJ0kFrxJWwp/01J5j0kfy4OQOD0BgpIHN/XrowKfZ2GVK0qGOloyM9olVj5jvmpdXgwrdGwl/nXuJ4y1sEYlZfY47IRhvly4BMfw/eF2/hNgAOQe0/G6A/gXAAAAAElFTkSuQmCC" alt="..."></img>
                                                </div>
                                                <div className="price">{this.state.projectCount}</div>
                                                <div className="price-title">Projects</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end */}

                                </div>
                            </div>
                            <div className="col-sm-12 col-lg-6 col-md-12 col-xs-12 col-12">

                                {/* Leads Funnel charts */}
                                <div className="row">
                                    <div className="col-sm-6 col-lg-6 col-xs-12 col-12">
                                        <div className="backg s">
                                            <span className="chart-titles">Leads By Source</span>

                                            {datafilter(leadchart).nodata?.length !== leadchart?.length ? <PieCharts title={'Leads'}
                                                data={leadchart ? leadchart : []}
                                            /> : <span className="nodata">
                                                    <i class="fa fa-exclamation-circle"></i> No data</span>}
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-6 col-xs-12 col-12">
                                        <div className="backg s">
                                            <span className="chart-titles">Conversion Rate By Source</span>
                                            {datafilter(projectChart).nodata?.length !== projectChart?.length ? <PieCharts title={'Projects'}
                                                data={projectChart ? projectChart : []}
                                            /> : <span className="nodata"> <i class="fa fa-exclamation-circle"></i>No data</span>}
                                        </div>
                                    </div>
                                </div>
                                {/* end */}

                            </div>
                        </div>

                    </div>
                </div><br />

                <div className="backg-list">
                    <div className="row">
                        <h4 className="text-muteds">Revenue</h4>
                        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">

                            {/* Revenue list of buttons */}
                            <div className="sub-header">
                                <ButtonGroup>
                                    <Button className={Revenue === "DAY" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.HandleRevenue("DAY", new Date())}>Today</Button>
                                    <Button className={Revenue === "WEEK" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.HandleRevenue("WEEK", new Date())}>Week</Button>
                                    <Button className={Revenue === "MONTH" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.HandleRevenue("MONTH", new Date())}>Month</Button>
                                    <Button className={Revenue === "YEAR" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.HandleRevenue("YEAR", new Date())}>Year&nbsp;To&nbsp;Date</Button>
                                    <Button className={Revenue === "CUSTOM" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.HandleRevenue("CUSTOM", null)}>Custom</Button>
                                </ButtonGroup>
                            </div>
                            {/* end */}

                            {/* Revenue start to end date pickers */}
                            {Revenue === "CUSTOM" && <>   <div className="row">

                                <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            size="small"
                                            margin="dense"
                                            format="dd/MM/yyyy" inputVariant={"outlined"}
                                            style={{ width: '100%' }}
                                            label={"Start Date"}
                                            value={Revenue_selectstartDate}
                                            onChange={(date) => this.handleDateChange1("Revenue_selectstartDate", date)}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            size="small"
                                            margin="dense"
                                            format="dd/MM/yyyy" inputVariant={"outlined"}
                                            style={{ width: '100%' }}
                                            label={"Start Date"}
                                            value={Revenue_selectendDate}
                                            onChange={(date) => this.handleDateChange1("Revenue_selectendDate", date)}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>

                            </div></>}
                            {/* end */}

                        </div>
                        {(Revenue_selectstartDate && Revenue_selectendDate) ?
                            <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12"><div className="year">{moment(Revenue_selectstartDate).format('ll')} / {moment(Revenue_selectendDate).format('ll')}</div></div> :
                            <>{types1 && <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12"><div className="year">{moment(types1).format('ll')}</div></div>}</>}
                    </div>
                </div>

                {/* Revenue Radio buttons */}

                <div>
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">
                            <Autocomplete
                                multiple
                                value={this.state.value}
                                size="small"
                                onChange={(event, value) => this.changedselect(value)}
                                options={dataselect}
                                getOptionLabel={(option) => option.title}
                                renderTags={(tagValue, getTagProps) =>
                                    tagValue.map((option, index) => (<Chip label={option.title} {...getTagProps({ index })} />))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} label="Revenue" variant="outlined" placeholder="Revenue" />
                                )}
                            />
                        </div> </div>

                </div> <br />
                {/* end */}

                {/* Revenue charts */}

                <div className="row">
                    {
                        source ? <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12 col-12" style={{ marginBottom: 22 }}>
                            <div className="backg s">
                                <span className="chart-titles">By Source</span>
                                {datafilter(SourceData).nodata?.length !== SourceData?.length ? <PieCharts title={'Source'}
                                    data={SourceData ? SourceData : []}
                                /> : <span className="nodata"><i class="fa fa-exclamation-circle"></i> No data</span>}
                            </div></div> : ""
                    }
                    {
                        event ? <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12 col-12" style={{ marginBottom: 22 }}>
                            <div className="backg s">
                                <span className="chart-titles">By Event</span>
                                {datafilter(eventData).nodata?.length !== eventData?.length ? <PieCharts title={'Event'}
                                    data={eventData ? eventData : []}
                                /> : <span className="nodata"><i class="fa fa-exclamation-circle"></i> No data</span>}
                            </div></div> : ""
                    }
                    {
                        sales_man ? <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12 col-12" style={{ marginBottom: 22 }}>
                            <div className="backg s">
                                <span className="chart-titles">By Sales Person</span>
                                {datafilter(sales_manData).nodata?.length !== sales_manData?.length ? <PieCharts title={'Sales Man'}
                                    data={sales_manData ? sales_manData : []}
                                /> : <span className="nodata"><i class="fa fa-exclamation-circle"></i> No data</span>}
                            </div></div> : ""
                    }
                    {
                        city ? <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12 col-12" style={{ marginBottom: 22 }}>
                            <div className="backg s">
                                <span className="chart-titles">By City</span>
                                {datafilter(city_data).nodata?.length !== city_data?.length ? <PieCharts title={'City'}
                                    data={city_data ? city_data : []}
                                /> : <span className="nodata"><i class="fa fa-exclamation-circle"></i> No data</span>}
                            </div></div> : ""
                    }

                </div>
                {/* end */}

            </div>
        );
    }
}
export default DashBoard;