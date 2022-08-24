import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { logout } from '../../services/authenticationService';
import Clock from 'react-live-clock';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Routes } from './Navigation';
import TableChartIcon from '@material-ui/icons/TableChart';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PostAddIcon from '@material-ui/icons/PostAdd';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import EventIcon from '@material-ui/icons/Event';
import ContactsIcon from '@material-ui/icons/Contacts';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Logo from '../../static/images/logo2016.png';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FaceIcon from '@material-ui/icons/Face';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		},
		background: '#FF6600'
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		background: '#FF6600',
		color: 'white',
	},
	content: {
		flexGrow: 1,
		padding: 13,
		maxWidth: `calc(100vw - ${drawerWidth}px)`,
		overflowX: 'hidden',
		minHeight: '100vh',
		background: 'white',
		[theme.breakpoints.down('sm')]: {
			maxWidth: '100vw'
		}
	},
	divider: {
		flexGrow: 1
	},
	navIcon: {
		color: 'white',
		height: '80px', 
		transition: 'padding 0.5s',
		'&:not(:last-child)': {
			borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
		},
		'&:hover': {
			paddingLeft: 30,
			background: 'white',
			color: 'black'
		}	
	},
	navIconActive: {
		background: 'white',
		color: 'black'
	},
	toolbarLogo: {
		maxWidth: '100%'
	},
	logoContainer: {
		padding: 10,
		marginTop: 10,
		maxWidth: drawerWidth
	}
}));

export default function NavIgationWithDrawer(props) {
	const { container, currentUser } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [ mobileOpen, setMobileOpen ] = React.useState(false);
	const history = useHistory();
	const currentPath = history.location.pathname;

	const goTo = (link) => {
		history.push(link);
	};

	const handleLogout = () => {
		logout();
		goTo('/');
	};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<div className={classes.toolbar}>
				<div className={classes.logoContainer}>
					<img src={Logo} className={classes.toolbarLogo} alt="keysys logo" />
				</div>
			</div>
			<Divider />
			<List>
				{[
					{
						label: 'Dashboard',
						link: '/dashboard',
						icon: <AiIcons.AiFillHome />
					},
                    {
						label: 'Produkty',
						link: '/products',
						icon: <FaIcons.FaCartPlus />
					},
                    {
						label: 'Dokumenty',
						link: '/documents',
						icon: <IoIcons.IoIosDocument />
					},
					
				].map((item) => {
					const isActive = item.link === currentPath;
					return (
						<ListItem
							button
							key={item.link}
							onClick={() => goTo(item.link)}
							className={`${classes.navIcon} ${isActive ? classes.navIconActive : ''}`}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.label} />
						</ListItem>
					);
				})}
			</List>
			<Divider />
		</div>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<div className={classes.divider} />
					<Typography style={{ fontSize: '1.2em' }}>
						{currentUser.first_name} {currentUser.last_name}
					</Typography>
					<Typography style={{ fontSize: '1.2em', width: 100 }}>
						<Clock format={'HH:mm:ss'} ticking={true} style={{ margin: '0 20px' }} />
					</Typography>
					<IconButton onClick={handleLogout}>
						<PowerSettingsNewIcon style={{ color: 'white' }} />
					</IconButton>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Routes />
			</main>
		</div>
	);
}
