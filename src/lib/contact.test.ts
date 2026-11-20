import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact";

const valid = { name: "Ada", email: "ada@example.com", subject: "Hello", message: "Let's build." };

describe("contact form rules", () => {
  it("accepts a complete message", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("requires a name", () => {
    expect(contactSchema.safeParse({ ...valid, name: "   " }).success).toBe(false);
  });

  it("requires a valid email", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects messages over 2000 characters", () => {
    expect(contactSchema.safeParse({ ...valid, message: "a".repeat(2001) }).success).toBe(false);
  });

  it("allows an empty subject", () => {
    expect(contactSchema.safeParse({ ...valid, subject: "" }).success).toBe(true);
  });
});
