# Mentorium.ai Landing Page

A minimalist and elegant landing page for Mentorium.ai, featuring a modern design with light/dark theme support.

## Project Structure

```
mentoriumai.github.io/
├── static/
│   └── css/
│       └── styles.css    # Main stylesheet
├── index.html           # Main HTML file
├── server.py           # Python development server
├── requirements.txt    # Python dependencies (empty)
└── README.md          # This file
```

## Running Locally

This project includes a simple Python development server for local testing. To run the project:

1. Make sure you have Python 3.x installed on your system
2. Clone this repository:
   ```bash
   git clone https://github.com/MentoriumAI/mentoriumai.github.io.git
   cd mentoriumai.github.io
   ```

3. Start the development server:
   ```bash
   python server.py
   ```

4. Open your browser and visit:
   ```
   http://localhost:8000
   ```

The server will start on port 8000 by default. If you need to use a different port, you can modify the port number in `server.py`.

## Features

- Responsive design that works on all screen sizes
- Light/dark theme support using CSS variables
- Modern, minimalist UI
- No external dependencies
- Easy to customize and maintain

## Development

The project is structured for easy maintenance:

- `static/css/styles.css`: Contains all styling, organized with CSS variables for theming
- `index.html`: Main HTML structure, kept clean and semantic
- `server.py`: Simple Python server for local development

## Browser Support

The site uses modern CSS features and should work in all modern browsers:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## License

MIT License - feel free to use this code for your own projects!

