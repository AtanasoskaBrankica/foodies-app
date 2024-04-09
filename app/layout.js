import MainHeader from '@/components/main-header/main-header';
import './globals.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from '@/redux/provider';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ToastContainer />
          <MainHeader />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
