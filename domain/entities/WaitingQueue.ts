export type WaitingQueueClient = {
  clientIdentifier: string;
  name: string;
  tableSize: number;
  createdAt: string;
  attendedAt?: string;
};

export type JoinWaitingQueueInput = {
  clientIdentifier: string;
  name: string;
  tableSize: number;
};

export type LeaveWaitingQueueInput = {
  clientIdentifier: string;
};
