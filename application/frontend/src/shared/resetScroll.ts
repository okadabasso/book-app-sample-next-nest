export const resetScroll = () => {
    const mainElement = document.querySelector("main");
    if (mainElement) {
        mainElement.scrollTo({top: 0, behavior: 'smooth'});
    }
};
