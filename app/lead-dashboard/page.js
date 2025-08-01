"use client";
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Paper, Chip, Avatar, CircularProgress, Alert, Grid, Stack, Card, CardContent, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { CheckCircle, Cancel, Person, Email, Phone, Business, TrendingUp, TrendingDown, Remove, Refresh, FilterList, Download } from '@mui/icons-material';
import { buildApiUrl, API_ENDPOINTS } from '../../config/api';

// Custom stat card component
const StatCard = ({ title, value, subtitle, trend, color = 'primary', icon }) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp color="success" fontSize="small" />;
      case 'down':
        return <TrendingDown color="error" fontSize="small" />;
      default:
        return <Remove color="action" fontSize="small" />;
    }
  };

  // Blue gradient color schemes
  const colorSchemes = {
    primary: {
      gradient: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
      light: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      shadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
    },
    success: {
      gradient: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
      light: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
      shadow: '0 4px 12px rgba(46, 125, 50, 0.3)'
    },
    warning: {
      gradient: 'linear-gradient(135deg, #ed6c02 0%, #ff9800 100%)',
      light: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
      shadow: '0 4px 12px rgba(237, 108, 2, 0.3)'
    },
    info: {
      gradient: 'linear-gradient(135deg, #0288d1 0%, #03a9f4 100%)',
      light: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)',
      shadow: '0 4px 12px rgba(2, 136, 209, 0.3)'
    },
    error: {
      gradient: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
      light: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
      shadow: '0 4px 12px rgba(211, 47, 47, 0.3)'
    }
  };

  const scheme = colorSchemes[color] || colorSchemes.primary;

  return (
    <Card sx={{ 
      height: '100%', 
      position: 'relative', 
      overflow: 'visible',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: `1px solid ${color}.light`,
      borderRadius: 2,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        border: `1px solid ${color}.main`,
      }
    }}>
    
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ 
            background: scheme.gradient,
            borderRadius: '50%', 
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: scheme.shadow
          }}>
            {React.cloneElement(icon, { fontSize: 'small' })}
          </Box>
          {trend && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              p: 0.5,
              borderRadius: 1,
              background: trend === 'up' ? 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)' : 
                         trend === 'down' ? 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)' : 
                         'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)'
            }}>
              {getTrendIcon()}
            </Box>
          )}
        </Box>
        <Typography variant="h4" component="div" fontWeight="bold" sx={{ 
          mb: 0.5,
          background: scheme.gradient,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {value}
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ mb: 0.5, fontWeight: 600 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.8 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

// Custom cell renderers
const renderStatus = (status) => {
  const colors = {
    'enrolled': 'success',
    'not_enrolled': 'default',
    'interested': 'warning',
    'not_interested': 'error'
  };

  const labels = {
    'enrolled': 'Enrolled',
    'not_enrolled': 'Not Enrolled',
    'interested': 'Interested',
    'not_interested': 'Not Interested'
  };

  return (
    <Chip 
      label={labels[status] || status} 
      color={colors[status] || 'default'} 
      size="small" 
      icon={status === 'enrolled' ? <CheckCircle /> : <Cancel />}
    />
  );
};

const renderAvatar = (name) => {
  if (!name) return '';
  
  const colors = [
    '#1976d2', '#dc004e', '#388e3c', '#f57c00', '#7b1fa2',
    '#303f9f', '#c2185b', '#388e3c', '#f57c00', '#7b1fa2'
  ];
  
  const color = colors[name.length % colors.length];
  
  return (
    <Avatar
      sx={{
        backgroundColor: color,
        width: '32px',
        height: '32px',
        fontSize: '0.875rem',
      }}
    >
      {name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
};

const renderSource = (source) => {
  const colors = {
    'LinkedIn': 'primary',
    'Referral': 'success',
    'Naukri': 'warning',
    'Indeed': 'info',
    'Other': 'default'
  };

  return (
    <Chip 
      label={source} 
      color={colors[source] || 'default'} 
      size="small" 
      variant="outlined"
    />
  );
};

const renderConnectedStatus = (connected, interested) => {
  if (connected && interested) {
    return <Chip label="Connected & Interested" color="success" size="small" icon={<CheckCircle />} />;
  } else if (connected) {
    return <Chip label="Connected" color="warning" size="small" />;
  } else if (interested) {
    return <Chip label="Interested" color="info" size="small" />;
  } else {
    return <Chip label="Not Connected" color="default" size="small" />;
  }
};

export default function LeadDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalLeads, setTotalLeads] = useState(0);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    source: '',
    status: '',
    enrollment: '',
    connected: '',
    interested: ''
  });
  const [filteredLeads, setFilteredLeads] = useState([]);

  // Calculate statistics
  const stats = {
    total: totalLeads || leads.length,
    enrolled: leads.filter(lead => lead.enrolled_or_not).length,
    connected: leads.filter(lead => lead.connected_on_call && lead.interested).length,
    complete: leads.filter(lead => lead.filled_candidate_or_not).length,
    new: leads.filter(lead => !lead.connected_on_call && !lead.interested).length
  };

  // Apply filters to leads
  const applyFilters = (leadsData, filterCriteria) => {
    return leadsData.filter(lead => {
      // Name filter
      if (filterCriteria.name && !lead.name.toLowerCase().includes(filterCriteria.name.toLowerCase())) {
        return false;
      }
      
      // Email filter
      if (filterCriteria.email && !lead.email.toLowerCase().includes(filterCriteria.email.toLowerCase())) {
        return false;
      }
      
      // Source filter
      if (filterCriteria.source && lead.source !== filterCriteria.source) {
        return false;
      }
      
      // Status filter
      if (filterCriteria.status) {
        const connected = lead.connected_on_call;
        const interested = lead.interested;
        
        if (filterCriteria.status === 'connected' && !connected) return false;
        if (filterCriteria.status === 'interested' && !interested) return false;
        if (filterCriteria.status === 'both' && (!connected || !interested)) return false;
        if (filterCriteria.status === 'neither' && (connected || interested)) return false;
      }
      
      // Enrollment filter
      if (filterCriteria.enrollment) {
        const enrolled = lead.enrolled_or_not;
        const filled = lead.filled_candidate_or_not;
        
        if (filterCriteria.enrollment === 'enrolled' && !enrolled) return false;
        if (filterCriteria.enrollment === 'complete' && (!enrolled || !filled)) return false;
        if (filterCriteria.enrollment === 'not_enrolled' && enrolled) return false;
      }
      
      // Connected filter
      if (filterCriteria.connected !== '') {
        const connected = filterCriteria.connected === 'true';
        if (lead.connected_on_call !== connected) return false;
      }
      
      // Interested filter
      if (filterCriteria.interested !== '') {
        const interested = filterCriteria.interested === 'true';
        if (lead.interested !== interested) return false;
      }
      
      return true;
    });
  };

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Apply filters
  const handleApplyFilters = () => {
    const filtered = applyFilters(leads, filters);
    setFilteredLeads(filtered);
    setFilterDialogOpen(false);
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilters({
      name: '',
      email: '',
      source: '',
      status: '',
      enrollment: '',
      connected: '',
      interested: ''
    });
    setFilteredLeads([]);
    setFilterDialogOpen(false);
  };

  // Get unique sources for filter dropdown
  const getUniqueSources = () => {
    const sources = [...new Set(leads.map(lead => lead.source))];
    return sources.filter(source => source && source !== 'N/A');
  };


  // Fetch leads data
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const userType = localStorage.getItem('user_type');
      const userId = localStorage.getItem('user_id');
      
      console.log('Auth debug:', { token: !!token, userType, userId });
      
      if (!token) {
        throw new Error('No access token found. Please login again.');
      }

      // Build query parameters - for client-side pagination, get all data
      const params = new URLSearchParams();

      // No filters applied - show all leads
      const apiUrl = buildApiUrl(API_ENDPOINTS.LEADS.LIST) + `?${params}`;
      console.log('API URL:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to fetch leads: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Raw API response:', data);
      console.log('Response type:', typeof data);
      console.log('Is array:', Array.isArray(data));
      
      // Handle different response structures
      let leadsArray = [];
      if (Array.isArray(data)) {
        leadsArray = data;
      } else if (data && Array.isArray(data.leads)) {
        leadsArray = data.leads;
      } else if (data && Array.isArray(data.items)) {
        leadsArray = data.items;
      } else if (data && Array.isArray(data.data)) {
        leadsArray = data.data;
      } else if (data && typeof data === 'object') {
        // If it's a single object, wrap it in an array
        leadsArray = [data];
      }
      
      console.log('Leads array to process:', leadsArray);
      console.log('Current pagination model:', paginationModel);
      
      // Update total count if available
      if (data && typeof data.total === 'number') {
        setTotalLeads(data.total);
        console.log('Set total from data.total:', data.total);
      } else if (data && typeof data.count === 'number') {
        setTotalLeads(data.count);
        console.log('Set total from data.count:', data.count);
      } else if (data && Array.isArray(data.leads) && data.total_count) {
        setTotalLeads(data.total_count);
        console.log('Set total from data.total_count:', data.total_count);
      } else if (data && data.total_count) {
        setTotalLeads(data.total_count);
        console.log('Set total from data.total_count (direct):', data.total_count);
      } else {
        // If no total is provided, use the current array length
        // But only if we're not using server-side pagination
        if (leadsArray.length > 0 && leadsArray.length < paginationModel.pageSize) {
          setTotalLeads(leadsArray.length);
          console.log('Set total from array length (small):', leadsArray.length);
        } else {
          // For server-side pagination, we need a reasonable total
          const calculatedTotal = Math.max(leadsArray.length, paginationModel.pageSize * (paginationModel.page + 1));
          setTotalLeads(calculatedTotal);
          console.log('Set calculated total:', calculatedTotal);
        }
      }
      
      // Transform the data for the grid
      const transformedLeads = leadsArray.map((lead, index) => ({
        id: lead.id || index + 1,
        name: lead.name || 'N/A',
        email: lead.email || 'N/A',
        phone: lead.phone || 'N/A',
        source: lead.source || 'N/A',
        connected_on_call: lead.connected_on_call || false,
        interested: lead.interested || false,
        enrolled_or_not: lead.enrolled_or_not || false,
        filled_candidate_or_not: lead.filled_candidate_or_not || false,
        remarks: lead.remarks || '',
        recruiter_user_id: lead.recruiter_user_id || 'N/A',
        user_id: lead.user_id || 'N/A',
        candidate_id: lead.candidate_id || 'N/A',
        created_at: lead.created_at ? new Date(lead.created_at).toLocaleDateString() : 'N/A',
        updated_at: lead.updated_at ? new Date(lead.updated_at).toLocaleDateString() : 'N/A',
      }));

      setLeads(transformedLeads);
      console.log('Transformed leads:', transformedLeads);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError(err.message);
      
      // Show sample data for testing if API fails
      console.log('Showing sample data for testing...');
      const sampleLeads = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          source: 'LinkedIn',
          connected_on_call: true,
          interested: true,
          enrolled_or_not: false,
          filled_candidate_or_not: false,
          remarks: 'Interested in software development role',
          recruiter_user_id: '2',
          user_id: '1',
          candidate_id: '32',
          created_at: '2025-01-31',
          updated_at: '2025-01-31',
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+0987654321',
          source: 'Referral',
          connected_on_call: false,
          interested: true,
          enrolled_or_not: true,
          filled_candidate_or_not: true,
          remarks: 'Excellent candidate for senior role',
          recruiter_user_id: '2',
          user_id: '3',
          candidate_id: '45',
          created_at: '2025-01-30',
          updated_at: '2025-01-31',
        }
      ];
      setLeads(sampleLeads);
      setTotalLeads(sampleLeads.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []); // Remove paginationModel dependency for client-side pagination

  // Define columns
  const columns = [
    {
      field: 'name',
      headerName: 'Candidate',
      flex: 1.2,
      minWidth: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {renderAvatar(params.value)}
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {params.value}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1.2,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Email fontSize="small" color="action" />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Phone fontSize="small" color="action" />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'source',
      headerName: 'Source',
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => renderSource(params.value),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const connected = params.row.connected_on_call;
        const interested = params.row.interested;
        return renderConnectedStatus(connected, interested);
      },
    },
    {
      field: 'enrollment',
      headerName: 'Enrollment',
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => {
        const enrolled = params.row.enrolled_or_not;
        const filled = params.row.filled_candidate_or_not;
        
        if (enrolled && filled) {
          return <Chip label="Complete" color="success" size="small" />;
        } else if (enrolled) {
          return <Chip label="Enrolled" color="warning" size="small" />;
        } else {
          return <Chip label="Not Enrolled" color="default" size="small" />;
        }
      },
    },
    {
      field: 'recruiter_user_id',
      headerName: 'Recruiter ID',
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Business fontSize="small" color="action" />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'created_at',
      headerName: 'Created',
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => (
        <Typography 
          variant="body2" 
          sx={{ 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap',
            maxWidth: '100%'
          }}
        >
          {params.value}
        </Typography>
      ),
    },
  ];

  if (loading && leads.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Loading leads data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Typography variant="body1">
          Please check your connection and try again.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      position: 'relative',
      pt: { xs: 16, md: 20 }, // Increased top padding to avoid header overlap
      pb: 4
    }}>
      {/* Hero Background */}
      <div
        className="banner-bg absolute left-0 top-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/images/backgr.jpg')" }}
        aria-hidden="true"
      ></div>
      
      {/* Overlay for better readability */}
      <div
        className="absolute left-0 top-0 w-full h-full bg-white bg-opacity-50 z-0"
        aria-hidden="true"
      ></div>
      
      {/* Content */}
      <Box sx={{
        maxWidth: '1400px', 
        mx: 'auto', 
        px: { xs: 4, md: 8 }, 
        position: 'relative', 
        zIndex: 1
      }}>
        {/* Header */}
        <Box sx={{ 
          mb: 4, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(66, 165, 245, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          p: 2,
          border: '1px solid rgba(25, 118, 210, 0.2)',
          boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)'
        }}>
          <Box>
            <Typography variant="body1" color="text.secondary" sx={{ opacity: 0.8, fontWeight: 400 }}>
              Manage and track all your recruitment leads
            </Typography>
          </Box>
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Refresh data">
              <IconButton 
                onClick={fetchLeads} 
                disabled={loading}
                size="small"
                sx={{
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                  border: '1px solid rgba(25, 118, 210, 0.2)',
                  width: 32,
                  height: 32,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <Refresh sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter leads">
              <IconButton 
                onClick={() => setFilterDialogOpen(true)}
                size="small"
                sx={{
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                width: 32,
                height: 32,
                '&:hover': {
                  background: 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.2s ease-in-out'
              }}>
                <FilterList sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export data">
              <IconButton 
                size="small"
                sx={{
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                border: '1px solid rgba(25, 118, 210, 0.2)',
                width: 32,
                height: 32,
                '&:hover': {
                  background: 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.2s ease-in-out'
              }}>
                <Download sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Overview Section */}
        <Box sx={{ mb: 3 }}>
          <Typography component="h2" variant="h5" sx={{ 
            mb: 2, 
            fontWeight: 600,
            background: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 50%, #90caf9 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Overview
          </Typography>
          <Grid container spacing={2} columns={12} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
              <StatCard
                title="Total Leads"
                value={stats.total}
                subtitle="All time"
                trend="up"
                color="primary"
                icon={<Person color="primary" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
              <StatCard
                title="Enrolled"
                value={stats.enrolled}
                subtitle={`${stats.total > 0 ? Math.round((stats.enrolled / stats.total) * 100) : 0}% of total`}
                trend={stats.enrolled > 0 ? "up" : "neutral"}
                color="success"
                icon={<CheckCircle color="success" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
              <StatCard
                title="Connected & Interested"
                value={stats.connected}
                subtitle="High potential"
                trend={stats.connected > 0 ? "up" : "neutral"}
                color="warning"
                icon={<TrendingUp color="warning" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
              <StatCard
                title="Profile Complete"
                value={stats.complete}
                subtitle="Ready for placement"
                trend={stats.complete > 0 ? "up" : "neutral"}
                color="info"
                icon={<Business color="info" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
              <StatCard
                title="New Leads"
                value={stats.new}
                subtitle="Requires follow-up"
                trend={stats.new > 0 ? "down" : "neutral"}
                color="error"
                icon={<Cancel color="error" />}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Details Section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.08) 0%, rgba(66, 165, 245, 0.04) 100%)',
          backdropFilter: 'blur(8px)',
          borderRadius: 2,
          p: 1.5,
          border: '1px solid rgba(25, 118, 210, 0.15)'
        }}>
          <Typography component="h2" variant="h5" sx={{ 
            fontWeight: 600,
            background: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 50%, #90caf9 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Lead Details
          </Typography>
        </Box>
        
        {/* Data Grid */}
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, lg: 9 }}>
            <Paper sx={{ 
              height: '60vh', 
              width: '100%',
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.02) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(25, 118, 210, 0.15)',
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(25, 118, 210, 0.1)',
              overflow: 'hidden'
            }}>
              <DataGrid
                rows={filteredLeads.length > 0 ? filteredLeads : leads}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10, 25, 50, 100]}
                pagination
                paginationMode="client"
                rowCount={filteredLeads.length > 0 ? filteredLeads.length : (totalLeads || leads.length)}
                loading={loading}
                disableRowSelectionOnClick
                sx={{
                  '& .MuiDataGrid-cell': {
                    borderBottom: '1px solid rgba(25, 118, 210, 0.1)',
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                    borderBottom: '2px solid #1976d2',
                  },
                  '& .MuiDataGrid-row:hover': {
                    background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.02) 100%)',
                  },
                  '& .MuiDataGrid-footerContainer': {
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                    borderTop: '1px solid rgba(25, 118, 210, 0.1)',
                  },
                }}
              />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, lg: 3 }}>
            <Stack gap={2}>
              {/* Quick Stats Card */}
              <Card sx={{
                background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.02) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(25, 118, 210, 0.15)',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(25, 118, 210, 0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(25, 118, 210, 0.15)',
                }
              }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="body1" gutterBottom sx={{ 
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 50%, #90caf9 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Quick Stats
                  </Typography>
                  <Stack spacing={1.5}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      p: 1,
                      borderRadius: 1,
                      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                      border: '1px solid rgba(25, 118, 210, 0.2)'
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>LinkedIn</Typography>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {leads.filter(lead => lead.source === 'LinkedIn').length}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      p: 1,
                      borderRadius: 1,
                      background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
                      border: '1px solid rgba(46, 125, 50, 0.2)'
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Referral</Typography>
                      <Typography variant="body2" fontWeight="bold" color="success.main">
                        {leads.filter(lead => lead.source === 'Referral').length}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      p: 1,
                      borderRadius: 1,
                      background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                      border: '1px solid rgba(237, 108, 2, 0.2)'
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Other</Typography>
                      <Typography variant="body2" fontWeight="bold" color="warning.main">
                        {leads.filter(lead => !['LinkedIn', 'Referral'].includes(lead.source)).length}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Recent Activity Card */}
              <Card sx={{
                background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.02) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(25, 118, 210, 0.15)',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(25, 118, 210, 0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(25, 118, 210, 0.15)',
                }
              }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="body1" gutterBottom sx={{ 
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 50%, #90caf9 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Recent Activity
                  </Typography>
                  <Stack spacing={1.5}>
                    {leads.slice(0, 3).map((lead) => (
                      <Box key={lead.id} sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1.5,
                        p: 1,
                        borderRadius: 1,
                        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                        border: '1px solid rgba(25, 118, 210, 0.2)',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
                          transform: 'scale(1.02)'
                        }
                      }}>
                        {renderAvatar(lead.name)}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {lead.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {lead.created_at}
                          </Typography>
                        </Box>
                        {renderConnectedStatus(lead.connected_on_call, lead.interested)}
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* Summary */}
        <Box sx={{ 
          mt: 3, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.08) 0%, rgba(66, 165, 245, 0.04) 100%)',
          backdropFilter: 'blur(8px)',
          borderRadius: 2,
          p: 2,
          border: '1px solid rgba(25, 118, 210, 0.15)',
          boxShadow: '0 4px 20px rgba(25, 118, 210, 0.1)'
        }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            Showing <strong style={{ color: '#1976d2' }}>{leads.length}</strong> of <strong style={{ color: '#1976d2' }}>{totalLeads || leads.length}</strong> leads • 
            Last updated: <strong style={{ color: '#1976d2' }}>{new Date().toLocaleString()}</strong>
          </Typography>
        </Box>
      </Box>

      {/* Filter Dialog */}
      <Dialog 
        open={filterDialogOpen} 
        onClose={() => setFilterDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)',
          }
        }}
      >
        <DialogTitle sx={{
          background: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 50%, #90caf9 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 600,
          fontSize: '1.5rem'
        }}>
          Filter Leads
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            {/* Name Filter */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                placeholder="Search by name..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
            </Grid>

            {/* Email Filter */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={filters.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
                placeholder="Search by email..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
            </Grid>

            {/* Source Filter */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Source</InputLabel>
                <Select
                  value={filters.source}
                  onChange={(e) => handleFilterChange('source', e.target.value)}
                  label="Source"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      '&:hover': {
                        borderColor: '#1976d2',
                      },
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1976d2',
                    },
                  }}
                >
                  <MenuItem value="">All Sources</MenuItem>
                  {getUniqueSources().map((source) => (
                    <MenuItem key={source} value={source}>{source}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Status Filter */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  label="Status"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      '&:hover': {
                        borderColor: '#1976d2',
                      },
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1976d2',
                    },
                  }}
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="connected">Connected on Call</MenuItem>
                  <MenuItem value="interested">Interested</MenuItem>
                  <MenuItem value="both">Connected & Interested</MenuItem>
                  <MenuItem value="neither">Neither</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Enrollment Filter */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Enrollment</InputLabel>
                <Select
                  value={filters.enrollment}
                  onChange={(e) => handleFilterChange('enrollment', e.target.value)}
                  label="Enrollment"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      '&:hover': {
                        borderColor: '#1976d2',
                      },
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1976d2',
                    },
                  }}
                >
                  <MenuItem value="">All Enrollment</MenuItem>
                  <MenuItem value="enrolled">Enrolled</MenuItem>
                  <MenuItem value="complete">Complete</MenuItem>
                  <MenuItem value="not_enrolled">Not Enrolled</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Connected Filter */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Connected on Call</InputLabel>
                <Select
                  value={filters.connected}
                  onChange={(e) => handleFilterChange('connected', e.target.value)}
                  label="Connected on Call"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      '&:hover': {
                        borderColor: '#1976d2',
                      },
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1976d2',
                    },
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Interested Filter */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Interested</InputLabel>
                <Select
                  value={filters.interested}
                  onChange={(e) => handleFilterChange('interested', e.target.value)}
                  label="Interested"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      '&:hover': {
                        borderColor: '#1976d2',
                      },
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1976d2',
                    },
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={handleClearFilters}
            variant="outlined"
            sx={{
              borderColor: '#1976d2',
              color: '#1976d2',
              '&:hover': {
                borderColor: '#1565c0',
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              },
            }}
          >
            Clear All
          </Button>
          <Button 
            onClick={() => setFilterDialogOpen(false)}
            variant="outlined"
            sx={{
              borderColor: '#666',
              color: '#666',
              '&:hover': {
                borderColor: '#333',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleApplyFilters}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
              },
            }}
          >
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 