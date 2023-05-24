import { raw } from "./mockSeller";
import bcrypt from "bcrypt";
import { prisma } from "./src";

async function main() {
  const salt = await bcrypt.genSalt(10);

  const hashed = await Promise.all(
    raw.map(async seller => {
      return {
        ...seller,
        password: await bcrypt.hash(seller.password, salt),
      };
    })
  );

  await prisma.merchant.createMany({
    data: hashed,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
