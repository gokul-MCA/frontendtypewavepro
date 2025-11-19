import { practiceContent } from "./data";

export const getRandomTypingContent = () => {
    // Retrieve the previously selected index from sessionStorage
    let previousIndex = JSON.parse(sessionStorage.getItem("lastIndex") || 'null');
  
    
    // If no previous index is stored, choose a random index
    let randomIndex = Math.floor(Math.random() * practiceContent.length);
  
    // Ensure the new random index is different from the previous one
    while (randomIndex.toString() === previousIndex) {
      randomIndex = Math.floor(Math.random() * practiceContent.length);
    }
  
  
    // Store the newly selected index in sessionStorage
    sessionStorage.setItem('lastIndex', JSON.stringify(randomIndex));
  
    // Return the random content
    return practiceContent[randomIndex];
  };