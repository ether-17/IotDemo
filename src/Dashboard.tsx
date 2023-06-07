import moment from 'moment'
import { Link } from "react-router-dom";

import BarChartIcon from '@mui/icons-material/BarChart'
//import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined;'
import DescriptionIcon from '@mui/icons-material/Description';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

function Dashboard(){
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
    };

    const [data, setData] = React.useState({
      eventName: "",
      newEvent: {
          fileHash: "",
          eventTypeName: "",
          deviceName: "",
          registrationTime: "",
          detectNum: 0
      },
      allEvent: [
        {
          registrationTime: "",
          detectNum: 0
        }
      ]
    });

    const test = "{\"test\": \"0\"}";
    console.log(JSON.parse(test));

    React.useEffect(() => {
      fetch("https://iot-demo-func.azurewebsites.net/api/GetAllEvent", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          eventName:"IotTest"
        }),
        mode: 'cors'})
      .then((data) => data.text())
      .then((data) => data.replace(/\'/g, '"').slice(1).slice(0, -1))
      .then((data) => JSON.parse(data))
      .then((data) => setData(data))
    }, []);
    console.log(data);

    /*React.useEffect(() => {
      function fetchData(){
        fetch("https://iot-demo-func.azurewebsites.net/api/GetAllEvent", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            eventName:"HumanDetection"
          }),
          mode: 'cors'})
        .then((data) => data.json())
        .then((data) => setData(data))
      }

      const interval = setInterval(() => {
        fetchData();
      }, 300000);

      return () => clearInterval(interval);
    }, []);*/
    
    const graphLength = 15;
    const APIEvent = data.allEvent.map((event) => (
        {
          name: moment(event.registrationTime).format('HH:mm'),
          イベント検出数: event.detectNum
        }
      ));
    const filler = Array(graphLength - APIEvent.length).fill({
          name: "",
          イベント検出数:0
        })
    const event = filler.concat(APIEvent);

    return (
      <div id="mainWrapper">
			<div className="hf header middle">
        FUJISOFT Data Platform
      </div>
			<div id="center">
        <div id="sidebar">
            <BarChartIcon /><br />
            {/*<DescriptionOutlinedIcon /><br />*/}
            <Link to={`/events/`}>
              <DescriptionIcon /><br />
            </Link>
            <WorkHistoryIcon /><br />
            <GroupsOutlinedIcon /><br />
            <PermIdentityIcon /><br />
            <SettingsIcon />
				</div>
        <div id="main">
          <div className="eventRegisterDevice">
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-simple-select-label">イベント登録デバイス</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
            >
            <MenuItem value={10}>A</MenuItem>
            <MenuItem value={20}>B</MenuItem>
            <MenuItem value={30}>C</MenuItem>
            </Select>
            </FormControl>
          <div className="graphWrapper flex">
          <div className="thumbnail textMiddle">
            <Card sx={{ width: 200, height: 130 }}>
              <CardContent>
                No Image
              </CardContent>
            </Card>
          </div>
          <div className="parameter">
          <Card sx={{ width: 200, height: 130 }}>
            <CardContent>
              test
            </CardContent>
          </Card>
          </div>
          <div className="graph">
            <Card sx={{ minWidth: 275, height: 130 }}>
              <CardContent>
                <BarChart
                  data={event}
                  width={1000}
                  height={120}
                  barSize={10}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{paddingLeft:"20px"}}/>
                  <Bar dataKey="イベント検出数" fill="#8884d8"/>
                </BarChart>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="eventRegisterDevice">
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <InputLabel id="demo-simple-select-label">イベント登録デバイス</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          >
            <MenuItem value={10}>A</MenuItem>
            <MenuItem value={20}>B</MenuItem>
            <MenuItem value={30}>C</MenuItem>
          </Select>
        </FormControl>
          <div className="graphWrapper flex">
          <div className="thumbnail textMiddle">
            <Card sx={{ width: 200, height: 130 }}>
              <CardContent>
                No Image
              </CardContent>
            </Card>
          </div>
          <div className="parameter">
          <Card sx={{ width: 200, height: 130 }}>
            <CardContent>
              時刻:<br />
              発生回数:<br />
              パラメータA:<br />
              パラメータB:<br />
              パラメータC:<br />
            </CardContent>
          </Card>
          </div>
          <div className="graph">
            <Card sx={{ minWidth: 275, height: 130 }}>
              <CardContent>
                <LineChart
                  width={1000}
                  height={120}
                  data={event}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{paddingLeft:"20px"}}/>
                  <Line
                    type="monotone"
                    dataKey="イベント検出数"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="eventRegisterDevice">
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-simple-select-label">イベント登録デバイス</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
            >
            <MenuItem value={10}>A</MenuItem>
            <MenuItem value={20}>B</MenuItem>
            <MenuItem value={30}>C</MenuItem>
            </Select>
            </FormControl>
          <div className="graphWrapper flex">
          <div className="thumbnail textMiddle">
            <Card sx={{ width: 200, height: 130 }}>
              <CardContent>
                No Image
              </CardContent>
            </Card>
          </div>
          <div className="parameter">
          <Card sx={{ width: 200, height: 130 }}>
            <CardContent>
              時刻:<br />
              発生回数:<br />
              パラメータA:<br />
              パラメータB:<br />
              パラメータC:<br />
            </CardContent>
          </Card>
          </div>
          <div className="graph">
            <Card sx={{ minWidth: 275, height: 130 }}>
              <CardContent>
                <LineChart
                  width={1000}
                  height={120}
                  data={event}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{paddingLeft:"20px"}}/>
                  <Line
                    type="monotone"
                    dataKey="イベント検出数"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
      </div>
      <div id="footer" className="hf">
				企業ロゴや著作権
			</div>
		</div>
    )
}

export default Dashboard