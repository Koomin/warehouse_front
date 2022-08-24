import axios from 'axios';
import { API } from '../constants';

export const login = async (form) => {
	try {
		removeTokenFromStorage();
		const response = await axios.post(API.AUTH, form);
		const token = response.data.access;
        const refresh = response.data.refresh;
		const user = response.data.user;
		saveTokenToLocalStorage(token);
		saveRefreshToLocalStorage(refresh);
		saveUserToLocalStorage(user);
		return;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const logout = async () => {
	try {
		removeTokenFromStorage();
		removeUserFromStorage();
		return true;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const refresh = async () => {
	try { 
		const token = localStorage.getItem("refresh");
		const config = {
			refresh: `${token}` 
		};
		const response = await axios.post(API.REFRESH, config);
		const newToken = response.data.access;
		saveTokenToLocalStorage(newToken);
		return [getToken(), true]
	} catch (error) {
		logout();
		window.location.assign('/');
		return;
	}

};

const saveUserToLocalStorage = (user) => {
	localStorage.setItem('firstName', user.first_name);
	localStorage.setItem('lastName', user.last_name);

}

const saveTokenToLocalStorage = (token) => {
	localStorage.setItem('token', token);

};
const saveRefreshToLocalStorage = (refresh) => {
	localStorage.setItem('refresh', refresh);
}

const removeTokenFromStorage = () => {
	localStorage.removeItem('token');
    localStorage.removeItem('refresh');
};

const removeUserFromStorage = () => {
	localStorage.removeItem('firstName');
	localStorage.removeItem('lastName');
}

export const getToken = () => localStorage.getItem('token');
export const getRefresh = () => localStorage.getItem('refresh');
export const getFirstName = () => localStorage.getItem('firstName');
export const getLastName = () => localStorage.getItem('lastName');