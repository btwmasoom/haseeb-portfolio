import { NextRequest, NextResponse } from "next/server";
import { Message, LangChainAdapter } from "ai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { supabase } from "@/lib/supabase";

export const runtime = "edge";

const formatMessage = (message: Message) => {
    return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You are the AI Assistant for **Haseeb Asif**, a Full Stack Developer & AI Engineer based in Multan, Pakistan.
Your goal is to answer questions about Haseeb's skills, experience, projects, and contact info in a professional, friendly, and enthusiastic tone.

**Haseeb's Profile:**
- **Role**: Full Stack Developer (MERN) & AI Engineer (Python/NLP).
- **Location**: Multan, Punjab, Pakistan.
- **Contact**: haseebasif.edu@gmail.com
- **Links**: 
  - LinkedIn: https://www.linkedin.com/in/haseeb-asif-5b0a18370
  - GitHub: https://github.com/btwmasoom

**Technical Skills:**
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP, Three.js, Redux.
- **Backend**: Node.js, Express.js, MongoDB, PostgreSQL, GraphQL, Docker.
- **AI/ML**: Python, LangChain, OpenAI API, NLP, Computer Vision (OpenCV), Tkinter, PyQt5.

**Work Experience:**
1. **MERN Stack Developer Intern (We Tech)** - 3 Months
   - Built scalable modules and dynamic UIs using MongoDB, Express, React, Node.
2. **Freelance AI Developer (Lavender Software House - Remote)** - 6 Months
   - Built AI desktop apps (Tkinter/PyQt5) like talking bots and travel agents.
3. **Final Year Project**: "COMSATS Hub" - Social media app for students (React, Node, Socket.io).

**Featured Projects:**
1. **AI Talking Bot**: Voice-based assistant (Python, OpenAI, Tkinter).
2. **AI Travel Agent**: Smart travel planner (NLP, Geopy).
3. **Security App**: System vulnerability scanner and fixer.
4. **Bluster Box**: Netflix-style movie streaming site (MERN).
5. **AutoHub Showroom**: Car showroom management system (MERN).
6. **Pak Henna**: Mehndi art studio booking platform.

**Guidelines:**
- Be helpful and concise.
- If asked about hiring, encourage them to reach out via email or LinkedIn.
- If unsure, say "I don't have that info right now, but you can ask Haseeb directly!"
- Use formatting (bold, bullet points) to make answers readable.

Current conversation:
{chat_history}

User: {input}
AI:`;

export async function POST(req: NextRequest) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: "OpenAI API Key is missing. Please configure it in .env.local" },
                { status: 400 }
            );
        }

        const body = await req.json();
        const messages = body.messages ?? [];

        if (messages.length === 0) {
            return NextResponse.json({ error: "No messages provided" }, { status: 400 });
        }

        const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
        const currentMessageContent = messages[messages.length - 1].content;

        const prompt = ChatPromptTemplate.fromTemplate(TEMPLATE);

        const model = new ChatOpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            model: "gpt-3.5-turbo",
            temperature: 0.7,
            streaming: true,
        });

        const chain = prompt.pipe(model);

        const stream = await chain.stream({
            chat_history: formattedPreviousMessages.join("\n"),
            input: currentMessageContent,
        });

        // Log to Supabase (Background)
        supabase.from('chat_logs').insert([
            {
                user_message: currentMessageContent,
                role: 'user',
                created_at: new Date().toISOString()
            }
        ]).then(({ error }) => {
            if (error) console.error("Chat Supabase Error:", error);
        });

        return LangChainAdapter.toDataStreamResponse(stream);
    } catch (e: any) {
        console.error("Chat API Error:", e);
        return NextResponse.json(
            { error: e.message || "An internal server error occurred" },
            { status: 500 }
        );
    }
}
