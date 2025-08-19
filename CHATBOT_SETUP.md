# Chatbot Setup Guide

## Overview
This portfolio website now includes "Ask VIKI" - an AI-powered chatbot that helps visitors learn about Vikyath's skills, experience, and projects. The chatbot uses Google's Gemini API to provide concise, witty, and professional responses.

## Features
- 🤖 AI-powered responses using Gemini API
- 🎯 Concise, professional responses (2-3 sentences max)
- 😄 Subtle humor and personality ("Ask VIKI" branding)
- 🎨 Seamlessly integrated with portfolio theme
- ✨ Smooth animations and transitions
- 💬 Context-aware conversations
- 📱 Mobile-responsive design
- 🚀 Always positive and enthusiastic about Vikyath's capabilities

## Setup Instructions

### 1. Get Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

### 2. Configure Environment Variables
Create a `.env.local` file in your project root and add:

```bash
GEMINI_API_KEY=your_actual_api_key_here
```

**Important:** Never commit your actual API key to version control!

### 3. Install Dependencies
The required packages are already installed:
- `@google/generative-ai` - For Gemini API integration

### 4. Start Development Server
```bash
npm run dev
```

The chatbot will appear as a floating chat button in the bottom-right corner of your portfolio.

## How It Works

### Chatbot Component (`components/chatbot/chatbot.tsx`)
- "Ask VIKI" branded interface with personality
- Floating chat button with smooth animations
- Expandable chat interface
- Real-time message handling
- Loading states and error handling

### API Route (`app/api/chat/route.ts`)
- Processes chat requests
- Integrates with Gemini API
- Provides contextual responses based on Vikyath's profile
- Maintains conversation history

### Profile Context
The chatbot is pre-configured with comprehensive information about:
- Education and background
- Professional experience
- Technical skills and projects
- Personal interests
- Communication style guidelines
- **Response optimization for concise, witty interactions**

## Customization

### Modifying Profile Information
Edit the `PROFILE_CONTEXT` in `app/api/chat/route.ts` to update:
- Personal details
- Experience descriptions
- Project information
- Communication style
- Response length and tone preferences
- Humor and personality elements

### Styling Changes
The chatbot uses Tailwind CSS classes that match your portfolio theme:
- Primary color: `teal-500`
- Background: `slate-800/95` with backdrop blur
- Text colors: `slate-200`, `slate-400`
- Borders: `slate-700`

### Animation Adjustments
Modify transition classes in the chatbot component:
- Duration: `duration-300`, `duration-500`
- Easing: `ease-out`
- Transform effects: `scale-100`, `translate-y-0`

## Security Considerations

1. **API Key Protection**: Never expose your Gemini API key in client-side code
2. **Rate Limiting**: Consider implementing rate limiting for the chat API
3. **Input Validation**: The API validates input but consider additional sanitization if needed
4. **Error Handling**: Graceful fallbacks for API failures

## Troubleshooting

### Common Issues

1. **"Gemini API key not configured"**
   - Check that `.env.local` exists and contains `GEMINI_API_KEY`
   - Restart your development server after adding environment variables

2. **"Failed to generate response"**
   - Verify your API key is valid
   - Check network connectivity
   - Review browser console for detailed errors

3. **Chatbot not appearing**
   - Ensure the component is imported and used in `app/page.tsx`
   - Check for JavaScript errors in browser console

### Debug Mode
Add console logs in the API route to debug issues:
```typescript
console.log("API Key configured:", !!process.env.GEMINI_API_KEY)
console.log("Request payload:", { message, conversationHistory })
```

## Performance Optimization

- Conversation history is limited to last 5 messages
- API responses are cached briefly
- Smooth scrolling and animations are optimized
- Mobile-responsive design ensures good performance on all devices

## Future Enhancements

Potential improvements to consider:
- Message persistence across sessions
- Typing indicators
- File/image sharing capabilities
- Multi-language support
- Analytics and insights
- Custom training on specific domains
