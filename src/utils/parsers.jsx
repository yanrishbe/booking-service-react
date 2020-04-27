const parseBoolean = (stringBoolean) => {
    if(typeof stringBoolean === "boolean"){
        console.log('true')
        return stringBoolean;
    }
    switch (stringBoolean) {
        case 'false':
            return false;
        default:
            return Boolean(stringBoolean);
    }
};

export {parseBoolean};
