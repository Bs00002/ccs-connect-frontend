import { useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

import CustomerServiceOutlined from '@ant-design/icons/CustomerServiceOutlined';
import SyncOutlined from '@ant-design/icons/SyncOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import CheckSquareOutlined from '@ant-design/icons/CheckSquareOutlined';
import LockFilled from '@ant-design/icons/LockFilled';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import UserSwitchOutlined from '@ant-design/icons/UserSwitchOutlined';

import { supportTickets } from 'data/ccsMock';

const STATUS_KPI_MAP = [
  { key: 'New', color: 'primary', icon: <CustomerServiceOutlined />, label: 'New Tickets' },
  { key: 'In Progress', color: 'warning', icon: <SyncOutlined />, label: 'In Progress' },
  { key: 'Resolved', color: 'success', icon: <CheckCircleOutlined />, label: 'Resolved' },
  { key: 'Closed', color: 'default', icon: <LockOutlined />, label: 'Closed' }
];

const STATUS_TABS = ['All', 'New', 'Assigned', 'In Progress', 'Pending Customer', 'Resolved', 'Closed'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

const STATUS_COLOR = {
  New: 'primary',
  Assigned: 'info',
  'In Progress': 'warning',
  'Pending Customer': 'secondary',
  Resolved: 'success',
  Closed: 'default'
};

const PRIORITY_COLOR = {
  Low: 'default',
  Medium: 'primary',
  High: 'warning',
  Critical: 'error'
};

const TYPE_COLOR = {
  Complaint: 'error',
  Return: 'warning',
  Replacement: 'info',
  Query: 'primary',
  Request: 'secondary'
};

const RAISED_ICON = {
  Dealer: <ShopOutlined />,
  Distributor: <TeamOutlined />,
  Employee: <UserSwitchOutlined />
};

const RAISED_COLOR = {
  Dealer: 'primary',
  Distributor: 'secondary',
  Employee: 'success'
};

export default function SupportPage() {
  const [tab, setTab] = useState(0);
  const [priority, setPriority] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [menu, setMenu] = useState(null);

  const kpis = useMemo(() => {
    const counts = {};
    STATUS_KPI_MAP.forEach((s) => { counts[s.key] = supportTickets.filter((t) => t.status === s.key).length; });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const t = STATUS_TABS[tab];
    return supportTickets.filter((s) => {
      if (t !== 'All' && s.status !== t) return false;
      if (priority && s.priority !== priority) return false;
      return true;
    });
  }, [tab, priority]);

  const pageData = useMemo(
    () => filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filtered, page, rowsPerPage]
  );

  return (
    <Stack spacing={2.75}>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Support Tickets</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Customer support, complaints, returns and service requests
            </Typography>
          </Box>
          <Stack direction="row" sx={{ gap: 1 }}>
            <Button variant="outlined" startIcon={<FilterOutlined />}>Advanced Filter</Button>
            <Button variant="contained" startIcon={<PlusOutlined />}>New Ticket</Button>
          </Stack>
        </Stack>
      </Box>

      <Grid container spacing={2}>
        {STATUS_KPI_MAP.map((k) => (
          <Grid key={k.key} size={{ xs: 12, sm: 6, md: 3 }}>
            <AnalyticEcommerce
              title={k.label}
              count={kpis[k.key]}
              color={k.color}
              icon={k.icon}
              extra={k.key === 'New' ? 'Requires triage' : k.key === 'In Progress' ? 'Active SLA' : ''}
            />
          </Grid>
        ))}
      </Grid>

      <MainCard>
        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between" sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Tabs
              value={tab}
              onChange={(_, v) => { setTab(v); setPage(0); }}
              variant="scrollable"
              scrollButtons="auto"
            >
              {STATUS_TABS.map((t) => (
                <Tab
                  key={t}
                  label={t === 'All' ? t : (
                    <Badge
                      badgeContent={supportTickets.filter((s) => s.status === t).length}
                      color={STATUS_COLOR[t] === 'default' ? 'secondary' : STATUS_COLOR[t]}
                      max={99}
                    >
                      <Box sx={{ px: 0.5 }}>{t}</Box>
                    </Badge>
                  )}
                />
              ))}
            </Tabs>
          </Stack>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mr: 0.5 }}>Priority:</Typography>
            <Chip label="All" size="small" variant={priority === null ? 'filled' : 'outlined'} onClick={() => setPriority(null)} sx={{ cursor: 'pointer' }} />
            {PRIORITIES.map((p) => (
              <Chip
                key={p}
                label={p}
                size="small"
                color={PRIORITY_COLOR[p]}
                variant={priority === p ? 'filled' : 'outlined'}
                onClick={() => setPriority(priority === p ? null : p)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
            <Box sx={{ flex: 1 }} />
            <Chip label={`${filtered.length} tickets`} size="small" variant="outlined" />
          </Stack>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <TableContainer>
          <Table size="small" sx={{ minWidth: 1250 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Ticket No</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Raised By</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Assignee</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Updated</TableCell>
                <TableCell sx={{ fontWeight: 600, align: 'right' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageData.map((row) => (
                <TableRow key={row.id} hover sx={{ '& > td': { py: 1.25 } }}>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main', fontFamily: 'monospace', fontSize: '0.8rem' }}>{row.ticketNo}</TableCell>
                  <TableCell>
                    <Box sx={{ maxWidth: 280 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {row.title}
                      </Typography>
                      <Stack direction="row" sx={{ gap: 0.5, mt: 0.25 }}>
                        {row.productName && <Chip label={row.productName.split(' ').slice(0, 2).join(' ')} size="small" variant="plain" sx={{ height: 18, fontSize: '0.65rem', px: 0.25 }} />}
                        {row.orderNo && <Chip label={row.orderNo} size="small" variant="plain" sx={{ height: 18, fontSize: '0.65rem', px: 0.25 }} />}
                      </Stack>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={row.type} color={TYPE_COLOR[row.type]} size="small" variant="light" />
                  </TableCell>
                  <TableCell>
                    <Chip label={row.priority} color={PRIORITY_COLOR[row.priority]} size="small" variant="combined" />
                  </TableCell>
                  <TableCell>
                    <Chip label={row.status} color={STATUS_COLOR[row.status]} size="small" variant="light" />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                      <Avatar
                        sx={{
                          width: 26, height: 26, fontSize: '0.75rem',
                          bgcolor: `${RAISED_COLOR[row.raisedByType]}.lighter`,
                          color: `${RAISED_COLOR[row.raisedByType]}.main`
                        }}
                      >
                        {RAISED_ICON[row.raisedByType]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.raisedBy}</Typography>
                        <Chip label={row.raisedByType} size="small" variant="outlined" sx={{ height: 16, fontSize: '0.6rem', mt: 0.25 }} />
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{row.assignee || <Chip label="Unassigned" size="small" variant="plain" color="error" sx={{ height: 20, fontSize: '0.7rem' }} />}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{row.updatedAt}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" sx={{ gap: 0.5 }}>
                      <Tooltip title="View thread"><IconButton size="small" color="primary"><MessageOutlined /></IconButton></Tooltip>
                      <Tooltip title="Assign"><IconButton size="small" color="info"><UserOutlined /></IconButton></Tooltip>
                      <Tooltip title="Resolve"><IconButton size="small" color="success"><CheckSquareOutlined /></IconButton></Tooltip>
                      <Tooltip title="Close"><IconButton size="small" color="inherit"><LockFilled /></IconButton></Tooltip>
                      <Tooltip title="More actions">
                        <IconButton size="small" onClick={(e) => setMenu(menu?.id === row.id ? null : { el: e.currentTarget, id: row.id })}>
                          <MoreOutlined />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(0); }}
          rowsPerPageOptions={[8, 16, 25, 50]}
        />
      </MainCard>

      <Menu anchorEl={menu?.el} open={Boolean(menu)} onClose={() => setMenu(null)}>
        <MenuItem onClick={() => setMenu(null)}>
          <ListItemIcon sx={{ minWidth: 36 }}><MessageOutlined style={{ fontSize: 16 }} /></ListItemIcon>View Thread
        </MenuItem>
        <MenuItem onClick={() => setMenu(null)}>
          <ListItemIcon sx={{ minWidth: 36 }}><UserOutlined style={{ fontSize: 16 }} /></ListItemIcon>Assign
        </MenuItem>
        <MenuItem onClick={() => setMenu(null)}>
          <ListItemIcon sx={{ minWidth: 36 }}><CheckSquareOutlined style={{ fontSize: 16 }} /></ListItemIcon>Resolve
        </MenuItem>
        <MenuItem onClick={() => setMenu(null)}>
          <ListItemIcon sx={{ minWidth: 36 }}><LockOutlined style={{ fontSize: 16 }} /></ListItemIcon>Close Ticket
        </MenuItem>
      </Menu>
    </Stack>
  );
}
