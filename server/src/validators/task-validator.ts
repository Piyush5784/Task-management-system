import { body } from "express-validator";

export const taskValidationRules = [
  body("title").notEmpty().withMessage("Title is required").trim(),
  body("description").notEmpty().withMessage("Description is required").trim(),
  body("status")
    .optional()
    .isIn(["Pending", "In Progress", "Done"])
    .withMessage("Invalid status value"),
  body("priority")
    .notEmpty()
    .withMessage("Priority is required")
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid priority value"),
  body("assignedTo")
    .notEmpty()
    .withMessage("AssignedTo is required")
    .isMongoId()
    .withMessage("Invalid assignedTo ID"),
  body("assignedUsername")
    .notEmpty()
    .withMessage("Assigned username is required")
    .isString()
    .withMessage("Invalid username"),
  body("projectId")
    .notEmpty()
    .withMessage("Project ID is required")
    .isMongoId()
    .withMessage("Invalid projectId"),
  body("comments")
    .optional()
    .isArray()
    .withMessage("Comments must be an array"),
  body("comments.*.text").notEmpty().withMessage("Each comment must have text"),
  body("comments.*.createdBy")
    .optional()
    .isMongoId()
    .withMessage("Invalid createdBy ID"),
];
