import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

const MONGODB_URI = process.env.MONGODB_URL!;
if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI in .env.local');

let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } =
  (global as any).mongoose || { conn: null, promise: null };

if (!cached) {
  cached = { conn: null, promise: null };
  (global as any).mongoose = cached;
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const Order = mongoose.models.Order || mongoose.model('Order', new mongoose.Schema({
  orderId: { type: String, required: true },
  transactionRef: { type: Number, required: true },
  transactionTime: { type: Date, required: true },
  amount: { type: Number, required: true },
  drugsPurchased: { type: Array, required: true },
}));

// ✅ GET: Fetch Order for Verification
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const transactionRef = req.nextUrl.searchParams.get('transactionRef');

    if (!transactionRef) {
      return NextResponse.json({ success: false, message: 'Missing transactionRef in query' }, { status: 400 });
    }

    const order = await Order.findOne({ transactionRef: Number(transactionRef) });
    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// ✅ DELETE: Verify & Remove an Order
export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const transactionRef = req.nextUrl.searchParams.get('transactionRef');

    if (!transactionRef) {
      return NextResponse.json({ success: false, message: 'Missing transactionRef in query' }, { status: 400 });
    }

    const deletedOrder = await Order.findOneAndDelete({ transactionRef: Number(transactionRef) });
    if (!deletedOrder) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Order verified and removed' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
