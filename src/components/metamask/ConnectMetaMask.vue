<template>
    <div>
        <button @click="connectMetaMask" class="button-submit">Connect to MetaMask</button>
        <p v-if="account">Connected Account: {{ account }}</p>
    </div>
</template>

<script>
import Web3 from "web3";

export default {
    data() {
        return {
            web3: null,
            account: null,
        };
    },
    methods: {
        async connectMetaMask() {
            if (window.ethereum) {
                try {
                    // Request account access
                    await window.ethereum.request({ method: "eth_requestAccounts" });

                    // We initialize the web3 instance
                    this.web3 = new Web3(window.ethereum);

                    // Get the user's Ethereum account
                    const accounts = await this.web3.eth.getAccounts();
                    this.account = accounts[0];
                    localStorage.getItem('metamaskAccount');

                    console.log("Connected account:", this.account);
                    window.ethereum.on("accountsChanged", this.handleAccountsChanged)
                } catch (error) {
                    console.error("User denied account access", error);
                }
            } else {
                alert("MetaMask is not installed. Please install it to use this app.");
            }
        },
        handleAccountsChanged(accounts) {
            if (accounts.length === 0) {
                console.log('Please connect to MetaMask.');
            } else {
                this.account = accounts[0];
                //save the new account to local storage
                localStorage.setItem('metamaskAccount', this.account);
            }
        },
        checkLocalStorage() {
            const savedAccount = localStorage.getItem('metamaskAccount');
            if (savedAccount) {
                this.account = savedAccount;
            }
        }
    },
    created() {
        this.checkLocalStorage
    },
    beforeUnmount() {
        // Remove the listener when the component is destroyed
        if (window.ethereum && this.handleAccountsChanged) {
            window.ethereum.removeListener("accountsChanged", this.handleAccountsChanged);
        }
    },
};
</script>

<style scoped>
.button-submit {
    @apply bg-violet-700 text-white w-full p-4 font-bold rounded-lg;
}
.button-submit:disabled {
    @apply bg-violet-200 cursor-not-allowed;
}
</style>
