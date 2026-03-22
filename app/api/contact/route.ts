import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // Server-side validation
        if (!name || !email || !message) {
            console.error("Missing fields in contact form submission:", { name, email, message });
            return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
        }

        const apiKey = process.env.RESEND_API_KEY;

        // Check if API key is set in environment (Azure Configuration or .env.local)
        if (!apiKey) {
            console.error("RESEND_API_KEY is not set in environment variables.");
            // If missing, we'll log to console for now, but return a clear error in dev
            console.log("Contact form submission (No API Key):", { name, email, message });

            return NextResponse.json(
                {
                    message: "Contact form is not yet configured with an API key.",
                },
                { status: 500 }
            );
        }

        const resend = new Resend(apiKey);

        const { data, error } = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: [process.env.CONTACT_EMAIL || "ayushchavne17@gmail.com"],
            subject: `New Contact Form Message from ${name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 16px;">New Contact Form Submission</h2>
                    <p style="margin-bottom: 8px;"><strong>Name:</strong> ${name}</p>
                    <p style="margin-bottom: 8px;"><strong>Email:</strong> ${email}</p>
                    <p style="margin-bottom: 16px;"><strong>Message:</strong></p>
                    <div style="background-color: #f9fafb; padding: 12px; border-radius: 6px; border-left: 4px solid #3b82f6;">
                        ${message.replace(/\n/g, "<br/>")}
                    </div>
                </div>
            `,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
        }

        return NextResponse.json({ message: "Message sent successfully", data }, { status: 200 });
    } catch (error) {
        console.error("Error in contact API:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
