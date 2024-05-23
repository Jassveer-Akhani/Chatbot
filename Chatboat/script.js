// script.js
var courses = {
    'Web Development': {
        details: 'Learn HTML, CSS, JavaScript, and modern frameworks like React and Angular.',
        criteria: 'Basic understanding of programming and web technologies.'
    },
    'Mobile App Development': {
        details: 'Learn to develop mobile applications using Android, iOS, and cross-platform tools.',
        criteria: 'Basic knowledge of programming and mobile app concepts.'
    },
    'Graphic Designing': {
        details: 'Master tools like Photoshop, Illustrator, and InDesign to create stunning graphics.',
        criteria: 'Creativity and a basic understanding of graphic design principles.'
    },
    'Digital Marketing': {
        details: 'Learn SEO, SEM, content marketing, social media marketing, and analytics.',
        criteria: 'Basic understanding of marketing concepts and internet usage.'
    },
    'Artificial Intelligence': {
        details: 'Explore machine learning, deep learning, and AI concepts with practical projects.',
        criteria: 'Strong foundation in mathematics and programming.'
    }
};

var userInputs = [
    'Hi',
    'hey',
    'Hello',
    'kese hain aap?',
    'theek',
    'thk',
    'thk hun',
    'mujhe saylani men admission chaheay'
];

var faqVisible = false;
var waitingForQualification = false;

function sendMessage() {
    var userInput = document.getElementById('user-input').value.trim();
    if (userInput === "") return;

    var chatBox = document.getElementById('chat-box');

    // Display user's message
    var userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.appendChild(document.createTextNode(userInput));
    chatBox.appendChild(userMessage);

    // Hide FAQ options if visible
    if (faqVisible) {
        showFAQ();
    }

    // Clear the input
    document.getElementById('user-input').value = '';

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Add "typing..." indicator
    var typingMessage = document.createElement('div');
    typingMessage.className = 'message bot-message';
    typingMessage.appendChild(document.createTextNode('typing...'));
    chatBox.appendChild(typingMessage);

    // Check if waiting for qualification
    if (waitingForQualification) {
        setTimeout(function() {
            chatBox.removeChild(typingMessage);

            var qualifiedCourses = [];
            for (var course in courses) {
                if (courses.hasOwnProperty(course)) {
                    qualifiedCourses.push(course);
                }
            }

            var botReply = document.createElement('div');
            botReply.className = 'message bot-message';
            botReply.appendChild(document.createTextNode('Available courses based on your qualification: ' + qualifiedCourses.join(', ')));
            chatBox.appendChild(botReply);

            waitingForQualification = false; // Reset waiting for qualification

            chatBox.scrollTop = chatBox.scrollHeight;
        }, 2000);
    } else {
        // Check the input
        var lowerCaseInput = userInput.toLowerCase();
        var botReply;
        if (lowerCaseInput === 'hi' || lowerCaseInput === 'hey' || lowerCaseInput === 'hello') {
            botReply = function() {
                typingMessage.textContent = userInput;

                var followUpMessage = document.createElement('div');
                followUpMessage.className = 'message bot-message';
                followUpMessage.appendChild(document.createTextNode('kese hain aap?'));
                chatBox.appendChild(followUpMessage);
            };
        } else if (lowerCaseInput === 'theek' || lowerCaseInput === 'thk' || lowerCaseInput === 'thk hun') {
            botReply = function() {
                typingMessage.textContent = 'batain men aap ki kya madad kar sakta hun';
            };
        } else if (lowerCaseInput === 'mujhe saylani men admission chaheay') {
            botReply = function() {
                typingMessage.textContent = 'Aap ki qualification batayn kya hai?';
                waitingForQualification = true;
            };
        } else if (courses.hasOwnProperty(userInput)) {
            botReply = function() {
                typingMessage.textContent = 'Course: ' + userInput;
                var courseDetails = courses[userInput];

                var detailsMessage = document.createElement('div');
                detailsMessage.className = 'message bot-message';
                detailsMessage.appendChild(document.createTextNode('Details: ' + courseDetails.details));
                chatBox.appendChild(detailsMessage);

                var criteriaMessage = document.createElement('div');
                criteriaMessage.className = 'message bot-message';
                criteriaMessage.appendChild(document.createTextNode('Criteria: ' + courseDetails.criteria));
                chatBox.appendChild(criteriaMessage);
            };
        } else {
            botReply = function() {
                chatBox.removeChild(typingMessage);
            };
        }

        // Execute the bot's reply after 2 seconds
        setTimeout(function() {
            botReply();
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 2000);
    }
}

function handleKeyPress(event) {
    if (event.keyCode === 13) { // 13 is the Enter key
        sendMessage();
    }
}

function showFAQ() {
    var chatBox = document.getElementById('chat-box');

    // Toggle FAQ visibility
    faqVisible = !faqVisible;

    // Clear chat box
    chatBox.innerHTML = '';

    if (faqVisible) {
        // Show FAQ
        userInputs.forEach(function(input) {
            var faqQuestion = document.createElement('div');
            faqQuestion.className = 'message user-message';
            faqQuestion.appendChild(document.createTextNode(input));
            chatBox.appendChild(faqQuestion);
        });
    } else {
        // Show ongoing chat messages
        var botMessages = chatBox.querySelectorAll('.bot-message');
        botMessages.forEach(function(message) {
            chatBox.appendChild(message.cloneNode(true));
        });
    }

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}
