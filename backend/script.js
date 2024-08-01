import { list } from './list.js';

// Function to create buttons
function createButtons(containerId, list, fileName) {
  const container = document.getElementById(containerId);
  list.forEach((item) => {
    const button = document.createElement('button');
    button.textContent = item;
    button.onclick = () => handleButtonClick(item, fileName);
    container.appendChild(button);
  });
}

// Handle button click
async function handleButtonClick(item, fileName) {
  try {
    const response = await fetch('/addElement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item, fileName }),
    });
    if (response.ok) {
      console.log(`Successfully added ${item} to ${fileName}.js`);
    } else {
      console.error('Failed to add element');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Create buttons for Features and Labels
createButtons('feature-buttons', list, 'features');
createButtons('label-buttons', list, 'labels');
