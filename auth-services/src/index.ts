import { PrismaClient } from "@prisma/client";
import express from "express";
import router from "./routes";

export const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
// async function main() {}

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async e => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
