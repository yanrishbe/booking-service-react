const parseBoolean = (stringBoolean) => {
    switch (stringBoolean) {
        case 'false':
            return false;
        default:
            return Boolean(stringBoolean);
    }
};

export {parseBoolean};
