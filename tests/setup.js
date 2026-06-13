// Adds jest-dom matchers (toBeInTheDocument, toHaveAttribute, toHaveClass, …)
// to vitest's expect, and registers @testing-library/react's automatic DOM
// cleanup between tests (via the global afterEach that `globals: true` provides).
import "@testing-library/jest-dom/vitest";
