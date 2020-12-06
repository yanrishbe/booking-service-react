const parseBoolean = (stringBoolean) => {
    if(typeof stringBoolean === "boolean"){
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
