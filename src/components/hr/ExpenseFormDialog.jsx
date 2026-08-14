import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, FormControl,
  InputLabel, Select, MenuItem, Button, Typography, Box, Stack, Divider, Alert, InputAdornment
} from '@mui/material';
import { UploadOutlined, CalculatorOutlined } from '@ant-design/icons';
import { formatINR } from 'data/ccsMock';

export default function ExpenseFormDialog({ open, onClose, onSubmit }) {
  const [mode, setMode] = useState('Bike');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Mode-specific fields
  const [vehicleNo, setVehicleNo] = useState('');
  const [startKm, setStartKm] = useState('');
  const [endKm, setEndKm] = useState('');
  const [ratePerKm, setRatePerKm] = useState('4');

  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [busNo, setBusNo] = useState('');

  const [pnr, setPnr] = useState('');
  const [seatNo, setSeatNo] = useState('');

  const [hotelName, setHotelName] = useState('');
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(new Date().toISOString().split('T')[0]);

  const [restaurantName, setRestaurantName] = useState('');

  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [file, setFile] = useState(null);

  // Default rates
  useEffect(() => {
    if (mode === 'Bike') {
      setRatePerKm('4');
    } else if (mode === 'Car') {
      setRatePerKm('9');
    }
  }, [mode]);

  // Calculate Distance & Amount automatically for Bike and Car
  const distance = Math.max(0, (parseFloat(endKm) || 0) - (parseFloat(startKm) || 0));
  const autoCalculatedTotal = (mode === 'Bike' || mode === 'Car') ? distance * (parseFloat(ratePerKm) || 0) : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalAmount = autoCalculatedTotal !== null ? autoCalculatedTotal : parseFloat(amount);

    if (!finalAmount || finalAmount <= 0) {
      alert('Please enter a valid amount or Start/End KM');
      return;
    }

    const payload = {
      mode,
      date,
      vehicleNo,
      startKm,
      endKm,
      distance,
      ratePerKm,
      fromLocation,
      toLocation,
      busNo,
      pnr,
      seatNo,
      hotelName,
      checkIn,
      checkOut,
      restaurantName,
      amount: finalAmount,
      remarks,
      file: file ? file.name : 'receipt.jpg'
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', py: 2 }}>
        Claim Field Expense
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={3}>
            {/* Category / Mode Selector */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Travel Mode / Expense Category</InputLabel>
                  <Select value={mode} label="Travel Mode / Expense Category" onChange={(e) => setMode(e.target.value)}>
                    <MenuItem value="Bike">🛵 Bike (KM Rate + Fuel)</MenuItem>
                    <MenuItem value="Car">🚗 Car (KM Rate + Fuel)</MenuItem>
                    <MenuItem value="Bus">🚌 Bus Ticket</MenuItem>
                    <MenuItem value="Train">🚆 Train Ticket (PNR)</MenuItem>
                    <MenuItem value="Taxi">🚖 Taxi / Cab</MenuItem>
                    <MenuItem value="Auto">🛺 Auto Rickshaw</MenuItem>
                    <MenuItem value="Flight">✈️ Flight Ticket</MenuItem>
                    <MenuItem value="Food">🍲 Food / Meals</MenuItem>
                    <MenuItem value="Hotel">🏨 Hotel Accommodation</MenuItem>
                    <MenuItem value="Parking">🅿️ Vehicle Parking</MenuItem>
                    <MenuItem value="Toll">🛣️ Highway Toll</MenuItem>
                    <MenuItem value="Other">💼 Other Miscellaneous</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expense Date"
                  type="date"
                  size="small"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Divider />

            {/* DYNAMIC FIELDS BASED ON MODE */}

            {/* BIKE or CAR */}
            {(mode === 'Bike' || mode === 'Car') && (
              <Box sx={{ bgcolor: 'primary.lighter', p: 2.5, borderRadius: 2, border: '1px solid', borderColor: 'primary.light' }}>
                <Typography variant="subtitle2" color="primary.main" fontWeight={600} mb={2}>
                  {mode} Distance & Odometer Calculator
                </Typography>
                <Grid container spacing= {2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Vehicle Registration No"
                      size="small"
                      placeholder="e.g. GJ-02-AB-1234"
                      value={vehicleNo}
                      onChange={(e) => setVehicleNo(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      fullWidth
                      label="Start Odometer (KM)"
                      type="number"
                      size="small"
                      value={startKm}
                      onChange={(e) => setStartKm(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      fullWidth
                      label="End Odometer (KM)"
                      type="number"
                      size="small"
                      value={endKm}
                      onChange={(e) => setEndKm(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Rate per KM (₹)"
                      type="number"
                      size="small"
                      value={ratePerKm}
                      onChange={(e) => setRatePerKm(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      label="Total Distance Covered"
                      size="small"
                      value={`${distance} KM`}
                      disabled
                    />
                  </Grid>
                </Grid>

                {autoCalculatedTotal !== null && (
                  <Alert icon={<CalculatorOutlined />} severity="success" sx={{ mt: 2, fontWeight: 700 }}>
                    Auto-Calculated Fuel Reimbursement: {formatINR(autoCalculatedTotal)} ({distance} KM × ₹{ratePerKm}/KM)
                  </Alert>
                )}
              </Box>
            )}

            {/* BUS */}
            {mode === 'Bus' && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="From (Origin)" size="small" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="To (Destination)" size="small" value={toLocation} onChange={(e) => setToLocation(e.target.value)} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Bus Operator / Bus Number" size="small" value={busNo} onChange={(e) => setBusNo(e.target.value)} />
                </Grid>
              </Grid>
            )}

            {/* TRAIN */}
            {mode === 'Train' && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Origin Station" size="small" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Destination Station" size="small" value={toLocation} onChange={(e) => setToLocation(e.target.value)} required />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField fullWidth label="PNR Number (10 digits)" size="small" value={pnr} onChange={(e) => setPnr(e.target.value)} required />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField fullWidth label="Seat / Berth No." size="small" value={seatNo} onChange={(e) => setSeatNo(e.target.value)} />
                </Grid>
              </Grid>
            )}

            {/* TAXI or AUTO or FLIGHT */}
            {(mode === 'Taxi' || mode === 'Auto' || mode === 'Flight') && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Pickup Location" size="small" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Drop Location" size="small" value={toLocation} onChange={(e) => setToLocation(e.target.value)} required />
                </Grid>
              </Grid>
            )}

            {/* FOOD */}
            {mode === 'Food' && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Restaurant / Food Stall Name" size="small" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} required />
                </Grid>
              </Grid>
            )}

            {/* HOTEL */}
            {mode === 'Hotel' && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Hotel Name & Location" size="small" value={hotelName} onChange={(e) => setHotelName(e.target.value)} required />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Check-In Date" type="date" size="small" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Check-Out Date" type="date" size="small" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} InputLabelProps={{ shrink: true }} />
                </Grid>
              </Grid>
            )}

            {/* Amount Field (For non-auto-calculated modes) */}
            {mode !== 'Bike' && mode !== 'Car' && (
              <TextField
                fullWidth
                label="Claim Amount (₹)"
                type="number"
                size="small"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                required
              />
            )}

            {/* Remarks */}
            <TextField
              fullWidth
              label="Remarks / Business Purpose"
              multiline
              rows={2}
              size="small"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g. Field visit to Anand & Kheda dealers"
            />

            {/* Receipt Upload */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Upload Ticket / Receipt Image *</Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadOutlined />}
                fullWidth
                sx={{ py: 1.5, borderStyle: 'dashed' }}
              >
                {file ? file.name : 'Click to Upload Receipt / Ticket / Bill Photo'}
                <input type="file" hidden accept="image/*,.pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </Button>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">Submit Expense Claim</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
