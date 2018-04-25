export const ieCurrentScriptStub = {
    src: 'https://wallets.rbk.money/wallet-utils.js' // TODO: поправить домен!!!
};

const getCurrentScript = (): HTMLScriptElement =>
    (document.currentScript || ieCurrentScriptStub) as HTMLScriptElement;

export const getOrigin = (): string =>
    new URL(getCurrentScript().src).origin;
