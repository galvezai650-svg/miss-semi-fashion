import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/admin-auth";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const authError = await verifyAdminToken(request);
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};
    if (status) {
      where.status = status;
    }

    const orders = await db.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Parse items JSON for each order
    const formatted = orders.map((order) => {
      let parsedItems = [];
      try {
        parsedItems = JSON.parse(order.items);
      } catch {}
      return {
        ...order,
        items: parsedItems,
      };
    });

    return NextResponse.json({ orders: formatted });
  } catch (error) {
    console.error("Admin orders GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authError = await verifyAdminToken(request);
    if (authError) return authError;

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing order id or status" },
        { status: 400 }
      );
    }

    const order = await db.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Admin orders PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
