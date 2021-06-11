import axios from 'axios';
import { API_URLS } from '../constants/siteSettings';
import errorHandler from './apiErrorService';

export const API_PATHS = Object.freeze({
  locations: {
    allLocations: `/locations`,
    singleLocation: `/locations/{ID}`
  }
});

// Select API URL to use
export let API_URL = API_URLS.local;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Errors
api.interceptors.response.use(
  (response) => response,
  errorHandler,
);

api.interceptors.request.use((config) => {
  return config;
});

/**
 * Locations
 */
export const fetchLocations = async () => {
  const response = await api.get(API_PATHS.locations.allLocations);
  return response;
};

export const fetchSingleLocation = async (id: number) => {
  const path = API_PATHS.locations.singleLocation.replace('{ID}', id.toString());
  return api.get(path);
};
