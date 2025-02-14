import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

const MONGODB_URI = process.env.MONGODB_URL!


if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Use a cached connection across hot reloads in development.
let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = 
  (global as any).mongoose || { conn: null, promise: null };

if (!cached) {
  cached = { conn: null, promise: null };
  (global as any).mongoose = cached;
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Define the Order schema
const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  transactionRef: { type: Number, required: true },
  transactionTime: { type: Date, required: true },
  amount: { type: Number, required: true },
  drugsPurchased: { type: Array, required: true },
});

// If the model exists, use it; otherwise, create a new model
const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export  async function POST(req: Request) {


  try {
    await connectToDatabase();

    // Extract order details from the request body
    const { orderId, transactionRef, transactionTime, amount, drugsPurchased } = await req.json();

    if (!orderId || !transactionRef || !transactionTime || !amount || !drugsPurchased) {
      return NextResponse.json({ success: false, message: 'Missing required fields' },{status:400});
    }

    const newOrder = new Order({
      orderId,
      transactionRef,
      transactionTime,
      amount,
      drugsPurchased,
    });

    await newOrder.save();

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error:any) {
    console.error('Error saving order:', error);
    return NextResponse.json({ success: false, message: 'Server error' },{status:500});
  }
}


export async function GET(req:NextRequest){
    try {
        await connectToDatabase();
        const  orderId  = req.nextUrl.searchParams.get("orderId");
        if (!orderId || typeof orderId !== 'string') {
          return NextResponse.json({ success: false, message: 'Missing orderId in query' });
        }
  
        const order = await Order.findOne({ orderId });
        if (!order) {
          return NextResponse.json({ success: false, message: 'Order not found' },{status:404});
        }
        return NextResponse.json({ success: true, order });
      } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json({ success: false, message: 'Server error' },{status:500});
      }
}