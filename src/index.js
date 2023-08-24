import './styles/style.css';

import { handleFormSubmission, handleClicks } from './modules/handleEvent.js';

document.addEventListener('submit', handleFormSubmission);
document.addEventListener('click', handleClicks);
