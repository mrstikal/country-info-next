import "server-only";
import { DEMO_FETCH, NS, SOAP_ENDPOINT } from "@/constants";
import type { SoapClientOptions } from "@/types/soap";

export type MaybeArray<T> = T | T[];

export function buildSoapBody(tag: string, content: string, xmlns: string = NS): string {
  return `<${tag} xmlns="${xmlns}">${content}</${tag}>`;
}

export function baseSoapOptions(soapAction: string, bodyXml: string): SoapClientOptions {
  return {
    endpoint: SOAP_ENDPOINT,
    soapAction,
    bodyXml,
    ...DEMO_FETCH,
  };
}

export function safeArray<T>(items: MaybeArray<T> | undefined): T[] {
  if (!items) return [];
  return Array.isArray(items) ? items : [items];
}

export function mapAndFilter<T, U>(
  items: MaybeArray<T> | undefined,
  mapper: (item: T) => U,
  filter?: (item: U) => boolean,
  sort?: (a: U, b: U) => number
): U[] {
  const arr = safeArray(items);
  let result = arr.map(mapper);
  if (filter) result = result.filter(filter);
  if (sort) result = result.sort(sort);
  return result;
}