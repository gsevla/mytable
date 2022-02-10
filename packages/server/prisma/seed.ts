import { PrismaClient } from '@prisma/client';
import { encryptPassword } from '../src/utils/password';
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
      accentColor: '#03dac4',
    },
  });
  console.log('restaurant created:\n', restaurant);

  const employeeAdmin = await prisma.employee.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Administrador',
      username: 'admin',
      password: await encryptPassword('admin'),
      role: 'ADMIN',
      restaurantId: restaurant.id,
    },
  });
  console.log('employeeAdmin created:\n', employeeAdmin);
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
