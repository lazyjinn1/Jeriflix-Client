import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';

// imports bootstrap, making sure it is before importing index.scss
import "bootstrap/dist/css/bootstrap.min.css";

//imports statement to indicate that you need to bundle './index.scss'
import './index.scss';

//Main component (will eventually use all the others)
const JeriFlixApplication = () => {
    return (<MainView />);
};

//finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

//Tells React to render my app in the root DOM element
root.render(<JeriFlixApplication />);

