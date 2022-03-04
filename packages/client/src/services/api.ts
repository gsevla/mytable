import ApiService from '@mytable/api-service';

function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return ApiService.createQueryClientProvider({ children });
}

export default {
  ...ApiService,
  QueryClientProvider,
};

// export default {
//   ...ApiService,
//   // QueryClientProvider,
// };
