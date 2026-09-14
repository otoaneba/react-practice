// import  ProductPage  from './ProductPage';
// import './App.css'

// function App() {

//   return (
//     <>
//       <ProductPage productId="1"></ProductPage>
//     </>
//   )
// }

// export default App
import  ProductPage  from './ProductPage';
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductPage productId="1" />
    </QueryClientProvider>
  );
}

export default App