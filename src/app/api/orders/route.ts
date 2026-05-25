import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const ADMIN_WHATSAPP = "573108416620";

function buildWhatsAppMessage(order: Record<string, unknown>): string {
  const items = JSON.parse(order.items as string) as Array<{
    name: string;
    size: string;
    quantity: number;
    price: number;
  }>;

  const itemLines = items
    .map(
      (item, i) =>
        `  ${i + 1}. ${item.name}\n     Talla: ${item.size} · Cant: ${item.quantity} · $${(item.price * item.quantity).toLocaleString("es-CO")}`
    )
    .join("\n");

  const deptName =
    (order.department as string) || "";
  const muniName =
    (order.municipality as string) || "";
  const barrio = (order.neighborhood as string)
    ? `, ${order.neighborhood}`
    : "";

  const msg = `🛍️ *NUEVO PEDIDO - Miss Semi Fashion*
━━━━━━━━━━━━━━━━━━━━

📋 *Pedido:* ${order.orderId}

👤 *Cliente:* ${order.customerName}
📱 *Teléfono:* ${order.customerPhone}
📧 *Email:* ${order.customerEmail}
📝 *CC:* ${order.customerDoc || "No proporcionado"}

📍 *Dirección de envío:*
${order.address}${barrio}
${muniName}, ${deptName}

📦 *Productos:*
${itemLines}

💰 *Total: $${Number(order.total).toLocaleString("es-CO")}
🚚 *Envío: GRATIS*
💳 *Pago:* Contra entrega

━━━━━━━━━━━━━━━━━━━━`;

  return msg;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customerName,
      customerPhone,
      customerEmail,
      customerDoc,
      address,
      department,
      municipality,
      neighborhood,
      instructions,
      items,
      total,
      paymentMethod,
    } = body;

    if (!customerName || !customerPhone || !address || !items) {
      return NextResponse.json(
        { error: "Faltan datos requeridos del pedido" },
        { status: 400 }
      );
    }

    // Save order to database
    const order = await db.order.create({
      data: {
        orderId: `MSF-${Date.now().toString(36).toUpperCase()}`,
        customerName,
        customerPhone,
        customerEmail: customerEmail || "",
        customerDoc: customerDoc || "",
        address,
        department: department || "",
        municipality: municipality || "",
        neighborhood: neighborhood || "",
        instructions: instructions || "",
        items: JSON.stringify(items),
        total: parseFloat(total) || 0,
        shipping: 0,
        paymentMethod: paymentMethod || "contra-entrega",
        status: "Confirmada",
        whatsappSent: false,
      },
    });

    // Send WhatsApp message
    const message = buildWhatsAppMessage({
      ...order,
      items: order.items,
    });

    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${ADMIN_WHATSAPP}&text=${encodedMsg}`;

    // Mark as sent (fire-and-forget, we just redirect the user)
    await db.order.update({
      where: { id: order.id },
      data: { whatsappSent: true },
    });

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      whatsappUrl,
    });
  } catch (error) {
    console.error("Order POST error:", error);
    return NextResponse.json(
      { error: "Error al procesar el pedido" },
      { status: 500 }
    );
  }
}
