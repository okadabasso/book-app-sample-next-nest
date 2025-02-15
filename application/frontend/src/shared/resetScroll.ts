export const resetScroll = () => {
    const mainElement = document.querySelector("main");
    if (mainElement) {
        mainElement.scrollTop = 0; // スクロール位置をリセット
    }
};
