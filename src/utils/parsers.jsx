const parseBoolean = (stringBoolean) => {
    switch (stringBoolean) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return Boolean(stringBoolean);
    }
};

export {parseBoolean};
