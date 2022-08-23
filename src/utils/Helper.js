class Helper {
	shortTextAdress(address) {
		if (!address) return "no connect";
		const first = address.slice(0, 5);
		const last = address.slice(-4);
		return `${first}...${last}`;
	}
}

export default new Helper();
