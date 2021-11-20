import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const restaurant = await prisma.restaurant.upsert({
    where: { id: 1 },
    update: {},
    create: {
      address: 'Endereço do seu restaurante',
      name: 'Nome do seu restaurante',
      ownerName: 'Seu nome',
      primaryColor: '#6200ee',
      secondaryColor: '#03dac4',
    },
  });

  console.log(restaurant);
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
