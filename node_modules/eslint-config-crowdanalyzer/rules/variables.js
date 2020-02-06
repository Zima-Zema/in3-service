'use strict';

module.exports = {
    rules: {
        // disallow deleting variables
        'no-delete-var': ['error'],

        // disallow the use of undeclared variables unless mentioned in /*global */ comments
        'no-undef': ['error'],

        // disallow unused variables
        'no-unused-vars': ['error'],
    },
};
