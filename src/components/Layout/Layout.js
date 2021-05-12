import Header from '../Header/header';
import Menu from '../Menu/menu';
import Footer from '../Footer/footer';

const Layout = ({ children }) => (
    <div className="mx-4 my-3">
        <Header />
        <Menu />
        { children}
        <Footer />
    </div>
);

export default Layout;