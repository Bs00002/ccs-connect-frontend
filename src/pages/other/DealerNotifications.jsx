import React, { useMemo, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

import BellOutlined from '@ant-design/icons/BellOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import WarningOutlined from '@ant-design/icons/WarningOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import CheckSquareOutlined from '@ant-design/icons/CheckSquareOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

const TYPE_AVATAR = {
  info: { icon: <InfoCircleOutlined />, color: 'primary' },
  success: { icon: <CheckCircleOutlined />, color: 'success' },
  warning: { icon: <WarningOutlined />, color: 'warning' },
};

const TAB_CATEGORIES = ['All', 'Unread', 'Order', 'Payment', 'System'];

export default function DealerNotifications() {
  const [tab, setTab] = useState(0);
  const [query, setQuery] = useState('');
  
  // For the sake of validation and keeping it realistic, we'll use a mocked initial state,
  // but this would typically come from an API via useEffect.
  const [items, setItems] = useState([
    { id: 1, type: 'info', category: 'Order', title: 'Order Dispatched', message: 'Your order ORD-1205 has been dispatched.', read: false, createdAt: '2 hours ago' },
    { id: 2, type: 'success', category: 'Payment', title: 'Payment Received', message: 'We received your payment of ₹45,000 against INV-902.', read: true, createdAt: 'Yesterday' },
    { id: 3, type: 'warning', category: 'System', title: 'Scheduled Maintenance', message: 'The portal will be down for maintenance from 2 AM to 4 AM on Sunday.', read: false, createdAt: '2 days ago' },
  ]);

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items]);

  const filtered = useMemo(() => {
    const t = TAB_CATEGORIES[tab];
    return items.filter((n) => {
      if (t === 'All') {
        // fall
      } else if (t === 'Unread') {
        if (n.read) return false;
      } else if (n.category !== t) {
        return false;
      }
      if (query && !(n.title + n.message).toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [tab, items, query]);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const toggleRead = (id) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: !n.read } : n));
  const deleteOne = (id) => setItems((prev) => prev.filter((n) => n.id !== id));

  return (
    <Stack spacing={2.75}>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Important updates about your orders and payments.
            </Typography>
          </Box>
          <Stack direction="row" sx={{ gap: 1 }}>
            <Tooltip title="Mark all as read">
              <Button variant="outlined" startIcon={<CheckSquareOutlined />} onClick={markAllRead} disabled={unreadCount === 0}>
                Mark All Read
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>

      <MainCard>
        <Stack direction="row" justifyContent="space-between" sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ minHeight: 44 }}
          >
            {TAB_CATEGORIES.map((t) => (
              <Tab
                key={t}
                label={t === 'Unread' ? `Unread (${unreadCount})` : t}
                sx={{ minHeight: 44, textTransform: 'capitalize' }}
              />
            ))}
          </Tabs>
          <TextField
            placeholder="Search notifications..."
            size="small"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ width: { xs: '100%', sm: 260 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined style={{ fontSize: 16, color: 'text.secondary' }} />
                </InputAdornment>
              )
            }}
          />
        </Stack>
        <Divider />
        <Box sx={{ maxHeight: 680, overflowY: 'auto' }}>
          <List disablePadding>
            {filtered.length === 0 && (
              <Box sx={{ py: 6, textAlign: 'center' }}>
                <BellOutlined style={{ fontSize: 48, color: 'text.disabled' }} />
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>No notifications to display.</Typography>
              </Box>
            )}
            {filtered.map((n, idx) => {
              const cfg = TYPE_AVATAR[n.type] || TYPE_AVATAR['info'];
              return (
                <Box key={n.id}>
                  <ListItem
                    sx={{
                      bgcolor: n.read ? 'transparent' : 'primary.lighter',
                      px: 2, py: 1.75,
                      borderLeft: n.read ? 0 : 3,
                      borderColor: 'primary.main',
                      transition: '0.15s',
                      '&:hover': { bgcolor: n.read ? 'action.hover' : 'primary.50' }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: `${cfg.color}.lighter`,
                          color: `${cfg.color}.main`,
                          width: 44, height: 44
                        }}
                      >
                        {cfg.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Stack direction="row" sx={{ alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.25 }}>
                          <Typography variant="body2" sx={{ fontWeight: n.read ? 500 : 700 }}>{n.title}</Typography>
                          {!n.read && <Chip label="NEW" size="small" color="primary" sx={{ height: 18, fontSize: '0.62rem', fontWeight: 700 }} />}
                          <Chip label={n.category} size="small" variant="outlined" sx={{ height: 18, fontSize: '0.62rem' }} />
                        </Stack>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.4, mb: 0.5 }}>
                            {n.message}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center', gap: 0.5, right: 0 }}>
                      <Typography variant="caption" sx={{ color: 'text.disabled', mr: 1 }}>{n.createdAt}</Typography>
                      <Tooltip title={n.read ? 'Mark as unread' : 'Mark as read'}>
                        <IconButton size="small" onClick={() => toggleRead(n.id)} sx={{ color: 'text.secondary' }}>
                          {n.read ? <EyeOutlined style={{ fontSize: 15 }} /> : <EyeInvisibleOutlined style={{ fontSize: 15 }} />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => deleteOne(n.id)} sx={{ color: 'text.secondary' }}>
                          <DeleteOutlined style={{ fontSize: 15 }} />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {idx < filtered.length - 1 && <Divider component="li" />}
                </Box>
              );
            })}
          </List>
        </Box>
      </MainCard>
    </Stack>
  );
}
