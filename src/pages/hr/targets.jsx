import { useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

import TrophyOutlined from '@ant-design/icons/TrophyOutlined';
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';

import { targets } from 'data/ccsMock';

const formatINR = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');

const STATUS_COLOR = {
  'On Track': 'primary',
  Behind: 'warning',
  Achieved: 'success',
  Exceeded: 'secondary'
};

const STATUS_BG = {
  'On Track': 'primary.lighter',
  Behind: 'warning.lighter',
  Achieved: 'success.lighter',
  Exceeded: 'secondary.lighter'
};

const ASSIGNEE_ICONS = {
  Employee: <UserOutlined />,
  Distributor: <TeamOutlined />,
  Dealer: <ShopOutlined />,
  Territory: <EnvironmentOutlined />
};

export default function TargetsPage() {
  const [periodFilter, setPeriodFilter] = useState(null);
  const [assigneeFilter, setAssigneeFilter] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const periodTypes = ['Monthly', 'Quarterly', 'Half Yearly', 'Annual'];
  const assigneeTypes = ['Employee', 'Distributor', 'Dealer', 'Territory'];

  const filtered = useMemo(() => {
    return targets.filter((t) => {
      if (periodFilter && t.periodType !== periodFilter) return false;
      if (assigneeFilter && t.assigneeType !== assigneeFilter) return false;
      return true;
    });
  }, [periodFilter, assigneeFilter]);

  const summary = useMemo(() => {
    const assigned = targets.reduce((s, t) => s + (t.targetAmount || 0), 0);
    const achieved = targets.reduce((s, t) => s + (t.achievedAmount || 0), 0);
    const pct = assigned > 0 ? Math.round((achieved / assigned) * 100) : 0;
    return { assigned, achieved, pct, count: targets.length };
  }, []);

  const pageData = useMemo(
    () => filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filtered, page, rowsPerPage]
  );

  return (
    <Stack spacing={2.75}>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Targets &amp; Performance</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Define, track and measure performance targets across teams and territories
            </Typography>
          </Box>
          <Stack direction="row" sx={{ gap: 1 }}>
            <Button variant="outlined" startIcon={<FilterOutlined />}>Filters</Button>
            <Button variant="contained" startIcon={<PlusOutlined />}>Assign Target</Button>
          </Stack>
        </Stack>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <AnalyticEcommerce
            title="Total Assigned"
            count={formatINR(summary.assigned).replace('₹', '')}
            prefix="₹"
            color="primary"
            icon={<TrophyOutlined />}
            extra={`${summary.count} targets`}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <AnalyticEcommerce
            title="Achieved"
            count={formatINR(summary.achieved).replace('₹', '')}
            prefix="₹"
            color="success"
            icon={<TrophyOutlined />}
            percentage={summary.pct}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MainCard contentSX={{ p: 2.25 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
              <Stack sx={{ gap: 0.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.2px' }}>
                  Overall %
                </Typography>
                <Stack direction="row" sx={{ alignItems: 'baseline', gap: 0.5 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{summary.pct}%</Typography>
                </Stack>
              </Stack>
              <Box
                sx={{
                  width: 42, height: 42, borderRadius: 2, bgcolor: 'secondary.lighter',
                  color: 'secondary.dark', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem'
                }}
              >
                <DashboardOutlined />
              </Box>
            </Stack>
            <Box sx={{ pt: 1.5, borderTop: 1, borderColor: 'grey.100' }}>
              <LinearProgress
                variant="determinate"
                value={summary.pct}
                sx={{ height: 10, borderRadius: 5, bgcolor: 'grey.200' }}
              />
              <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.75 }}>
                <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>{formatINR(summary.achieved)}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{formatINR(summary.assigned)}</Typography>
              </Stack>
            </Box>
          </MainCard>
        </Grid>
      </Grid>

      <MainCard>
        <Stack direction="column" spacing={2}>
          <Box>
            <Stack direction="row" alignItems="center" sx={{ gap: 1, mb: 1, flexWrap: 'wrap' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, minWidth: 90 }}>Period:</Typography>
              <Chip label="All" size="small" variant={periodFilter === null ? 'filled' : 'outlined'} onClick={() => setPeriodFilter(null)} sx={{ cursor: 'pointer' }} />
              {periodTypes.map((p) => (
                <Chip key={p} label={p} size="small" variant={periodFilter === p ? 'filled' : 'outlined'} color={periodFilter === p ? 'primary' : 'default'} onClick={() => setPeriodFilter(p)} sx={{ cursor: 'pointer' }} />
              ))}
            </Stack>
            <Stack direction="row" alignItems="center" sx={{ gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, minWidth: 90 }}>Assignee:</Typography>
              <Chip label="All" size="small" variant={assigneeFilter === null ? 'filled' : 'outlined'} onClick={() => setAssigneeFilter(null)} sx={{ cursor: 'pointer' }} />
              {assigneeTypes.map((a) => (
                <Chip key={a} label={a} icon={ASSIGNEE_ICONS[a]} size="small" variant={assigneeFilter === a ? 'filled' : 'outlined'} color={assigneeFilter === a ? 'primary' : 'default'} onClick={() => setAssigneeFilter(a)} sx={{ cursor: 'pointer' }} />
              ))}
            </Stack>
          </Box>
          <Divider />
          <TableContainer>
            <Table size="small" sx={{ minWidth: 1000 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Period</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Assignee</TableCell>
                  <TableCell sx={{ fontWeight: 600, align: 'right' }}>Target</TableCell>
                  <TableCell sx={{ fontWeight: 600, align: 'right' }}>Achieved</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: 280 }}>Progress</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageData.map((row) => (
                  <TableRow key={row.id} hover sx={{ '& > td': { py: 1.5 } }}>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.period}</Typography>
                        <Chip label={row.periodType} size="small" variant="outlined" sx={{ mt: 0.5, height: 20, fontSize: '0.68rem' }} />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" sx={{ gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 34, height: 34, bgcolor: STATUS_BG['On Track'],
                            color: 'primary.dark', fontSize: '0.9rem'
                          }}
                        >
                          {ASSIGNEE_ICONS[row.assigneeType]}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.assigneeName}</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{row.assigneeType}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>{formatINR(row.targetAmount)}</TableCell>
                    <TableCell align="right" sx={{ color: 'success.main', fontWeight: 600 }}>{formatINR(row.achievedAmount)}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" sx={{ gap: 1 }}>
                        <Box sx={{ flex: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min(100, row.percentage)}
                            sx={{
                              height: 8, borderRadius: 4, bgcolor: 'grey.200',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: row.percentage >= 100 ? 'success.main' : row.percentage >= 80 ? 'primary.main' : 'warning.main'
                              }
                            }}
                          />
                        </Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, minWidth: 40, textAlign: 'right' }}>
                          {row.percentage}%
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip label={row.status} color={STATUS_COLOR[row.status]} size="small" variant="light" />
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
        </Stack>
      </MainCard>
    </Stack>
  );
}
