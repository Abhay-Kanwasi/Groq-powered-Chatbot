import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChatContainer } from './components/ChatContainer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatContainer />
    </QueryClientProvider>
  );
}

export default App;