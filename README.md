
https://github.com/samarth-5/BlackBird.AI/assets/128695366/e8813238-d8dd-4cb1-9657-4fd6af3873e3

# BlackBird.AI

BlackBird.AI is an AI-SaaS platform designed to enhance user experience and productivity through advanced conversational AI and creative tools. Users can interact with a chatbot for quick and accurate responses and generate unique images from text prompts, combining cutting-edge technology with creative capabilities.

## Features

- **Conversational AI**: Engage with a sophisticated chatbot for instant and accurate responses to user queries.
- **Image Generation**: Create unique and customized images from textual prompts using advanced AI models.
- **User Interaction**: Intuitive interface for interacting with the chatbot and designing images.
- **Productivity Tools**: Streamline workflows with AI-powered assistance and creative tools.

## Tech Stack

- **Frontend**:
  - **ReactJS**: For building dynamic and interactive user interfaces.
  - **TailwindCSS**: For modern and responsive styling.

- **Backend**:
  - **Node.js**: JavaScript runtime for building scalable server-side applications.
  - **Express.js**: Web framework for creating RESTful APIs.
  - **OpenAI API**: For chatbot interactions and image generation (or similar AI services).

- **Database**:
  - **MongoDB**: NoSQL database for storing user data and application state.

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)
- MongoDB (local or cloud)
- Access to OpenAI API or equivalent service for AI functionalities

### Clone the Repository

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/samarth-5/blackbird.ai.git
    ```

2. Navigate into the project directory:

    ```bash
    cd blackbird-ai
    ```

### Frontend Setup

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm run dev
    ```

4. Build the React application for production:

    ```bash
    npm run build
    ```

5. Run tests (if any):

    ```bash
    npm test
    ```

6. Eject the create-react-app configuration (if needed):

    ```bash
    npm run eject
    ```

### Backend Setup

1. Navigate to the `api` directory:

    ```bash
    cd ../api
    ```

2. Install backend dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables. Create a `.env` file in the `api` directory and add the following content:

    ```env
    MONGO_URI=your_mongodb_connection_string
    OPENAI_API_KEY=your_openai_api_key
    ```

4. Start the Node.js server:

    ```bash
    npm start
    ```

5. Run tests (if any):

    ```bash
    npm test
    ```

### Running the Application

1. Ensure the backend server is running:

    ```bash
    npm start
    ```

2. Start the frontend development server:

    ```bash
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000` to access the application.

## Scripts

### Backend Scripts

- `npm start`: Starts the backend server.
- `npm test`: Runs backend tests (if any).

### Frontend Scripts

- `npm start`: Starts the React development server.
- `npm run build`: Builds the React application for production.
- `npm test`: Runs frontend tests (if any).
- `npm run eject`: Ejects the create-react-app configuration for custom setup.

## Contributing

Contributions are welcome! Please open issues or submit pull requests to contribute to the project.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please reach out to [your-email@example.com](mailto:your-email@example.com).

---

Happy coding!
