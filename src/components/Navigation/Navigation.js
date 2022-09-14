import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import NavigationWithDrawer from './NavigationWithDrawer';
import { BrowserRouter as Route, Switch } from "react-router-dom";
import Home from '../Home/Home';
import Products from '../Products/Products';
import Documents from '../Documents/Documents';
import Orders from '../Orders/Orders';
import { getModelPermissions,getFirstName, getLastName, logout } from '../../services/authenticationService';
import { RoutePerms } from './RoutePerms';

export const Routes = () => (
	<Switch>
		<Route exact path='/dashboard'>
            <Home />
        </Route>
		<RoutePerms exact path='/documents'>
			<Documents /> 
		</RoutePerms> 
        <RoutePerms exact path='/products'>
            <Products />
        </RoutePerms>
		<RoutePerms exact path='/orders'>
            <Orders />
        </RoutePerms>
	</Switch>
);

function Navigation(props) {
	const [ currentUser, setCurrentUser ] = useState({});

	const fetchCurrentUser = async () => {
		setCurrentUser({first_name: getFirstName(), last_name: getLastName()});
	};

	useEffect(() => {
		fetchCurrentUser();
	}, []);

	const handleLogout = async () => {
		try {
			await logout();
			props.history.push('/');
			window.reload();
		} catch (error) {
			console.log(error);
			// toast.error('Coś poszło nie tak.');
		}
	};

	if (!currentUser || Object.values(currentUser).length < 0) {
		return null;
	}

	return <NavigationWithDrawer handleLogout={handleLogout} currentUser={currentUser} />;
}

export default withRouter(Navigation);
