import { Link } from "react-router-dom";

//import './App.css'
import './etazure.css'

import BarChartIcon from '@mui/icons-material/BarChart'
import DescriptionIcon from '@mui/icons-material/Description';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';

import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt'

import { useState, MouseEvent } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Popover from '@mui/material/Popover';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }

const rows = [
  createData('2023/05/01 12:00:00', 0, 0, 0, 0),
  createData('2023/05/01 12:01:00', 0, 0, 0, 0),
  createData('2023/05/01 12:02:00', 0, 0, 0, 0),
  createData('2023/05/01 12:03:00', 0, 0, 0, 0),
  createData('2023/05/01 12:04:00', 0, 0, 0, 0),
  createData('2023/05/01 12:05:00', 0, 0, 0, 0),
  createData('2023/05/01 12:06:00', 0, 0, 0, 0),
  createData('2023/05/01 12:07:00', 0, 0, 0, 0),
  createData('2023/05/01 12:08:00', 0, 0, 0, 0),
  createData('2023/05/01 12:09:00', 0, 0, 0, 0),
  createData('2023/05/01 12:10:00', 0, 0, 0, 0),
  ];

function Events(){
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const popovers = rows.map(() => {
    return useState<HTMLTableRowElement | null>();
  });

  const handleClicks = popovers.map((popover) => {
    return (event: MouseEvent<HTMLTableRowElement>) => {popover[1](event.currentTarget);};
  });

  const handleCloses = popovers.map((popover) => {
    return () => popover[1](null);
  });

  const opens = popovers.map((popover) => {
    return Boolean(popover[0]);
  });

  const ids = opens.map((open) => {
    return open ? "simple-popover": undefined;
  });
  
  /*const opens = popovers.map((popover) => Boolean(popover[0]));
  const ids = opens.map((open) => open ? "simple-popover" : undefined);*/

  return (
    <div id="mainWrapper">
    <div className="hf header middle">
      FUJISOFT Data Platform
    </div>
    <div id="center">
      <div id="sidebar">
        <Link to={`/`}>
          <BarChartIcon /><br />
        </Link>
        <DescriptionIcon /><br />
        <WorkHistoryIcon /><br />
        <GroupsOutlinedIcon /><br />
        <PermIdentityIcon /><br />
        <SettingsIcon />
      </div>
      <div id="main">
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
        </FormControl><br />
        <Card sx={{ m: 1, width: 500 }}>
          <CardContent>
            <FilterAltIcon />
            イベント発生時刻<br />
            <div className="flex">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="開始"/>
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="終了" />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </CardContent>
        </Card>
        <TableContainer sx={{ m: 1, width: 1400, boxShadow: 1}} component={Paper}>
          <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                  <TableCell>イベント発生時刻</TableCell>
                  <TableCell align="right">パラメータA</TableCell>
                  <TableCell align="right">パラメータB</TableCell>
                  <TableCell align="right">パラメータC</TableCell>
                  <TableCell align="right">パラメータD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                aria-describedby={ids[index]}
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick = {handleClicks[index]}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.map((row, index) => (
          <Popover
          id={ids[index]}
          open={opens[index]}
          anchorEl={popovers[index][0]}
          anchorReference="anchorPosition"
          anchorPosition={{
            top:20,
            left:20
          }}
          anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
          }}>
        <Typography sx={{ m: 1 }} align="right">
          <CloseIcon onClick={handleCloses[index]}/>
        </Typography>
        <Typography sx={{ p: 2, width: 1400, height: 600 }}>
          イベント発生時刻:{row.name}<br />
          パラメータA:{row.calories}<br />
          パラメータB:{row.fat}<br />
          パラメータC:{row.carbs}<br />
          パラメータD:{row.protein}
        </Typography>
        </Popover>
        ))}
    </div>
  </div>
  <div id="footer" className="hf">
    企業ロゴや著作権
  </div>
		</div>
    )
}

export default Events