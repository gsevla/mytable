import { PrismaClient } from '@prisma/client';
import { Day } from '@mytable/domain';
import { encryptPassword } from '../src/utils/password';

const prisma = new PrismaClient();

async function createWorkingDays(restaurantId: number) {
  const days = Object.keys(Day);

  const workingDaysPromises = days.map((day) =>
    prisma.workingDays.upsert({
      where: { day: Day[day] },
      update: {},
      create: {
        openingTime: '10:00',
        closingTime: '23:00',
        day: Day[day],
        restaurantId,
      },
    })
  );

  const workingDays = await Promise.all(workingDaysPromises);
  console.log('working days created: \n', workingDays);
}

async function main() {
  const restaurant = await prisma.restaurant.upsert({
    where: { id: 1 },
    update: {},
    create: {
      address: 'Av. Dr. Silas Munguba, 1700, Itaperi',
      name: 'RU Uece',
      ownerName: 'Governo do Estado do Ceará',
      primaryColor: '#6200ee',
      accentColor: '#03dac4',
    },
  });
  console.log('restaurant created:\n', restaurant);

  await createWorkingDays(restaurant.id);

  const defaultEnvironment = await prisma.environment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      capacity: 40,
      name: 'Espaço Climatizado',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni quam autem necessitatibus sit ipsum. Consectetur atque autem, provident et enim nemo labore, aspernatur possimus odio nulla quas dolorum, reiciendis iste?',
      restaurantId: restaurant.id,
    },
  });
  console.log('default environment created:\n', defaultEnvironment);

  const employeeAdmin = await prisma.employee.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Administrador',
      surname: 'MyTable',
      username: 'admin',
      password: await encryptPassword('admin'),
      role: 'ADMIN',
      restaurantId: restaurant.id,
    },
  });
  console.log('employeeAdmin created:\n', employeeAdmin);

  const client = await prisma.client.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      name: 'Gabriel',
      surname: 'Alves',
      cpf: '12345678909',
      phone: '99999999999',
      email: 'sousa.alves@aluno.uece.br',
    },
  });
  console.log('client created:\n', client);
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
