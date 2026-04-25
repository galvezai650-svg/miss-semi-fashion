import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, whatsapp, mensaje } = body;

    if (!nombre || !whatsapp || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Validate WhatsApp number (basic Colombian format)
    const cleanWhatsApp = whatsapp.replace(/[\s\-\(\)]/g, "");
    if (!/^\d{7,10}$/.test(cleanWhatsApp)) {
      return NextResponse.json(
        { error: "Numero de WhatsApp invalido" },
        { status: 400 }
      );
    }

    // In a production app, you would:
    // 1. Send an email notification
    // 2. Store in database
    // 3. Send WhatsApp notification via API
    // 4. Forward to CRM

    console.log("New contact form submission:", {
      nombre,
      whatsapp: cleanWhatsApp,
      mensaje,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      message: "Mensaje recibido exitosamente",
    });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
