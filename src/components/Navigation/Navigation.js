import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import NavigationWithDrawer from './NavigationWithDrawer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../Home/Home';
import Products from '../Products/Products';
import Documents from '../Documents/Documents';
import { useHistory } from 'react-router-dom';
import { getFirstName, getLastName, logout } from '../../services/authenticationService';


export const Routes = () => (
	<Switch>
		<Route exact path='/dashboard'>
            <Home />
        </Route>
        <Route exact path='/documents'>
            <Documents />
        </Route>
        <Route exact path='/products'>
            <Products />
        </Route>
	</Switch>
);

function Navigation(props) {
	const { pathname } = props.location;
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
