'use strict';

class BaseError extends Error {

    get statusCode() {
        throw new Error('statusCode getter is not implemented');
    }

    get errorCode() {
        throw new Error('errorCode getter is not implemented');
    }

    get errorMessage() {
        throw new Error('errorMessage getter is not implemented');
    }

}

class UnauthorizedError extends BaseError {

    constructor(message) {
        super(message);
        this.name = 'Unauthorized';
    }

    get statusCode() {
        return 401;
    }

    get errorCode() {
        return 'UNAUTHORIZED';
    }

    get errorMessage() {
        return 'you are not authorized to perform this action.';
    }

}

class ForbiddenError extends BaseError {

    constructor(message) {
        super(message);
        this.name = 'Forbidden';
    }

    get statusCode() {
        return 403;
    }

    get errorCode() {
        return 'FORBIDDEN';
    }

    get errorMessage() {
        return 'Forbidden';
    }

}

class NotFoundError extends BaseError {

    constructor(message) {
        super(message);
        this.name = 'NotFound';
    }

    get statusCode() {
        return 404;
    }

    get errorCode() {
        return 'NOT_FOUND';
    }

    get errorMessage() {
        return this.message || 'the resource you are looking for does not exist';
    }

}

class InternalServerError extends BaseError {

    constructor(message) {
        super(message);
        this.name = 'InternalServer';
    }

    get statusCode() {
        return 500;
    }

    get errorCode() {
        return 'INTERNAL_SERVER_ERROR';
    }

    get errorMessage() {
        return this.message || 'internal server error';
    }

}

class BadRequestError extends BaseError {

    constructor(message) {
        super(message);
        this.name = 'BadRequest';
    }

    get statusCode() {
        return 400;
    }

    get errorCode() {
        return 'BAD_REQUEST';
    }

    get errorMessage() {
        return this.message || 'Bad request. check your input.';
    }

}

class NoCommunicationAllowedError extends BaseError {

    constructor(message) {
        super(message);
        this.name = 'NoCommunicationAllowed';
    }

    get statusCode() {
        return 400;
    }

    get errorCode() {
        return 'COMM_NOT_ALLOWED';
    }

    get errorMessage() {
        return 'communication is prohibited';
    }

}

class RateLimitedError extends BaseError {

    constructor(message) {
        super(message);
        this.name = 'RateLimited';
    }

    get statusCode() {
        return 420;
    }

    get errorCode() {
        return 'RATE_LIMITED';
    }

    get errorMessage() {
        return 'rate limited';
    }

}

class AlreadyGrantedError extends BaseError {

    constructor(message) {
        super(message);
        this.name = 'AlreadyGranted';
    }

    get statusCode() {
        return 400;
    }

    get errorCode() {
        return 'BAD_REQUEST';
    }

    get errorMessage() {
        return 'you already have access on this project';
    }

}

class DuplicateError extends BaseError {

    constructor(message) {
        super(message);
        this.name = 'Duplicate';
    }

    get statusCode() {
        return 400;
    }

    get errorCode() {
        return 'BAD_REQUEST';
    }

    get errorMessage() {
        return 'item already exists';
    }

}

module.exports = {
    BaseError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    InternalServerError,
    BadRequestError,
    NoCommunicationAllowedError,
    RateLimitedError,
    AlreadyGrantedError,
    DuplicateError,
};
