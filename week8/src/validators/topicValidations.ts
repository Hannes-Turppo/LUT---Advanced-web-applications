import {body} from 'express-validator';

const topicValidations = () => {
    return [
        body("title").exists().escape(),
        body("content").exists().escape(),
    ]
};

export {topicValidations};
