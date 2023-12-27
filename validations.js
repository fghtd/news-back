import { body } from "express-validator";

export const loginValidation = [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("firstName").isLength({ min: 3 }),
    body("avatarUrl").isURL(),
];

export const registerValidation = [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("firstName").isLength({ min: 3 }),
    body("avatarUrl").isURL(),
];

export const postCreateValidation = [
    body("title").isLength({ min: 3 }).isString(),
    body("text", "Required text in article.").isLength({ min: 10 }).isString(),
    body("tags", "Incorrect tags format, need an array.").optional().isString(),
    body("imageUrl", "Incorrect image url.").optional().isString(),
];

export const postUpdateValidation = [
    body("title").optional().isLength({ min: 3 }).isString(),
    body("text", "Required text in article.").optional().isLength({ min: 10 }).isString(),
    body("tags", "Incorrect tags format, need an array.").optional().isString(),
    body("imageUrl", "Incorrect image url.").optional().isString(),
];