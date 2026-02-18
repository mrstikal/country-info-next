import { NextResponse } from "next/server";

export const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function jsonBadGateway(message = "Service temporarily unavailable.") {
  return NextResponse.json({ error: message }, { status: 502 });
}

export function jsonBadRequest(message = "Bad request.") {
  return NextResponse.json({ error: message }, { status: 400 });
}