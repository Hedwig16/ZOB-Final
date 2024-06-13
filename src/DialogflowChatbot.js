import React, { useEffect } from 'react';

function Chatbot() {
  useEffect(() => {
    const handleMessengerLoaded = () => {
      let greetingDisplayed = sessionStorage.getItem('greetingDisplayed') === 'true';
      if (!greetingDisplayed) {
        const dfMessenger = document.querySelector('df-messenger');
        dfMessenger.renderCustomText('Greetings! As your ZOLL BILLING Assistant, Im here to provide dedicated support for any inquiries or issues you may encounter regarding help content related to ZOLL Billing. Please feel free to reach out at any time. Im readily available to assist you!', true);
        greetingDisplayed = true;
        sessionStorage.setItem('greetingDisplayed','true');
      }
      const dfMessenger = document.querySelector('df-messenger');
      dfMessenger.clearStorage();
    };

    document.addEventListener('df-messenger-loaded', handleMessengerLoaded);

    const handleUserInputEntered = (event) => {
        const userInput = event.detail.input.toLowerCase(); // Convert user input to lowercase for case-insensitive comparison
        console.log(userInput);
      
        // Define dynamic redirection keywords or phrases
        const redirectionKeywords = ['launch me to page2', 'redirect to page2', 'go to page2'];
        const backKeywords = ['go back', 'back to start', 'return to home'];
      
        // Check if the user input contains any of the redirection keywords
        const shouldRedirectToPage2 = redirectionKeywords.some(keyword => userInput.includes(keyword));
        const shouldRedirectBack = backKeywords.some(keyword => userInput.includes(keyword));
      
        // If any redirection keyword is found, navigate accordingly
        if (shouldRedirectToPage2) {
          window.location.href = 'Page2.html';
        } else if (shouldRedirectBack) {
          // Redirect back to the starting page
          window.location.href = 'http://localhost:3002/'; // Replace 'index.html' with the URL of your starting page
        }
      
        // You can add more conditions for other commands here
      };
      

    const handleResponseReceived = (event) => {
      event.preventDefault(); // Dialogflow Messenger won't handle the response.
      const messenger = document.querySelector('df-messenger');
      event.detail.data.messages.forEach(message => {
        if (message.type === 'text') {
          messenger.renderCustomText(message.text);
        }
        // You can handle responses here if needed
      });
    };
      
    window.addEventListener('df-user-input-entered', handleUserInputEntered);
    window.addEventListener('df-response-received', handleResponseReceived);

    // Cleanup event listeners when component unmounts
    return () => {
      document.removeEventListener('df-messenger-loaded', handleMessengerLoaded);
      window.removeEventListener('df-user-input-entered', handleUserInputEntered);
      window.removeEventListener('df-response-received', handleResponseReceived);
    };
  }, []);

  return (
    <df-messenger
    project-id="civil-listener-424307-n9"
    agent-id="38efbd08-3fbe-40e7-8420-29436ca9819d"
    language-code="en"
    max-query-length="-1"
    allow-feedback="all">
      <df-messenger-chat-bubble
        chat-title="ZOB-Billing BOT">
      </df-messenger-chat-bubble>
    </df-messenger>
  );
}
export default Chatbot;
