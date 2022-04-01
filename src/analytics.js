import moment from 'moment';

function createAnalytics() {
    let counter = 0;
    let destroyed = false;
    let lastClickTimeString = "";

    const listener = () => {
        counter++;
        lastClickTimeString = moment().format('LLL');
    }

    document.addEventListener("click", listener);

    return {
        destroy() {
            document.removeEventListener("click", listener)
            destroyed = true;
        },
        getClicks() {
            if (destroyed) {
                return `Analytics is destroyed! Total clicks = ${counter}, last click was at ${lastClickTimeString}`
            }

            return counter;
        },
    }
}

window.analytics = createAnalytics()