"use client";
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Paper, Chip, Avatar, CircularProgress, Alert, Grid, Stack, Card, CardContent, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CheckCircle, Cancel, Person, Email, Phone, Business, TrendingUp, TrendingDown, Remove, Refresh, FilterList, Download, School, Work, CalendarToday, LocationOn } from '@mui/icons-material';

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
  const statusConfig = {
    pending: { color: 'warning', label: 'Pending' },
    approved: { color: 'success', label: 'Approved' },
    rejected: { color: 'error', label: 'Rejected' },
    shortlisted: { color: 'info', label: 'Shortlisted' },
    hired: { color: 'success', label: 'Hired' }
  };

  const config = statusConfig[status] || { color: 'default', label: status };

  return (
    <Chip 
      label={config.label} 
      color={config.color} 
      size="small"
      sx={{ fontWeight: 600 }}
    />
  );
};

const renderAvatar = (name) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : '?';
  const colors = ['#1976d2', '#2e7d32', '#ed6c02', '#d32f2f', '#7b1fa2', '#1565c0'];
  const color = colors[Math.abs(name?.length || 0) % colors.length];

  return (
    <Avatar 
      sx={{ 
        width: 32, 
        height: 32, 
        fontSize: '0.75rem',
        backgroundColor: color,
        fontWeight: 600
      }}
    >
      {initials}
    </Avatar>
  );
};

const renderEducation = (educationLevel) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <School fontSize="small" color="action" />
      <Typography variant="body2">{educationLevel || 'N/A'}</Typography>
    </Box>
  );
};

const renderExperience = (years) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Work fontSize="small" color="action" />
      <Typography variant="body2">{years || 0} years</Typography>
    </Box>
  );
};

const renderDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
};

