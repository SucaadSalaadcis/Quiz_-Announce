
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  CssBaseline,
  Toolbar,
  Typography,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import CampaignIcon from '@mui/icons-material/Campaign';
import LogoutIcon from '@mui/icons-material/Logout';

import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import Header from './Header';

const drawerWidth = 240;

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  {
    label: 'Anouncement',
    path: '/announcements',
    icon: <CampaignIcon />,
    add_path: '/createAnouncement',
    edit_path: '/editAnouncement/',
  },
  {
    label: 'Quiz',
    path: '/quizzes',
    icon: <QuizIcon />,
    add_path: '/createQuiz',
    edit_path: '/editQuiz/',
  },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ backgroundColor: 'black', height: '100%', color: 'white' }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <QuizIcon sx={{ color: '#4dabf7', fontSize: 28, mr: 1 }} />
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          QuizBoard
        </Typography>
      </Toolbar>

      <List>
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.add_path && location.pathname === item.add_path) ||
            (item.edit_path && location.pathname.startsWith(item.edit_path));

          return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                selected={isActive}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  color: 'white',
                  mx: 1,
                  borderRadius: '10px',
                  '& .MuiListItemIcon-root': { color: 'inherit' },
                  '&.Mui-selected': {
                    backgroundColor: '#155DFC',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: '#155DFC',
                    color: 'white',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}

        {/* Logout btn */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              localStorage.removeItem('isLoggedIn');
              navigate('/');
            }}
            sx={{
              color: 'white',
              mx: 1,
              borderRadius: '10px',
              '& .MuiListItemIcon-root': { color: 'inherit' },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header onMenuClick={handleDrawerToggle} />

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'black',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'black',
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Typography sx={{ mt: { xs: 6, md: 0 } }}></Typography>
        <Outlet />
      </Box>
    </Box>
  );
}
