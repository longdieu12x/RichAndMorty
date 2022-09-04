import axios from "axios";

const getCharacterByUrl = async (url) => {
	const response = await axios.get(url);
	if (response?.status == 200 || response?.status == 201) {
		return response.data;
	} else return null;
};
export { getCharacterByUrl };
