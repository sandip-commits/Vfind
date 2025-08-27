"use client";

export function saveAuth(token: string, userId: number) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId.toString());
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return null;
}

export function getUserId(): number | null {
  if (typeof window !== "undefined") {
    const id = localStorage.getItem("userId");
    return id ? parseInt(id, 10) : null;
  }
  return null;
}

export function clearAuth() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }
}