export default function CandidateDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    education_level: '',
    experience_years: '',
    skills: ''
  });
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  // Calculate statistics
  const stats = {
    total: candidates.length,
    pending: candidates.filter(candidate => candidate.status === 'pending').length,
    approved: candidates.filter(candidate => candidate.status === 'approved').length,
    shortlisted: candidates.filter(candidate => candidate.status === 'shortlisted').length,
    hired: candidates.filter(candidate => candidate.status === 'hired').length,
    rejected: candidates.filter(candidate => candidate.status === 'rejected').length
  };

  // Apply filters to candidates
  const applyFilters = (candidatesData, filterCriteria) => {
    return candidatesData.filter(candidate => {
      // Status filter
      if (filterCriteria.status && candidate.status !== filterCriteria.status) {
        return false;
      }
      
      // Education level filter
      if (filterCriteria.education_level && candidate.education_level !== filterCriteria.education_level) {
        return false;
      }
      
      // Experience years filter
      if (filterCriteria.experience_years) {
        const years = parseInt(filterCriteria.experience_years);
        if (candidate.experience_years < years) {
          return false;
        }
      }
      
      // Skills filter
      if (filterCriteria.skills && !candidate.skills?.toLowerCase().includes(filterCriteria.skills.toLowerCase())) {
        return false;
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
    const filtered = applyFilters(candidates, filters);
    setFilteredCandidates(filtered);
    setFilterDialogOpen(false);
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilters({
      status: '',
      education_level: '',
      experience_years: '',
      skills: ''
    });
    setFilteredCandidates([]);
    setFilterDialogOpen(false);
  };

  // Get unique education levels for filter dropdown
  const getUniqueEducationLevels = () => {
    const levels = [...new Set(candidates.map(candidate => candidate.education_level))];
    return levels.filter(level => level && level !== 'N/A');
  };

  // Fetch candidates data
  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const userType = localStorage.getItem('user_type');
      
      console.log('Auth debug:', { token: !!token, userType });
      
      if (!token) {
        throw new Error('No access token found. Please login again.');
      }

      // Build query parameters
      const params = new URLSearchParams({
        skip: paginationModel.page * paginationModel.pageSize,
        limit: paginationModel.pageSize,
      });

      // Add status filter if needed
      if (filters.status) {
        params.append('status_filter', filters.status);
      }

      const apiUrl = `http://localhost:8000/api/v1/candidates/?${params}`;
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
        throw new Error(`Failed to fetch candidates: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Raw API response:', data);
      
      // Handle response structure
      let candidatesArray = [];
      if (data && Array.isArray(data.candidates)) {
        candidatesArray = data.candidates;
      } else if (Array.isArray(data)) {
        candidatesArray = data;
      } else if (data && Array.isArray(data.items)) {
        candidatesArray = data.items;
      } else if (data && Array.isArray(data.data)) {
        candidatesArray = data.data;
      }
      
      console.log('Candidates array to process:', candidatesArray);
      
      // Update total count
      if (data && typeof data.total === 'number') {
        setTotalCandidates(data.total);
      } else {
        setTotalCandidates(candidatesArray.length);
      }
      
      // Transform the data for the grid
      const transformedCandidates = candidatesArray.map((candidate, index) => ({
        id: candidate.id || index + 1,
        name: candidate.name || `Candidate ${candidate.id || index + 1}`,
        date_of_birth: candidate.date_of_birth || 'N/A',
        address: candidate.address || 'N/A',
        education_level: candidate.education_level || 'N/A',
        experience_years: candidate.experience_years || 0,
        skills: candidate.skills || 'N/A',
        resume_url: candidate.resume_url || '',
        status: candidate.status || 'pending',
        notes: candidate.notes || '',
        user_id: candidate.user_id || 'N/A',
        created_at: candidate.created_at || 'N/A',
        updated_at: candidate.updated_at || 'N/A',
      }));

      setCandidates(transformedCandidates);
      console.log('Transformed candidates:', transformedCandidates);
    } catch (err) {
      console.error('Error fetching candidates:', err);
      setError(err.message);
      
      // Show sample data for testing if API fails
      console.log('Showing sample data for testing...');
      const sampleCandidates = [
        {
          id: 1,
          name: 'John Doe',
          date_of_birth: '1990-05-15',
          address: '123 Main St, New York, NY',
          education_level: 'Bachelor\'s Degree',
          experience_years: 5,
          skills: 'JavaScript, React, Node.js, Python',
          resume_url: 'https://example.com/resume1.pdf',
          status: 'pending',
          notes: 'Strong frontend developer with React experience',
          user_id: 1,
          created_at: '2025-01-31T10:00:00Z',
          updated_at: '2025-01-31T10:00:00Z',
        },
        {
          id: 2,
          name: 'Jane Smith',
          date_of_birth: '1988-12-20',
          address: '456 Oak Ave, San Francisco, CA',
          education_level: 'Master\'s Degree',
          experience_years: 8,
          skills: 'Python, Django, AWS, Docker',
          resume_url: 'https://example.com/resume2.pdf',
          status: 'approved',
          notes: 'Senior backend developer with cloud experience',
          user_id: 2,
          created_at: '2025-01-30T15:30:00Z',
          updated_at: '2025-01-31T09:15:00Z',
        },
        {
          id: 3,
          name: 'Mike Johnson',
          date_of_birth: '1995-03-10',
          address: '789 Pine St, Austin, TX',
          education_level: 'Bachelor\'s Degree',
          experience_years: 3,
          skills: 'Java, Spring Boot, MySQL, Git',
          resume_url: 'https://example.com/resume3.pdf',
          status: 'shortlisted',
          notes: 'Junior developer with good potential',
          user_id: 3,
          created_at: '2025-01-29T14:20:00Z',
          updated_at: '2025-01-30T16:45:00Z',
        }
      ];
      setCandidates(sampleCandidates);
      setTotalCandidates(sampleCandidates.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
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
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'education_level',
      headerName: 'Education',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => renderEducation(params.value),
    },
    {
      field: 'experience_years',
      headerName: 'Experience',
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => renderExperience(params.value),
    },
    {
      field: 'skills',
      headerName: 'Skills',
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
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => renderStatus(params.value),
    },
    {
      field: 'address',
      headerName: 'Location',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2" sx={{ 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap',
            maxWidth: '100%'
          }}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'created_at',
      headerName: 'Created',
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarToday fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {renderDate(params.value)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'notes',
      headerName: 'Notes',
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

  if (loading && candidates.length === 0) {
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
          Loading candidates data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <Alert severity="error" sx={{ maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>Error Loading Candidates</Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', pt: { xs: 16, md: 20 }, pb: 4 }}>
      {/* Hero Background */}
      <div className="banner-bg absolute left-0 top-0 w-full h-full bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: "url('/images/backgr.jpg')" }} aria-hidden="true"></div>
      {/* Overlay for better readability */}
      <div className="absolute left-0 top-0 w-full h-full bg-white bg-opacity-50 z-0" aria-hidden="true"></div>

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
              Manage and track all candidate profiles
            </Typography>
          </Box>
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Refresh data">
              <IconButton 
                onClick={fetchCandidates} 
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
            <Tooltip title="Filter candidates">
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
            <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
              <StatCard
                title="Total Candidates"
                value={stats.total}
                subtitle="All profiles"
                trend="up"
                color="primary"
                icon={<Person color="primary" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
              <StatCard
                title="Pending"
                value={stats.pending}
                subtitle={`${stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}% of total`}
                trend={stats.pending > 0 ? "up" : "neutral"}
                color="warning"
                icon={<TrendingUp color="warning" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
              <StatCard
                title="Approved"
                value={stats.approved}
                subtitle={`${stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}% of total`}
                trend={stats.approved > 0 ? "up" : "neutral"}
                color="success"
                icon={<CheckCircle color="success" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
              <StatCard
                title="Shortlisted"
                value={stats.shortlisted}
                subtitle="High potential"
                trend={stats.shortlisted > 0 ? "up" : "neutral"}
                color="info"
                icon={<Business color="info" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
              <StatCard
                title="Hired"
                value={stats.hired}
                subtitle="Successfully placed"
                trend={stats.hired > 0 ? "up" : "neutral"}
                color="success"
                icon={<CheckCircle color="success" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
              <StatCard
                title="Rejected"
                value={stats.rejected}
                subtitle="Not selected"
                trend={stats.rejected > 0 ? "down" : "neutral"}
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
            Candidate Details
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
                rows={filteredCandidates.length > 0 ? filteredCandidates : candidates}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10, 25, 50, 100]}
                pagination
                paginationMode="client"
                rowCount={filteredCandidates.length > 0 ? filteredCandidates.length : (totalCandidates || candidates.length)}
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
                    Status Breakdown
                  </Typography>
                  <Stack spacing={1.5}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      p: 1,
                      borderRadius: 1,
                      background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                      border: '1px solid rgba(237, 108, 2, 0.2)'
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Pending</Typography>
                      <Typography variant="body2" fontWeight="bold" color="warning.main">{stats.pending}</Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      p: 1,
                      borderRadius: 1,
                      background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
                      border: '1px solid rgba(46, 125, 50, 0.2)'
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Approved</Typography>
                      <Typography variant="body2" fontWeight="bold" color="success.main">{stats.approved}</Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      p: 1,
                      borderRadius: 1,
                      background: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)',
                      border: '1px solid rgba(2, 136, 209, 0.2)'
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Shortlisted</Typography>
                      <Typography variant="body2" fontWeight="bold" color="info.main">{stats.shortlisted}</Typography>
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
                    Recent Candidates
                  </Typography>
                  <Stack spacing={1.5}>
                    {candidates.slice(0, 3).map((candidate) => (
                      <Box key={candidate.id} sx={{ 
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
                        {renderAvatar(candidate.name)}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {candidate.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {renderDate(candidate.created_at)}
                          </Typography>
                        </Box>
                        {renderStatus(candidate.status)}
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
            Showing <strong style={{ color: '#1976d2' }}>{filteredCandidates.length > 0 ? filteredCandidates.length : candidates.length}</strong> of <strong style={{ color: '#1976d2' }}>{totalCandidates || candidates.length}</strong> candidates • 
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
          Filter Candidates
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3}>
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
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="shortlisted">Shortlisted</MenuItem>
                  <MenuItem value="hired">Hired</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Education Level Filter */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Education Level</InputLabel>
                <Select
                  value={filters.education_level}
                  onChange={(e) => handleFilterChange('education_level', e.target.value)}
                  label="Education Level"
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
                  <MenuItem value="">All Education Levels</MenuItem>
                  {getUniqueEducationLevels().map((level) => (
                    <MenuItem key={level} value={level}>{level}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Experience Years Filter */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Minimum Experience (Years)"
                type="number"
                value={filters.experience_years}
                onChange={(e) => handleFilterChange('experience_years', e.target.value)}
                placeholder="e.g., 3"
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

            {/* Skills Filter */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Skills"
                value={filters.skills}
                onChange={(e) => handleFilterChange('skills', e.target.value)}
                placeholder="Search by skills..."
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