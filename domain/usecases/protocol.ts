export type UCProtocol<I = unknown, O = unknown> = (args: I) => {
  execute(): O;
};
