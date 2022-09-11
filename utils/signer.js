const ethers = require("ethers");
const privateKey =
	"b95c15a53fcf988fe7a7eb57f6294fb9baf835cef19372ba962c6aa52cc58480";
const rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545"; // bsc
// const rpcUrl = "https://polygontestapi.terminet.io/rpc"; // matic

async function getSigner() {
	const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
	const signer = new ethers.Wallet(privateKey, provider);
	return signer;
}

function getProvider() {
	const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
	return provider;
}

module.exports = {
	getSigner,
	getProvider,
};
