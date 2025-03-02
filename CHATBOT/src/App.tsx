import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! I'm your AI assistant. How can I help you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const generateAIResponse = (userMessage: string) => {
    // Simulate AI thinking
    setIsTyping(true);
    
    // Process the user message to generate a contextual response
    const lowerCaseMessage = userMessage.toLowerCase();
    let response = "";

    // Site-specific questions
    if (lowerCaseMessage.includes('what') && 
        (lowerCaseMessage.includes('site') || lowerCaseMessage.includes('website') || 
         lowerCaseMessage.includes('page') || lowerCaseMessage.includes('this')) && 
        (lowerCaseMessage.includes('about') || lowerCaseMessage.includes('for') || 
         lowerCaseMessage.includes('purpose'))) {
      response = "This site is a dynamic template generator tool and we can edit the template as well. You can create and customize various templates for your projects.";
    }
    // Template questions
    else if (lowerCaseMessage.includes('template') || 
             lowerCaseMessage.includes('templates') ||
             lowerCaseMessage.includes('generate')) {
      response = "Our template generator allows you to create custom designs for websites, documents, and presentations. You can modify colors, layouts, and content to suit your needs.";
    }
    // How to use
    else if ((lowerCaseMessage.includes('how') && lowerCaseMessage.includes('use')) || 
             lowerCaseMessage.includes('tutorial') ||
             lowerCaseMessage.includes('guide')) {
      response = "To use this tool, simply select a template category, choose a base design, and then customize it using our intuitive editor. You can change colors, fonts, layouts, and content with just a few clicks.";
    }
    // Pricing questions
    else if (lowerCaseMessage.includes('price') || 
             lowerCaseMessage.includes('cost') ||
             lowerCaseMessage.includes('subscription') ||
             lowerCaseMessage.includes('pay')) {
      response = "We offer both free and premium templates. Basic customization is available for free, while advanced features require a subscription starting at $9.99/month. Check our pricing page for more details.";
    }
    // Export options
    else if (lowerCaseMessage.includes('export') || 
             lowerCaseMessage.includes('download') ||
             lowerCaseMessage.includes('save')) {
      response = "You can export your templates in various formats including PDF, HTML, CSS, and image files. Premium users have access to additional export options like editable source files.";
    }
    // Features
    else if (lowerCaseMessage.includes('feature') || 
             lowerCaseMessage.includes('capabilities') ||
             lowerCaseMessage.includes('what can')) {
      response = "Our template generator features include: drag-and-drop editing, color scheme customization, font selection, responsive design preview, template sharing, and export in multiple formats.";
    }
    // Support
    else if (lowerCaseMessage.includes('support') || 
             lowerCaseMessage.includes('contact') ||
             lowerCaseMessage.includes('help desk')) {
      response = "For support, please email support@templategen.com or use the live chat feature available Monday-Friday, 9am-5pm EST. We typically respond within 24 hours.";
    }
    // Account questions
    else if (lowerCaseMessage.includes('account') || 
             lowerCaseMessage.includes('sign up') ||
             lowerCaseMessage.includes('login') ||
             lowerCaseMessage.includes('register')) {
      response = "You can create a free account to save your templates and access them from any device. Premium accounts include additional features and template options.";
    }
    // Greeting patterns
    else if (lowerCaseMessage.includes('hello') || 
        lowerCaseMessage.includes('hi') || 
        lowerCaseMessage.includes('hey')) {
      response = "Hello there! How can I assist you today with our template generator?";
    }
    // Questions about the AI
    else if (lowerCaseMessage.includes('who are you') || 
             lowerCaseMessage.includes('what are you') ||
             lowerCaseMessage.includes('your name')) {
      response = "I'm the AI assistant for this template generator tool. I'm here to help you navigate our features and answer any questions about creating and customizing templates.";
    }
    // Weather related
    else if (lowerCaseMessage.includes('weather') || 
             lowerCaseMessage.includes('temperature') ||
             lowerCaseMessage.includes('forecast')) {
      response = "I don't have access to real-time weather data, but I'd be happy to help you with our template generator tool instead.";
    }
    // Time related
    else if (lowerCaseMessage.includes('time') || 
             lowerCaseMessage.includes('date') ||
             lowerCaseMessage.includes('day')) {
      response = "I don't have access to the current time, but I can tell you that our template library is updated with new designs every Tuesday.";
    }
    // Help or assistance
    else if (lowerCaseMessage.includes('help') || 
             (lowerCaseMessage.includes('assist') && !lowerCaseMessage.includes('assistant')) ||
             lowerCaseMessage.includes('support')) {
      response = "I'm here to help with our template generator! You can ask about features, how to use specific tools, pricing, or get recommendations for templates that might suit your needs.";
    }
    // Thank you responses
    else if (lowerCaseMessage.includes('thank') || 
             lowerCaseMessage.includes('thanks') ||
             lowerCaseMessage.includes('appreciate')) {
      response = "You're welcome! I'm glad I could help with our template generator. Is there anything else you'd like to know about our tools or features?";
    }
    // Questions about capabilities
    else if (lowerCaseMessage.includes('can you') || 
             lowerCaseMessage.includes('able to')) {
      response = "As the assistant for this template generator tool, I can help you understand our features, guide you through the template creation process, answer questions about pricing, and provide tips for getting the most out of our platform.";
    }
    // Math related
    else if (lowerCaseMessage.includes('calculate') || 
             lowerCaseMessage.includes('math') ||
             /[0-9\+\-\*\/\=]/.test(lowerCaseMessage)) {
      response = "While I can help with basic calculations, our template generator also includes tools for creating charts and graphs from your data. Would you like to learn more about those features?";
    }
    // Goodbye responses
    else if (lowerCaseMessage.includes('bye') || 
             lowerCaseMessage.includes('goodbye') ||
             lowerCaseMessage.includes('see you')) {
      response = "Goodbye! Thank you for using our template generator tool. Feel free to come back if you have more questions. Have a great day!";
    }
    // Default response for anything else
    else {
      const defaultResponses = [
        "That's an interesting question about our template generator. Could you tell me more about what you're looking for?",
        "I understand. How can I help you further with our template creation tools?",
        "Thanks for your interest in our template generator. What specific templates are you interested in creating?",
        "I'm here to help with all aspects of our template generator. Could you elaborate on what you need?",
        "Our template generator has many features that might address that. What specific functionality are you interested in?",
        "I'd be happy to explain how our template generator can help with that. What's your specific use case?",
        "That's a good question about our platform. Let me help you understand how our template generator works for that.",
        "Our template generator is designed to handle requests like that. Would you like me to explain the specific features?",
        "I'm here to guide you through using our template generator. What kind of template are you hoping to create?",
        "Let me know which aspects of our template generator you'd like me to clarify further."
      ];
      response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    // Simulate delay for AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { text: inputValue, isUser: true }]);
    
    // Generate AI response
    generateAIResponse(inputValue);
    
    // Clear input
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-pink-900 px-4 py-3 flex items-center">
          <Bot className="text-pink-300 mr-2" size={24} />
          <h1 className="text-white font-bold text-lg">Template Generator Assistant</h1>
        </div>
        
        {/* Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto max-h-[500px] bg-gray-900">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`px-4 py-2 rounded-lg max-w-[80%] ${
                  message.isUser 
                    ? 'bg-pink-700 text-white rounded-tr-none' 
                    : 'bg-gray-800 text-gray-100 rounded-tl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg rounded-tl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="bg-gray-800 px-4 py-3 flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button 
            onClick={handleSendMessage}
            className="ml-2 bg-pink-700 hover:bg-pink-600 text-white rounded-full p-2 focus:outline-none transition-colors duration-200"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;