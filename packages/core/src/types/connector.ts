export type WalletProvider = {
	request(request: { method: string; params?: Array<any> | Record<string, any> }): Promise<any>
}

export type ConnectorData<Provider = any> = {
	provider: Provider
	account: string
	chainId: number
}

export abstract class Connector<Provider = WalletProvider, Options = any> {
	// Connector name
	abstract readonly name: string
	// Options to pass to the third-party provider
	readonly options: Options

	constructor(options: Options) {
		this.options = options
	}

	abstract connect(timeout?: number): Promise<Required<ConnectorData>>
	abstract getProvider(): Promise<Provider>
	abstract disconnect(): Promise<void>
	abstract onDisconnect(handler: (...args: any[]) => any): void
	abstract onAccountsChanged(handler: (accounts: string[]) => any): void
	abstract onChainChanged(handler: (chainId: number) => any): void

	switchChain?(chainId: number, ...args: any[]): Promise<void>
}
