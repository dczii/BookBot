"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("convex/server");
var values_1 = require("convex/values");
exports.default = (0, server_1.defineSchema)({
    // Example table — replace with your actual data model
    books: (0, server_1.defineTable)({
        title: values_1.v.string(),
        author: values_1.v.string(),
        description: values_1.v.optional(values_1.v.string()),
        coverUrl: values_1.v.optional(values_1.v.string()),
        isbn: values_1.v.optional(values_1.v.string()),
        userId: values_1.v.string(),
        createdAt: values_1.v.number(),
    }).index("by_user", ["userId"]),
});
