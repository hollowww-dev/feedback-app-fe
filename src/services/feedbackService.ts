import axios from 'axios';

import config from '../utils/config';

import { Entry } from '../types';

const getAll = async () => {
	const { data } = await axios.get<Entry[]>(`${config.baseUrl}/feedback`);

	return data;
};

export default { getAll };
