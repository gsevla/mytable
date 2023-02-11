export interface SwaggerClientProtocol {
  auth: {
    signIn(): unknown;
    signUp(): unknown;
    signInAuthorization(): unknown;
  };
  client: {
    createClient(): unknown;
    getClientById(): unknown;
    getClientByCpf(): unknown;
  };
  restaurant: {
    getRestaurant(): unknown;
    updateRestaurant(): unknown;
  };
  employee: {
    create(): unknown;
    findAll(): unknown;
    findOne(): unknown;
    update(): unknown;
    remove(): unknown;
  };
  workingDay: {
    create(): unknown;
    findAll(): unknown;
    findOne(): unknown;
    update(): unknown;
    remove(): unknown;
  };
  environment: {
    create(): unknown;
    findAll(): unknown;
    findAllWithImage(): unknown;
    findOne(): unknown;
    update(): unknown;
    remove(): unknown;
    findOneWithImage(): unknown;
  };
  environmentImage: {
    create(): unknown;
    findAll(): unknown;
    findOne(): unknown;
    update(): unknown;
    remove(): unknown;
  };
  reservationOrder: {
    create(): unknown;
    findAll(): unknown;
    findOne(): unknown;
    update(): unknown;
    remove(): unknown;
  };
  reservationOrderHistory: {
    findAll(): unknown;
    findOne(): unknown;
  };
}
